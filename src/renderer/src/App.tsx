import Toolbar from './components/Toolbar'

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toolbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Tailwind is Active</h1>
            <p className="text-gray-600 text-base">
              If you see this card styled with a shadow, rounded corners, and specific text sizes/colors, then Tailwind CSS is correctly configured and working in your Electron + Vite + React app.
            </p>
          </div>
          <div className="px-6 pb-4">
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">#electron</span>
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-800 mr-2 mb-2">#react</span>
            <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-800 mr-2 mb-2">#tailwind</span>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">
              A Styled Button
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 border-t border-gray-300 p-2 text-center text-sm text-gray-600">
        Status Bar
      </footer>
    </div>
  )
}

export default App
