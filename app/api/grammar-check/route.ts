import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Please enter some text to check' },
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

    if (text.length > 20000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 20,000 characters allowed.' },
        { status: 400 }
      );
    }

    const API_KEY = '15KaoCELhd9CPdht';
    const response = await fetch(
      `https://api.textgears.com/grammar?text=${encodeURIComponent(text)}&language=en-US&key=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Textgears API error:', errorData);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'API key invalid or expired. Please check your API configuration.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to check grammar. Please try again later.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.response) {
      console.error('Unexpected API response:', data);
      return NextResponse.json(
        { error: 'Unexpected API response format' },
        { status: 500 }
      );
    }
    
    // Transform Textgears response format to match our frontend expectations
    const matches = data.response.errors.map((error: any) => ({
      message: error.better ? `Suggestion: ${error.better.join(', ')}` : error.message,
      shortMessage: error.type,
      offset: error.offset,
      length: error.length,
      replacements: error.better ? error.better.map((suggestion: string) => ({ value: suggestion })) : [],
      rule: {
        category: { name: error.type },
        description: error.message
      }
    }));

    return NextResponse.json({
      matches: matches,
      language: { name: 'English' }
    });

  } catch (error) {
    console.error('Grammar check error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to check grammar. Please try again.' 
      },
      { status: 500 }
    );
  }
}