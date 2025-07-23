import React from 'react'
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
    <div className="flex border-b border-gray-300">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`flex items-center p-2 cursor-pointer ${
            activeDocumentId === doc.id ? 'bg-white border-t border-l border-r' : 'bg-gray-200'
          }`}
          onClick={() => setActiveDocumentId(doc.id)}
        >
          <span>{doc.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeDocument(doc.id)
            }}
            className="ml-2 text-gray-500 hover:text-gray-800"
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}

export default TabView
