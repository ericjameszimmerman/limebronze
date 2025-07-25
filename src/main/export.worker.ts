import { parentPort } from 'worker_threads';

// This function simulates a long-running, CPU-intensive task.
function runFakeExport(): void {
  console.log('Worker: Starting fake export process...');
  const totalSteps = 100;
  const duration = 10000; // 10 seconds
  const stepDuration = duration / totalSteps; // Duration per step

  // Create a shared buffer for Atomics.wait
  const sab = new SharedArrayBuffer(4);
  const int32 = new Int32Array(sab);

  for (let i = 0; i < totalSteps; i++) {
    // Use Atomics.wait for a synchronous, blocking sleep.
    // This is a reliable way to simulate work in a worker.
    Atomics.wait(int32, 0, 0, stepDuration);

    const progress = Math.round(((i + 1) / totalSteps) * 100);
    // Send progress back to the main thread
    parentPort?.postMessage({ type: 'progress', data: progress });
  }

  console.log('Worker: Export process complete.');
  // Signal completion
  parentPort?.postMessage({ type: 'done', data: 'Export completed successfully.' });
}

runFakeExport();
