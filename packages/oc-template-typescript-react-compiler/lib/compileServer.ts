"use strict";

import async from "async";
import fs from "fs-extra";
import hashBuilder from "oc-hash-builder";
import MemoryFS from "memory-fs";
import path from "path";

import ocwebpack from "./to-abstract-base-template-utils/oc-webpack";

const {
  compilerAsync: compiler,
  configurator: { server: webpackConfigurator }
} = ocwebpack;

import higherOrderServerTemplate from "./templates/higherOrderServer";

export const compileServerAsync = async options => {
  const componentPath = options.componentPath;
  const serverFileName = options.componentPackage.oc.files.data;
  let serverPath = path.join(options.componentPath, serverFileName);
  if (process.platform === "win32") {
    serverPath = serverPath.split("\\").join("\\\\");
  }
  const publishFileName = options.publishFileName || "server.js";
  const publishPath = options.publishPath;
  const stats = options.verbose ? "verbose" : "errors-only";
  const dependencies = options.componentPackage.dependencies || {};
  const componentName = options.componentPackage.name;
  const componentVersion = options.componentPackage.version;
  const production = options.production;

  const higherOrderServerContent = higherOrderServerTemplate({
    serverPath,
    componentName,
    componentVersion,
    bundleHashKey: options.compiledViewInfo.bundle.hashKey
  });
  const tempFolder = path.join(serverPath, "../_package/temp");
  const higherOrderServerPath = path.join(
    tempFolder,
    "__oc_higherOrderServer.ts"
  );

  await fs.outputFile(higherOrderServerPath, higherOrderServerContent);

  const config = webpackConfigurator({
    componentPath,
    serverPath: higherOrderServerPath,
    publishFileName,
    dependencies,
    stats,
    production
  });

  const data = await compiler(config);

  const basePath = path.join(tempFolder, "build");
  const memory = new MemoryFS(data);
  const getCompiled = (fileName: string) =>
    memory.readFileSync(`${basePath}/${fileName}`, "UTF8");

  await fs.ensureDir(publishPath);

  const compiledFiles: any[string] = {
    "server.js": getCompiled(config.output.filename)
  };

  if (!production) {
    try {
      compiledFiles["server.js.map"] = getCompiled(
        `${config.output.filename}.map`
      );
    } catch (e) {
      // skip sourcemap if it doesn't exist
    }
  }

  await Promise.all(
    Object.keys(compiledFiles).map(fileName => {
      const fileContent = compiledFiles[fileName];
      return fs.writeFile(path.join(publishPath, fileName), fileContent);
    })
  );

  await fs.remove(tempFolder);

  return {
    type: "node.js",
    hashKey: hashBuilder.fromString(compiledFiles[publishFileName]),
    src: publishFileName
  };
};

export const compileServer = async (options, callback) => {
  compileServerAsync(options)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

export default compileServer;
