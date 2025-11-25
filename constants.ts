import { GameMode, CardType } from "./types";

export const APP_NAME = "🩷包子🩵";

export const MODE_CONFIG = {
  [GameMode.SWEET]: {
    label: "甜蜜日常",
    color: "bg-pink-400",
    gradient: "from-pink-400 to-rose-400",
    emoji: "🍬",
    description: "轻松温馨的互动，适合热身"
  },
  [GameMode.DEEP]: {
    label: "灵魂拷问",
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-purple-500",
    emoji: "🌌",
    description: "深入了解彼此的内心世界"
  },
  [GameMode.SPICY]: {
    label: "心跳加速",
    color: "bg-red-500",
    gradient: "from-red-500 to-rose-600",
    emoji: "🔥",
    description: "增加亲密度的趣味挑战"
  }
};

// 内置离线题库 - 当没有API Key时使用
export const OFFLINE_CONTENT = {
  [GameMode.SWEET]: [
    { type: CardType.TRUTH, emoji: "🥰", text: "第一次见到我的时候，你心里是怎么想的？", instruction: "请深情看着对方回答" },
    { type: CardType.DARE, emoji: "📸", text: "现在立刻合照一张，并设为手机壁纸至少24小时。", instruction: "要亲密一点哦" },
    { type: CardType.TRUTH, emoji: "🍭", text: "说出对方最可爱的三个优点。", instruction: "不许思考超过3秒" },
    { type: CardType.DARE, emoji: "💆", text: "给对方按摩肩膀 3 分钟。", instruction: "手艺要好" },
    { type: CardType.QUIZ, emoji: "🎵", text: "对方最近单曲循环的一首歌是什么？", instruction: "数321一起回答" },
    { type: CardType.DARE, emoji: "👀", text: "对视 30 秒，谁先笑谁就输了（输了刮鼻子）。", instruction: "保持严肃！" },
    { type: CardType.TRUTH, emoji: "📅", text: "描述一下你心目中完美的一天约会。", instruction: "具体到去哪里" },
    { type: CardType.DARE, emoji: "👸", text: "公主抱/背对方做5个深蹲。", instruction: "注意安全！" },
    { type: CardType.TRUTH, emoji: "🧸", text: "我做的哪件事让你觉得最暖心？", instruction: "好好回忆一下" },
    { type: CardType.DARE, emoji: "😘", text: "亲吻对方的额头，并说一声“我爱你”。", instruction: "要很温柔" }
  ],
  [GameMode.DEEP]: [
    { type: CardType.TRUTH, emoji: "💭", text: "你觉得我们在感情中最大的不同点是什么？", instruction: "诚实回答" },
    { type: CardType.TRUTH, emoji: "👵", text: "想象一下我们老了以后的样子，描述那个画面。", instruction: "可以很具体" },
    { type: CardType.TRUTH, emoji: "😨", text: "你目前最大的焦虑或恐惧是什么？", instruction: "即使与感情无关" },
    { type: CardType.TRUTH, emoji: "🌟", text: "如果有来生，你还愿意遇见我吗？为什么？", instruction: "看着眼睛回答" },
    { type: CardType.TRUTH, emoji: "🔑", text: "你觉得维持长久关系最重要的一个特质是什么？", instruction: "价值观探讨" },
    { type: CardType.TRUTH, emoji: "🥺", text: "我有哪次无意中伤害了你，但你没说出口？", instruction: "趁机解开心结" },
    { type: CardType.TRUTH, emoji: "💰", text: "对于金钱和消费，我们的观念一致吗？", instruction: "理性讨论" },
    { type: CardType.TRUTH, emoji: "🏠", text: "你理想中的“家”是什么样子的？", instruction: "不是指房子，是氛围" },
    { type: CardType.TRUTH, emoji: "🚀", text: "未来5年，你希望我们共同达成什么目标？", instruction: "关于未来" },
    { type: CardType.TRUTH, emoji: "🙏", text: "你最希望我为你改变的一点是什么？", instruction: "不许生气，虚心接受" }
  ],
  [GameMode.SPICY]: [
    { type: CardType.DARE, emoji: "👄", text: "用嘴喂对方吃一样东西（水果/零食）。", instruction: "不许用手" },
    { type: CardType.DARE, emoji: "👂", text: "在对方耳边轻轻吹气，并说一句悄悄话。", instruction: "越撩越好" },
    { type: CardType.TRUTH, emoji: "🔥", text: "你最喜欢我身体的哪个部位？", instruction: "要诚实哦" },
    { type: CardType.DARE, emoji: "🧊", text: "用冰块（或冷水浸过的手）划过对方的脖子。", instruction: "刺激一下" },
    { type: CardType.DARE, emoji: "👕", text: "帮对方脱掉一件衣物（外套/鞋袜均可）。", instruction: "慢慢来" },
    { type: CardType.DARE, emoji: "🙈", text: "蒙上对方眼睛，用手触碰他/她的脸，让他/她猜是哪个部位。", instruction: "猜错有惩罚" },
    { type: CardType.DARE, emoji: "💋", text: "种一个“草莓”或者亲吻脖子10秒。", instruction: "看情况执行" },
    { type: CardType.TRUTH, emoji: "🛌", text: "描述一个你对我的性幻想（如果不方便说可以跳过）。", instruction: "仅限二人世界" },
    { type: CardType.DARE, emoji: "🦵", text: "把手放在对方大腿上停留一分钟，并聊天。", instruction: "保持自然" },
    { type: CardType.DARE, emoji: "💃", text: "为对方跳一段性感的（或者搞笑的）舞蹈，持续15秒。", instruction: "放得开一点" }
  ]
};