/* ChatGPT / Codex 更新雷达 · 数据层
   更新方法：把新条目按日期插进 ENTRIES（新的在前），改 META.updated，
   页面会自动重算统计、分日、筛选与矩阵。不需要动 index.html。 */

const META = {
  title: "ChatGPT & Codex 更新雷达",
  kicker: "WEEKLY SIGNAL · 第 46 周",
  lede: "按时间线读 OpenAI 这一期到底改了什么，每条都标注它在 DeepSeek Harness 里的落点：已经有了、底层能模仿，还是暂时做不到。",
  updated: "2026-11-11",
  window: "2026-10-01 → 2026-11-11",
  nextUpdate: "每周一 09:00",
  sources: [
    { label: "ChatGPT Release Notes", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
    { label: "ChatGPT & Codex Changelog", url: "https://learn.chatgpt.com/docs/changelog" },
    { label: "Model Release Notes", url: "https://help.openai.com/en/articles/9624314-model-release-notes" }
  ]
};

const STATUS = {
  has:   { label: "DSH 已有", short: "已有",   glyph: "●", tone: "ok"   },
  adapt: { label: "底层可移植", short: "可移植", glyph: "◐", tone: "amber" },
  no:    { label: "暂时做不到", short: "做不到", glyph: "○", tone: "hot"  }
};

const SOURCE = {
  chatgpt: { label: "ChatGPT", tone: "chatgpt" },
  codex:   { label: "Codex",   tone: "codex"   },
  ios:     { label: "手机端",   tone: "ios"     },
  model:   { label: "模型",     tone: "model"   }
};

const ENTRIES = [
  {
    id: "codex-0167",
    date: "2026-11-06",
    source: "codex",
    product: "Codex CLI 0.167.0",
    title: "Codex 有了「Agent 命令中心」和未读标记",
    lede: "终端里开出多会话总控台：一条命令看所有在跑的 agent，没看完的结果打未读标记，还能在选择器里换后端而不丢草稿。",
    points: [
      "codex agents --no-daemon 打开命令中心；命令中心与 session picker 标记未读结果",
      "终端内切换已连接的后端，切换时保留草稿",
      "批准弹窗里可直接展开 patch 细节；可选用 macOS / Windows 系统代理"
    ],
    dsh: {
      status: "adapt",
      note: "数据面齐了，缺视图面",
      detail: "agent_teams_status、list_agents、job_list 已经把「谁在跑、跑到哪、结果是什么」全吐出来了，缺的是把它们聚合成一个带未读态的会话中心——纯前端 + 一个 read_at 索引的活。",
      path: "会话列表加 read_at 状态文件 → job 完成后写入未读 → 前端按未读排序并列显示"
    },
    src: [{ label: "Changelog · 2026-11-06", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "ios-300",
    date: "2026-11-02",
    source: "ios",
    product: "ChatGPT for iOS 1.2026.300",
    title: "手机端作曲器直接管附件，已读状态跨设备同步",
    lede: "全屏作曲器里就能加、预览、删附件，不用退出输入框；任务已读状态与支持的宿主同步，消掉别的设备上的红点。",
    points: [
      "在作曲器内完成附件增删与预览",
      "任务已读状态与支持的宿主同步，清理跨设备陈旧红点"
    ],
    dsh: {
      status: "adapt",
      note: "能做的都做得到，只是形态不同",
      detail: "DSH 手机端是 Web + 网关，浏览器里做附件上传/预览完全可行；已读同步本质是服务端存 read_at，而 DSH 会话状态在本地，跨设备需要一个同步位。真正缺的是原生壳，不是能力。",
      path: "作曲器接入附件上传 → read_at 落到网关侧存储 → 多端拉同一份已读表"
    },
    src: [{ label: "Changelog · 2026-11-02", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "codex-0166",
    date: "2026-10-29",
    source: "codex",
    product: "Codex CLI 0.166.0",
    title: "终端补课：键盘选词、Markdown 回答、安全拦截说人话",
    lede: "这一版几乎全是 TUI 手感：按词/行/页选文本，异步提问统一 Markdown 渲染，拦截时给出更清楚的解释和更安全的后续选项。",
    points: [
      "键盘驱动的 transcript 选择（词 / 行 / 页）+ 集成搜索 + 可配快捷键",
      "codex queue --resume 恢复未加载线程；codex doctor --network-only 专查网络与 WebSocket"
    ],
    dsh: {
      status: "has",
      note: "对应物已经是别的形状",
      detail: "DSH 没有 TUI，这些交互在 Web 壳里天然不同：队列由后台 job 承担，诊断由 ego_doctor 与 MCP health check 承担，渲染直接是富文本组件而不是终端 Markdown。",
      path: "无需移植；仅「诊断命令」这一项可作为 CLI 子命令补齐"
    },
    src: [{ label: "Changelog · 2026-10-29", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "codex-0165",
    date: "2026-10-27",
    source: "codex",
    product: "Codex CLI 0.165.0",
    title: "Memory v2 默认开启，还能导入别家 Agent 的记忆",
    lede: "新 profile 默认带记忆；支持把外部 agent 的记忆导进来。同时默认允许在对话中改 reasoning effort，会话选择器加仓库过滤。",
    points: [
      "memory v2 对新 profile 默认开启，并支持导入外部 agent 的记忆",
      "会话中改 reasoning effort 默认可用；app-server 增加实验性 thread fork",
      "会话选择器加仓库过滤，命令中心按目录分组，跨 worktree 找会话"
    ],
    dsh: {
      status: "has",
      note: "比它更重，但少一个入口",
      detail: "DSH 的 Mnemon 是三层：runtime 记忆（MEMORY / USER）常驻上下文、项目文档库可检索、记忆空间还能建图关系与迭代查询。真正缺的是「把 Claude Code / Codex 的记忆导进来」这个迁移入口。",
      path: "缺导入器：读对方 MEMORY.md / 导出文件 → 映射到 runtime memory 或独立记忆空间"
    },
    src: [{ label: "Changelog · 2026-10-27", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "gpt61-terra",
    date: "2026-10-26",
    source: "model",
    product: "GPT-6.1 Terra",
    title: "GPT-6.1 Terra：会看屏幕、会操作电脑的工作模型",
    lede: "先上 Work 和 Codex，主打图像/屏幕理解 + computer use + 直接给结论的写作；Plus / Pro / Business / Enterprise / Edu 逐步开放。",
    points: [
      "在 Advanced 模型列表里选择，Work 手机端也支持",
      "不支持 UAE 推理驻留；企业可用性取决于管理员开关",
      "标准与快速档位都支持"
    ],
    dsh: {
      status: "has",
      note: "DSH 不绑模型，绑定的是工具面",
      detail: "模型本身由 provider 决定，接上就能用；computer use 这条 DSH 已经有落地件——ego 浏览器走 CDP，能真的点、填、截图、等响应。真正的不确定是这类模型在境内 provider 上开不开放。",
      path: "换 provider / 加模型路由即可；computer use 复用现有浏览器工具"
    },
    src: [
      { label: "Release Notes · 2026-10-26", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
      { label: "Changelog · 2026-10-26", url: "https://learn.chatgpt.com/docs/changelog" }
    ]
  },
  {
    id: "codex-0164",
    date: "2026-10-23",
    source: "codex",
    product: "Codex CLI 0.164.0",
    title: "十个数字槽位存常用提示词，/model 直接带参数",
    lede: "把高频提示词和 slash 命令塞进 1–0 十个槽位，键盘菜单一按就到；/model、/permissions 支持行内参数，不用再进菜单。",
    points: [
      "/presets 存十个可复用提示词与 slash 命令，带键盘菜单",
      "Kitty / Sixel 终端里全屏预览图片；MCP 支持需要 client secret 的 OAuth"
    ],
    dsh: {
      status: "adapt",
      note: "插件层几十行的事",
      detail: "DSH 有 skill 体系和 slash 插件位，但没有「十个槽位」这种肌肉记忆式预设。在 Web 壳或插件里加一个 presets 面板即可，不涉及内核。",
      path: "插件注册 10 个预设槽 → 键位绑定 → 一键填入作曲器"
    },
    src: [{ label: "Changelog · 2026-10-23", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "locked-chats",
    date: "2026-10-20",
    source: "chatgpt",
    product: "ChatGPT",
    title: "聊天可以上锁：4 位 PIN + 设备认证",
    lede: "被锁的会话留在账号里，但从历史、置顶和搜索里消失；用 4 位 PIN 或设备认证才打得开，保留策略与训练设置不变。",
    points: [
      "从会话的更多菜单里选 Lock chat",
      "覆盖 Free / Go / Plus / Pro，Web 与桌面端均支持"
    ],
    dsh: {
      status: "adapt",
      note: "能做，但要自己补加密",
      detail: "DSH 会话以本地 jsonl.zstd 落盘，没有加密存储原语，也没有 PIN 门。做成插件是可行的：加密索引 + 钥匙串存密钥 + 进入前解锁，但属于「自己造一套」而不是「开关一开」。",
      path: "会话目录加密（AES-GCM）→ 密钥进 macOS 钥匙串 → 解锁后解密到临时目录再读"
    },
    src: [{ label: "Release Notes · 2026-10-20", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" }]
  },
  {
    id: "slides",
    date: "2026-10-16",
    source: "chatgpt",
    product: "ChatGPT Slides",
    title: "对话里直接做 PPT，还能多人同时改",
    lede: "从对话、文件或大纲起一份 deck，也能给一份样例让它照着定风格；做好的稿子能在 Space 里邀请同事实时协作。",
    points: [
      "文本、图片、形状、图表直接在画布上改",
      "Space 内多人实时编辑、共享评论",
      "可导出 PowerPoint / PDF / Google Slides；桌面端可直接用 PowerPoint 或 Keynote 打开"
    ],
    dsh: {
      status: "adapt",
      note: "单人链路齐，差协作层",
      detail: "Univer Slide 覆盖了生成 → 编辑 → lint → 导出 pptx 的整条链路，页内还能用 SVG 精确排版。缺的是 Space 那种共享画布与实时协同——那是服务端 + CRDT 的工程量，不是加个按钮。",
      path: "单人链路已通；协作要另起共享存储与冲突合并层"
    },
    src: [{ label: "Release Notes · 2026-10-16", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" }]
  },
  {
    id: "codex-0163",
    date: "2026-10-15",
    source: "codex",
    product: "Codex CLI 0.163.0",
    title: "它回答到一半，你可以插话改方向",
    lede: "回复中发 follow-up 会立刻转向，打断会连 Code Mode 单元和它嵌套的工具调用一起停；同时允许并行跑独立只读工具。",
    points: [
      "回复期间插话立即生效；打断会停止 Code Mode cell 及其嵌套调用",
      "独立的只读工具（skill / memory / 会话历史）可并行执行",
      "/config 跨类搜索设置；/keymap 可配 leader key（默认 Ctrl+X）"
    ],
    dsh: {
      status: "has",
      note: "机制在，实时性差一档",
      detail: "DSH 的 run_code 里独立只读调用本来就并发（Promise.all），消息也能插队；差别是「边流式边转向」在 Web 端表现为排队消息，不是把当前回合就地掰弯。",
      path: "无需移植；若要实时转向需在 agent 循环里加中断点"
    },
    src: [{ label: "Changelog · 2026-10-15", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "composer-predictions",
    date: "2026-10-09",
    source: "codex",
    product: "Codex 桌面端",
    title: "输入框开始猜你下一句，Tab 接受",
    lede: "Codex 答完后，作曲器可能浮出一句建议；按 Tab 接受、可改再发，不会替你自动发送。beta 阶段不计额度。",
    points: [
      "基于当前线程的上下文预测下一条消息",
      "默认开启，可在 General → Composer 关闭 Show predictions"
    ],
    dsh: {
      status: "adapt",
      note: "架构上很轻，难在延迟与成本",
      detail: "在 Web 壳的作曲器上做 debounce + 小模型补全就能复刻；真正的取舍是每次停手都要打一次模型，要么本地小模型，要么严格限频。",
      path: "作曲器 onIdle → 一次受限补全请求 → Tab 接受填入；按会话限流"
    },
    src: [{ label: "Release Notes · 2026-10-09", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" }]
  },
  {
    id: "codex-0162",
    date: "2026-10-08",
    source: "codex",
    product: "Codex CLI 0.162.0",
    title: "Worktrees 进工具链，Code Mode 能按相关度搜工具",
    lede: "受信项目里可以创建和列出受管 git worktree；Code Mode 补了 JS 侧的流式 promise 助手，以及可选的工具相关度排序。",
    points: [
      "创建 / 列出受管 git worktree（需开启 worktrees 特性）",
      "Code Mode：流式 promise 结果助手 + opt-in ranked tool search",
      "/copy 复制 transcript 块，Ctrl+Insert 复制选区"
    ],
    dsh: {
      status: "adapt",
      note: "一半已经是我们的主场",
      detail: "run_code 就是 DSH 的 Code Mode：工具直接是 SDK 绑定，天生可并发、可组合，比「按相关度搜工具」更直接。worktree 反而没有内置工具，只能走 bash 或插件封装。",
      path: "worktree 薄封装成工具（git worktree add/list/remove + 会话绑定）"
    },
    src: [{ label: "Changelog · 2026-10-08", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "gpt6",
    date: "2026-10-07",
    source: "chatgpt",
    product: "GPT-6 + Intelligent UI",
    title: "GPT-6 与「智能界面」：边答边想，还会自己排版",
    lede: "同一篇公告里两件事：回答可以先出可靠结论、再继续思考或调工具补内容；界面可以自动在文字、图表、可交互小组件之间选格式。",
    points: [
      "Intelligent UI：文本 / 可视化 / 交互元素按问题自动组合，也能退回纯文字",
      "渐进式回答：不必再问一次，后续发现会接进同一条回答",
      "Chat 里 Plus / Pro / Business / Enterprise 用 GPT-6 Sol，Free / Go 用 GPT-6 Luna"
    ],
    dsh: {
      status: "has",
      note: "两条都踩中了，路径不同",
      detail: "dsh-ui / render_ui 的组件库（chart、table、mermaid、echart、choices、quiz、timeline、compare、entity-card…）覆盖「结构化回答」；publish_checkpoint 就是渐进式回答的骨架——本轮回复本身就在用。差别：DSH 是模型显式点组件、白名单固定，不是自动编排任意交互；也没有 token 级提前开口。",
      path: "已具备；若要「自动选格式」，可在 system prompt 里加一层格式决策，而不是改渲染层"
    },
    src: [
      { label: "Release Notes · 2026-10-07", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
      { label: "OpenAI · GPT-6 for everyone", url: "https://openai.com/index/gpt-6-for-everyone/" }
    ]
  },
  {
    id: "codex-0161",
    date: "2026-10-07",
    source: "codex",
    product: "Codex CLI 0.161.0",
    title: "默认换成 GPT-6.1 Sol，MCP 能当场登录",
    lede: "顺手把 MCP 的登录路径打通：终端会话里一条 /mcp login 就能完成授权，不用退出去配。",
    points: [
      "GPT-6.1 Sol 成为 bundled 与 Amazon Bedrock 目录的默认模型",
      "会话中用 /mcp login <name> 登录 MCP server",
      "可选麦克风 / 扬声器 / 输入声道，偏好保存在本地"
    ],
    dsh: {
      status: "has",
      note: "MCP 这块我们更完整",
      detail: "DSH 有连接器市场、OAuth 授权、健康检查、按会话启用工具，甚至有治理策略（连接 / Server / Tool 三层）。语音反而是缺口：只有 TTS，没有麦克风输入。",
      path: "MCP 无需移植；语音输入要另起音频栈"
    },
    src: [{ label: "Changelog · 2026-10-07", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "ios-widgets",
    date: "2026-10-02",
    source: "ios",
    product: "ChatGPT for iOS 1.2026.267",
    title: "手机小组件：最近任务和额度直接摆在桌面",
    lede: "主屏和锁屏小组件能看选中电脑上的最近任务、剩余用量与重置时间；还加了「发送后保持键盘」的小设置。",
    points: [
      "主屏小组件显示选中电脑的最近任务",
      "用量与重置时间进主屏 / 锁屏小组件"
    ],
    dsh: {
      status: "no",
      note: "没有原生壳就是没有",
      detail: "DSH 手机端是 Web + 网关，PWA 做不出主屏与锁屏小组件，也不进系统级通知中心。要补这块得先有 Swift 壳，属于新开一条战线。",
      path: "暂不可行：需要原生 iOS 客户端（WidgetKit）"
    },
    src: [{ label: "Changelog · 2026-10-02", url: "https://learn.chatgpt.com/docs/changelog" }]
  },
  {
    id: "codex-0160",
    date: "2026-10-01",
    source: "codex",
    product: "Codex CLI 0.160.0",
    title: "命令中心能翻旧任务，项目外也能开工",
    lede: "长会话列表加了键盘可达的「Show more」；策略允许时可以在项目外按 workspace 默认启动，恢复时会带回保存的权限。",
    points: [
      "命令中心翻更早任务；项目外按 workspace 默认启动",
      "opt-in Guardian 复核：回捞更早的用户指令，并带上 agent handoff 的上下文"
    ],
    dsh: {
      status: "adapt",
      note: "复核这件事我们有更硬的形态",
      detail: "「回捞更早指令」在 DSH 里对应 AgentTeams 的质量契约：objective / acceptance / verify 写在任务上，review 必须给 verdict 和 findings，还能被 amend 留痕——比一次性复核更可审计。缺的只是「项目外启动」这种目录策略。",
      path: "目录白名单 + 启动策略；复核无需移植"
    },
    src: [{ label: "Changelog · 2026-10-01", url: "https://learn.chatgpt.com/docs/changelog" }]
  }
];

const MATRIX = [
  {
    dim: "模型与推理",
    openai: "GPT-6 Sol/Luna → 6.1 Sol → 6.1 Terra，几周一换；reasoning effort 会话内可改",
    dsh: "不绑模型：provider 自由切换，effort 写进会话配置；缺的是运行时热切换 UI",
    status: "has"
  },
  {
    dim: "交互与呈现",
    openai: "Intelligent UI 自动选格式；渐进式回答；作曲器预测下一句",
    dsh: "dsh-ui 组件库 + publish_checkpoint 已有对应机制；预测补全需要前端加一层",
    status: "adapt"
  },
  {
    dim: "Agent 编排",
    openai: "命令中心、未读标记、跨后端切换、worktree 感知、插话转向",
    dsh: "AgentTeams（DAG + 质量门）、子 agent、后台 job 都在；缺「命令中心」这一层聚合视图",
    status: "adapt"
  },
  {
    dim: "开发扩展",
    openai: "MCP OAuth、插件进程宿主、Code Mode 工具检索、ACP 接别家 agent",
    dsh: "MCP 三层治理、插件系统、run_code（PTC）都更彻底；这项是 DSH 的强项",
    status: "has"
  },
  {
    dim: "记忆与上下文",
    openai: "memory v2 默认开 + 导入外部 agent 记忆；锁会话",
    dsh: "Mnemon 三层记忆与文档库更强；缺导入器与加密锁",
    status: "adapt"
  },
  {
    dim: "客户端形态",
    openai: "iOS 原生 + 小组件 + 锁屏；桌面端 Codex app",
    dsh: "Web GUI + 手机网关 + 桌面壳；没有原生 iOS，小组件与锁屏做不到",
    status: "no"
  }
];
