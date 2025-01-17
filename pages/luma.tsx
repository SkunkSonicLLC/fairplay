// src/pages/luma.tsx
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Grid from '../components/grid/Grid';
import GridControls from '../components/grid/GridControls';
import VerseEditor from '../components/song/VerseEditor';
import SongDisplay from '../components/song/SongDisplay';
import { useSong } from '../contexts/SongContext';
import { moduleManager } from '../lib/moduleManager';
import { GridPosition } from '../types/core';

const LumaPage: NextPage = () => {
  const [selectedPosition, setSelectedPosition] = useState<GridPosition | null>(null);
  const { createNewSong, currentSong, addVerse } = useSong();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const initLuma = async () => {
      if (!moduleManager.getModule('luma')) {
        await moduleManager.initializeModule('luma');
      }
    };
    initLuma();
  }, []);

  const handleCellClick = (position: GridPosition) => {
    setSelectedPosition(position);
    if (!currentSong) {
      createNewSong(`luma-${position.row}-${position.col}`);
    }
  };

  const handleReset = async () => {
    await moduleManager.resetModule('luma');
    setSelectedPosition(null);
  };

  const handleSave = () => {
    // Implement save logic
  };

  const handleVerseSave = (content: string) => {
    if (currentSong) {
      addVerse(content, 'current-user-id'); // Replace with actual user ID
      setIsEditing(false);
    }
  };

  return (
    <Layout title="Luma System - FairPlay">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Luma System</h2>
          <p className="mt-2 text-gray-600">
            Explore light, movement, and experimental themes through creative expression.
          </p>
        </div>

        <GridControls onReset={handleReset} onSave={handleSave} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Grid systemType="luma" onCellClick={handleCellClick} />
          </div>

          <div className="space-y-6">
            {selectedPosition && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-medium mb-4">
                  Selected Cell: {String.fromCharCode(65 + selectedPosition.row)}
                  {selectedPosition.col + 1}
                </h3>
                
                {isEditing ? (
                  <VerseEditor
                    verseIndex={currentSong?.verses.length || 0}
                    onSave={handleVerseSave}
                  />
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Add Verse
                  </button>
                )}
                
                {currentSong && (
                  <div className="mt-6">
                    <SongDisplay onVerseClick={() => setIsEditing(true)} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LumaPage;
