import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
import { demo1 } from "./demo1.js";
import { demoInWorker } from "./worker.js";

const isMainThread = self.window === self;

export const demoOnMain = async (consolish) => {
  if (!isMainThread) {
    throw new Error("demoOnMain() must be called on the main thread.");
  }
  const sqlite3 = await sqlite3InitModule();

  consolish.log("Running demo on main thread.");
  demo1(sqlite3, consolish, () =>
    consolish.log("Finished running demo on main thread.")
  );
};

if (!isMainThread) demoInWorker(sqlite3InitModule, postMessage);
