import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Settings, X, TrendingUp, Activity, Globe, LineChart, Newspaper } from "lucide-react";
import { WelcomeScreen } from "./WelcomeScreen";
import { ChatMessage } from "./ChatMessage";
import { ComplianceWarning } from "./ComplianceWarning";
import { UserProfileModal } from "./UserProfileModal";

interface ChatInterfaceProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  conversationId: string | null;
  guestId: string;
  guestNickname: string;
  onUpdateNickname: (newNickname: string) => void;
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Scenario {
  title: string;
  icon: string;
}

const mockConversationMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1-1",
      type: "user",
      content:
        "港股昨日整体市况如何？请按恒指、国指、科指分别总结涨跌幅、成交额和领涨/领跌板块。",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "1-2",
      type: "assistant",
      content: `以下为昨日港股整体市况总结：

📌 指数表现
- 恒生指数（HSI）：-0.8%，成交约 1,015 亿港元，科技与医药拖累
- 国企指数（HSCEI）：-1.1%，金融地产偏弱
- 科技指数（HSTECH）：-1.9%，美团、京东领跌

📌 领涨板块
- 工业
- 能源
- 汽车零部件

📌 领跌板块
- 互联网平台
- 医药
- 消费`,
      timestamp: new Date(Date.now() - 3540000),
    },
  ],
  "2": [
    {
      id: "2-1",
      type: "user",
      content: "阿里巴巴（9988.HK）未来 3–6 个月的走势怎么看？",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2-2",
      type: "assistant",
      content: `阿里巴巴 3–6 个月展望如下：

📌 基本面
- 核心电商恢复中性偏弱
- 云业务进入稳健增长阶段
- 回购强化股东回报

📌 技术面
- 仍处于 80–95 区间震荡
- 若突破 95，有望形成阶段性反弹

📌 催化剂
1. 云业务重回双位数增长
2. 财报改善信号
3. 消费政策提振

总体判断：中性偏积极，以区间震荡为主。`,
      timestamp: new Date(Date.now() - 3540000),
    },
  ],
  "3": [
    {
      id: "3-1",
      type: "user",
      content:
        "截至2024年上半年，恒生指数和港股整体成交情况如何？与主要海外指数相比表现怎样？",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "3-2",
      type: "assistant",
      content: `2024 上半年指数表现对比如下：

📌 港股
- 恒���指数：+4%
- 成交额同比回暖但仍处偏低水平
- 科技板块贡献主要涨幅

📌 与海外指数对比
- 标普500：+14–16%，AI 与科技巨头推动
- 纳指100：+18–20%，受益于 NVIDIA
- 日经225：+12–14%，日元偏弱推动出口股

📌 结论
港股显著跑输美股与日经，但估值更低，仍以事件驱动为主。`,
      timestamp: new Date(Date.now() - 7140000),
    },
  ],
};

export function ChatInterface({
  isSidebarOpen,
  onToggleSidebar,
  conversationId,
  guestId,
  guestNickname,
  onUpdateNickname,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [complianceWarning, setComplianceWarning] = useState<string | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, any> = {
    TrendingUp,
    Activity,
    Globe,
    LineChart,
    Newspaper,
  };

  useEffect(() => {
    if (
      conversationId &&
      mockConversationMessages[conversationId]
    ) {
      setMessages(mockConversationMessages[conversationId]);
      setCurrentScenario(null);
    } else {
      setMessages([]);
      setCurrentScenario(null);
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Check for compliance issues
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("推荐") || lowerInput.includes("买入") || lowerInput.includes("投资建议")) {
      setComplianceWarning("本服务不提供投资建议或股票推荐。我们仅提供客观的市场信息和教育内容，帮助您自行做出明智决策。");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setComplianceWarning(null);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string, scenario?: Scenario) => {
    setInput(question);
    if (scenario) {
      setCurrentScenario(scenario);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F9FB] relative">
      {/* Absolutely Positioned Top Right Utility Bar */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3 h-12">
        <button
          className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors text-[#0D3A66] bg-white shadow-sm border border-[#D5D9DE]"
          title="账户"
          onClick={() => setShowUserProfile(true)}
        >
          <User className="w-5 h-5" />
        </button>
        <button
          className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors text-[#0D3A66] bg-white shadow-sm border border-[#D5D9DE]"
          title="设置"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area - starts 72px from top */}
      <div className="flex-1 overflow-y-auto pt-[72px]">
        {messages.length === 0 ? (
          <WelcomeScreen onQuestionClick={handleQuestionClick} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {currentScenario && (
              <div className="mb-6 inline-flex items-center gap-2 bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] text-white px-4 py-2 rounded-full shadow-sm">
                {iconMap[currentScenario.icon] && (() => {
                  const Icon = iconMap[currentScenario.icon];
                  return <Icon className="w-4 h-4" />;
                })()}
                <span className="text-sm">当前场景：{currentScenario.title}</span>
                <button
                  onClick={() => setCurrentScenario(null)}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] rounded-lg flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-[#D5D9DE]">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-[#0D3A66] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#0D3A66] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#0D3A66] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-[#D5D9DE] p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {complianceWarning && (
            <div className="mb-4">
              <ComplianceWarning
                message={complianceWarning}
                type="block"
                onDismiss={() => setComplianceWarning(null)}
              />
            </div>
          )}
          <div className="relative flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="询问港股行情、个股分析、市场动态..."
                className="w-full resize-none rounded-xl border-2 border-[#D5D9DE] px-4 py-3 pr-12 focus:border-[#0D3A66] focus:outline-none focus:ring-2 focus:ring-[#0D3A66]/10 transition-all text-[#0A0F16] placeholder-[#A3A8B1] bg-[#F7F9FB]"
                rows={1}
                style={{
                  minHeight: "52px",
                  maxHeight: "200px",
                }}
                onInput={(e) => {
                  const target =
                    e.target as HTMLTextAreaElement;
                  target.style.height = "52px";
                  target.style.height =
                    target.scrollHeight + "px";
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-12 h-12 bg-[#0D3A66] hover:bg-[#2A7FF0] disabled:bg-[#D5D9DE] disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-[#A3A8B1] mt-3 text-center">
            仅供参考 - 不构成投资建议。请以官方数据为准。
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        guestId={guestId}
        guestNickname={guestNickname}
        onUpdateNickname={onUpdateNickname}
        conversationCount={12}
      />
    </div>
  );
}

function generateMockResponse(question: string): string {
  const lowerQ = question.toLowerCase();

  // System prompts that could be shown during processing
  const systemPrompts = [
    "正在理解你的问题…",
    "正在识别你的提问是否与港股相关…",
    "正在解析你关注的股票、指数或行业…",
    "正在整合你的问题信息…",
    "正在获取最新行情…",
    "正在获取财务数据…",
    "正在分析资金情绪…",
    "正在获取行业趋势…",
    "正在分析宏观环境…",
  ];

  if (
    lowerQ.includes("熔断") ||
    lowerQ.includes("circuit breaker") ||
    lowerQ.includes("trading halt")
  ) {
    return `📋 **市场概览**

香港的波动调节机制（VCM），也称为市场熔断机制，旨在防止极端价格波动。

📈 **运作机制**
- 当证券价格在5分钟内偏离参考价格±10%时触发
- 参考价格按最近5笔成交价的移动中位数计算
- 适用于主板和创业板证券

**触发后的流程：**
1. 进入5分钟冷静期
2. 股票进入"限制状态" - 不能执行交易
3. 可以输入、修改或取消订单
4. 5分钟后，以10-30秒的随机收市时间恢复交易

🌊 **触发频率**
- 每个交易时段可多次触发
- 开市和波动剧烈时段最为常见

⚠️ **风险提示**
此机制旨在让投资者有时间评估信息，在高波动期间做出更明智的决策。

📊 **数据说明**
以上信息基于香港交易所现行规则，实际触发条件以交易所公告为准。`;
  }

  if (
    lowerQ.includes("h股") ||
    lowerQ.includes("h-share") ||
    lowerQ.includes("h share")
  ) {
    return `📋 **市场概览**

H股是指在中国内地注册成立，但在香港联交所上市的中资企业股票。

💰 **关键特征**
- 依中国法律注册成立
- 在香港以港元上市交易
- 同时受中国公司法和港交所上市规则监管
- 主要业务和总部位于中国内地

**典型H股企业：**
- 大型国有企业：中国移动、中石油
- 大型商业银行：工商银行、中国银行

🏭 **与其他股票类型的区别**
- **A股**：在沪深交易所上市，以人民币交易，主要面向内地投资者
- **红筹股**：在内地以外注册，但主要业务在内地
- **P股**：民营中资企业，在境外注册

📈 **投资考量**
- 为国际投资者提供投资中国企业的渠道
- 通常相对A股有折价（H股折价）
- 可通过沪深港通进行跨境交易

🌍 **宏观影响**
H股自1990年代以来一直是国际投资中国企业的重要桥梁。

📊 **数据说明**
H股公司需同时遵守境内外监管要求，投资前请详细了解相关规则。`;
  }

  if (
    lowerQ.includes("选股") ||
    lowerQ.includes("筛选") ||
    lowerQ.includes("蓝筹")
  ) {
    return `📋 **市场概览**

为你筛选符合条件的港股蓝筹股（示例）：

💰 **财务与估值**
满足市盈率<15倍的蓝筹股示例：

1. **中国移动 (0941.HK)**
   - 市盈率：约9倍
   - 股息率：约7%
   - 行业：电信服务

2. **中国银行 (3988.HK)**
   - 市盈率：约4.5倍
   - 股息率：约8%
   - 行业：银行

3. **中国石油 (0857.HK)**
   - 市盈率：约6倍
   - 股息率：约9%
   - 行业：能源

📈 **行情走势**
这些股票普遍特点：
- 估值较低，处于价值区间
- 股息率较高，适合稳健投资
- 流动性好，属恒指成分股

🌊 **资金情绪**
- 传统蓝筹近期受北向资金青睐
- 机构持仓稳定
- 适合长期价值投资者

⚠️ **风险提示**
1. 低估值可能反映行业增长放缓
2. 高股息需关注分红可持续性
3. 需关注行业周期性波动
4. 本列表仅供参考，非投资建议

📊 **数据说明**
以上数据为示例，实际选股需基于最新财务数据和个人风险偏好。建议结合基本面和技术面综合分析。`;
  }

  return `📋 **市场概览**

感谢你的提问："${question}"

我可以为你提供关于港股市场的客观信息，包括：

💰 **公司信息**
上市公司数据、业务概况、财务信息

📈 **IPO规则**
上市要求、申请流程、监管框架

🌊 **市场机制**
交易规则、结算流程、市场基础设施

🏭 **监管合规**
证监会规定、披露要求

⚠️ **风险提示**
请注意，我仅提供教育性信息，不提供投资建议或推荐。

📊 **数据说明**
如需更具体的信息，请提供更详细的问题描述，我会为你详细解答。`;
}