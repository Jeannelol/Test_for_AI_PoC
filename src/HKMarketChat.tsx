import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type WorkspaceKey = 'inbox' | 'requirements' | 'roadmap';
type ItemType = 'idea' | 'requirement';
type ItemStatus = 'captured' | 'exploring' | 'planned' | 'building' | 'done';
type Priority = 'P0' | 'P1' | 'P2';

interface Workspace {
  id: WorkspaceKey;
  title: string;
  summary: string;
  accent: string;
}

interface Item {
  id: string;
  title: string;
  type: ItemType;
  status: ItemStatus;
  priority: Priority;
  workspace: WorkspaceKey;
  owner: string;
  source: string;
  insight: string;
  nextAction: string;
  tags: string[];
  score: number;
  updatedAt: string;
}

const STORAGE_KEY = 'idea-requirement-workbench';

const WORKSPACES: Workspace[] = [
  {
    id: 'inbox',
    title: '灵感采集箱',
    summary: '快速记录碎片想法、用户反馈和临时灵感。',
    accent: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'requirements',
    title: '需求池',
    summary: '把价值明确的想法整理为可跟进需求。',
    accent: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'roadmap',
    title: '路线图',
    summary: '聚焦已计划或正在推进的重点事项。',
    accent: 'from-emerald-500 to-teal-500'
  }
];

const INITIAL_ITEMS: Item[] = [
  {
    id: 'item-1',
    title: '增加“语音记录想法”入口',
    type: 'idea',
    status: 'captured',
    priority: 'P2',
    workspace: 'inbox',
    owner: '我自己',
    source: '通勤途中想到，文字输入不方便。',
    insight: '降低记录门槛后，灵感沉淀率可能更高。',
    nextAction: '验证手机端录音转文字方案与成本。',
    tags: ['采集体验', '移动端'],
    score: 68,
    updatedAt: '今天 09:20'
  },
  {
    id: 'item-2',
    title: '需求卡片支持目标、痛点、验收标准',
    type: 'requirement',
    status: 'planned',
    priority: 'P0',
    workspace: 'requirements',
    owner: '产品负责人',
    source: '当前记录太零散，后续难进入开发。',
    insight: '统一模板能帮助想法快速升级为可执行需求。',
    nextAction: '补齐模板字段并定义默认结构。',
    tags: ['需求模板', '结构化'],
    score: 92,
    updatedAt: '今天 10:45'
  },
  {
    id: 'item-3',
    title: '做一个每周回顾视图',
    type: 'requirement',
    status: 'building',
    priority: 'P1',
    workspace: 'roadmap',
    owner: '产品 + 运营',
    source: '希望每周固定复盘新增想法和推进状态。',
    insight: '周视图能帮助判断哪些想法长期无进展。',
    nextAction: '先展示本周新增、推进、完成三类统计。',
    tags: ['周报', '复盘'],
    score: 84,
    updatedAt: '今天 14:10'
  },
  {
    id: 'item-4',
    title: '根据标签生成主题需求清单',
    type: 'idea',
    status: 'exploring',
    priority: 'P1',
    workspace: 'requirements',
    owner: '我自己',
    source: '想把分散想法自动聚合，例如“增长”“内容”“效率”。',
    insight: '自动聚类可以减少人工整理成本。',
    nextAction: '先用固定标签过滤，后续再接 AI 聚类。',
    tags: ['标签', 'AI'],
    score: 76,
    updatedAt: '昨天 18:00'
  }
];

const STATUS_META: Record<ItemStatus, { label: string; tone: string }> = {
  captured: { label: '已记录', tone: 'bg-slate-100 text-slate-700' },
  exploring: { label: '调研中', tone: 'bg-amber-100 text-amber-700' },
  planned: { label: '已规划', tone: 'bg-sky-100 text-sky-700' },
  building: { label: '开发中', tone: 'bg-violet-100 text-violet-700' },
  done: { label: '已完成', tone: 'bg-emerald-100 text-emerald-700' }
};

const PRIORITY_META: Record<Priority, string> = {
  P0: 'text-rose-600 bg-rose-50',
  P1: 'text-orange-600 bg-orange-50',
  P2: 'text-slate-600 bg-slate-100'
};

const ITEM_TYPE_META: Record<ItemType, string> = {
  idea: '想法',
  requirement: '需求'
};

const QUICK_TEMPLATES = [
  {
    title: '用户痛点',
    description: '记录用户遇到的问题、频率和影响。',
    draft: {
      title: '补充一个用户痛点记录',
      type: 'idea' as ItemType,
      workspace: 'inbox' as WorkspaceKey,
      insight: '这个问题反复出现，值得沉淀。',
      nextAction: '补一条真实用户案例。',
      tags: ['用户反馈']
    }
  },
  {
    title: '功能需求',
    description: '把想法转换为可拆解、可验收的功能。',
    draft: {
      title: '新增一个功能需求',
      type: 'requirement' as ItemType,
      workspace: 'requirements' as WorkspaceKey,
      insight: '需要更明确的目标、流程与成功标准。',
      nextAction: '补充验收标准和优先级。',
      tags: ['功能设计']
    }
  },
  {
    title: '路线图候选',
    description: '适合进入季度规划的重点项目。',
    draft: {
      title: '放进路线图评估的项目',
      type: 'requirement' as ItemType,
      workspace: 'roadmap' as WorkspaceKey,
      insight: '影响范围较大，适合纳入阶段目标。',
      nextAction: '评估资源和依赖。',
      tags: ['路线图']
    }
  }
];

const createEmptyDraft = (): Omit<Item, 'id' | 'updatedAt' | 'score'> => ({
  title: '',
  type: 'idea',
  status: 'captured',
  priority: 'P1',
  workspace: 'inbox',
  owner: '我自己',
  source: '',
  insight: '',
  nextAction: '',
  tags: []
});

const getStoredItems = (): Item[] => {
  if (typeof window === 'undefined') return INITIAL_ITEMS;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return INITIAL_ITEMS;

  try {
    const parsed = JSON.parse(raw) as Item[];
    return parsed.length ? parsed : INITIAL_ITEMS;
  } catch {
    return INITIAL_ITEMS;
  }
};

const formatNow = () =>
  new Date().toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceKey>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string>('item-2');
  const [draft, setDraft] = useState(createEmptyDraft());

  useEffect(() => {
    const stored = getStoredItems();
    setItems(stored);
    if (!stored.some(item => item.id === selectedId)) {
      setSelectedId(stored[0]?.id ?? '');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return items
      .filter(item => item.workspace === activeWorkspace)
      .filter(item => {
        if (!keyword) return true;
        return [item.title, item.source, item.insight, item.tags.join(' ')].some(field => field.toLowerCase().includes(keyword));
      })
      .sort((a, b) => b.score - a.score);
  }, [activeWorkspace, items, searchTerm]);

  const selectedItem = useMemo(
    () => filteredItems.find(item => item.id === selectedId) ?? filteredItems[0] ?? null,
    [filteredItems, selectedId]
  );

  useEffect(() => {
    if (selectedItem && selectedItem.id !== selectedId) {
      setSelectedId(selectedItem.id);
    }
  }, [selectedId, selectedItem]);

  const metrics = useMemo(() => {
    const total = items.length;
    const planned = items.filter(item => item.status === 'planned' || item.status === 'building').length;
    const highPriority = items.filter(item => item.priority === 'P0').length;
    const ideaCount = items.filter(item => item.type === 'idea').length;

    return [
      { label: '总条目', value: total, hint: '持续沉淀需求和灵感' },
      { label: '推进中', value: planned, hint: '已规划或开发中的事项' },
      { label: '高优先级', value: highPriority, hint: '需要尽快明确行动方案' },
      { label: '待验证想法', value: ideaCount, hint: '先验证，再升级为需求' }
    ];
  }, [items]);

  const addItem = () => {
    if (!draft.title.trim()) return;

    const nextItem: Item = {
      ...draft,
      id: `item-${Date.now()}`,
      title: draft.title.trim(),
      source: draft.source.trim() || '暂未补充来源',
      insight: draft.insight.trim() || '暂未补充核心判断',
      nextAction: draft.nextAction.trim() || '待补充下一步动作',
      score: draft.priority === 'P0' ? 95 : draft.priority === 'P1' ? 82 : 70,
      updatedAt: formatNow()
    };

    setItems(prev => [nextItem, ...prev]);
    setActiveWorkspace(nextItem.workspace);
    setSelectedId(nextItem.id);
    setDraft(createEmptyDraft());
  };

  const updateSelectedStatus = (status: ItemStatus) => {
    if (!selectedItem) return;

    setItems(prev =>
      prev.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              status,
              updatedAt: formatNow()
            }
          : item
      )
    );
  };

  const promoteToRequirement = () => {
    if (!selectedItem) return;

    setItems(prev =>
      prev.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              type: 'requirement',
              workspace: 'requirements',
              status: item.status === 'captured' ? 'planned' : item.status,
              score: Math.max(item.score, 88),
              updatedAt: formatNow()
            }
          : item
      )
    );
    setActiveWorkspace('requirements');
  };

  const applyTemplate = (index: number) => {
    const template = QUICK_TEMPLATES[index];
    if (!template) return;

    setDraft(prev => ({
      ...prev,
      title: template.draft.title,
      type: template.draft.type,
      workspace: template.draft.workspace,
      insight: template.draft.insight,
      nextAction: template.draft.nextAction,
      tags: template.draft.tags
    }));
    setActiveWorkspace(template.draft.workspace);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 p-6">
        <aside className="w-[290px] shrink-0 rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/30">
          <div className="mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-semibold">RI</div>
            <h1 className="mt-4 text-2xl font-semibold">需求与想法管理台</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">把灵感采集、需求梳理和路线图推进放到一个工作台里。</p>
          </div>

          <div className="space-y-3">
            {WORKSPACES.map(space => {
              const count = items.filter(item => item.workspace === space.id).length;
              const isActive = space.id === activeWorkspace;

              return (
                <button
                  key={space.id}
                  onClick={() => setActiveWorkspace(space.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`mb-3 h-2 w-20 rounded-full bg-gradient-to-r ${space.accent}`}></div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-medium">{space.title}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{count}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{space.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">整理建议</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              <li>• 先记录原始场景，再补充价值判断。</li>
              <li>• P0 只保留真正需要尽快推进的事项。</li>
              <li>• 每周回顾一次，淘汰低价值条目。</li>
            </ul>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <section className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-200/70">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">你的个人产品工作台</p>
                <h2 className="mt-2 text-3xl font-semibold">从“随手一记”到“可执行需求”</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  这里适合你管理自己的需求和想法：先把灵感放进采集箱，再补充来源、洞察、下一步动作，最后把真正值得做的内容推进到需求池和路线图。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {metrics.map(metric => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-2xl font-semibold">{metric.value}</div>
                    <div className="mt-1 text-sm font-medium text-slate-700">{metric.label}</div>
                    <div className="mt-1 text-xs text-slate-500">{metric.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
            <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-200/70">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">新增条目</h3>
                  <p className="mt-1 text-sm text-slate-500">快速记录你的想法或需求，系统会自动存到浏览器本地。</p>
                </div>
                <div className="flex w-full gap-3 md:w-auto">
                  <Input value={searchTerm} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} placeholder="搜索标题、洞察、标签…" className="md:w-72" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {QUICK_TEMPLATES.map((template, index) => (
                  <button
                    key={template.title}
                    onClick={() => applyTemplate(index)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="text-sm font-semibold text-slate-800">{template.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{template.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  标题
                  <Input value={draft.title} onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(prev => ({ ...prev, title: e.target.value }))} placeholder="例如：增加周回顾视图" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  负责人
                  <Input value={draft.owner} onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(prev => ({ ...prev, owner: e.target.value }))} placeholder="例如：我自己" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  类型
                  <select
                    value={draft.type}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDraft(prev => ({ ...prev, type: e.target.value as ItemType }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="idea">想法</option>
                    <option value="requirement">需求</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  所属区域
                  <select
                    value={draft.workspace}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDraft(prev => ({ ...prev, workspace: e.target.value as WorkspaceKey }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {WORKSPACES.map(space => (
                      <option key={space.id} value={space.id}>
                        {space.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                  来源 / 背景
                  <textarea
                    value={draft.source}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(prev => ({ ...prev, source: e.target.value }))}
                    rows={3}
                    placeholder="这个想法从哪里来？用户反馈、自己观察，还是临时灵感？"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  核心洞察
                  <textarea
                    value={draft.insight}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(prev => ({ ...prev, insight: e.target.value }))}
                    rows={4}
                    placeholder="为什么值得做？解决什么问题？"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  下一步动作
                  <textarea
                    value={draft.nextAction}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(prev => ({ ...prev, nextAction: e.target.value }))}
                    rows={4}
                    placeholder="下一步准备验证、访谈、拆解还是立项？"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  优先级
                  <select
                    value={draft.priority}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setDraft(prev => ({ ...prev, priority: e.target.value as Priority }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="P0">P0 - 最高优先级</option>
                    <option value="P1">P1 - 重要</option>
                    <option value="P2">P2 - 可稍后</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  标签
                  <Input
                    value={draft.tags.join(', ')}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDraft(prev => ({
                        ...prev,
                        tags: e.target.value
                          .split(',')
                          .map((tag: string) => tag.trim())
                          .filter(Boolean)
                      }))
                    }
                    placeholder="例如：效率, 复盘, AI"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button onClick={addItem} className="rounded-full px-5">
                  保存条目
                </Button>
                <Button variant="ghost" onClick={() => setDraft(createEmptyDraft())} className="rounded-full px-5">
                  清空输入
                </Button>
                <span className="text-sm text-slate-500">提示：所有条目会保存在当前浏览器本地，无需后端即可先用起来。</span>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-200/70">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{WORKSPACES.find(space => space.id === activeWorkspace)?.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">按照价值分数排序，优先查看更值得跟进的事项。</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{filteredItems.length} 条</span>
                </div>

                <ScrollArea className="mt-5 max-h-[360px] pr-2">
                  <div className="space-y-3">
                    {filteredItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          selectedItem?.id === item.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_META[item.priority]}`}>{item.priority}</span>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{ITEM_TYPE_META[item.type]}</span>
                          <span className={`rounded-full px-2.5 py-1 text-xs ${STATUS_META[item.status].tone}`}>{STATUS_META[item.status].label}</span>
                        </div>
                        <div className="mt-3 flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.insight}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-right">
                            <div className="text-lg font-semibold">{item.score}</div>
                            <div className="text-xs text-slate-500">分数</div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}

                    {filteredItems.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        当前区域还没有匹配条目，试试新建一个想法或切换搜索关键词。
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40">
                {selectedItem ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_META[selectedItem.priority]}`}>{selectedItem.priority}</span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{ITEM_TYPE_META[selectedItem.type]}</span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{selectedItem.owner}</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">{selectedItem.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">最近更新：{selectedItem.updatedAt}</p>

                    <div className="mt-6 space-y-5 text-sm leading-7 text-slate-200">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">来源背景</div>
                        <p className="mt-2">{selectedItem.source}</p>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">核心洞察</div>
                        <p className="mt-2">{selectedItem.insight}</p>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">下一步动作</div>
                        <p className="mt-2">{selectedItem.nextAction}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(Object.keys(STATUS_META) as ItemStatus[]).map(status => (
                        <button
                          key={status}
                          onClick={() => updateSelectedStatus(status)}
                          className={`rounded-full px-3 py-2 text-xs transition ${
                            selectedItem.status === status ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {STATUS_META[status].label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button onClick={promoteToRequirement} className="rounded-full bg-white px-5 text-slate-900 hover:bg-slate-200">
                        升级为正式需求
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => updateSelectedStatus('done')}
                        className="rounded-full border border-white/15 bg-white/5 px-5 text-white hover:bg-white/10"
                      >
                        标记完成
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-sm text-slate-300">
                    请选择一个条目查看详情。
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
