import { demo1 } from "../common/demo1.js";
import { demoInWorker } from "../common/worker.js";

const isMainThread = self.window === self;

export const demoOnMain = async (consolish) => {
  if (!isMainThread) {
    throw new Error("demoOnMain() must be called on the main thread.");
  }

  consolish.log("Running demo on main thread.");
  await demo1(consolish, () =>
    consolish.log("Finished running demo on main thread.")
  );
};

if (!isMainThread) demoInWorker(postMessage);
