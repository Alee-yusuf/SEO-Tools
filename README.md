# SEO Tools MVP

A comprehensive Next.js 14 application featuring multiple SEO tools including Word Counter, Grammar Checker, Plagiarism Checker, and Case Converter.

## Features

### 🔤 Word & Character Counter
- Real-time word and character counting
- Sentence and paragraph analysis
- Smart space handling
- Export-ready statistics

### ✅ Grammar & Spell Checker
- AI-powered grammar checking using LanguageTool API
- Real-time error detection
- Contextual suggestions
- One-click corrections

### 🛡️ Plagiarism Checker
- Content originality scoring
- Web-based plagiarism detection
- Source identification
- Comprehensive reporting

### 🔄 Case Converter
- Multiple case formats (uppercase, lowercase, title case, etc.)
- Programming-friendly formats (camelCase, snake_case, kebab-case)
- One-click copy to clipboard
- Real-time conversion

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **APIs**: LanguageTool, Bing Web Search (optional)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd seo-tools-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API keys (optional for basic functionality):
   - LanguageTool API key (for enhanced grammar checking)
   - Bing Search API key (for plagiarism detection)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── grammar-check/   # Grammar checking endpoint
│   │   └── plagiarism-check/# Plagiarism checking endpoint
│   ├── tools/               # Tool pages
│   │   ├── word-counter/
│   │   ├── grammar-check/
│   │   ├── plagiarism-check/
│   │   └── case-converter/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Homepage
├── components/
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                 # UI components
│       ├── ToolCard.tsx
│       ├── TextAreaInput.tsx
│       └── LoadingSpinner.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## API Configuration

### Grammar Checker
The grammar checker uses LanguageTool's free public API by default. For production use or higher rate limits, you can:

1. Sign up for a LanguageTool API key
2. Add it to your `.env.local` file
3. Update the API route to use authentication

### Plagiarism Checker
The plagiarism checker includes a mock implementation. For production use:

1. Sign up for Bing Web Search API
2. Add your API key to `.env.local`
3. Uncomment the real implementation in the API route

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Features & Roadmap

### ✅ Completed
- [x] Responsive design
- [x] Word & character counting
- [x] Grammar checking integration
- [x] Case conversion tools
- [x] Basic plagiarism detection
- [x] SEO-optimized pages
- [x] Error handling & loading states

### 🔄 In Progress
- [ ] Enhanced plagiarism detection
- [ ] User analytics
- [ ] Additional SEO tools

### 📋 Planned
- [ ] Dark mode
- [ ] User accounts & history
- [ ] API rate limiting
- [ ] Batch processing
- [ ] Export functionality
- [ ] Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API documentation

## Acknowledgments

- [LanguageTool](https://languagetool.org/) for grammar checking
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Next.js](https://nextjs.org/) for the framework