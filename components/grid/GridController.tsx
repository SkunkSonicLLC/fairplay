import React from 'react';

interface GridControlsProps {
  onReset: () => void;
  onSave: () => void;
  onExport?: () => void;
}

const GridControls: React.FC<GridControlsProps> = ({ onReset, onSave, onExport }) => {
  return (
    <div className="flex justify-end space-x-4 mb-4 p-4">
      <button
        onClick={onReset}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Reset Grid
      </button>
      
      <button
        onClick={onSave}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Progress
      </button>

      {onExport && (
        <button
          onClick={onExport}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Export
        </button>
      )}
    </div>
  );
};

export default GridControls;
