import { TrendingUp, DollarSign, AlertTriangle, BarChart3, Globe, Building2 } from "lucide-react";

interface StructuredAnswerCardProps {
  type: "market" | "financial" | "risk" | "industry" | "macro" | "company";
  title: string;
  children: React.ReactNode;
}

const iconMap = {
  market: BarChart3,
  financial: DollarSign,
  risk: AlertTriangle,
  industry: Building2,
  macro: Globe,
  company: TrendingUp,
};

const colorMap = {
  market: {
    bg: "bg-[#F5F5F5]",
    border: "border-[#9E9E9E]/20",
    icon: "bg-[#616161]",
    text: "text-[#424242]"
  },
  financial: {
    bg: "bg-[#F3E5F5]",
    border: "border-[#9C27B0]/20",
    icon: "bg-[#7B1FA2]",
    text: "text-[#4A148C]"
  },
  risk: {
    bg: "bg-[#FFEBEE]",
    border: "border-[#F44336]/20",
    icon: "bg-[#D32F2F]",
    text: "text-[#B71C1C]"
  },
  industry: {
    bg: "bg-[#E8F5E9]",
    border: "border-[#4CAF50]/20",
    icon: "bg-[#388E3C]",
    text: "text-[#1B5E20]"
  },
  macro: {
    bg: "bg-[#E3F2FD]",
    border: "border-[#2196F3]/20",
    icon: "bg-[#1976D2]",
    text: "text-[#0D47A1]"
  },
  company: {
    bg: "bg-[#FFF3E0]",
    border: "border-[#FF9800]/20",
    icon: "bg-[#F57C00]",
    text: "text-[#E65100]"
  }
};

export function StructuredAnswerCard({ type, title, children }: StructuredAnswerCardProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-5 mb-4`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`${colors.icon} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`${colors.text} font-medium`}>{title}</h3>
      </div>
      <div className="text-sm text-[#424242] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

export function StructuredAnswerList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-[#9E9E9E] mt-0.5">•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StructuredAnswerMetric({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#E0E0E0] last:border-0">
      <span className="text-[#757575]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#212121]">{value}</span>
        {change && (
          <span className={`text-xs px-2 py-0.5 rounded ${
            change.startsWith('+') ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFEBEE] text-[#C62828]'
          }`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
