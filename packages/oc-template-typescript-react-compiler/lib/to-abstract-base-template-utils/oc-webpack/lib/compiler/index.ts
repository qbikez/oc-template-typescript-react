"use strict";

import MemoryFS from "memory-fs";
import webpack from "webpack";

const memoryFs = new MemoryFS();

export async function compilerAsync(config) {
  const compilePromise = new Promise<any>((resolve, reject) => {
    const callback = (err: Error | string | null, data?: any) => (err ? reject(err) : resolve(data));

    const logger = config.logger;
    delete config.logger;

    const compiler = webpack(config);
    compiler.outputFileSystem = memoryFs;
    
    compiler.run((error, stats) => {
      let softError: string;
      let warning: string;

      // handleFatalError
      if (error) {
        return callback(error);
      }

      const info = stats.toJson();
      // handleSoftErrors
      if (stats.hasErrors()) {
        softError = info.errors.toString();
        return callback(softError);
      }
      // handleWarnings
      if (stats.hasWarnings()) {
        warning = info.warnings.toString();
      }

      const log = stats.toString(config.stats || "errors-only");

      if (log) {
        logger.log(log);
      }
      callback(null, memoryFs.data);
    });
  });

  return await compilePromise;
}

export function compiler(config, callback) {
  compilerAsync(config)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
}

export default compiler;
