import React, { useState, useRef } from 'react'
import Toolbar from './components/Toolbar'
import Sidebar, { View } from './components/Sidebar'
import HomeView from './views/HomeView'
import SettingsView from './views/SettingsView'
import ProfileView from './views/ProfileView'
import { DocumentsView } from './views/DocumentsView'
import TestView from './views/TestView'
import ExportView from './views/ExportView'
import SysMLView from './views/SysMLView'
import CanvasView from './views/CanvasView'
import StatusBar from './components/StatusBar'
import Toast from './components/Toast'

function App(): React.JSX.Element {
  const [activeView, setActiveView] = useState<View>('home')
  const [isStatusBarVisible, setStatusBarVisibility] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const documentsViewRef = useRef<{ addDocument: () => void }>(null)

  const handleAddDocument = () => {
    if (activeView !== 'documents') {
      setActiveView('documents')
    }
    setTimeout(() => {
      documentsViewRef.current?.addDocument()
    }, 0)
  }

  const showToast = (message: string) => {
    setToastMessage(message)
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-grow flex flex-col">
        <Toolbar onAddDocument={handleAddDocument} />
        <main className="flex-grow p-4 overflow-y-auto">
          <div className={activeView === 'home' ? 'block' : 'hidden'}><HomeView /></div>
          <div className={activeView === 'settings' ? 'block' : 'hidden'}><SettingsView /></div>
          <div className={activeView === 'profile' ? 'block' : 'hidden'}><ProfileView /></div>
          <div className={activeView === 'documents' ? 'block h-full' : 'hidden'}><DocumentsView ref={documentsViewRef} /></div>
          <div className={activeView === 'export' ? 'block' : 'hidden'}>
            <ExportView setStatusBarVisibility={setStatusBarVisibility} showToast={showToast} />
          </div>
          <div className={activeView === 'sysml' ? 'block h-full' : 'hidden'}><SysMLView /></div>
          <div className={activeView === 'canvas' ? 'block h-full' : 'hidden'}><CanvasView /></div>
          <div className={activeView === 'test' ? 'block' : 'hidden'}><TestView /></div>
        </main>
        {isStatusBarVisible && <StatusBar />}
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  )
}

export default App


