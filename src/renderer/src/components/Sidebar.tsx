import React from 'react'
import { FaHome, FaCog, FaUser, FaChess } from 'react-icons/fa'

export type View = 'home' | 'settings' | 'profile' | 'test'

interface SidebarProps {
  activeView: View
  setActiveView: (view: View) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', tooltip: 'Home', icon: <FaHome /> },
    { id: 'settings', tooltip: 'Settings', icon: <FaCog /> },
    { id: 'profile', tooltip: 'Profile', icon: <FaUser /> },
    { id: 'test', tooltip: 'Test', icon: <FaChess /> }
  ]

  return (
    <div className="bg-gray-800 text-white w-16 flex flex-col items-center space-y-4 py-4">
      {navItems.map((item) => (
        <button
          key={item.id}
          title={item.tooltip}
          onClick={() => setActiveView(item.id as View)}
          className={`p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            activeView === item.id ? 'bg-gray-900' : ''
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}

export default Sidebar
