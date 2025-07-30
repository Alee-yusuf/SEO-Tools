'use client';

import { useState } from 'react';
import TextAreaInput from '@/components/ui/TextAreaInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

interface GrammarIssue {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: Array<{ value: string }>;
  rule: {
    category: { name: string };
    description: string;
  };
}

export default function GrammarCheck() {
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const checkGrammar = async () => {
    if (!text) {
      setError('Please enter some text to check');
      return;
    }

    if (text.trim().length === 0) {
      setError('Please enter non-empty text to check');
      return;
    }

    if (text.length > 20000) {
      setError('Text exceeds maximum limit. Please keep it under 20,000 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setHasChecked(false);

    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check grammar');
      }

      setIssues(data.matches || []);
      setHasChecked(true);
    } catch (error) {
      console.error('Grammar check error:', error);
      setError(error instanceof Error ? error.message : 'Failed to check grammar');
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (issue: GrammarIssue, replacement: string) => {
    const newText = 
      text.substring(0, issue.offset) + 
      replacement + 
      text.substring(issue.offset + issue.length);
    setText(newText);
    
    // Remove this issue from the list
    setIssues(issues.filter(i => i !== issue));
  };

  const handleClear = () => {
    setText('');
    setIssues([]);
    setError('');
    setHasChecked(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grammar & Spell Checker
          </h1>
          <p className="text-lg text-gray-600">
            Detect grammar errors and spelling mistakes with AI-powered suggestions
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
                onClick={checkGrammar}
                disabled={loading || !text.trim()}
                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Checking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check Grammar
                  </>
                )}
              </button>
            </div>
          </div>
          
          <TextAreaInput
            value={text}
            onChange={setText}
            placeholder="Enter your text here to check for grammar and spelling errors..."
            rows={10}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {hasChecked && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Grammar Check Results
            </h3>
            
            {issues.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Great job!</h4>
                <p className="text-gray-600">No grammar or spelling issues found in your text.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Found {issues.length} issue{issues.length !== 1 ? 's' : ''} that could be improved:
                </p>
                
                {issues.map((issue, index) => (
                  <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-orange-900">{issue.rule.category.name}</h4>
                        <p className="text-sm text-orange-700 mt-1">{issue.message}</p>
                      </div>
                      <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                    </div>
                    
                    <div className="bg-white rounded-md p-3 mb-3">
                      <p className="text-sm text-gray-600 mb-2">Problematic text:</p>
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        {text.substring(issue.offset, issue.offset + issue.length)}
                      </code>
                    </div>
                    
                    {issue.replacements.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {issue.replacements.slice(0, 3).map((replacement, idx) => (
                            <button
                              key={idx}
                              onClick={() => applySuggestion(issue, replacement.value)}
                              className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm transition-colors"
                            >
                              "{replacement.value}"
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3">Tips for Better Grammar Checking</h3>
          <ul className="space-y-2 text-green-800 text-sm">
            <li>• Write complete sentences for more accurate results</li>
            <li>• Check longer texts in smaller chunks for better performance</li>
            <li>• Review suggestions carefully - not all may be appropriate for your context</li>
            <li>• Use this tool as a writing aid, not a replacement for proofreading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}