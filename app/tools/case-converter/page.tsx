'use client';

import { useState } from 'react';
import TextAreaInput from '@/components/ui/TextAreaInput';
import { Type, Copy, Check, RotateCcw } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [activeCase, setActiveCase] = useState('');
  const [copied, setCopied] = useState(false);

  const conversions = [
    {
      id: 'upper',
      label: 'UPPERCASE',
      description: 'Convert all letters to uppercase',
      convert: (text: string) => text.toUpperCase(),
      example: 'HELLO WORLD'
    },
    {
      id: 'lower',
      label: 'lowercase',
      description: 'Convert all letters to lowercase',
      convert: (text: string) => text.toLowerCase(),
      example: 'hello world'
    },
    {
      id: 'title',
      label: 'Title Case',
      description: 'Capitalize the first letter of each word',
      convert: (text: string) => text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      example: 'Hello World'
    },
    {
      id: 'sentence',
      label: 'Sentence case',
      description: 'Capitalize the first letter of each sentence',
      convert: (text: string) => {
        return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (letter) => 
          letter.toUpperCase()
        );
      },
      example: 'Hello world. This is sentence case.'
    },
    {
      id: 'camel',
      label: 'camelCase',
      description: 'Remove spaces and capitalize each word except the first',
      convert: (text: string) => {
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
      },
      example: 'helloWorld'
    },
    {
      id: 'pascal',
      label: 'PascalCase',
      description: 'Remove spaces and capitalize each word',
      convert: (text: string) => {
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
          return word.toUpperCase();
        }).replace(/\s+/g, '');
      },
      example: 'HelloWorld'
    },
    {
      id: 'snake',
      label: 'snake_case',
      description: 'Replace spaces with underscores and use lowercase',
      convert: (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '_');
      },
      example: 'hello_world'
    },
    {
      id: 'kebab',
      label: 'kebab-case',
      description: 'Replace spaces with hyphens and use lowercase',
      convert: (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '-');
      },
      example: 'hello-world'
    }
  ];

  const handleConvert = (conversion: any) => {
    if (!text.trim()) return;
    
    const result = conversion.convert(text);
    setConvertedText(result);
    setActiveCase(conversion.id);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!convertedText) return;
    
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleClear = () => {
    setText('');
    setConvertedText('');
    setActiveCase('');
    setCopied(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Case Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert text between different cases instantly
          </p>
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
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
            placeholder="Enter your text here to convert between different cases..."
            rows={6}
          />
        </div>

        {/* Conversion Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {conversions.map((conversion) => (
            <button
              key={conversion.id}
              onClick={() => handleConvert(conversion)}
              disabled={!text.trim()}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                activeCase === conversion.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50'
              } ${!text.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center mb-2">
                <Type className="h-4 w-4 text-orange-600 mr-2" />
                <span className="font-medium text-gray-900">{conversion.label}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{conversion.description}</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                {conversion.example}
              </code>
            </button>
          ))}
        </div>

        {/* Output */}
        {convertedText && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Converted Text</h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border">
              <textarea
                value={convertedText}
                readOnly
                rows={6}
                className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-900"
              />
            </div>
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-8 bg-orange-50 rounded-lg p-6">
          <h3 className="font-semibold text-orange-900 mb-3">Case Conversion Tips</h3>
          <ul className="space-y-2 text-orange-800 text-sm">
            <li>• <strong>camelCase</strong> - Commonly used in JavaScript variables</li>
            <li>• <strong>PascalCase</strong> - Often used for class names and components</li>
            <li>• <strong>snake_case</strong> - Popular in Python and database fields</li>
            <li>• <strong>kebab-case</strong> - Used in URLs and CSS classes</li>
            <li>• Use the copy button to quickly paste converted text elsewhere</li>
          </ul>
        </div>
      </div>
    </div>
  );
}