"use strict";

import _compile from "./lib/compile";
const template = require("oc-template-typescript-react");

export const compile = _compile;
export const getCompiledTemplate = template.getCompiledTemplate;
export const getInfo = template.getInfo;
export const render = template.render;
