import React, { useState, useEffect, useRef } from 'react';
import { useSongContext } from '../contexts/SongContext';

const LumaSystem = () => {
  const { 
    currentSession, 
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

  // Rest of the methods remain unchanged

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

      {/* Rest of the component remains the same */}
      {/* Verse Input and Verse List sections are unchanged */}
    </div>
  );
};

export default LumaSystem;
