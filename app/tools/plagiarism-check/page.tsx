'use client';

import { useState } from 'react';
import TextAreaInput from '@/components/ui/TextAreaInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, RotateCcw } from 'lucide-react';

interface PlagiarismResult {
  originalityScore: number;
  totalPhrases: number;
  uniquePhrases: number;
  matchedPhrases: number;
  matches: Array<{
    phrase: string;
    urls: string[];
  }>;
}

export default function PlagiarismCheck() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkPlagiarism = async () => {
    if (!text) {
      setError('Please enter some text to check for plagiarism');
      return;
    }

    if (text.trim().length === 0) {
      setError('Please enter non-empty text to check');
      return;
    }

    if (text.trim().length < 50) {
      setError('Please enter at least 50 characters for meaningful plagiarism detection');
      return;
    }

    if (text.length > 10000) {
      setError('Text exceeds maximum limit. Please keep it under 10,000 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/plagiarism-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check plagiarism');
      }

      setResult(data);
    } catch (error) {
      console.error('Plagiarism check error:', error);
      setError(error instanceof Error ? error.message : 'Failed to check plagiarism');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plagiarism Checker
          </h1>
          <p className="text-lg text-gray-600">
            Check your content for originality and detect potential plagiarism
          </p>
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Enter Your Text</h2>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </button>
              <button
                onClick={checkPlagiarism}
                disabled={loading || !text.trim()}
                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Check Plagiarism
                  </>
                )}
              </button>
            </div>
          </div>
          
          <TextAreaInput
            value={text}
            onChange={setText}
            placeholder="Enter your text here to check for plagiarism. Minimum 50 characters required for meaningful results..."
            rows={10}
          />
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Character count: {text.length} (minimum 50 required)</p>
            <p className="mt-1">Note: This tool checks phrases against web content. Results are estimates and should be used as a reference.</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Originality Score</h3>
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getScoreBackground(result.originalityScore)} text-white mb-4`}>
                  <span className="text-3xl font-bold">{result.originalityScore}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.totalPhrases}</div>
                    <div className="text-sm text-gray-600">Total Phrases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{result.uniquePhrases}</div>
                    <div className="text-sm text-gray-600">Unique</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{result.matchedPhrases}</div>
                    <div className="text-sm text-gray-600">Matched</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            {result.matches.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Potential Matches Found
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  The following phrases were found on other websites. Review them to ensure proper attribution.
                </p>
                
                <div className="space-y-4">
                  {result.matches.map((match, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="mb-3">
                        <h4 className="font-medium text-red-900 mb-2">Matched Phrase:</h4>
                        <p className="bg-white p-3 rounded border text-gray-800">
                          "{match.phrase}"
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-red-900 mb-2">Found on:</h5>
                        <div className="space-y-2">
                          {match.urls.slice(0, 3).map((url, urlIndex) => (
                            <a
                              key={urlIndex}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                            </a>
                          ))}
                          {match.urls.length > 3 && (
                            <p className="text-sm text-gray-600">
                              ...and {match.urls.length - 3} more sources
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Excellent!</h4>
                  <p className="text-gray-600">No potential plagiarism detected in your text.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Usage Information */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-3">How Plagiarism Detection Works</h3>
          <ul className="space-y-2 text-purple-800 text-sm">
            <li>• Your text is broken into phrases and checked against web content</li>
            <li>• The originality score shows the percentage of unique content</li>
            <li>• Matched phrases are highlighted with their potential sources</li>
            <li>• Use this as a reference tool - always verify results manually</li>
            <li>• Consider proper citations for any matched content you use legitimately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}