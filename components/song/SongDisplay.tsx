// import React from 'react';
import { formatTimestamp } from '../../lib/utils';

interface Verse {
  id: string;
  content: string;
  authorId: string;
  timestamp: number;
}

interface Song {
  id: string;
  verses: Verse[];
  cellId: string;
  collaborators: string[];
  lastModified: number;
}

interface SongDisplayProps {
  song: Song;
  readOnly?: boolean;
  onVerseClick?: (verseIndex: number) => void;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ 
  song,
  readOnly = false,
  onVerseClick 
}) => {
  if (!song) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No song selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {song.verses.map((verse, index) => (
        <div 
          key={verse.id}
          className={`p-4 rounded-lg bg-white shadow ${
            !readOnly && 'cursor-pointer hover:shadow-md'
          }`}
          onClick={() => !readOnly && onVerseClick?.(index)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900">Verse {index + 1}</h3>
            <span className="text-sm text-gray-500">
              {formatTimestamp(verse.timestamp)}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{verse.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            By: {verse.authorId}
          </div>
        </div>
      ))}
      {song.verses.length < 7 && !readOnly && (
        <div 
          className="p-4 rounded-lg border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-indigo-500"
          onClick={() => onVerseClick?.(song.verses.length)}
        >
          <p className="text-gray-500">Add verse {song.verses.length + 1}</p>
        </div>
      )}
    </div>
  );
};

export default SongDisplay;
