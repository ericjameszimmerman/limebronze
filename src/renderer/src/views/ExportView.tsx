import React, { useState, useEffect } from 'react';

interface ExportViewProps {
  setStatusBarVisibility: (isVisible: boolean) => void;
  showToast: (message: string) => void;
}

const ExportView: React.FC<ExportViewProps> = ({ setStatusBarVisibility, showToast }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const removeListener = window.api.onExportProgress((currentProgress) => {
      setProgress(currentProgress);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      removeListener();
    };
  }, []);

  const handleExportClick = async () => {
    setIsExporting(true);
    setProgress(0);
    setStatusBarVisibility(true); // Show status bar on start

    try {
      const resultMessage = await window.api.runExport();
      showToast(resultMessage);
    } catch (error) {
      showToast(`Error: ${error.message}`);
    } finally {
      setIsExporting(false);
      // Hide status bar after a short delay
      setTimeout(() => setStatusBarVisibility(false), 3000);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Export Data</h2>
      <p className="mb-6">
        Click the button below to start a simulated 10-second export process. This will run in a
        background worker, so the UI will remain fully responsive.
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleExportClick}
          disabled={isExporting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {isExporting ? 'Exporting...' : 'Start Export'}
        </button>
        {isExporting && (
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full text-center text-white"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportView;
