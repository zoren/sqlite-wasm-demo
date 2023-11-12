import { demo1 } from "./demo1.js";

export const demoInWorker = async (sqlite3InitModule, postMessage) => {
  const postLogMessage = (logType, ...args) =>
    postMessage({
      type: "log",
      payload: { logType, args },
    });

  const log = (...args) => postLogMessage("", ...args);
  const warn = (...args) => postLogMessage("warning", ...args);
  const error = (...args) => postLogMessage("error", ...args);

  log("Running demo on worker thread.");

  demo1(sqlite3InitModule, { log, warn, error }, () =>
    log("Finished running demo on worker.")
  );
};
