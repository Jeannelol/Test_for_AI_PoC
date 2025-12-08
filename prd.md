# AI 对话页 PoC – 需求 PRD（当前版）

## 1. 目标与范围
- 目标：提供一个可交付的单页 AI 对话体验，覆盖会话管理、消息展示、输入发送，便于后端对接与后续演进。
- 范围：左侧会话列表（新建/切换）、右侧消息区（用户/助手气泡）、欢迎页推荐卡片、底部输入区。暂不含真实身份鉴权与消息持久化。

## 2. 用户与场景
- 前端设计/工程：需要清晰的组件拆分，便于替换样式和接入 API。
- 试用用户：快速提问并查看回复，期望流畅的发送/查看体验。
- 场景：打开页面 → 选择/创建会话 → 输入问题 → 查看回复；无会话时看到欢迎页与提示卡片。

## 3. 信息架构与页面区域
- 顶部 `HeaderBar`：设置/用户入口（占位，无逻辑）。
- 左侧 `Sidebar`：折叠/展开、新建对话按钮、搜索框（占位）、会话列表 `ConversationItem`（高亮当前）。
- 主内容：
  - 欢迎页 `WelcomeSection`：品牌标题 + 6 个话题卡片 `TopicCard`。
  - 消息区 `MessageList` + `ChatMessage`：对齐区分用户/助手，支持多行文本展示。
- 底部 `ChatInputBar`：多行输入框，语音按钮占位，发送按钮（禁用空输入），Enter 发送 / Shift+Enter 换行。

## 4. 功能需求
- 会话管理：展示会话列表；点击切换；点击“新建对话”回到欢迎页并重置消息。
- 消息发送：输入非空内容后可发送；Enter 发送、Shift+Enter 换行；发送后清空输入。
- 默认内容：首次或新建对话时展示默认问候消息。
- 状态处理：侧栏折叠状态在前端维护；消息列表/输入区不随折叠影响。
- 占位逻辑：语音按钮无实现；搜索框无实现；Header 图标无逻辑。

## 5. 数据与接口（占位）
- 数据模型：
  - `Conversation { id, title, summary, time }`
  - `Message { id, content, sender(user|assistant), time }`
- API 约定（未接后端时使用本地模拟）：
  - `GET /api/conversations` → Conversation[]
  - `GET /api/conversations/:id/messages` → Message[]
  - `POST /api/conversations/:id/messages { content }` → Message
- React Query 占位：`useConversationsQuery` / `useMessagesQuery` / `useSendMessageMutation`。
- 开关：`USE_API`（默认 false）控制走本地模拟或真实接口。

## 6. 交互与状态
- 发送中/失败：当前未实现，后续可在 mutation 上增加 pending/error 状态与重试。
- 加载态：React Query 启用时需补充 skeleton/spinner；当前未展示。
- 错误态：fetch 抛错后未展示 UI，需要后续补充 toast/inline 提示。

## 7. 视觉与样式
- 使用 Tailwind CSS；主色蓝渐变，浅灰背景分层；圆角卡片；气泡区分用户/助手颜色。
- 文字排版：标题 20px 左右，正文 14–16px；卡片小字 12px。

## 8. 非功能性
- 适配：桌面优先，侧栏可折叠以保留主区空间；移动端尚未适配。
- 可扩展性：组件已拆分，类型集中；服务与 hook 抽象便于接入后端。

## 9. 待办/后续演进
- 接入真实后端：切换 `USE_API=true`，完善身份态与错误展示。
- 消息状态：pending/failed/resent；流式回复（SSE/WebSocket）。
- 搜索/筛选：侧栏搜索、消息搜索；对话重命名/删除。
- 设计完善：移动端布局，主题切换，代码块/引用样式，反馈按钮（👍/👎）。***
