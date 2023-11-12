import { sqlite3InitModuleNode } from "@sqlite.org/sqlite-wasm";
import { doDemo } from "./demo.js";

const sqlite3 = await sqlite3InitModuleNode();
doDemo(sqlite3);

