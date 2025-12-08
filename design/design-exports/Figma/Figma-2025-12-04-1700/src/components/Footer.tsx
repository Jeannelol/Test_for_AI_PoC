import { Building2, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const resources = [
    { name: "HKEX Official", url: "#" },
    { name: "SFC Website", url: "#" },
    { name: "Market Data", url: "#" },
    { name: "Listing Rules", url: "#" }
  ];

  const topics = [
    "Company Searches",
    "IPO Calendar",
    "Market Statistics",
    "Regulatory Updates"
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-red-500" />
              <span className="text-white">HK Market Q&A</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for objective Hong Kong market information and analysis.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>info@hkmarketqa.com</span>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">
              Quick Topics
            </h4>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">
              Official Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1">
                    {resource.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>
            © 2025 Hong Kong Market Q&A Assistant. Information only - not investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
