// src/components/song/VerseEditor.tsx
import React, { useState, useEffect } from 'react';
import { useSong } from '../../contexts/SongContext';
import { validateVerse } from '../../lib/utils';

interface VerseEditorProps {
  verseIndex: number;
  initialContent?: string;
  onSave: (content: string) => void;
}

const VerseEditor: React.FC<VerseEditorProps> = ({
  verseIndex,
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');
  const { currentSong } = useSong();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error && validateVerse(e.target.value)) {
      setError('');
    }
  };

  const handleSave = () => {
    if (!validateVerse(content)) {
      setError('Verse must be between 15 and 250 characters');
      return;
    }
    onSave(content);
  };

  return (
    <div className="space-y-4">
      <div>
        <label 
          htmlFor={`verse-${verseIndex}`}
          className="block text-sm font-medium text-gray-700"
        >
          Verse {verseIndex + 1}
        </label>
        <textarea
          id={`verse-${verseIndex}`}
          value={content}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your verse..."
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Save Verse
        </button>
      </div>
    </div>
  );
};

export default VerseEditor;

// src/components/song/SongDisplay.tsx
import React from 'react';
import { useSong } from '../../contexts/SongContext';
import { formatTimestamp } from '../../lib/utils';

interface SongDisplayProps {
  readOnly?: boolean;
  onVerseClick?: (verseIndex: number) => void;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ 
  readOnly = false,
  onVerseClick
}) => {
  const { currentSong } = useSong();

  if (!currentSong) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No song selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {currentSong.verses.map((verse, index) => (
        <div 
          key={verse.id}
          className={`p-4 rounded-lg bg-white shadow ${
            !readOnly && 'cursor-pointer hover:shadow-md'
          }`}
          onClick={() => !readOnly && onVerseClick?.(index)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">Verse {index + 1}</h3>
            <span className="text-sm text-gray-500">
              {formatTimestamp(verse.timestamp)}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{verse.content}</p>
        </div>
      ))}
    </div>
  );
};

export default SongDisplay;

// src/components/song/CollaborationTools.tsx
import React, { useState } from 'react';
import { useSong } from '../../contexts/SongContext';

interface CollaborationToolsProps {
  onInvite: (email: string) => void;
}

const CollaborationTools: React.FC<CollaborationToolsProps> = ({ onInvite }) => {
  const [email, setEmail] = useState('');
  const { currentSong } = useSong();

  const handleInvite = () => {
    if (email) {
      onInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="border-t mt-6 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Collaboration Tools
      </h3>
      <div className="flex space-x-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter collaborator's email"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          onClick={handleInvite}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Invite
        </button>
      </div>
      {currentSong?.collaborators.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Current Collaborators
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentSong.collaborators.map((userId) => (
              <span
                key={userId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {userId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationTools;
