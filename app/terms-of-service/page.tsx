export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: July 30, 2025
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Terms</h2>
          <p className="text-gray-600 mb-6">
            By accessing our website and using our services, you agree to be bound by these Terms of Service and comply with all applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Use License</h2>
          <p className="text-gray-600 mb-6">
            Our tools are provided free of charge for personal and commercial use, subject to fair usage policies. You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to bypass any rate limits or restrictions</li>
            <li>Redistribute or sell access to our services</li>
            <li>Modify or tamper with our services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-gray-600 mb-6">
            Our services are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all warranties including accuracy of results.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Limitations</h2>
          <p className="text-gray-600 mb-6">
            We shall not be held liable for any damages arising from the use of our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Revisions</h2>
          <p className="text-gray-600 mb-6">
            We reserve the right to update or revise these terms at any time. Continued use of our services constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  );
}
