import { sqlite3InitModuleNode } from "@sqlite.org/sqlite-wasm";
import { isMainThread, parentPort } from "node:worker_threads";
import { demo1 } from "../common/demo1.js";
import { demoInWorker } from "../common/worker.js";

export const demoOnMain = async (consolish) => {
  if (!isMainThread) {
    throw new Error("demoOnMain() must be called on the main thread.");
  }

  consolish.log("Running demo on main thread.");
  await demo1(sqlite3InitModuleNode, consolish);
  consolish.log("Finished running demo on main thread.");
};

if (!isMainThread){
  demoInWorker(sqlite3InitModuleNode, (value) => parentPort.postMessage(value));
}
