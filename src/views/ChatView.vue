<template>
  <div class="chat-view">
    <!-- Messages -->
    <section class="chat-messages" ref="messagesEl">
      <div v-for="msg in messages" :key="msg.id" class="msg-row" :class="msg.role">
        <!-- User message -->
        <template v-if="msg.role === 'user'">
          <div class="msg-avatar">
            <img src="/images/common/touxiang.png" alt="用户头像" />
          </div>
          <div class="msg-bubble user-bubble">
            <p>{{ msg.content }}</p>
          </div>
        
        </template>

        <!-- AI message -->
        <template v-else>
          <div class="ai-avatar">
            <span class="material-symbols-outlined icon-filled" style="color:#16130e">smart_toy</span>
          </div>
          <div class="ai-body">
            <!-- Summary card -->
            <div class="ai-card">
              <h2 class="ai-card-title">
                <span class="material-symbols-outlined" style="font-size:16px">analytics</span>
                STAR COFFEE咖啡馆智能助手
              </h2>
              <p class="ai-card-desc">{{ msg.summary }}</p>
              <div class="ai-reasons">
                <div v-for="r in msg.reasons" :key="r.label" class="reason-item">
                  <div class="reason-label">{{ r.label }}</div>
                  <p class="reason-text">{{ r.text }}</p>
                </div>
              </div>
            </div>

            <!-- Solutions -->
            <!-- <div class="solutions">
              <h3 class="solutions-heading">
                <span class="divider-line"></span>
                策略性优化方案
              </h3>
              <div class="solutions-grid">
                <div v-for="s in msg.solutions" :key="s.title" class="solution-card">
                  <div class="solution-bg-icon">
                    <span class="material-symbols-outlined" style="font-size:64px;color:var(--primary)">{{ s.icon }}</span>
                  </div>
                  <div class="solution-num">{{ s.num }}</div>
                  <h4 class="solution-title">{{ s.title }}</h4>
                  <p class="solution-text">{{ s.text }}</p>
                </div>
              </div>
            </div> -->

            
          </div>
        </template>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="msg-row ai">
        <div class="ai-avatar">
          <span class="material-symbols-outlined icon-filled" style="color:#16130e">smart_toy</span>
        </div>
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    </section>

    <!-- Input Area -->
    <div class="chat-input-wrap">
      <div class="chat-input-box">
        <!-- Glow border -->
        <div class="input-glow"></div>
        <div class="input-inner">
          <!-- Toolbar -->
          <div class="input-toolbar">
            <button class="toolbar-btn" title="图片"><span class="material-symbols-outlined" style="font-size:20px">image</span></button>
            <button class="toolbar-btn" title="附件"><span class="material-symbols-outlined" style="font-size:20px">attach_file</span></button>
            <button class="toolbar-btn" title="表格"><span class="material-symbols-outlined" style="font-size:20px">table_chart</span></button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn" title="语音"><span class="material-symbols-outlined" style="font-size:20px">mic</span></button>
          </div>
          <!-- Textarea + Send -->
          <div class="input-row">
            <textarea
              v-model="inputText"
              class="chat-textarea"
              placeholder="输入您关于咖啡店运营的问题..."
              rows="1"
              @keydown.enter.exact.prevent="sendMessage"
              @input="autoResize"
              ref="textareaEl"
            ></textarea>
            <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
              <span class="material-symbols-outlined">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const messagesEl = ref(null)
const textareaEl = ref(null)
const inputText = ref('')
const isTyping = ref(false)

const messages = ref([
  {
    id: 1,
    role: 'user',
    content: '分析一下近期美式咖啡销量下滑的原因，并提供三个具体的优化方案。',
  },
  {
    id: 2,
    role: 'ai',
    summary: '根据 Q3 季度的交易数据与竞品市场调研，美式咖啡销量下滑（-14.2%）主要由以下三个维度驱动：',
    reasons: [
      { label: '01 竞争替代', text: '周边平价连锁推出 9.9 元促销，吸走 30% 价格敏感型客群。' },
      { label: '02 口味疲劳', text: '单一产地豆（SOE）选择较少，老用户向风味拼配豆品牌流失。' },
      { label: '03 时段变迁', text: '下午茶时段被奶咖和轻食占据，纯黑咖的场景被进一步压缩。' },
    ],
    solutions: [
      { num: '1', icon: 'new_releases', title: '产品多元化：SOE 计划', text: '引入每季更新的单品产地豆美式，提供从埃塞俄比亚到哥伦比亚的差异化选择。通过"风味卡片"提升仪式感，拉高溢价至 28-32 元。' },
      { num: '2', icon: 'loyalty', title: '晨间唤醒：会员权益', text: '锁定 7:30-10:00 核心时段，推出"美式月卡"或"第二杯半价"。强化美式作为"职场燃料"的品牌联想，固化晨间消费习惯。' },
      { num: '3', icon: 'local_cafe', title: '体验升级：感官剧场', text: '针对到店客户，推出"现场手冲美式"演示。通过视觉与香气的双重刺激，将基础单品转化为一种"精品体验"，提升品牌专业形象。' },
    ],
  },
])

let nextId = 3

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({ id: nextId++, role: 'user', content: text })
  inputText.value = ''
  if (textareaEl.value) textareaEl.value.style.height = 'auto'

  await scrollToBottom()

  isTyping.value = true
  await scrollToBottom()

  await new Promise(r => setTimeout(r, 1200))
  isTyping.value = false

  messages.value.push({
    id: nextId++,
    role: 'ai',
    summary: `已收到您的问题："${text}"。正在基于 Star Coffee 知识库进行分析，以下是初步建议：`,
    reasons: [
      { label: '01 数据洞察', text: '结合门店历史销售数据，识别关键趋势与异常波动。' },
      { label: '02 竞品对标', text: '参考同类精品咖啡馆的成功案例与差异化策略。' },
      { label: '03 执行路径', text: '提供可落地的短期行动计划与长期品牌建设方向。' },
    ],
    solutions: [
      { num: '1', icon: 'analytics', title: '数据驱动决策', text: '建立实时销售看板，每日追踪关键 SKU 表现，快速响应市场变化。' },
      { num: '2', icon: 'groups', title: '客群精细化运营', text: '通过会员标签体系，针对不同消费频次的客群制定差异化的激活策略。' },
      { num: '3', icon: 'star', title: '产品创新迭代', text: '每季度推出 1-2 款限定特调，保持品牌新鲜感，吸引社交媒体传播。' },
    ],
  })

  await scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 160) + 'px'
}
</script>

<style scoped>
.chat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 12px; /* topbar height */
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
}

.msg-row {
  display: flex;
  
  gap: 16px;
  width: 100%;
}

.msg-row.user {
  flex-direction: row-reverse;
  justify-content: flex-start;
}


/* User bubble */
.msg-bubble.user-bubble {
  background: var(--bg-brown);
  border: 1px solid rgba(78,70,57,0.3);
  padding: 12px;
  border-radius: 12px 0 12px 12px;
  max-width: 80%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.msg-bubble.user-bubble p { font-size: 14px; color: var(--on-surface); }

.msg-avatar img {
  width: 40px; height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(78,70,57,0.3);
  object-fit: cover;
  flex-shrink: 0;
}

/* AI avatar */
.ai-avatar {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-gold), var(--bg-brown));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(197,160,89,0.3);
}

.ai-body { flex: 1; display: flex; flex-direction: column; gap: 24px; }

/* AI card */
.ai-card {
  padding: 12px;
  border-radius: 12px;
  background: var(--surface-container);
  border: 1px solid rgba(78,70,57,0.2);
  box-shadow: 0 4px 24px rgba(45,27,15,0.2);
}
.ai-card-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 400; letter-spacing: 0.02em;
  color: var(--primary);
  margin-bottom: 8px;
}
.ai-card-desc { color: var(--on-surface-variant); margin-bottom: 16px; font-size: 14px; }

.ai-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.reason-item {
  padding: 8px;
  background: var(--bg-base);
  border-radius: 4px;
  border-left: 2px solid var(--primary);
}
.reason-label { font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; }
.reason-text { font-size: 13px; color: var(--on-surface-variant); }

/* Solutions */
.solutions-heading {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;
  color: var(--on-surface-variant);
  margin-bottom: 16px;
}
.divider-line { width: 32px; height: 1px; background: var(--outline-variant); }

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
.solution-card {
  position: relative;
  background: rgba(45,27,15,0.5);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(78,70,57,0.1);
  overflow: hidden;
  transition: border-color 0.3s;
}
.solution-card:hover { border-color: rgba(197,160,89,0.5); }
.solution-bg-icon {
  position: absolute; top: 0; right: 0; padding: 16px;
  opacity: 0.1;
  transition: opacity 0.3s;
}
.solution-card:hover .solution-bg-icon { opacity: 0.2; }
.solution-num {
  width: 32px; height: 32px;
  border-radius: 4px;
  background: rgba(233,193,118,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  margin-bottom: 16px;
  font-size: 14px;
}
.solution-title { font-size: 18px; font-weight: 500; color: var(--primary); margin-bottom: 8px; }
.solution-text { font-size: 13px; color: var(--on-surface-variant); line-height: 1.6; }

/* Typing indicator */
.typing-indicator {
  display: flex; align-items: center; gap: 6px;
  padding: 16px;
  background: var(--surface-container);
  border-radius: 12px;
  border: 1px solid rgba(78,70,57,0.2);
}
.typing-indicator span {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--primary-gold);
  animation: bounce 1.2s infinite;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* Input */
.chat-input-wrap {
  flex-shrink: 0;
  padding: 24px;
  padding-bottom: 40px;
  background: linear-gradient(to top, var(--bg-base) 60%, transparent);
}
.chat-input-box {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.input-glow {
  position: absolute;
  inset: -1px;
  background: linear-gradient(to right, rgba(233,193,118,0.3), rgba(225,192,173,0.3));
  border-radius: 12px;
  filter: blur(1px);
  opacity: 0.3;
  transition: opacity 0.3s;
}
.chat-input-box:focus-within .input-glow { opacity: 0.6; filter: blur(2px); }

.input-inner {
  position: relative;
  background: var(--surface-container-highest);
  border: 1px solid rgba(78,70,57,0.3);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.input-toolbar {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(78,70,57,0.1);
}
.toolbar-btn {
  padding: 6px;
  color: var(--on-surface-variant);
  background: none; border: none; cursor: pointer;
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.toolbar-btn:hover { color: var(--primary); background: var(--surface-container); }
.toolbar-divider { width: 1px; height: 16px; background: rgba(78,70,57,0.3); margin: 0 4px; }

.input-row {
  display: flex; align-items: flex-end;
  padding: 16px;
  gap: 16px;
}
.chat-textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--on-surface);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  min-height: 44px;
  max-height: 160px;
}
.chat-textarea::placeholder { color: rgba(209,197,180,0.4); }

.send-btn {
  width: 40px; height: 40px;
  flex-shrink: 0;
  background: var(--primary);
  color: #412d00;
  border: none; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(233,193,118,0.2);
  transition: all 0.2s;
}
.send-btn:hover { box-shadow: 0 4px 20px rgba(233,193,118,0.3); transform: scale(1.05); }
.send-btn:active { transform: scale(0.95); }
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
</style>
