# 个人门户 · Personal Portfolio

朱煜杰（上海杉达学院 · 计算机科学与技术）的个人展示网站 —— 一个可持续更新的能力、荣誉、经历与项目作品集平台。

**技术栈**：纯静态 `HTML + CSS + JavaScript`，零依赖、零构建，双击 `index.html` 即可打开。

## 目录结构

```
.
├── index.html              # 页面结构
├── assets/
│   ├── css/style.css       # 深色科技风样式（含响应式）
│   └── js/
│       ├── data.js         # ★ 所有内容数据源，改这里
│       └── main.js         # 渲染与交互逻辑
└── README.md
```

## 怎么改内容？

**只改 `assets/js/data.js` 一个文件**，刷新页面即生效，不需要动 HTML/CSS。

| 想改什么 | 改哪个变量 |
| --- | --- |
| 姓名 / 院校 / 简介 / 联系方式 | `PROFILE` |
| 技能熟练度与标签 | `SKILLS` / `SKILL_TAGS` |
| **项目作品** | `PROJECTS`（加对象即可自动多一张卡片） |
| 荣誉奖项 | `HONORS` |
| 成长经历时间线 | `TIMELINE` |
| 摸鱼兴趣区 | `HOBBY` |

### 新增一个项目

往 `PROJECTS` 数组里加一条（注意上一条末尾补逗号）：

```js
{
  title: "项目名称",
  subtitle: "一句话定位",
  desc: "项目详细描述……",
  tags: ["标签1", "标签2"],
  category: "web",           // ai | embedded | web | other，自动成为筛选分类
  year: "2026",
  role: "担任角色",
  highlights: ["亮点 1", "亮点 2"],
  links: [{ label: "源码仓库", href: "https://github.com/..." }],
  featured: true             // true 时卡片带「精选」角标
}
```

## 本地预览

直接双击 `index.html`，或起一个本地服务：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署到 GitHub Pages

1. 推送到 GitHub 仓库；
2. 仓库 **Settings → Pages → Build and deployment**；
3. Source 选 `Deploy from a branch`，分支选 `main`（或 `master`），目录选 `/ (root)`；
4. 保存，稍等片刻即可通过 `https://<用户名>.github.io/Resume/` 访问。

## 已包含的内容

- **Hero**：打字机关键词、个人名片、数据统计
- **关于我**：自我介绍 + 方向 / 工作方式 / 正在学
- **专业能力**：熟练度进度条 + 三组技术标签云
- **项目作品**：分类筛选、卡片悬停光效、亮点清单、外链
- **荣誉奖项**：蓝桥杯单片机三等奖等
- **成长经历**：竖向渐变时间线
- **兴趣 · 摸鱼**：游动的小鱼、气泡、鸡汤切换彩蛋
- **联系方式**：图标化联系卡片
- 全站滚动入场动画、移动端自适应、空闲摸鱼彩蛋
