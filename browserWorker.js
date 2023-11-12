import  sqlite3InitModule  from "@sqlite.org/sqlite-wasm";
import { demo1 } from "./demo1.js";

const isMainThread = self.window === self

export const demoOnMain = async (consolish) => {
  if (!isMainThread) {
    throw new Error("demoOnMain() must be called from the main thread.");
  }
  const sqlite3 = await sqlite3InitModule();

  consolish.log("Running demo from main thread.");
  demo1(sqlite3, consolish, () =>
    consolish.log("finished running demo from main thread.")
  );
};

if (!isMainThread) {
  const postLogMessage = function (logType, ...args) {
    postMessage({
      type: "log",
      payload: { logType, args },
    });
  };

  const log = (...args) => postLogMessage("", ...args);
  const warn = (...args) => postLogMessage("warning", ...args);
  const error = (...args) => postLogMessage("error", ...args);

  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  });

  log("Running demo from Worker thread.");

  demo1(sqlite3, { log, warn, error });
  log("finished running demo from Worker thread.");
}
