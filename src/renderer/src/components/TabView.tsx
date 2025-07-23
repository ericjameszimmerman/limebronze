import React from 'react'
import { FaFileAlt, FaTimes } from 'react-icons/fa'
import { Document } from '../views/DocumentsView'

interface TabViewProps {
  documents: Document[]
  activeDocumentId: string | null
  setActiveDocumentId: (id: string) => void
  closeDocument: (id: string) => void
}

const TabView: React.FC<TabViewProps> = ({
  documents,
  activeDocumentId,
  setActiveDocumentId,
  closeDocument
}) => {
  return (
    <div className="flex border-b border-gray-300 bg-gray-200">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`group flex items-center p-2 cursor-pointer border-r border-gray-300 ${
            activeDocumentId === doc.id ? 'bg-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => setActiveDocumentId(doc.id)}
        >
          <FaFileAlt className="mr-2 text-gray-600" />
          <span className="pr-2">{doc.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeDocument(doc.id)
            }}
            className={`ml-2 text-gray-500 hover:bg-gray-300 rounded-md p-1 ${
              activeDocumentId === doc.id ? 'visible' : 'invisible group-hover:visible'
            }`}
          >
            <FaTimes size="12" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default TabView
