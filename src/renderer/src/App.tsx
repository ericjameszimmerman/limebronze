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

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />
      case 'settings':
        return <SettingsView />
      case 'profile':
        return <ProfileView />
      case 'documents':
        return <DocumentsView ref={documentsViewRef} />
      case 'test':
        return <TestView />
      default:
        return <HomeView />
    }
  }

  const handleAddDocument = () => {
    if (activeView === 'documents' && documentsViewRef.current) {
      documentsViewRef.current.addDocument()
    } else {
      setActiveView('documents')
      setTimeout(() => {
        documentsViewRef.current?.addDocument()
      }, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toolbar onAddDocument={handleAddDocument} />
      <div className="flex flex-grow">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-grow p-4">{renderView()}</main>
      </div>
      <footer className="bg-gray-200 border-t border-gray-300 p-2 text-center text-sm text-gray-600">
        Status Bar
      </footer>
    </div>
  )
}

export default App
