export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About SEO Tools</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Welcome to SEO Tools, your comprehensive suite of content optimization and analysis tools. We provide a range of features to help content creators, writers, and SEO professionals enhance their content quality and online visibility.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to make professional content optimization tools accessible to everyone. We believe in empowering creators with the tools they need to produce high-quality, error-free content that ranks well in search engines.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Tools</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Grammar Checker - Advanced grammar and spell checking</li>
            <li>Plagiarism Detector - Ensure content originality</li>
            <li>Word Counter - Track your content length</li>
            <li>Case Converter - Transform text case easily</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Free to use</li>
            <li>No registration required</li>
            <li>User-friendly interface</li>
            <li>Regular updates and improvements</li>
            <li>Privacy-focused approach</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
