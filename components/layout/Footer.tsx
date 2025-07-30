import Link from 'next/link';
import { Search, Heart } from 'lucide-react';

export default function Footer() {
  const toolLinks = [
    { name: 'Word Counter', href: '/tools/word-counter' },
    { name: 'Grammar Check', href: '/tools/grammar-check' },
    { name: 'Plagiarism Check', href: '/tools/plagiarism-check' },
    { name: 'Case Converter', href: '/tools/case-converter' },
  ];

  const resourceLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SEO Tools</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-4">
              Professional SEO tools to help you create better content. Free, fast, and reliable tools for writers, marketers, and content creators.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for content creators</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            © 2025 SEO Tools. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <span>Privacy-focused</span>
            <span>No data stored</span>
            <span>Open source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}