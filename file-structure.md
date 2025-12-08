# 项目目录与关系说明（动态维护）

## 根目录

- `/README.md`                 - PoC 设计对齐文档（如何跑、核心目标说明）
- `/prd.md`                    - 最新需求 PRD
- `/file-structure.md`         - 本文件（项目结构说明）
- `/index.html`                - Vite 入口 HTML（含 Font Awesome CDN）
- `/package.json`              - 依赖与脚本
- `/tsconfig*.json`            - TS 薄壳，extends `config/*`
- `/vite.config.ts`            - Vite 薄壳（指向 `config/vite.config.ts`）
- `/postcss.config.js`         - PostCSS 薄壳（指向 `config/postcss.config.js`）
- `/tailwind.config.js`        - Tailwind 薄壳（指向 `config/tailwind.config.js`）

## 配置

- `/config/`                   - 核心配置
  - `tsconfig*.json`           - TS 编译/Node 配置，别名 `@ -> src`
  - `vite.config.ts`           - Vite 配置（别名等，含 mock API 插件）
  - `postcss.config.js`        - PostCSS 配置
  - `tailwind.config.js`       - Tailwind 配置
  - `types/node-shim.d.ts`     - Node 类型临时 shim

## 文档与需求

- `/docs/`                     - 文档
  - `project-plan.md`          - 项目计划（迭代分层）
  - `change-log.md`            - 需求与代码变动记录
  - `conversation-log.md`      - 对话与反馈时间线
  - `workflow-2025-12-04.html` - 工作流可视化（黑白风，可本地打开）
  - `workflow-summary-2025-12-04.md` - 工作流步骤总结
  - `ux/`                      - UX 规范与流程
    - `ux-flow-and-states.md`      - UX 状态定义（8 态）
    - `ux-process-guide.md`        - 状态驱动开发/UAT/设计验证流程
    - `ux-uat-checklist.md`        - UAT 检查表占位
- `/requirements/`             - 需求文档与对照
  - `需求拆分v1.0.xlsx`
  - `plan-from-excel.md`

## 设计

- `/design/`                   - 设计产物与导出
  - `/design-prompts/`         - Prompt 记录与复盘
    - `README.md`              - 使用说明与模板
    - `mastergo-2025-12-04-sample.md` - 示例记录
    - （可按日期/场景新增 prompt 记录）
  - `/design-exports/`         - 设计导出代码
    - `/Figma/`
      - `/Figma-2025-12-04-1700/` ...  - Figma 导出项目（React/shadcn 结构）
    - `/Mastergo/`
      - `/Mastergo-2025-12-04/2025-12-04.tsx` - MasterGo 导出片段
  - `interaction-notes.md`     - 交互说明（访客身份/昵称流程等）
  - `component-map.md`         - 设计组件 ↔ 代码组件 对照表（用于设计验证循环）

## 规范占位

- `/spec-kit/`                 - 代码/设计规范占位（后续可补充 ESLint/Style 指南等）

## 前端源码（src）

- `/src/index.css`             - 全局样式（Tailwind）
- `/src/main.tsx`              - Vite 挂载入口，渲染 `HKMarketChat`
- `/src/HKMarketChat.tsx`      - PoC 根组件（QueryClientProvider 包裹 ChatApp）

### 类型与工具

- `/src/types/chat.ts`         - 聊天相关类型与默认数据
- `/src/utils/guest.ts`        - 访客 ID 生成与加入时间工具（统一为 `GUEST-xxxxxx` 等）

### 服务与 hooks

- `/src/services/chatApi.ts`   - 会话/消息 API 封装（GET 会话/消息，POST 发送消息，支持 mock/真实后端）
- `/src/hooks/useChatApi.ts`   - 基于 React Query 的底层 API hooks
- `/src/features/chat/`        - 聊天业务逻辑聚合层（预留）
  - `/hooks/`
    - `useChatMessages.ts`     - 聚合会话列表、消息列表、发送逻辑等的业务 hook（后续可逐步增强）

### 组件

- `/src/components/ui/`        - 轻量 UI 基础组件（button/input/scroll-area 等）

- `/src/components/chat/`      - 聊天页面相关组件（按语义子目录组织）
  - `/layout/`                 - 页面整体布局组件（布局壳）
  - `/sidebar/`                - 会话列表、侧边栏折叠/展开、新建对话按钮
  - `/messages/`               - 消息列表与单条消息气泡
  - `/input/`                  - 底部输入框、发送按钮、快捷入口
  - `/modals/`                 - 访客弹窗、个人资料弹窗等对话框组件
  - `/cards/`                  - 结构化结果展示卡片（市场全景/行情/财务/资金/风险提示等）

## 运行模式说明

- `USE_API`（或 `VITE_USE_API`）默认 `true` 时，走 `/api`（真实或 mock 接口）；设为 `false` 时走本地模拟。
- Vite dev 内置 mock API；生产需替换为真实后端。
- 设计导出与 prompt 记录分离：prompt 在 `design-prompts`，代码在 `design-exports`，具体采用情况记录在对应 prompt 与 `design/component-map.md` 中。
