import {
  Sparkles,
  TrendingUp,
  Activity,
  Globe,
  LineChart,
  Newspaper,
} from "lucide-react";
import { Logo } from "./Logo";

interface WelcomeScreenProps {
  onQuestionClick: (question: string, scenario?: { title: string; icon: string }) => void;
}

export function WelcomeScreen({
  onQuestionClick,
}: WelcomeScreenProps) {
  const categoryCards = [
    {
      icon: TrendingUp,
      iconName: "TrendingUp",
      title: "选股票",
      description: "帮你筛选符合条件的优质股票",
      color: "from-[#0D3A66] to-[#0A2F54]",
      sample: "帮我选一些市盈率低于15倍的蓝筹股",
    },
    {
      icon: Activity,
      iconName: "Activity",
      title: "诊股票",
      description: "深度分析个股基本面和技术面",
      color: "from-[#2A7FF0] to-[#0D3A66]",
      sample: "帮我分析一下腾讯控股(0700.HK)的投资价值",
    },
    {
      icon: Globe,
      iconName: "Globe",
      title: "看宏观",
      description: "了解宏观经济对市场的影响",
      color: "from-[#0A2F54] to-[#0D3A66]",
      sample: "美联储加息对港股市场有什么影响？",
    },
    {
      icon: LineChart,
      iconName: "LineChart",
      title: "看大势",
      description: "把握市场整体趋势和板块轮动",
      color: "from-[#0D3A66] to-[#2A7FF0]",
      sample: "当前恒生指数的技术走势如何？",
    },
    {
      icon: Newspaper,
      iconName: "Newspaper",
      title: "读新闻",
      description: "解读重要财经新闻和公告",
      color: "from-[#0A2F54] to-[#0A2F54]",
      sample: "最近港股市场有哪些重要新闻？",
    },
  ];

  return (
    <div className="h-full flex items-start justify-center px-8 py-4">
      <div className="max-w-5xl w-full">
        {/* Assistant Logo - 48px */}
        <div className="flex justify-center mb-6">
          <Logo size={48} variant="icon" />
        </div>

        {/* Product Name */}
        <h1 className="text-[#0A0F16] mb-4 text-3xl text-center">
          港股市场信息助手
        </h1>

        {/* Welcome Text */}
        <p className="text-[#A3A8B1] text-lg max-w-2xl mx-auto leading-relaxed text-center mb-10">
          我可以帮你分析股票、了解市场动态、解读宏观趋势。请选择你感兴趣的话题，或直接提问。
        </p>

        {/* Quick Access Modules - Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categoryCards.map((item, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(item.sample, { title: item.title, icon: item.iconName })}
              className="group bg-[#ECEFF3] border-2 border-[#D5D9DE] rounded-2xl p-6 text-left hover:border-[#0D3A66] hover:shadow-lg transition-all"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-sm`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#0A0F16] mb-2 font-medium">
                {item.title}
              </h3>
              <p className="text-sm text-[#A3A8B1] mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="text-xs text-[#2A7FF0] bg-[#2A7FF0]/5 px-3 py-2 rounded-lg border border-[#2A7FF0]/10">
                示例：{item.sample}
              </div>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-sm text-[#A3A8B1]">
          ⚠️ 本助手仅提供信息查询服务，不构成投资建议
        </div>
      </div>
    </div>
  );
}