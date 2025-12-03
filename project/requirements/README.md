# 需求管理约定

本目录用于沉淀和维护产品需求文档。请遵循以下规范：

## 版本号
- 使用 `vX.Y.Z` 三段式语义化版本。
- **主版本号（X）**：需求集合的重大变更或不可兼容的调整。
- **次版本号（Y）**：向后兼容的新需求或功能增强。
- **修订号（Z）**：向后兼容的修补、文本改进或澄清。

## 变更日志规范
- 采用 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 风格，按时间倒序记录。
- 每条记录包含日期、版本号、变更类型及简要说明。
- 常见变更类型：`Added`、`Changed`、`Fixed`、`Deprecated`、`Removed`、`Security`。
- 对应需求文档更新后，务必同步更新 `changelog.md` 中的变更条目。

## 文档位置
- 需求模板：`requirement-template.md`
- 变更日志：`changelog.md`
- 具体需求文档请基于模板创建独立的 Markdown 文件，并以版本号或需求编号命名。
