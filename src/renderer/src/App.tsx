import React, { useState, useRef } from 'react'
import Toolbar from './components/Toolbar'
import Sidebar, { View } from './components/Sidebar'
import HomeView from './views/HomeView'
import SettingsView from './views/SettingsView'
import ProfileView from './views/ProfileView'
import { DocumentsView } from './views/DocumentsView'
import TestView from './views/TestView'
import StatusBar from './components/StatusBar'

function App(): React.JSX.Element {
  const [activeView, setActiveView] = useState<View>('home')
  const documentsViewRef = useRef<{ addDocument: () => void }>(null)

  const handleAddDocument = () => {
    if (activeView !== 'documents') {
      setActiveView('documents')
    }
    // Use a timeout to ensure the view is rendered before calling addDocument
    setTimeout(() => {
      documentsViewRef.current?.addDocument()
    }, 0)
  }

  return (
    // Main container uses flex row
    <div className="h-screen bg-gray-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      {/* Main content area uses flex column to stack toolbar, content, and status bar */}
      <div className="flex-grow flex flex-col">
        <Toolbar onAddDocument={handleAddDocument} />
        {/* The main content area is set to grow and allow scrolling */}
        <main className="flex-grow p-4 overflow-y-auto">
          <div className={activeView === 'home' ? 'block' : 'hidden'}><HomeView /></div>
          <div className={activeView === 'settings' ? 'block' : 'hidden'}><SettingsView /></div>
          <div className={activeView === 'profile' ? 'block' : 'hidden'}><ProfileView /></div>
          <div className={activeView === 'documents' ? 'block h-full' : 'hidden'}><DocumentsView ref={documentsViewRef} /></div>
          <div className={activeView === 'test' ? 'block' : 'hidden'}><TestView /></div>
        </main>
        <StatusBar />
      </div>
    </div>
  )
}

export default App

