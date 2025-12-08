# 需求变动记录（动态）

## 2025-12-04
- 起始状态：收到 MasterGo 生成的单文件 React/Tailwind 聊天页面，结构杂乱，未拆分组件，使用本地假数据。
- 变更 1：整理单文件结构，提取常量，保持 UI 行为不变。（test1.csx 重写为清晰结构）
- 变更 2：前端组件拆分至 `src/components/chat/*`，类型与默认数据移至 `src/types/chat.ts`，新增 API 服务层 `src/services/chatApi.ts` 与 React Query hooks `src/hooks/useChatApi.ts`，在 `test1.csx` 中接入 QueryClientProvider、增加 `USE_API` 开关并保留本地模拟消息。
- 变更 3：入口文件重命名为 `HKMarketChat.tsx`，以贴合港股信息助手 PoC 场景。
- 变更 4：文档统一归档至 `/docs`，根目录仅保留 README/prd/入口代码；新增空目录 `/requirements`（需求资料）、`/design-exports`（设计导出参考）、`/spec-kit`（代码规范占位）；`file-structure.md` 移至根目录。
- 变更 5：导入 `requirements/需求拆分v1.0.xlsx`，输出对照计划 `requirements/plan-from-excel.md`（原型/UX/UI/前端缺口与迭代建议）。
- 变更 6：迭代 1 前端落地（场景卡片填充示例、会话搜索与重命名、本地排序、消息 pending/失败提示、发送禁用/加载错误展示、基础 API 占位接入、状态气泡文案）。
- 变更 7：新增 Vite 运行骨架（package.json、vite.config、tsconfig、tailwind/postcss、index.html、src/main.tsx/index.css、ui 基础组件）以便本地预览 HKMarketChat。
- 变更 8：配置分层（根薄壳 + `config/`），Tailwind/PostCSS/Vite/tsconfig 迁入 config；构建缺少 `@types/node`，因网络限制未安装，需网络可用后 `npm install @types/node --save-dev`。
- 变更 9：启用环境开关 `VITE_USE_API`（默认 true），在 Vite dev 下提供内置 mock API（/api/conversations，/api/conversations/:id/messages）支撑前端查询/发送；生产需替换真实后端。
- 变更 10：新增 `docs/workflow.html`（基于 conversation-log 的工作流与时间线可视化，可本地直接打开）。
- 变更 10 更新：`docs/workflow-2025-12-04.html`（黑白风可视化）。  
- 变更 11：设计目录调整为一级 `/design`，内含 `design-prompts`（prompt 记录与复盘）与 `design-exports`（设计导出代码）。新增示例 prompt `design/design-prompts/mastergo-2025-12-04-sample.md` 与流程总结 `docs/workflow-summary-2025-12-04.md`。
- 变更 12：访客弹窗/个人资料弹窗对齐 Figma 结构（深蓝/灰白风格），统一视觉与字段顺序；新增交互说明 `design/interaction-notes.md`。
- 变更 13：访客 ID 统一生成逻辑（`src/utils/guest.ts`，`GUEST-` + 6 位 a-z0-9）；`HKMarketChat` 统一调用 helper；首访弹窗自动出现，头像点击仅打开资料弹窗；清除数据后重新生成访客并弹出首访弹窗。
- 影响范围：UI 结构不变，代码可维护性提升；为后端对接预留 fetch/React Query 接口；默认仍使用本地假数据，切换开关即可走后端。
- 待办：接后端接口、完善加载/错误态、消息状态（pending/failed）与流式回复。
