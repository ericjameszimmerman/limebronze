import { BrowserWindow, ipcMain } from 'electron';
import { Worker } from 'worker_threads';
import path from 'path';

class ExportService {
  private mainWindow: BrowserWindow | null = null;

  initialize(win: BrowserWindow) {
    this.mainWindow = win;

    ipcMain.handle('run-export', () => {
      return this.runExportProcess();
    });
  }

  private runExportProcess(): Promise<string> {
    console.log('Main: Kicking off export worker.');
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, 'export.worker.js'), {
        workerData: {},
      });

      worker.on('message', (message) => {
        if (message.type === 'progress') {
          this.mainWindow?.webContents.send('export-progress', message.data);
        } else if (message.type === 'done') {
          resolve(message.data);
        }
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
}

export const exportService = new ExportService();
