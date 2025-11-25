# 🩷包子🩵 - 情侣互动卡牌 (Desktop)

专为情侣设计的网页版互动卡牌游戏，基于 Google Gemini AI 生成趣味内容。

## 🎮 怎么玩

1. **部署上线**：按照下方的部署指南将网站发布。
2. **打开网站**：使用电脑浏览器（推荐 Chrome/Edge）打开生成的网址。
3. **全屏体验**：按键盘 `F11` 进入全屏模式。
4. **开始游戏**：
   - 选择一个模式（甜蜜 / 深度 / 激情）。
   - 点击卡片或按 `空格键` 翻牌。
   - 再次按 `空格键` 切换下一张。

## 🚀 如何部署 (免费)

推荐使用 Vercel 进行一键部署：

1. Fork 或上传此代码到你的 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com)，点击 "Add New Project"。
3. 导入你的 GitHub 仓库。
4. **关键步骤 - 环境变量**：
   在 "Environment Variables" 区域：
   - **Name**: 填入 `API_KEY`
   - **Value**: 填入你的 Google Gemini API Key (以 `AIza` 开头)
   - 点击 **Add**。
5. 点击 **Deploy**。

## 🔑 如何获取 API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)。
2. 登录你的 Google 账号。
3. 点击 "Create API key"。
4. 复制生成的以 `AIza` 开头的字符串。

## 💻 本地运行 (开发者)

如果你想在自己电脑上运行代码：

1. 安装 Node.js。
2. 运行 `npm install` 安装依赖。
3. 复制 `.env.example` 为 `.env`。
4. 在 `.env` 文件中填入你的 `API_KEY`。
5. 运行 `npm run dev`。
