// import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const SongContext = createContext(null);

// Provider component
export function SongProvider({ children }) {
  const [currentSession, setCurrentSession] = useState(null);
  const [verses, setVerses] = useState([]);

  // Unique session ID generator
  const generateSessionId = () => {
    return `fairplay_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Load session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('currentFairplaySongSession');
    const savedVerses = localStorage.getItem('fairplaySongVerses');

    if (savedSession && savedVerses) {
      setCurrentSession(JSON.parse(savedSession));
      setVerses(JSON.parse(savedVerses));
    } else {
      const newSession = {
        id: generateSessionId(),
        startedAt: new Date().toISOString()
      };
      setCurrentSession(newSession);
      localStorage.setItem('currentFairplaySongSession', JSON.stringify(newSession));
    }
  }, []);

  // Save verses to localStorage whenever they change
  useEffect(() => {
    if (verses.length > 0) {
      localStorage.setItem('fairplaySongVerses', JSON.stringify(verses));
    }
  }, [verses]);

  // Add verse
  const addVerse = (verse) => {
    if (!verse.content || !verse.category) {
      console.error('Invalid verse submission');
      return null;
    }
    
    const newVerse = {
      ...verse,
      id: `verse_${Date.now()}`,
      timestamp: new Date().toISOString(),
      sessionId: currentSession.id
    };
    setVerses(prev => [...prev, newVerse]);
    return newVerse;
  };

  // Update verse
  const updateVerse = (verseId, updatedVerse) => {
    setVerses(prev => 
      prev.map(verse => 
        verse.id === verseId 
          ? { ...verse, ...updatedVerse } 
          : verse
      )
    );
  };

  // Delete verse
  const deleteVerse = (verseId) => {
    setVerses(prev => prev.filter(verse => verse.id !== verseId));
  };

  // Reorder verses
  const moveVerse = (fromIndex, toIndex) => {
    const reorderedVerses = Array.from(verses);
    const [removed] = reorderedVerses.splice(fromIndex, 1);
    reorderedVerses.splice(toIndex, 0, removed);
    setVerses(reorderedVerses);
  };

  // Reset session
  const resetSession = () => {
    const newSession = {
      id: generateSessionId(),
      startedAt: new Date().toISOString()
    };
    setCurrentSession(newSession);
    setVerses([]);
    localStorage.removeItem('fairplaySongVerses');
    localStorage.setItem('currentFairplaySongSession', JSON.stringify(newSession));
  };

  return (
    <SongContext.Provider value={{
      currentSession,
      verses,
      addVerse,
      updateVerse,
      deleteVerse,
      moveVerse,
      resetSession
    }}>
      {children}
    </SongContext.Provider>
  );
}

// Custom hook for using the song context
export function useSongContext() {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongContext must be used within a SongProvider');
  }
  return context;
}
