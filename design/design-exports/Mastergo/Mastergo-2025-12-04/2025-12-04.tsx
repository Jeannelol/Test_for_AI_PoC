// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
interface Conversation {
id: string;
title: string;
summary: string;
time: string;
}
interface Message {
id: string;
content: string;
sender: 'user' | 'assistant';
time: string;
}
const App: React.FC = () => {
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
const [activeConversation, setActiveConversation] = useState<string | null>(null);
const [conversations, setConversations] = useState<Conversation[]>([
{
id: '1',
title: '恒生指数走势分析',
summary: '讨论近期恒指波动原因及未来趋势预测',
time: '2023-11-15 14:30'
},
{
id: '2',
title: '腾讯控股财报解读',
summary: '深度解析腾讯最新季度财务表现',
time: '2023-11-14 10:15'
},
{
id: '3',
title: '新能源板块机会',
summary: '探讨港股新能源行业投资机遇',
time: '2023-11-12 16:45'
},
{
id: '4',
title: '美联储政策影响分析',
summary: '分析美国货币政策对港股市场的影响',
time: '2023-11-10 09:20'
}
]);
const [showWelcomeModal, setShowWelcomeModal] = useState(true);
const [visitorId] = useState(`VISITOR-${Math.floor(100000 + Math.random() * 900000)}`);
const [nickname, setNickname] = useState('');
const [isLoadingConversations, setIsLoadingConversations] = useState(false);
const [conversationError, setConversationError] = useState<string | null>(null);
const [currentScenario, setCurrentScenario] = useState<string | null>(null);
const [complianceError, setComplianceError] = useState<string | null>(null);
// 添加 useEffect 来处理自定义事件
useEffect(() => {
const handleSelectConversation = (e: Event) => {
const customEvent = e as CustomEvent;
const conversationId = customEvent.detail;
if (conversationId === null) {
// 返回欢迎页的逻辑
setActiveConversation(null);
setCurrentScenario(null);
setMessages([
{
id: '1',
content: '您好！我是您的港股市场信息助手，有什么可以帮助您的吗？',
sender: 'assistant',
time: new Date().toLocaleTimeString('zh-CN', {
hour: '2-digit',
minute: '2-digit'
})
}
]);
} else if (typeof conversationId === 'string' && conversationId.startsWith('conv_')) {
// 创建新对话的逻辑
setActiveConversation(conversationId);
setCurrentScenario(null);
setMessages([
{
id: '1',
content: '您好！我是您的港股市场信息助手，有什么可以帮助您的吗？',
sender: 'assistant',
time: new Date().toLocaleTimeString('zh-CN', {
hour: '2-digit',
minute: '2-digit'
})
}
]);
} else {
// 选择现有对话的逻辑
setActiveConversation(conversationId);
setCurrentScenario(null);
}
};
window.addEventListener('selectConversation', handleSelectConversation as EventListener);
return () => {
window.removeEventListener('selectConversation', handleSelectConversation as EventListener);
};
}, []);
// 模拟加载对话列表
useEffect(() => {
setIsLoadingConversations(true);
setConversationError(null);
// 模拟API调用
const timer = setTimeout(() => {
setIsLoadingConversations(false);
// 模拟10%概率出错
if (Math.random() < 0.1) {
setConversationError('加载对话列表失败，请稍后重试');
}
}, 1500);
return () => clearTimeout(timer);
}, []);
const [messages, setMessages] = useState<Message[]>([
{
id: '1',
content: '您好！我是您的港股市场信息助手，有什么可以帮助您的吗？',
sender: 'assistant',
time: '2023-11-15 14:30'
}
]);
const [newMessage, setNewMessage] = useState('');
const toggleSidebar = () => {
setIsSidebarCollapsed(!isSidebarCollapsed);
};
const handleConversationSelect = (id: string) => {
setActiveConversation(id);
};
const handleSendMessage = () => {
if (newMessage.trim() === '') return;
// 合规检查
if (newMessage.includes('投资建议') || newMessage.includes('买卖时机')) {
setComplianceError('您的输入可能涉及投资建议咨询，根据相关规定无法提供此类服务');
setTimeout(() => setComplianceError(null), 5000);
return;
}
const userMessage: Message = {
id: Date.now().toString(),
content: newMessage,
sender: 'user',
time: new Date().toLocaleTimeString('zh-CN', {
hour: '2-digit',
minute: '2-digit'
})
};
setMessages([...messages, userMessage]);
setNewMessage('');
setComplianceError(null);
// 模拟助手回复
setTimeout(() => {
const displayName = nickname || visitorId;
const assistantMessage: Message = {
id: (Date.now() + 1).toString(),
content: `感谢${displayName}的提问，我已经收到您的问题。正在为您分析相关信息...`,
sender: 'assistant',
time: new Date().toLocaleTimeString('zh-CN', {
hour: '2-digit',
minute: '2-digit'
})
};
setMessages(prev => [...prev, assistantMessage]);
}, 1000);
};
const handleKeyPress = (e: React.KeyboardEvent) => {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
handleSendMessage();
}
};
return (
<div className="flex h-screen bg-gray-50">
{/* 访客身份弹窗 */}
{showWelcomeModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-2xl w-96 max-w-[90vw] overflow-hidden shadow-2xl">
{/* 弹窗头部 - 渐变背景 */}
<div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
<button
onClick={() => setShowWelcomeModal(false)}
className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
>
<i className="fas fa-times text-lg"></i>
</button>
<div className="text-center">
<div className="mx-auto w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4 backdrop-blur-sm">
<i className="fas fa-user text-white text-3xl"></i>
</div>
<div className="flex items-center justify-center mb-2">
<h2 className="text-white text-2xl font-bold">访客{visitorId.slice(-3)}</h2>
<button 
onClick={() => {
const newNickname = prompt('请输入新的昵称:');
if (newNickname) setNickname(newNickname);
}}
className="ml-3 text-blue-200 hover:text-white transition-colors"
>
<i className="fas fa-edit"></i>
</button>
</div>
<div className="flex items-center justify-center text-blue-100 text-sm">
<span>访客用户</span>
</div>
</div>
</div>
{/* 弹窗内容 */}
<div className="p-6">
{/* 访客ID */}
<div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
<div className="text-gray-500 text-sm mb-2">访客 ID</div>
<div className="font-mono text-sm break-all bg-white p-2 rounded-lg border">GUEST-{Date.now()}-{visitorId.toLowerCase()}</div>
</div>
{/* 加入时间和对话数量 */}
<div className="grid grid-cols-2 gap-4 mb-5">
<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
<div className="flex items-center">
<i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
<div className="text-gray-600 text-sm">加入时间</div>
</div>
<div className="text-lg font-semibold mt-1 text-gray-800">2025/12/4</div>
</div>
<div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
<div className="flex items-center">
<i className="fas fa-comments text-indigo-500 mr-2"></i>
<div className="text-gray-600 text-sm">对话数量</div>
</div>
<div className="text-lg font-semibold mt-1 text-gray-800">12 个</div>
</div>
</div>
{/* 隐私保护 */}
<div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 mb-6 border border-blue-100">
<div className="flex items-center mb-3">
<i className="fas fa-lock text-blue-600 mr-2"></i>
<div className="font-semibold text-blue-800">隐私保护</div>
</div>
<ul className="text-blue-700 text-sm space-y-2">
<li className="flex items-start">
<i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i>
<span>所有数据仅存储在本地浏览器</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i>
<span>我们不收集任何个人身份信息</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i>
<span>清除浏览器数据将删除所有记录</span>
</li>
</ul>
</div>
{/* 操作按钮 */}
<div className="flex space-x-3">
<button
onClick={() => {
// 清除数据逻辑
localStorage.clear();
}}
className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-50 transition-colors font-medium"
>
清除所有数据
</button>
<button
onClick={() => {
setShowWelcomeModal(false);
localStorage.setItem('hkAssistantNickname', nickname || `访客${visitorId.slice(-3)}`);
}}
className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all font-medium shadow-lg"
>
开始使用
</button>
</div>
</div>
</div>
</div>
)}
{/* 左侧侧边栏 */}
<Sidebar
isCollapsed={isSidebarCollapsed}
onToggle={toggleSidebar}
conversations={conversations}
activeConversation={activeConversation}
onSelectConversation={handleConversationSelect}
isLoading={isLoadingConversations}
error={conversationError}
/>
{/* 右侧主界面 */}
<div className="flex-1 flex flex-col">
{/* 顶部导航栏 */}
<HeaderBar />
{/* 中间内容区域 */}
<main className="flex-1 overflow-hidden flex flex-col">
{activeConversation ? (
<MessageList messages={messages} currentScenario={currentScenario} />
) : (
<WelcomeSection onCardClick={(example) => {
setNewMessage(example);
setCurrentScenario(example.split('：')[1]);
}} />
)}
</main>
{/* 底部输入栏 */}
<ChatInputBar
value={newMessage}
onChange={setNewMessage}
onSend={handleSendMessage}
onKeyPress={handleKeyPress}
complianceError={complianceError}
/>
</div>
</div>
);
};
// 侧边栏组件
const Sidebar: React.FC<{
isCollapsed: boolean;
onToggle: () => void;
conversations: Conversation[];
activeConversation: string | null;
onSelectConversation: (id: string) => void;
isLoading: boolean;
error: string | null;
}> = ({
isCollapsed,
onToggle,
conversations,
activeConversation,
onSelectConversation,
isLoading,
error
}) => {
return (
<div
className={`bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 shadow-lg ${
isCollapsed ? 'w-20' : 'w-80'
}`}
>
{/* 顶部标题栏 */}
<div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
{!isCollapsed && (
<div className="flex items-center space-x-3 mx-auto">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
<i className="fas fa-chart-line text-white text-xl"></i>
</div>
<h1 className="text-xl font-bold text-gray-800">港股市场信息助手</h1>
</div>
)}
<Button
variant="ghost"
size="icon"
onClick={onToggle}
className="ml-auto rounded-button whitespace-nowrap w-10 h-10 hover:bg-gray-100 transition-colors"
>
<i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-600`}></i>
</Button>
</div>
{/* 新建对话按钮 */}
<div className={`p-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
<Button
className={`rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center shadow-md transition-all ${
isCollapsed ? 'w-12 h-12 p-0' : 'w-full py-3'
}`}
onClick={() => {
// 返回欢迎页的逻辑
const selectEvent = new CustomEvent('selectConversation', { detail: null });
window.dispatchEvent(selectEvent);
}}
>
<i className="fas fa-plus"></i>
{!isCollapsed && <span className="ml-2 font-medium">新建对话</span>}
</Button>
</div>
{/* 搜索框 */}
{!isCollapsed && (
<div className="px-4 pb-4">
<div className="relative">
<i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<Input
placeholder="搜索对话…"
className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-gray-50 transition-all"
/>
</div>
</div>
)}
{/* 对话历史列表 */}
<ScrollArea className="flex-1 px-2">
{!isCollapsed && (
<div className="space-y-1 p-2">
{isLoading ? (
<div className="flex flex-col items-center justify-center py-12">
<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
<p className="text-gray-500 font-medium">加载中...</p>
</div>
) : error ? (
<div className="flex flex-col items-center justify-center py-12">
<i className="fas fa-exclamation-circle text-red-500 text-3xl mb-4"></i>
<p className="text-red-500 mb-5 font-medium">{error}</p>
<Button
variant="outline"
className="rounded-button whitespace-nowrap px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50"
onClick={() => {
setIsLoadingConversations(true);
setConversationError(null);
setTimeout(() => {
setIsLoadingConversations(false);
if (Math.random() < 0.1) {
setConversationError('加载对话列表失败，请稍后重试');
} else {
setConversationError(null);
}
}, 1500);
}}
>
重试
</Button>
</div>
) : conversations.length === 0 ? (
<div className="flex flex-col items-center justify-center py-8">
<i className="fas fa-comment-slash text-gray-300 text-2xl mb-2"></i>
<p className="text-gray-500">暂无对话记录</p>
</div>
) : (
conversations.map((conversation) => (
<ConversationItem
key={conversation.id}
conversation={conversation}
isActive={activeConversation === conversation.id}
onClick={() => onSelectConversation(conversation.id)}
/>
))
)}
</div>
)}
</ScrollArea>
{/* 底部免责声明 */}
{!isCollapsed && (
<div className="p-4 border-t border-gray-200">
<p className="text-xs text-gray-500 text-center">
本产品仅供参考，不构成投资建议
</p>
</div>
)}
</div>
);
};
// 对话项组件
const ConversationItem: React.FC<{
conversation: Conversation;
isActive: boolean;
onClick: () => void;
}> = ({ conversation, isActive, onClick }) => {
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(conversation.title);
const handleSave = () => {
// 这里应该是API调用更新对话标题
console.log('Updating conversation title:', editTitle);
setIsEditing(false);
};
return (
<div
className={`p-4 rounded-xl cursor-pointer transition-all group mb-2 ${
isActive
? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
: 'hover:bg-gray-100 border border-gray-100'
}`}
onClick={onClick}
>
<div className="flex items-start space-x-3">
<div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center ${
isActive ? 'bg-white bg-opacity-20' : 'bg-gray-200'
}`}>
<i className="fas fa-comment text-sm"></i>
</div>
<div className="flex-1 min-w-0">
{isEditing ? (
<input
type="text"
value={editTitle}
onChange={(e) => setEditTitle(e.target.value)}
onBlur={handleSave}
onKeyDown={(e) => e.key === 'Enter' && handleSave()}
autoFocus
className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm"
/>
) : (
<>
<h3 className="font-semibold truncate">{conversation.title}</h3>
<p className={`text-sm truncate mt-1 ${
isActive ? 'text-blue-100' : 'text-gray-500'
}`}>
{conversation.summary}
</p>
</>
)}
<p className={`text-xs mt-2 flex items-center ${
isActive ? 'text-blue-200' : 'text-gray-400'
}`}>
<span>{conversation.time}</span>
{!isEditing && (
<button
onClick={(e) => {
e.stopPropagation();
setIsEditing(true);
}}
className={`ml-auto opacity-0 group-hover:opacity-100 ${
isActive ? 'text-blue-200 hover:text-white' : 'text-gray-400 hover:text-gray-700'
}`}
>
<i className="fas fa-edit text-xs"></i>
</button>
)}
</p>
</div>
</div>
</div>
);
};
// 顶部导航栏组件
const HeaderBar: React.FC = () => {
return (
<header className="bg-white border-b border-gray-200 h-16 px-6 flex justify-end items-center">
<div className="flex items-center space-x-4">
<button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
<i className="fas fa-cog text-gray-600"></i>
</button>
<button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
<i className="fas fa-user text-gray-600"></i>
</button>
</div>
</header>
);
};
// 欢迎页面组件
const WelcomeSection: React.FC<{
onCardClick?: (example: string) => void;
}> = ({ onCardClick }) => {
const topicCards = [
{
icon: "fa-search",
title: "选股票",
description: "基于基本面和技术面筛选优质港股标的",
example: "示例：帮我筛选市值大于100亿的科技股"
},
{
icon: "fa-stethoscope",
title: "诊股票",
description: "深度诊断个股健康状况和发展潜力",
example: "示例：诊断腾讯控股的投资价值"
},
{
icon: "fa-globe-asia",
title: "看宏观",
description: "解读宏观经济对港股市场的影响",
example: "示例：分析美联储加息对港股的影响"
},
{
icon: "fa-chart-line",
title: "看大势",
description: "把握市场整体趋势和热点轮动",
example: "示例：预测恒生指数短期走势"
},
{
icon: "fa-newspaper",
title: "读新闻",
description: "获取最新港股资讯和深度解读",
example: "示例：今日港股重要新闻有哪些"
},
{
icon: "fa-database",
title: "查数据",
description: "查询个股财务数据和市场统计信息",
example: "示例：查询比亚迪近五年营收情况"
}
];
return (
<div className="flex-1 flex items-center justify-center p-6">
<div className="max-w-4xl w-full">
{/* 内容容器 - 居中显示 */}
<div className="flex flex-col items-center text-center">
{/* 大Logo */}
<div className="mb-8 w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl mx-auto transform hover:scale-105 transition-transform">
<i className="fas fa-chart-network text-white text-4xl"></i>
</div>
{/* 标题 */}
<h1 className="text-3xl font-bold text-gray-800 mb-4">港股市场信息助手</h1>
{/* 副标题 */}
<p className="text-gray-600 mb-12 text-lg max-w-2xl leading-relaxed">
我可以帮助你分析股票、了解市场动态、解读宏观趋势。请选择你感兴趣的话题，或直接提问。
</p>
{/* 功能卡片网格 */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
{topicCards.map((card, index) => (
<TopicCard
key={index}
icon={card.icon}
title={card.title}
description={card.description}
example={card.example}
onClick={() => onCardClick && onCardClick(card.example)}
/>
))}
</div>
</div>
</div>
</div>
);
};
// 功能卡片组件
const TopicCard: React.FC<{
icon: string;
title: string;
description: string;
example: string;
onClick?: () => void;
}> = ({ icon, title, description, example, onClick }) => {
return (
<div
className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
onClick={onClick}
>
<div className="flex items-center space-x-3 mb-4">
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
<i className={`fas ${icon} text-white`}></i>
</div>
<h3 className="font-bold text-gray-800 text-lg">{title}</h3>
</div>
<p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
<div className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-2 rounded-full inline-block leading-tight border border-blue-100">
{example}
</div>
</div>
);
};
// 消息列表组件
const MessageList: React.FC<{
messages: Message[];
currentScenario: string | null;
}> = ({ messages, currentScenario }) => {
const [scenario, setScenario] = useState(currentScenario);
useEffect(() => {
if (currentScenario) {
setScenario(currentScenario);
}
}, [currentScenario]);
const removeScenario = () => {
setScenario(null);
};
return (
<ScrollArea className="flex-1 p-6">
<div className="max-w-4xl mx-auto space-y-6">
{scenario && (
<div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
<div className="flex items-center">
<i className="fas fa-tag text-blue-500 mr-2"></i>
<span className="text-blue-700 text-sm">当前场景: {scenario}</span>
</div>
<button
onClick={removeScenario}
className="text-blue-500 hover:text-blue-700"
>
<i className="fas fa-times"></i>
</button>
</div>
)}
{messages.map((message) => (
<ChatMessage
key={message.id}
message={message}
/>
))}
</div>
</ScrollArea>
);
};
// 消息气泡组件
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
const isUser = message.sender === 'user';
const isComplianceMessage = message.content.includes('合规') || message.content.includes('风险提示');
// 检查是否为结构化回复
const isStructuredResponse = message.content.includes('行情') ||
message.content.includes('财务') ||
message.content.includes('风险');
// 获取昵称
const nickname = localStorage.getItem('hkAssistantNickname') || '访客';
if (isStructuredResponse && !isUser) {
return (
<div className="flex justify-start">
<div className="max-w-[80%]">
<div className="flex flex-row items-start space-x-3">
<div className="mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
<i className="fas fa-robot text-white text-sm"></i>
</div>
<div className="rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 rounded-tl-none">
<div className="whitespace-pre-wrap mb-3">{message.content}</div>
{/* 结构化信息卡片 */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
{/* 行情卡片 */}
<div className="border border-gray-200 rounded-lg p-3 bg-white">
<div className="flex items-center mb-2">
<i className="fas fa-chart-line text-blue-500 mr-2"></i>
<span className="font-medium text-sm">行情概览</span>
</div>
<div className="text-xs space-y-1">
<div className="flex justify-between">
<span className="text-gray-500">最新价:</span>
<span>285.60</span>
</div>
<div className="flex justify-between">
<span className="text-gray-500">涨跌幅:</span>
<span className="text-green-500">+1.25%</span>
</div>
<div className="flex justify-between">
<span className="text-gray-500">成交量:</span>
<span>1.2亿</span>
</div>
</div>
</div>
{/* 财务卡片 */}
<div className="border border-gray-200 rounded-lg p-3 bg-white">
<div className="flex items-center mb-2">
<i className="fas fa-file-invoice-dollar text-blue-500 mr-2"></i>
<span className="font-medium text-sm">财务指标</span>
</div>
<div className="text-xs space-y-1">
<div className="flex justify-between">
<span className="text-gray-500">市盈率:</span>
<span>12.5</span>
</div>
<div className="flex justify-between">
<span className="text-gray-500">ROE:</span>
<span>8.3%</span>
</div>
<div className="flex justify-between">
<span className="text-gray-500">负债率:</span>
<span>45.2%</span>
</div>
</div>
</div>
{/* 风险卡片 */}
<div className="border border-gray-200 rounded-lg p-3 bg-white">
<div className="flex items-center mb-2">
<i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
<span className="font-medium text-sm">风险提示</span>
</div>
<div className="text-xs text-gray-600">
请注意市场波动风险，投资需谨慎
</div>
</div>
</div>
</div>
</div>
{isUser && (
<div className="mt-1 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
<i className="fas fa-user text-gray-600 text-sm"></i>
</div>
)}
</div>
</div>
);
}
return (
<div className={`flex ${isUser ? 'justify-start' : 'justify-start'}`}>
<div className={`max-w-[80%] flex ${isUser ? 'flex-row' : 'flex-row'} items-start space-x-3`}>
{isUser && (
<div className="flex flex-col items-start">
<div className="text-xs text-gray-500 mb-1 ml-2">{nickname}</div>
<div className="flex items-start space-x-3">
<div className="mt-1 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
<i className="fas fa-user text-gray-600 text-sm"></i>
</div>
<div className="rounded-2xl px-4 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tl-none">
<div className="whitespace-pre-wrap">{message.content}</div>
</div>
</div>
</div>
)}
{!isUser && (
<>
<div className="mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
<i className="fas fa-robot text-white text-sm"></i>
</div>
<div
className={`rounded-2xl px-4 py-3 ${
isComplianceMessage
? 'bg-amber-50 border border-amber-200 text-amber-800 rounded-tl-none'
: 'bg-gray-100 text-gray-800 rounded-tl-none'
}`}
>
<div className="whitespace-pre-wrap">{message.content}</div>
</div>
</>
)}
</div>
</div>
);
};
// 输入栏组件
const ChatInputBar: React.FC<{
value: string;
onChange: (value: string) => void;
onSend: () => void;
onKeyPress: (e: React.KeyboardEvent) => void;
complianceError?: string | null;
}> = ({ value, onChange, onSend, onKeyPress, complianceError }) => {
return (
<div className="border-t border-gray-200 bg-white p-4">
<div className="max-w-4xl mx-auto">
{complianceError && (
<div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
<i className="fas fa-exclamation-circle mr-2 mt-0.5 flex-shrink-0"></i>
<span>{complianceError}</span>
</div>
)}
<div className="flex items-center space-x-3">
<div className="flex-1 relative flex items-center">
<textarea
value={value}
onChange={(e) => onChange(e.target.value)}
onKeyDown={onKeyPress}
placeholder="询问港股行情、个股分析、市场动态…"
className="w-full border border-gray-300 rounded-2xl py-3 px-4 pr-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 max-h-32"
rows={1}
/>
{/* 图标容器 - 绝对定位并垂直居中 */}
<div className="absolute right-2 inset-y-0 flex items-center space-x-2">
{/* 语音输入按钮 */}
<button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
<i className="fas fa-microphone text-sm"></i>
</button>
{/* 发送按钮 */}
<Button
onClick={onSend}
disabled={!value.trim()}
className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center rounded-button whitespace-nowrap"
>
<i className="fas fa-paper-plane text-sm"></i>
</Button>
</div>
</div>
</div>
<div className="text-center mt-2">
<p className="text-xs text-gray-500">
本助手提供的市场信息、个股分析及数据引用均来自公开资料，仅供参考，不构成任何投资建议或买卖依据。
</p>
</div>
</div>
</div>
);
};
export default App