// pages/api/submitVerse.js
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
const verses = [];

export default async function handler(req, res) {
  // Enable CORS for all routes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Validate incoming request
    const { 
      systemName, 
      content, 
      categoryIds, 
      tags 
    } = req.body;

    // Basic input validation
    if (!systemName || !content || !categoryIds) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          systemName: !!systemName,
          content: !!content,
          categoryIds: !!categoryIds
        }
      });
    }

    // Validate content length
    if (content.length > 1000) {
      return res.status(400).json({ 
        error: 'Verse content too long',
        maxLength: 1000,
        currentLength: content.length
      });
    }

    // Prepare verse object
    const newVerse = {
      id: uuidv4(), // Generate unique ID
      systemName,
      content,
      categoryIds: {
        rowCategoryId: categoryIds.rowCategoryId,
        columnCategoryId: categoryIds.columnCategoryId
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      },
      tags: tags || [],
      // Basic sentiment analysis (placeholder)
      sentiment: {
        positive: Math.random(),
        negative: Math.random(),
        neutral: Math.random()
      }
    };

    // In-memory storage (replace with database in production)
    verses.push(newVerse);

    // Optional: Log verse (replace with proper logging in production)
    console.log('Verse submitted:', newVerse);

    // Successful response
    res.status(201).json({
      message: 'Verse submitted successfully',
      verse: newVerse
    });
  } catch (error) {
    // Error handling
    console.error('Verse submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit verse',
      details: error.message 
    });
  }
}

// Optional: Export verses for potential future use or debugging
export { verses };
