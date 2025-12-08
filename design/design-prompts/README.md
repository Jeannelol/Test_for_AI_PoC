# 设计 Prompt 存档与复盘

用途：记录与 MasterGo / Figma 的 prompt 交互、生成物、采用情况与复盘，形成“Prompt → 生成 → 选用 → 落地”的闭环。

## 推荐命名
- MasterGo: `design-prompts/mastergo-YYYYMMDD-<tag>.md`
- Figma: `design-prompts/figma-YYYYMMDD-<tag>.md`

## 模板（复制使用）
```
# MasterGo Session 2025-12-04 A
## Prompt
- 目的/场景：
- 关键要求（色板/布局/组件/交互）：
- 限制/不做：
- 参考链接（Figma/MG）：

## 输出
- 截图/链接：
- 代码位置：design/design-exports/mastergo-20251204/
- 采用情况：已采用 / 部分采用 / 弃用（原因）
- 拷贝到项目：src/...（列出文件/组件）

## 复盘
- 优点：
- 问题/缺口：
- 下次改进：
```

## 流程建议
1) 先在 prompt 文件中写好草稿→确认后发送给 MasterGo/Figma。
2) 生成的代码放入 `design/design-exports/<session>/`，在 prompt 记录中标记“采用/弃用”和拷贝到项目的路径。
3) 若引发需求或实现变更，记得同步 `docs/change-log.md`。
