# 设计组件与代码组件映射（初版）

> 说明：用于建立「设计稿 ↔ 代码组件」的对应关系，方便之后做设计验证循环和回溯。

| 场景/页面         | 设计文件示例                             | 对应代码组件路径                              | 备注                       |
|------------------|-------------------------------------------|----------------------------------------------|----------------------------|
| 首页整体布局     | `Mastergo-2025-12-04/home-frame`         | `src/components/chat/layout/*`               | 页面级布局壳               |
| 侧边栏会话列表   | `Mastergo-2025-12-04/sidebar`             | `src/components/chat/sidebar/*`              | 会话列表、新建对话、折叠   |
| 访客信息弹窗     | `Mastergo-2025-12-04/guest-modal`         | `src/components/chat/modals/*`               | 访客 ID / 昵称 / 加入时间 |
| 结构化行情卡片   | `Figma-2025-12-04-1700/market-cards`      | `src/components/chat/cards/*`                | 市场/财务/风险等分区卡片  |
| 消息气泡与列表   | `Figma-2025-12-04-1700/message-list`      | `src/components/chat/messages/*`             | 用户/助手消息样式         |
| 底部输入区       | `Figma-2025-12-04-1700/chat-input`        | `src/components/chat/input/*`                | 输入框、发送按钮           |

后续可以根据实际设计文件名与组件命名不断补充和微调本表。
