import React, { useState, useImperativeHandle, forwardRef } from 'react'
import TabView from '../components/TabView'

export interface Document {
  id: string
  title: string
  content: string
}

export const DocumentsView = forwardRef((props, ref) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    addDocument: () => {
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        title: `Document ${documents.length + 1}`,
        content: `Content for document ${documents.length + 1}`
      }
      setDocuments([...documents, newDocument])
      setActiveDocumentId(newDocument.id)
    }
  }))

  const closeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    if (activeDocumentId === id) {
      setActiveDocumentId(documents.length > 1 ? documents[0].id : null)
    }
  }

  const activeDocument = documents.find((doc) => doc.id === activeDocumentId)

  return (
    <div className="flex flex-col h-full">
      <TabView
        documents={documents}
        activeDocumentId={activeDocumentId}
        setActiveDocumentId={setActiveDocumentId}
        closeDocument={closeDocument}
      />
      <div className="p-4 border-t border-gray-300 flex-grow">
        {activeDocument ? (
          <div>
            <h2 className="text-xl font-bold">{activeDocument.title}</h2>
            <p>{activeDocument.content}</p>
          </div>
        ) : (
          <p>No documents open.</p>
        )}
      </div>
    </div>
  )
})

// export default DocumentsView
