import React, { useState } from 'react';

const LumaSystem = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [userLyrics, setUserLyrics] = useState('');
  
  const rowMeanings = [
    'Misinformation & Polarization',
    'Economic Disparities',
    'Environmental Degradation',
    'Health Crises',
    'Political Conflicts & Instability'
  ];
  
  const colMeanings = [
    'Media Literacy',
    'Growth',
    'Stewardship',
    'Well-Being',
    'Governance'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">Luma System</h2>
      <p className="text-gray-600 mb-6">Explore global challenges through collaborative musical expression</p>
      
      {/* Grid */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1"></div>
        {colMeanings.map((meaning, i) => (
          <div key={i} className="font-semibold text-center">{meaning}</div>
        ))}
        
        {rowMeanings.map((row, i) => (
          <React.Fragment key={i}>
            <div className="font-semibold">{row}</div>
            {colMeanings.map((_, j) => (
              <button
                key={j}
                onClick={() => setSelectedCard({ row: i, col: j })}
                className="p-4 border rounded hover:bg-gray-50"
              >
                {selectedCard?.row === i && selectedCard?.col === j ? 
                  `${row} × ${colMeanings[j]}` : '?'}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Input area */}
      {selectedCard && (
        <div className="mt-6">
          <textarea
            value={userLyrics}
            onChange={(e) => setUserLyrics(e.target.value)}
            placeholder="Share your musical verse here..."
            className="w-full h-32 p-2 border rounded"
          />
          <button 
            onClick={() => {
              setUserLyrics('');
              setSelectedCard(null);
            }}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit Verse
          </button>
        </div>
      )}
    </div>
  );
};

export default LumaSystem;
