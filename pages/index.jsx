import React from 'react';
import { useSongContext } from '../contexts/SongContext';
import KathySystem from '../components/KathySystem';
import LumaSystem from '../components/LumaSystem';

export default function Home() {
  const { verses, moveVerse, deleteVerse, resetSession } = useSongContext();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">2level1</h1>
        <button 
          onClick={() => {
            const confirmReset = window.confirm('Are you sure you want to start a new session?');
            if (confirmReset) {
              resetSession();
            }
          }}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          2level1
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
        <div className="col-span-1">
          <KathySystem />
        </div>
        <div className="col-span-1 bg-gray-100 p-4 rounded overflow-auto max-h-[calc(100vh-150px)]">
          <h2 className="text-2xl font-bold mb-4">Song in Progress</h2>
          {verses.length === 0 ? (
            <p className="text-gray-500">No verses written yet</p>
          ) : (
            <div className="space-y-4">
              {verses.map((verse, index) => (
                <div
                  key={verse.id}
                  className="p-4 bg-white rounded shadow-sm relative"
                >
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>

                  <p className="whitespace-pre-wrap">{verse.content}</p>
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Category:</strong> {verse.category.row.name} × {verse.category.column.name}
                    <span className="ml-2 text-blue-500">
                      (From {verse.system || 'Unknown System'})
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button 
                      onClick={() => {
                        if (index > 0) moveVerse(index, index - 1);
                      }}
                      disabled={index === 0}
                      className={`text-sm ${
                        index === 0 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-blue-500 hover:text-blue-700'
                      }`}
                    >
                      ↑ Move Up
                    </button>
                    <button 
                      onClick={() => {
                        if (index < verses.length - 1) moveVerse(index, index + 1);
                      }}
                      disabled={index === verses.length - 1}
                      className={`text-sm ${
                        index === verses.length - 1 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-blue-500 hover:text-blue-700'
                      }`}
                    >
                      ↓ Move Down
                    </button>
                    <button 
                      onClick={() => {
                        const confirmDelete = window.confirm('Are you sure you want to delete this verse?');
                        if (confirmDelete) deleteVerse(verse.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-1">
          <LumaSystem />
        </div>
      </div>
    </div>
  );
}
