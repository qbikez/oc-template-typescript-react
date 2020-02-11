"use strict";

import { compiler, compilerAsync } from "./lib/compiler";
import { client, server } from "./lib/configurator";

export default {
  compiler,
  compilerAsync,
  configurator: {
    client,
    server
  }
};
