'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import TextAreaInput from '@/components/ui/TextAreaInput';
import { FileText, Type, Hash, RotateCcw } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      
      // Word count - split by whitespace and filter out empty strings
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(word => word.length > 0).length;
      
      // Sentence count - split by sentence endings
      const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      
      // Paragraph count - split by line breaks
      const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs
      });
    };

    calculateStats();
  }, [text]);

  const handleClear = () => {
    setText('');
  };

  const statCards = [
    { label: 'Characters', value: stats.characters, icon: Type, color: 'text-blue-600' },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, icon: Hash, color: 'text-green-600' },
    { label: 'Words', value: stats.words, icon: FileText, color: 'text-purple-600' },
    { label: 'Sentences', value: stats.sentences, icon: Type, color: 'text-orange-600' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: Hash, color: 'text-red-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Word & Character Counter
          </h1>
          <p className="text-lg text-gray-600">
            Count words, characters, sentences, and paragraphs in your text instantly
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Enter Your Text</h2>
            <button
              onClick={handleClear}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </button>
          </div>
          
          <TextAreaInput
            value={text}
            onChange={setText}
            placeholder="Start typing or paste your text here to get instant word and character counts..."
            rows={12}
          />
          
          <div className="mt-4 text-sm text-gray-500">
            Tip: This tool counts words by splitting on whitespace and ignores extra spaces between words.
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">How to Use the Word Counter</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Type or paste your text in the text area above</li>
            <li>• Watch the counters update in real-time as you type</li>
            <li>• Use the Clear button to reset and start over</li>
            <li>• Perfect for essays, articles, social media posts, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
}