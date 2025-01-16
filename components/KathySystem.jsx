import React, { useState, useEffect, useRef } from 'react';
import { useSongContext } from '../contexts/SongContext';

const KathySystem = () => {
  const { 
    currentSession, 
    verses, 
    addVerse, 
    updateVerse, 
    deleteVerse, 
    moveVerse,
    resetSession 
  } = useSongContext();

  const [currentVerse, setCurrentVerse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingVerse, setEditingVerse] = useState(null);
  const verseInputRef = useRef(null);

  // ... (rest of the categories remain the same)

  // Focus on textarea when a category is selected
  useEffect(() => {
    if (selectedCategory && verseInputRef.current) {
      verseInputRef.current.focus();
    }
  }, [selectedCategory]);

  // Handle verse submission
  const handleSubmitVerse = () => {
    if (!currentVerse.trim() || !selectedCategory) {
      alert('Please select a category and write your verse');
      return;
    }

    if (editingVerse) {
      // Update existing verse
      updateVerse(editingVerse.id, {
        content: currentVerse,
        category: selectedCategory
      });
      setEditingVerse(null);
    } else {
      // Add new verse
      addVerse({
        content: currentVerse,
        category: selectedCategory,
        system: 'KathySystem'
      });
    }

    // Reset form
    setCurrentVerse('');
    setSelectedCategory(null);
  };

  // Handle verse deletion
  const handleDeleteVerse = (verseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this verse?');
    if (confirmDelete) {
      deleteVerse(verseId);
    }
  };

  // Handle verse editing
  const handleEditVerse = (verse) => {
    setEditingVerse(verse);
    setCurrentVerse(verse.content);
    setSelectedCategory(verse.category);
  };

  // Reorder verses
  const moveVerseUp = (index) => {
    if (index > 0) {
      moveVerse(index, index - 1);
    }
  };

  const moveVerseDown = (index) => {
    if (index < verses.length - 1) {
      moveVerse(index, index + 1);
    }
  };

  // Render remains mostly the same, but uses shared context
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Kathy System: Collaborative Songwriting</h2>
      
      {/* Session Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p>Current Session ID: {currentSession?.id}</p>
        <p>Started: {new Date(currentSession?.startedAt).toLocaleString()}</p>
        <button 
          onClick={resetSession}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Start New Session
        </button>
      </div>

      {/* Rest of the component remains the same as before */}
      {/* ... */}
    </div>
  );
};

export default KathySystem;
