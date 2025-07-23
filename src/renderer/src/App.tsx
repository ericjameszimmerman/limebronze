import React, { useState, useRef } from 'react'
import Toolbar from './components/Toolbar'
import Sidebar, { View } from './components/Sidebar'
import HomeView from './views/HomeView'
import SettingsView from './views/SettingsView'
import ProfileView from './views/ProfileView'
import { DocumentsView } from './views/DocumentsView'
import TestView from './views/TestView'

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toolbar onAddDocument={handleAddDocument} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-grow p-4">
          <div className={activeView === 'home' ? 'block' : 'hidden'}><HomeView /></div>
          <div className={activeView === 'settings' ? 'block' : 'hidden'}><SettingsView /></div>
          <div className={activeView === 'profile' ? 'block' : 'hidden'}><ProfileView /></div>
          <div className={activeView === 'documents' ? 'block h-full' : 'hidden'}><DocumentsView ref={documentsViewRef} /></div>
          <div className={activeView === 'test' ? 'block' : 'hidden'}><TestView /></div>
        </main>
      </div>
      <footer className="bg-gray-200 border-t border-gray-300 p-2 text-center text-sm text-gray-600">
        Status Bar
      </footer>
    </div>
  )
}

export default App
