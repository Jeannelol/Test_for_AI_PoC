import { Building, FileText, TrendingUp, BarChart3, Shield, BookOpen } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Building,
      title: "Company Information",
      description: "Access comprehensive data on listed companies, including business profiles, financial highlights, and corporate structure.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: FileText,
      title: "IPO Rules & Regulations",
      description: "Detailed explanations of listing requirements, IPO processes, sponsor obligations, and regulatory frameworks.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Market Mechanisms",
      description: "Understanding of trading hours, order types, settlement processes, circuit breakers, and market infrastructure.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: BarChart3,
      title: "Objective Analysis",
      description: "Fact-based information analysis, market statistics, and historical data without subjective recommendations.",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Information on SFC regulations, disclosure requirements, corporate governance standards, and compliance guidelines.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Learn about Hong Kong market terminology, indices, sector classifications, and trading practices.",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Comprehensive Market Knowledge
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access reliable, objective information about Hong Kong's financial markets, 
            regulations, and listed companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
