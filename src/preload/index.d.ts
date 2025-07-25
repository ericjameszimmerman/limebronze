import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      onMonitoringData: (callback: (event: any, data: any) => void) => () => void
      runExport: () => Promise<string>
      onExportProgress: (callback: (progress: number) => void) => () => void
    }
  }
}
