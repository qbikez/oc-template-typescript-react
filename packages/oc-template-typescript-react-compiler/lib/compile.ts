"use strict";

import compileServer from "./compileServer";
import compileView from "./compileView";
import { createCompile } from "oc-generic-template-compiler";
const compileStatics = require("oc-statics-compiler");
const getInfo = require("oc-template-typescript-react").getInfo;
import verifyConfig from "./verifyConfig";

const compiler = createCompile({
  compileServer,
  compileStatics,
  compileView,
  getInfo
});

// OPTIONS
// =======
// componentPath
// componentPackage,
// logger,
// minify
// ocPackage
// publishPath
// verbose,
// watch,
// production
export default function compile(options, callback) {
  verifyConfig(options.componentPath);

  return compiler(options, callback);
};
