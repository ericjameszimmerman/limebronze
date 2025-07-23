import React, { useState, useEffect } from 'react'

interface MonitoringData {
  voltage: string
  current: string
  power: string
  frequency: string
  status: 'running' | 'stopped'
  fault: boolean
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<MonitoringData | null>(null)

  useEffect(() => {
    const handleMonitoringData = (event, newData) => {
      setData(newData)
    }

    const cleanup = window.api.onMonitoringData(handleMonitoringData)

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const getStatusClass = () => {
    if (data.fault) return 'bg-red-500 text-white'
    if (data.status === 'running') return 'bg-green-500 text-white'
    return 'bg-gray-500 text-white'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Voltage</h2>
        <p className="text-3xl">{data.voltage} V</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Current</h2>
        <p className="text-3xl">{data.current} A</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Power</h2>
        <p className="text-3xl">{data.power} kW</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Frequency</h2>
        <p className="text-3xl">{data.frequency} Hz</p>
      </div>
      <div className={`p-4 rounded-lg shadow-md ${getStatusClass()}`}>
        <h2 className="text-lg font-bold">Status</h2>
        <p className="text-3xl capitalize">{data.fault ? 'Fault' : data.status}</p>
      </div>
    </div>
  )
}

export default Dashboard
