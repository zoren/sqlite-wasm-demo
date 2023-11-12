import { demoOnMain } from "./browserWorker.js";

const createLogLine = (cssClass, args) => {
  const ln = document.createElement("div");
  if (cssClass) ln.classList.add(cssClass);
  ln.append(document.createTextNode(args.join(" ")));
  return ln;
};

const consolishLogger = (outputElement) => ({
  log: (...args) => outputElement.append(createLogLine("", args)),
  warn: (...args) => outputElement.append(createLogLine("warning", args)),
  error: (...args) => outputElement.append(createLogLine("error", args)),
});

const mainLogger = consolishLogger(document.getElementById('mainThreadLog'));

// run worker on main thread
await demoOnMain(mainLogger);

console.log('main thread finished')

const workerLogger = consolishLogger(document.getElementById('workerThreadLog'));

// run worker on worker thread
const worker = new Worker(new URL("./browserWorker.js", import.meta.url), {
  type: "module",
});

worker.addEventListener("message", (event) => {
  const { data } = event;
  if (data.type === "log") {
    const { logType, args } = data.payload;
    switch (logType) {
      case "":
        workerLogger.log(...args);
        break;
      case "warning":
        workerLogger.warn(...args);
        break;
      case "error":
        workerLogger.error(...args);
        break;
    }
  }
});
