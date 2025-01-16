import React from 'react';
import { useSongContext } from '../contexts/SongContext';
import KathySystem from '../components/KathySystem';
import LumaSystem from '../components/LumaSystem';

export default function Home() {
  const { currentSession, resetSession } = useSongContext();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">2level1</h1>
        <button 
          onClick={resetSession}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          2level1
        </button>
      </div>
      <div className="space-y-12">
        <KathySystem />
        <LumaSystem />
      </div>
    </div>
  );
}
