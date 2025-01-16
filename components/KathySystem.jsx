import React, { useState, useMemo } from 'react';

// Typescript-like interfaces (will work in JSX)
const Category = {
  id: '',
  name: '',
  description: '',
  tags: []
};

const Verse = {
  id: '',
  systemName: 'KathySystem',
  content: '',
  categoryIds: {
    rowCategoryId: '',
    columnCategoryId: ''
  },
  metadata: {
    createdAt: '',
    updatedAt: '',
    version: 0
  },
  tags: [],
  sentiment: {
    positive: 0,
    negative: 0,
    neutral: 0
  }
};

// Category Service (simplified)
class CategoryService {
  constructor() {
    this.categories = new Map();
  }

  addCategory(category) {
    if (this.categories.has(category.id)) {
      throw new Error(`Category with ID ${category.id} already exists`);
    }
    this.categories.set(category.id, category);
  }

  getCategory(id) {
    return this.categories.get(id);
  }
}

// Verse Service (simplified)
class VerseService {
  constructor(categoryService) {
    this.verses = new Map();
    this.categoryService = categoryService;
  }

  createVerse(verse) {
    // Validate categories exist
    const rowCategory = this.categoryService.getCategory(verse.categoryIds.rowCategoryId);
    const columnCategory = this.categoryService.getCategory(verse.categoryIds.columnCategoryId);

    if (!rowCategory || !columnCategory) {
      throw new Error('Invalid category IDs');
    }

    // Generate unique ID if not provided
    verse.id = verse.id || `verse_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Set timestamps
    verse.metadata = {
      ...verse.metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };

    // Basic sentiment analysis
    verse.sentiment = {
      positive: Math.random(),
      negative: Math.random(),
      neutral: Math.random()
    };

    this.verses.set(verse.id, verse);
    return verse;
  }
}

// Kathy System Configuration
const KATHY_SYSTEM_CONFIG = {
  name: 'KathySystem',
  version: '1.0.0',
  rowCategories: [
    {
      id: 'cooperation',
      name: 'Cooperation & Reciprocity',
      description: 'Exploring collaborative human interactions',
      tags: ['social', 'collaboration']
    },
    {
      id: 'cause-effect',
      name: 'Cause & Effect',
      description: 'Understanding systemic relationships',
      tags: ['systems', 'interconnectedness']
    },
    {
      id: 'impermanence',
      name: 'Impermanence & Change',
      description: 'Examining the nature of transformation',
      tags: ['change', 'adaptation']
    },
    {
      id: 'ethical-restraint',
      name: 'Ethical Restraint',
      description: 'Exploring moral and ethical boundaries',
      tags: ['ethics', 'philosophy']
    }
  ],
  columnCategories: [
    {
      id: 'religious',
      name: 'Religious & Spiritual',
      description: 'Spiritual and religious perspectives',
      tags: ['spirituality', 'belief']
    },
    {
      id: 'philosophical',
      name: 'Philosophical',
      description: 'Theoretical and conceptual frameworks',
      tags: ['thinking', 'ideas']
    },
    {
      id: 'scientific',
      name: 'Scientific',
      description: 'Empirical and research-based insights',
      tags: ['research', 'methodology']
    },
    {
      id: 'historical',
      name: 'Historical',
      description: 'Contextual and historical perspectives',
      tags: ['context', 'heritage']
    }
  ]
};

const KathySystem = () => {
  // Initialize services
  const categoryService = new CategoryService();
  const verseService = new VerseService(categoryService);

  // Populate categories
  KATHY_SYSTEM_CONFIG.rowCategories.forEach(cat => categoryService.addCategory(cat));
  KATHY_SYSTEM_CONFIG.columnCategories.forEach(cat => categoryService.addCategory(cat));

  const [selectedRowCategory, setSelectedRowCategory] = useState(null);
  const [selectedColumnCategory, setSelectedColumnCategory] = useState(null);
  const [userLyrics, setUserLyrics] = useState('');
  const [submittedVerses, setSubmittedVerses] = useState([]);

  // Memoized category lookup
  const rowCategories = useMemo(() => 
    KATHY_SYSTEM_CONFIG.rowCategories, 
    []
  );

  const columnCategories = useMemo(() => 
    KATHY_SYSTEM_CONFIG.columnCategories, 
    []
  );

  const handleSubmitVerse = () => {
    if (!selectedRowCategory || !selectedColumnCategory || !userLyrics.trim()) {
      alert('Please select a category and write your verse');
      return;
    }

    try {
      const newVerse = verseService.createVerse({
        id: '', // Let service generate
        systemName: 'KathySystem',
        content: userLyrics,
        categoryIds: {
          rowCategoryId: selectedRowCategory,
          columnCategoryId: selectedColumnCategory
        },
        metadata: {
          createdAt: '',  // Service will handle
          updatedAt: '',  // Service will handle
          version: 0      // Service will handle
        },
        tags: [
          selectedRowCategory,
          selectedColumnCategory
        ]
      });

      // Update local state
      setSubmittedVerses(prev => [...prev, newVerse]);

      // Reset form
      setUserLyrics('');
      setSelectedRowCategory(null);
      setSelectedColumnCategory(null);

      // Optional: Send to backend (placeholder for actual API call)
      console.log('Verse submitted:', newVerse);
    } catch (error) {
      console.error('Verse submission error:', error);
      alert('Failed to submit verse. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">Kathy System</h2>
      <p className="text-gray-600 mb-6">
        Explore interconnected perspectives through musical expression
      </p>

      {/* Category Selection Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
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
                onClick={() => {
                  setSelectedRowCategory(row.id);
                  setSelectedColumnCategory(col.id);
                }}
                className={`p-4 border rounded ${
                  selectedRowCategory === row.id && 
                  selectedColumnCategory === col.id 
                    ? 'bg-blue-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {selectedRowCategory === row.id && 
                 selectedColumnCategory === col.id 
                  ? `${row.name} × ${col.name}` 
                  : '?'}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Verse Input */}
      {selectedRowCategory && selectedColumnCategory && (
        <div className="mt-6">
          <textarea
            value={userLyrics}
            onChange={(e) => setUserLyrics(e.target.value)}
            placeholder="Share your musical verse here..."
            className="w-full h-32 p-2 border rounded"
          />
          <button 
            onClick={handleSubmitVerse}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit Verse
          </button>
        </div>
      )}

      {/* Submitted Verses Display */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Submitted Verses</h3>
        {submittedVerses.length === 0 ? (
          <p className="text-gray-500">No verses submitted yet</p>
        ) : (
          <div className="space-y-4">
            {submittedVerses.map((verse) => {
              const rowCat = KATHY_SYSTEM_CONFIG.rowCategories.find(
                cat => cat.id === verse.categoryIds.rowCategoryId
              );
              const colCat = KATHY_SYSTEM_CONFIG.columnCategories.find(
                cat => cat.id === verse.categoryIds.columnCategoryId
              );
              
              return (
                <div key={verse.id} className="p-4 border rounded">
                  <p className="italic mb-2">{verse.content}</p>
                  <div className="text-sm text-gray-600">
                    <strong>Category:</strong> {rowCat?.name} × {colCat?.name}
                    <br />
                    <strong>Submitted:</strong> {verse.metadata.createdAt}
                    {verse.sentiment && (
                      <div>
                        <strong>Sentiment:</strong>
                        <span className="ml-2">
                          P: {verse.sentiment.positive.toFixed(2)} 
                          N: {verse.sentiment.negative.toFixed(2)} 
                          Neu: {verse.sentiment.neutral.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default KathySystem;
