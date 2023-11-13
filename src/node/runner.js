
import { demoOnMain } from "./worker.js";

// run worker on main thread
await demoOnMain(console);

console.log()
console.log('-'.repeat(120))
console.log()

import { Worker } from "node:worker_threads";

// run worker on worker thread
const worker = new Worker(new URL("./worker.js", import.meta.url));

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
