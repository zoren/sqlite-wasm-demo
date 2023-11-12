
import { demoOnMain } from "./nodeWorker.js";

// run worker on main thread
await demoOnMain(console);

console.log()
console.log()

import { Worker } from "node:worker_threads";

// run worker on worker thread
const worker = new Worker(new URL("./nodeWorker.js", import.meta.url));

worker.on("message", (data) => {
  if (data.type === "log") {
    const { logType, args } = data.payload;
    switch (logType) {
      case "":
        console.log(...args);
        break;
      case "warning":
        console.warn(...args);
        break;
      case "error":
        console.error(...args);
        break;
    }
  }
});