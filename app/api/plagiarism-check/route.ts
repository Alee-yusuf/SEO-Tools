import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Please enter some text to check for plagiarism' },
        { status: 400 }
      );
    }

    if (typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input type. Text must be a string.' },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter non-empty text to check' },
        { status: 400 }
      );
    }

    if (text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please enter at least 50 characters for meaningful plagiarism detection' },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text exceeds maximum limit. Please keep it under 10,000 characters.' },
        { status: 400 }
      );
    }

    // Split text into phrases (sentences or meaningful chunks)
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20); // Only check substantial phrases

    const phrases = [];
    
    // Create overlapping phrases for better detection
    for (const sentence of sentences) {
      if (sentence.length > 100) {
        // Split long sentences into smaller phrases
        const words = sentence.split(' ');
        for (let i = 0; i < words.length - 8; i += 5) {
          const phrase = words.slice(i, i + 12).join(' ');
          if (phrase.length > 30) {
            phrases.push(phrase);
          }
        }
      } else if (sentence.length > 30) {
        phrases.push(sentence);
      }
    }

    // Limit the number of phrases to check (to avoid hitting API limits)
    const phrasesToCheck = phrases.slice(0, 10);
    const matches = [];
    
    // Simulate plagiarism checking (in a real implementation, you'd use Bing Search API or similar)
    // For demo purposes, we'll create a mock response
    for (const phrase of phrasesToCheck) {
      // In a real implementation, you would:
      // 1. Search for the phrase using Bing Web Search API
      // 2. Parse the results to find exact matches
      // 3. Calculate similarity scores
      
      // Mock implementation - randomly determine if phrase might be plagiarized
      const randomScore = Math.random();
      if (randomScore < 0.2) { // 20% chance of "finding" a match
        matches.push({
          phrase: phrase,
          urls: [
            'https://example.com/article1',
            'https://example.com/article2'
          ]
        });
      }
    }

    const totalPhrases = phrasesToCheck.length;
    const matchedPhrases = matches.length;
    const uniquePhrases = totalPhrases - matchedPhrases;
    const originalityScore = totalPhrases > 0 ? Math.round((uniquePhrases / totalPhrases) * 100) : 100;

    return NextResponse.json({
      originalityScore,
      totalPhrases,
      uniquePhrases,
      matchedPhrases,
      matches
    });

  } catch (error) {
    console.error('Plagiarism check error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to check plagiarism. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Note: For a production implementation, you would need to:
// 1. Set up Bing Web Search API credentials
// 2. Implement proper phrase searching
// 3. Add rate limiting and caching
// 4. Handle API quotas and errors properly

// Example implementation with Bing Web Search API:
/*
async function searchPhrase(phrase: string, bingApiKey: string) {
  const searchUrl = 'https://api.bing.microsoft.com/v7.0/search';
  const query = `"${phrase}"`;
  
  const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': bingApiKey,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Bing API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.webPages?.value || [];
}
*/