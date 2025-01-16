import React, { useState, useEffect, useRef } from 'react';
import { useSongContext } from '../contexts/SongContext';

const LumaSystem = () => {
  const { 
    verses, 
    addVerse, 
    updateVerse, 
    deleteVerse, 
    moveVerse 
  } = useSongContext();

  const [currentVerse, setCurrentVerse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingVerse, setEditingVerse] = useState(null);
  const verseInputRef = useRef(null);

  // Categories for Luma System
  const rowCategories = [
    { id: 'misinformation', name: 'Misinformation & Polarization' },
    { id: 'economic-disparities', name: 'Economic Disparities' },
    { id: 'environmental', name: 'Environmental Degradation' },
    { id: 'health-crises', name: 'Health Crises' },
    { id: 'political-conflicts', name: 'Political Conflicts & Instability' }
  ];

  const columnCategories = [
    { id: 'media-literacy', name: 'Media Literacy' },
    { id: 'growth', name: 'Growth' },
    { id: 'stewardship', name: 'Stewardship' },
    { id: 'well-being', name: 'Well-Being' },
    { id: 'governance', name: 'Governance' }
  ];

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
        system: 'LumaSystem'
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Luma System: Global Challenges Song</h2>
      
      {/* Category Selection Grid */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="col-span-1"></div>
        {columnCategories.map((col) => (
          <div key={col.id} className="font-semibold text-center">
            {col.name}
          </div>
        ))}

        {rowCategories.map((row) => (
          <React.Fragment key={row.id}>
            <div className="font-semibold">{row.name}</div>
            {columnCategories.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedCategory({ row, column: col })}
                className={`p-4 border rounded ${
                  selectedCategory?.row.id === row.id && 
                  selectedCategory?.column.id === col.id 
                    ? 'bg-green-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {selectedCategory?.row.id === row.id && 
                 selectedCategory?.column.id === col.id 
                  ? `${row.name} × ${col.name}` 
                  : '?'}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Verse Input */}
      {selectedCategory && (
        <div className="mt-6">
          <textarea
            ref={verseInputRef}
            value={currentVerse}
            onChange={(e) => setCurrentVerse(e.target.value)}
            placeholder="Write your verse addressing global challenges..."
            className="w-full h-32 p-2 border rounded"
          />
          <button 
            onClick={handleSubmitVerse}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            {editingVerse ? 'Update Verse' : 'Add Verse to Song'}
          </button>
          {editingVerse && (
            <button 
              onClick={() => {
                setEditingVerse(null);
                setCurrentVerse('');
                setSelectedCategory(null);
              }}
              className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* Compiled Song View with Reordering */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Song in Progress</h3>
        {verses.length === 0 ? (
          <p className="text-gray-500">No verses written yet</p>
        ) : (
          <div className="space-y-4">
            {verses.map((verse, index) => (
              <div
                key={verse.id}
                className="p-4 bg-gray-50 rounded flex items-center justify-between"
              >
                <div className="flex-grow mr-4">
                  <p className="whitespace-pre-wrap">{verse.content}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Category: {verse.category.row.name} × {verse.category.column.name}
                    <span className="ml-2 text-green-500">
                      (From {verse.system || 'Unknown System'})
                    </span>
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mr-4">
                  <button 
                    onClick={() => moveVerseUp(index)}
                    disabled={index === 0}
                    className={`text-sm ${
                      index === 0 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text
