"use strict";

import compiler from "./lib/compiler";
import { client, server } from "./lib/configurator";

export default {
  compiler,
  configurator: {
    client,
    server
  }
};
