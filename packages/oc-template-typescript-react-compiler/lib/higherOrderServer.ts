import * as fs from "fs";
import { string } from "prop-types";

const removeTsExtension = path => path.replace(/\.tsx?$/, "");

const higherOrderServerTemplate = ({
  serverPath,
  bundleHashKey,
  componentName,
  componentVersion
}) => {
  const template = fs.readFileSync(`${__dirname}/higherOrderServer.template.ts`).toString();
  return template
    .replace('./server.template', removeTsExtension(serverPath))
    .replace('__componentName__', componentName)
    .replace('__componentVersion__', componentVersion)
    .replace('__bundleHashKey__', bundleHashKey);
}

export default higherOrderServerTemplate;
