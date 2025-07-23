import { BrowserWindow } from 'electron'

class MonitoringService {
  private window: BrowserWindow | null = null
  private intervalId: NodeJS.Timeout | null = null
  private status: 'running' | 'stopped' = 'stopped'
  private fault: boolean = false

  setWindow(window: BrowserWindow) {
    this.window = window
  }

  start() {
    if (this.intervalId) return
    this.status = 'running'
    this.fault = false
    this.intervalId = setInterval(() => {
      this.sendData()
    }, 1000)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.status = 'stopped'
    this.sendData() // Send one last update with stopped status
  }

  private sendData() {
    const data = {
      voltage: (Math.random() * 20 + 220).toFixed(2),
      current: (Math.random() * 5 + 10).toFixed(2),
      power: (Math.random() * 1 + 2).toFixed(2),
      frequency: (Math.random() * 0.1 + 59.95).toFixed(2),
      status: this.status,
      fault: this.fault
    }
    // Occasionally trigger a fault
    if (this.status === 'running' && Math.random() < 0.05) {
      this.fault = true
      data.fault = true
    }

    if (this.window && !this.window.isDestroyed()) {
      this.window.webContents.send('monitoring-data', data)
    }
  }
}

export const monitoringService = new MonitoringService()
