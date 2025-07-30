import { Metadata } from 'next';
import ToolCard from '@/components/ui/ToolCard';
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  Type 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free SEO Tools - Word Counter, Grammar Checker & More',
  description: 'Comprehensive collection of free SEO tools to optimize your content. Word counter, grammar checker, plagiarism detector, and case converter.',
};

const tools = [
  {
    title: 'Word & Character Counter',
    description: 'Count words, characters, and paragraphs in your text instantly. Perfect for content optimization and meeting word count requirements.',
    href: '/tools/word-counter',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    features: ['Real-time counting', 'Character & word limits', 'Paragraph analysis']
  },
  {
    title: 'Grammar & Spell Checker',
    description: 'Detect grammar errors, spelling mistakes, and improve your writing quality with AI-powered suggestions.',
    href: '/tools/grammar-check',
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
    features: ['AI-powered checking', 'Grammar suggestions', 'Spell correction']
  },
  {
    title: 'Plagiarism Checker',
    description: 'Check your content for originality and detect potential plagiarism across billions of web pages.',
    href: '/tools/plagiarism-check',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    features: ['Web-wide scanning', 'Originality score', 'Source detection']
  },
  {
    title: 'Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, and sentence case instantly.',
    href: '/tools/case-converter',
    icon: Type,
    color: 'from-orange-500 to-orange-600',
    features: ['Multiple case formats', 'Instant conversion', 'Copy to clipboard']
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SEO Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Enhance your content quality with our comprehensive suite of free SEO tools. 
          From word counting to plagiarism detection, we've got everything you need to optimize your content.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">✨ Free Forever</span>
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">🚀 Instant Results</span>
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">🔒 Privacy Focused</span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our SEO Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Get instant results with our optimized algorithms and real-time processing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-4">🎯</div>
            <h3 className="font-semibold mb-2">Accurate Results</h3>
            <p className="text-gray-600 text-sm">Powered by advanced AI and comprehensive databases for maximum accuracy.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-4">🔐</div>
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600 text-sm">Your content is processed securely and never stored on our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}