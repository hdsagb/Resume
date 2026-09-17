/* ============================================================
 *  data.js — 全站内容数据源
 *  ------------------------------------------------------------
 *  【怎么改】所有展示内容都在这里，改完刷新页面即可生效。
 *  【怎么加项目】往 PROJECTS 数组里再加一个 {} 对象，
 *                页面会自动多出一张卡片 + 一个筛选标签。
 * ============================================================ */

/* ---------- 1. 基本信息 ---------- */
const PROFILE = {
  name: "朱煜杰",               // ← 改成你的姓名
  nameEn: "Zhu Yujie",          // ← 拼音/英文名
  school: "上海杉达学院",
  major: "计算机科学与技术",
  grade: "本科在读",
  role: "嵌入式开发 / AI 应用 / 全栈入门中",
  // Hero 区打字机轮播的关键词
  keywords: ["嵌入式开发", "AI 智能体搭建", "前端工程", "摸鱼学十级学者"],
  intro: `我是上海杉达学院计算机科学与技术专业的在读本科生。喜欢把想法真正跑起来——
          从单片机的寄存器配置，到在扣子上搭一个能讲课的 AI 智能体，再到亲手写一个
          能放进简历的网站。相信"做完"比"想完"更重要，也相信适度摸鱼是高效的前提。`,
  contacts: [
    { icon: "mail", label: "邮箱", value: "your@email.com", href: "mailto:your@email.com" },
    { icon: "github", label: "GitHub", value: "github.com/your-id", href: "https://github.com/" },
    { icon: "phone", label: "手机", value: "138-0000-0000", href: "tel:13800000000" },
    { icon: "map", label: "城市", value: "上海", href: "#" }
  ]
};

/* ---------- 2. 技能条（百分比自行调整） ---------- */
const SKILLS = [
  { name: "C 语言 / 单片机开发", level: 85, group: "core" },
  { name: "STM32 / 51 单片机", level: 80, group: "core" },
  { name: "Python", level: 75, group: "core" },
  { name: "Coze 智能体 / 提示词工程", level: 82, group: "ai" },
  { name: "HTML / CSS / JavaScript", level: 70, group: "web" },
  { name: "Git / 工程协作", level: 68, group: "web" }
];

const SKILL_TAGS = {
  core: ["C", "C++", "Python", "STM32", "51 单片机", "Keil", "Altium Designer", "串口通信", "传感器驱动"],
  ai: ["Coze / 扣子", "Prompt 工程", "知识库 RAG", "工作流编排", "大模型应用", "插件调用"],
  web: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub Pages", "响应式布局"]
};

/* ---------- 3. 项目展示（★ 重点：往这里加新项目） ----------
 * 字段说明：
 *   title    项目名
 *   subtitle 一句话定位
 *   desc     详细描述
 *   tags     技术标签（自动成为筛选条件）
 *   category 分类 key，需与 PROJECT_CATEGORIES 对应
 *   year     年份
 *   role     担任角色
 *   highlights 亮点列表（数组，可留空）
 *   links    [{label, href}]，没有就填 []
 *   featured true 时左上显示"精选"角标
 */
const PROJECT_CATEGORIES = {
  all: "全部",
  ai: "AI 智能体",
  embedded: "嵌入式 / 硬件",
  web: "Web 开发",
  other: "其他"
};

const PROJECTS = [
  {
    title: "计算机教育 AI 智能体",
    subtitle: "基于扣子（Coze）平台搭建的学科答疑助手",
    desc: "从 0 到 1 搭建的计算机学科教学辅助智能体：通过工作流编排 + 学科知识库，实现知识点讲解、代码纠错、习题生成与学习路径推荐，支持多轮上下文对话。",
    tags: ["Coze / 扣子", "Prompt 工程", "知识库 RAG", "工作流编排"],
    category: "ai",
    year: "2025",
    role: "独立开发",
    highlights: [
      "设计分层提示词，约束回答的专业度与讲解节奏",
      "接入课程知识库，降低大模型幻觉、提升回答准确率",
      "编排多节点工作流，串联意图识别 → 检索 → 生成 → 校验"
    ],
    links: [{ label: "体验链接", href: "#" }],
    featured: true
  },
  {
    title: "蓝桥杯单片机设计与开发",
    subtitle: "省级竞赛获奖作品 · 三等奖",
    desc: "围绕蓝桥杯单片机赛道赛题，完成硬件外设驱动开发与系统逻辑调试，覆盖数码管/按键/ADC/定时器/串口等模块，在限定时间内实现功能完整、运行稳定的嵌入式系统。",
    tags: ["C 语言", "51 单片机", "Keil", "硬件调试"],
    category: "embedded",
    year: "2025",
    role: "独立完成",
    highlights: [
      "模块化驱动设计：显示、按键消抖、采样、通信分层实现",
      "定时器中断 + 状态机调度，保证多任务实时响应",
      "现场调试与性能优化，最终获三等奖"
    ],
    links: [{ label: "查看证书", href: "#" }],
    featured: true
  },
  {
    title: "个人门户展示网站",
    subtitle: "你正在看的这个页面",
    desc: "纯静态响应式个人主页，零依赖、零构建，直接托管在 GitHub Pages。内容全部由 data.js 驱动，新增项目只需往数组里加一条记录。",
    tags: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    category: "web",
    year: "2026",
    role: "设计 + 开发",
    highlights: [
      "深色科技风 + 霓虹渐变，滚动动效与卡片交互",
      "数据驱动渲染，内容与视图完全解耦",
      "移动端自适应，一键部署"
    ],
    links: [{ label: "源码仓库", href: "#" }],
    featured: false
  }
  /* ↓↓↓ 复制下面的模板继续加项目，记得上一行末尾加逗号 ↓↓↓
  {
    title: "项目名称",
    subtitle: "一句话定位",
    desc: "项目详细描述……",
    tags: ["标签1", "标签2"],
    category: "web",
    year: "2026",
    role: "担任角色",
    highlights: ["亮点 1", "亮点 2"],
    links: [{ label: "链接名", href: "#" }],
    featured: false
  }
  */
];

/* ---------- 4. 荣誉奖项 ---------- */
const HONORS = [
  {
    title: "蓝桥杯全国软件和信息技术专业人才大赛",
    award: "单片机设计与开发 · 三等奖",
    year: "2025",
    desc: "在限定时间内完成硬件驱动开发与系统联调，功能完整性与稳定性获评委认可。"
  },
  {
    title: "计算机教育 AI 智能体 · 上线运行",
    award: "独立完成并投入实际使用",
    year: "2025",
    desc: "基于扣子平台自研的教学辅助智能体，服务计算机学科答疑场景。"
  }
];

/* ---------- 5. 经历时间线 ---------- */
const TIMELINE = [
  {
    year: "2024",
    title: "入学 · 上海杉达学院",
    org: "计算机科学与技术",
    desc: "系统学习程序设计、数据结构与计算机组成原理，开始接触单片机与嵌入式开发。"
  },
  {
    year: "2025",
    title: "参加蓝桥杯单片机赛道",
    org: "省级赛区",
    desc: "完成外设驱动开发与系统调试，获三等奖，奠定嵌入式方向的技术基础。"
  },
  {
    year: "2025",
    title: "搭建计算机教育 AI 智能体",
    org: "扣子（Coze）平台",
    desc: "把大模型能力落地到教学场景，掌握提示词工程、知识库与工作流编排。"
  },
  {
    year: "2026",
    title: "建设个人门户站点",
    org: "GitHub Pages",
    desc: "把能力、荣誉与项目沉淀为一个可持续更新的作品集平台。"
  }
];

/* ---------- 6. 兴趣爱好（摸鱼专区） ---------- */
const HOBBY = {
  title: "摸鱼",
  subtitle: "Chill & Recharge",
  desc: "高强度调试之后，适当放空是恢复算力最好的方式。摸鱼不是躺平，是让灵感在后台进程里慢慢跑。",
  skills: [
    { name: "摸鱼", level: 99 },
    { name: "调试到凌晨还精神", level: 88 },
    { name: "假装在看文档", level: 95 },
    { name: "认真写代码", level: 92 }
  ],
  quotes: [
    "代码跑不通的时候，先去摸会儿鱼，回来就好了一半。",
    "Ctrl+S 是程序员的安全感，摸鱼是程序员的续命符。",
    "人生苦短，我用摸鱼换取思考时间。"
  ]
};
