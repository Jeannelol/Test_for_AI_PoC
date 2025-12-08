import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Building2 } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?w=1600&q=80"
          alt="Hong Kong skyline"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
            <Building2 className="w-12 h-12" />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="mb-6">
            Hong Kong Market Q&A Assistant
          </h1>
          <p className="text-xl text-red-50 max-w-3xl mx-auto mb-8">
            Your comprehensive resource for Hong Kong market information, IPO regulations, 
            trading mechanisms, and objective company analysis
          </p>
          
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Information Only - Not Investment Advice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
