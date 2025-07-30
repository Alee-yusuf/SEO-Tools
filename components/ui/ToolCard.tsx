import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export default function ToolCard({ title, description, href, icon: Icon, color, features }: ToolCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-500">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Try it now
          </span>
          <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}