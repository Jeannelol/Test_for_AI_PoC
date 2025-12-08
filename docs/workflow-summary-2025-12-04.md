# 工作流总结（Prompt → 生成 → 选用 → 落地） — 2025-12-04
> 注：本文件为流程梳理，走黑白简洁风，仅供流程记录，非产品 UI 风格。

## 步骤拆解
1) 需求输入  
   - 从需求文档/PRD中提取场景、组件、约束（色板、布局、交互）。
2) Prompt 编写与评审  
   - 在 `design/design-prompts` 新建记录，描述目标、关键要求、限制、参考链接。  
   - 内部确认后再提交给 MasterGo / Figma。
3) 生成与收集  
   - 将生成的代码/资源存入 `design/design-exports/<session>/`，记录截图或链接。  
4) 评审与选用  
   - 在 prompt 记录中标注“已采用/部分/弃用”，并写明原因。  
   - 标记准备拷贝进项目的组件/文件。
5) 落地与同步  
   - 拷贝/整合到项目代码（src/...），同步 `docs/change-log.md` 如有需求/实现变更。  
   - 如需对外展示，更新 `docs/workflow-2025-12-04.html` 或后续版本。
6) 复盘与改进  
   - 在 prompt 记录“复盘”段落总结优缺点与改进点，必要时刷新流程文档。

## 当前状态（2025-12-04）
- 迭代 1 完成（场景填充、搜索/重命名、状态提示、mock API）。  
- 访客身份/个人资料弹窗改为蓝紫渐变样式，访客 ID 规范化并持久化，加入时间持久化。  
- Vite 本地预览可用，默认 `VITE_USE_API=true` 使用内置 mock；生产需替换真实后端。  
- 配置分层已完成；构建缺失 `@types/node`，网络可用后安装。

## 文档位置
- Prompt 记录：`design/design-prompts/`
- 导出代码：`design/design-exports/`
- 变更/对话：`docs/change-log.md`，`docs/conversation-log.md`
- 可视化：`docs/workflow-2025-12-04.html`
