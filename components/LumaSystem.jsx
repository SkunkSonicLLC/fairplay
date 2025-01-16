import React, { useState, useEffect, useRef } from 'react';

const LumaSystem = () => {
  // State for managing the collaborative song
  const [currentSession, setCurrentSession] = useState(null);
  const [verses, setVerses] = useState([]);
  const [currentVerse, setCurrentVerse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingVerse, setEditingVerse] = useState(null);

  // Ref for textarea to enable focusing
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

  // Unique session ID generator
  const generateSessionId = () => {
    return `luma_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Load session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('lumaCurrentSongSession');
    const savedVerses = localStorage.getItem('lumaSongVerses');

    if (savedSession && savedVerses) {
      setCurrentSession(JSON.parse(savedSession));
      setVerses(JSON.parse(savedVerses));
    } else {
      const newSession = {
        id: generateSessionId(),
        startedAt: new Date().toISOString()
      };
      setCurrentSession(newSession);
      localStorage.setItem('lumaCurrentSongSession', JSON.stringify(newSession));
    }
  }, []);

  // Save verses to localStorage whenever they change
  useEffect(() => {
    if (verses.length > 0) {
      localStorage.setItem('lumaSongVerses', JSON.stringify(verses));
    }
  }, [verses]);

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
      const updatedVerses = verses.map(verse => 
        verse.id === editingVerse.id 
          ? { ...verse, content: currentVerse, category: selectedCategory }
          : verse
      );
      setVerses(updatedVerses);
      setEditingVerse(null);
    } else {
      // Add new verse
      const newVerse = {
        id: `verse_${Date.now()}`,
        content: currentVerse,
        category: selectedCategory,
        timestamp: new Date().toISOString(),
        sessionId: currentSession.id
      };
      setVerses([...verses, newVerse]);
    }

    // Reset form
    setCurrentVerse('');
    setSelectedCategory(null);
  };

  // Handle verse deletion
  const handleDeleteVerse = (verseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this verse?');
    if (confirmDelete) {
      const updatedVerses = verses.filter(verse => verse.id !== verseId);
      setVerses(updatedVerses);
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
    if (index === 0) return; // Already at the top
    const newVerses = [...verses];
    // Swap current verse with the one above
    [newVerses[index], newVerses[index-1]] = [newVerses[index-1], newVerses[index]];
    setVerses(newVerses);
  };

  const moveVerseDown = (index) => {
    if (index === verses.length - 1) return; // Already at the bottom
    const newVerses = [...verses];
    // Swap current verse with the one below
    [newVerses[index], newVerses[index+1]] = [newVerses[index+1], newVerses[index]];
    setVerses(newVerses);
  };

  // Reset session functionality
  const handleResetSession = () => {
    const newSession = {
      id: generateSessionId(),
      startedAt: new Date().toISOString()
    };
    setCurrentSession(newSession);
    setVerses([]);
    localStorage.removeItem('lumaSongVerses');
    localStorage.setItem('lumaCurrentSongSession', JSON.stringify(newSession));
  };

  // Handle category selection
  const handleCategorySelect = (row, col) => {
    setSelectedCategory({ row, column: col });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Luma System: Global Challenges Song</h2>
      
      {/* Session Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p>Current Session ID: {currentSession?.id}</p>
        <p>Started: {new Date(currentSession?.startedAt).toLocaleString()}</p>
        <button 
          onClick={handleResetSession}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Start New Session
        </button>
      </div>

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
                onClick={() => handleCategorySelect(row, col)}
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
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mr-4">
                  <button 
                    onClick={() => moveVerseUp(index)}
                    disabled={index === 0}
                    className={`text-sm ${
                      index === 0 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-green-500 hover:text-green-700'
                    }`}
                  >
                    ↑ Move Up
                  </button>
                  <button 
                    onClick={() => moveVerseDown(index)}
                    disabled={index === verses.length - 1}
                    className={`text-sm ${
                      index === verses.length - 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-green-500 hover:text-green-700'
                    }`}
                  >
                    ↓ Move Down
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditVerse(verse)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteVerse(verse.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LumaSystem;
