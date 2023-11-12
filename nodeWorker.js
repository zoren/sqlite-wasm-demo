import { sqlite3InitModuleNode } from "@sqlite.org/sqlite-wasm";
import { isMainThread, parentPort } from "node:worker_threads";
import { demo1 } from "./demo1.js";
import { demoInWorker } from "./worker.js";

export const demoOnMain = async (consolish) => {
  if (!isMainThread) {
    throw new Error("demoOnMain() must be called from the main thread.");
  }
  const sqlite3 = await sqlite3InitModuleNode();

  consolish.log("Running demo from main thread.");
  demo1(sqlite3, consolish, () =>
    consolish.log("Finished running demo from main thread.")
  );
};

if (!isMainThread)
  demoInWorker(sqlite3InitModuleNode, (value) => parentPort.postMessage(value));
