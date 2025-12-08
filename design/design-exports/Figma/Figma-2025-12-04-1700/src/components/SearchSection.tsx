import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export function SearchSection() {
  const [query, setQuery] = useState("");

  const sampleQuestions = [
    "What are the listing requirements for the Main Board?",
    "How does the closing auction work in HKEX?",
    "What is a red chip company?",
    "Explain the IPO application process"
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="mb-4">
            Ask About Hong Kong Markets
          </h2>
          <p className="text-gray-600">
            Get instant answers about market rules, company information, and trading mechanisms
          </p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about Hong Kong markets..."
            className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none text-gray-900 placeholder-gray-400"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-gray-600 text-center">Try asking:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setQuery(question)}
                className="text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-red-700">
                    {question}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
