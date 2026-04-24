<template>
  <div class="agents-view">
    <!-- Hero Section -->
    <section class="agents-hero">
      <div class="hero-bg-img">
        <img src="/images/agent/kaifeiji_beijing.png" alt="Coffee Roastery" />
        <div class="hero-bg-overlay"></div>
      </div>
      <div class="hero-content">
        <div>
          <h2 class="hero-title">智能体管理</h2>
          <p class="hero-desc">部署专属数字员工，优化精品咖啡馆的每一个运营环节。从精准库存预测到个性化风味推荐，AI 正在重塑咖啡艺术的边界。</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card luxury-card-glow">
        <div>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
        <span class="material-symbols-outlined stat-icon">{{ stat.icon }}</span>
      </div>
    </section>

    <!-- Agent Grid -->
    <section class="agent-grid">
      <!-- Agent 1: 吧台助手 -->
      <div class="agent-card">
        <div class="agent-card-img-wrap">
          <img src="/images/agent/brew_coffee.png" alt="吧台助手" class="agent-card-img" />
          <div class="agent-card-img-overlay"></div>
          <div class="agent-status-badge active">
            <span class="status-dot"></span> ACTIVE
          </div>
        </div>
        <div class="agent-card-body">
          <div class="agent-card-header">
            <span class="material-symbols-outlined">coffee_maker</span>
            <h3 class="agent-name">吧台助手</h3>
          </div>
          <p class="agent-desc">协助处理门店订单流转，负责咖啡豆原产地、风味描述等专业 Q&A 咨询。</p>
          <div class="agent-card-footer">
            <span class="agent-last-active">LAST ACTIVE: JUST NOW</span>
            <button class="agent-action-link">
              配置详情 <span class="material-symbols-outlined" style="font-size:14px">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Agent 2: 库存管家 -->
      <div class="agent-card">
        <div class="agent-card-img-wrap">
          <img src="/images/agent/kafeikucun.png" alt="库存管家" class="agent-card-img" style="opacity:0.7" />
          <div class="agent-card-img-overlay" style="background:rgba(0,0,0,0.5)"></div>
          <div class="agent-status-badge idle">IDLE</div>
        </div>
        <div class="agent-card-body">
          <div class="agent-card-header">
            <span class="material-symbols-outlined">inventory_2</span>
            <h3 class="agent-name">库存管家</h3>
          </div>
          <p class="agent-desc">全天候监控咖啡生豆及辅料库存，基于历史销售数据进行补货预测与成本预警。</p>
          <div class="agent-card-footer">
            <span class="agent-last-active">LAST ACTIVE: 2H AGO</span>
            <button class="agent-action-link">
              进入面板 <span class="material-symbols-outlined" style="font-size:14px">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Agent 3: 安全巡检员 -->
      <div class="agent-card">
        <div class="agent-card-img-wrap">
          <img src="/images/agent/anqunyuan.png" alt="安全巡检员" class="agent-card-img" />
          <div class="agent-card-img-overlay"></div>
          <div class="agent-status-badge active">
            <span class="status-dot"></span> ACTIVE
          </div>
        </div>
        <div class="agent-card-body">
          <div class="agent-card-header">
            <span class="material-symbols-outlined">verified_user</span>
            <h3 class="agent-name">安全巡检员</h3>
          </div>
          <p class="agent-desc">实时监控烘焙机、商用咖啡机运行参数，确保食品安全合规与设备维护及时到位。</p>
          <div class="agent-card-footer">
            <span class="agent-last-active">LAST ACTIVE: JUST NOW</span>
            <button class="agent-action-link">
              安全日志 <span class="material-symbols-outlined" style="font-size:14px">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Agent 4: 导购顾问 (CRITICAL) -->
      <div class="agent-card agent-card--critical">
        <div class="agent-card-img-wrap">
          <img src="/images/agent/kafeiguwen.png" alt="风味顾问" class="agent-card-img" />
          <div class="agent-card-img-overlay" style="background:linear-gradient(to top, #231F1A, transparent)"></div>
          <div class="agent-status-badge critical">
            <span class="material-symbols-outlined icon-filled" style="font-size:12px">priority_high</span> CRITICAL
          </div>
        </div>
        <div class="agent-card-body">
          <div class="agent-card-header">
            <span class="material-symbols-outlined">auto_fix_high</span>
            <h3 class="agent-name">导购顾问 · 为懂咖啡的您而生</h3>
          </div>
          <p class="agent-desc">我们不止看豆子，更看「人」与「天」——依会员口味画像 ，精细校准研磨与萃取。</p>
          <div class="agent-card-footer">
            <span class="agent-last-active critical-text">REQUIRES ATTENTION</span>
            <button class="agent-fix-btn" @click="showConsultModal = true">点击咨询</button>
          </div>
        </div>
      </div>

      <!-- Agent 5: Add New -->
      <div class="agent-card agent-card--add">
        <div class="add-icon-wrap">
          <span class="material-symbols-outlined" style="font-size:28px">add</span>
        </div>
        <h3 class="add-name">营销策划官</h3>
        <p class="add-desc">点击此处部署新的智能体，助力门店数字化升级</p>
      </div>
    </section>

    <!-- Consult Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showConsultModal" class="consult-overlay" @click.self="showConsultModal = false">
          <div class="consult-modal">
            <!-- Hero Banner -->
            <div class="consult-hero">
              <img src="/images/agent/kafeiguwen.png" alt="导购顾问" class="consult-hero-img" />
              <div class="consult-hero-mask"></div>
              <button class="consult-close" @click="showConsultModal = false">
                <span class="material-symbols-outlined">close</span>
              </button>
              <div class="consult-hero-text">
                <h2 class="consult-title">导购顾问 · 为懂咖啡的您而生</h2>
                <p class="consult-subtitle">我们不止看豆子，更看「人」与「天」——依会员口味画像，精细校准研磨与萃取。</p>
              </div>
            </div>

            <!-- Suggested Questions -->
            <div class="consult-body">
              <p class="consult-hint">您可以这样问我：</p>
              <div class="consult-bubbles">
                <button
                  v-for="(q, i) in suggestedQuestions"
                  :key="i"
                  class="consult-bubble"
                  @click="selectQuestion(q)"
                >
                  <span class="bubble-q">Q{{ i + 1 }}</span>
                  {{ q }}
                </button>
              </div>

              <!-- Chat Input -->
              <div class="consult-chat-wrap">
                <div class="consult-messages" ref="messagesEl">
                  <div v-for="(msg, i) in messages" :key="i" :class="['msg', msg.role]">
                    <div class="msg-bubble">{{ msg.content }}</div>
                  </div>
                </div>
                <div class="consult-input-row">
                  <input
                    v-model="inputText"
                    class="consult-input"
                    placeholder="比如：我今天想喝果酸明亮的豆子…"
                    @keydown.enter="sendMessage"
                  />
                  <button class="consult-send" @click="sendMessage">
                    <span class="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const stats = [
  { label: '活跃智能体', value: '03', icon: 'smart_toy' },
  { label: '任务完成率', value: '98.5%', icon: 'task_alt' },
  { label: '响应时效', value: '240ms', icon: 'bolt' },
  { label: '服务客次', value: '12.4k', icon: 'groups' },
]

const showConsultModal = ref(false)
const inputText = ref('')
const messagesEl = ref(null)
const messages = ref([])

const suggestedQuestions = [
  '新客第一次来店，给我介绍下你们比较特色的咖啡吧？',
  '口感醇正，不要太甜，推荐什么咖啡？'
  
]

function selectQuestion(q) {
  inputText.value = q
  sendMessage()
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  await nextTick()
  scrollToBottom()

  messages.value.push({ role: 'assistant', content: '' })
  const idx = messages.value.length - 1
  await nextTick()
  scrollToBottom()

  try {
    const res = await fetch('http://localhost:8000/starcoffee/recommender/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: 'daogou_agent_test123', user_input: text }),
    })

    if (!res.ok || !res.body) {
      throw new Error('Failed to fetch stream')
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone

      if (value) {
        const chunk = decoder.decode(value, { stream: true })
        messages.value[idx].content += chunk
        await nextTick()
        scrollToBottom()
      }
    }
  } catch (error) {
    console.error('Error:', error)
    if (messages.value[idx].content === '') {
      messages.value[idx].content = '网络异常，请稍后重试。'
    }
    await nextTick()
    scrollToBottom()
  }
}


function scrollToBottom() {
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}
</script>

<style scoped>
.agents-view {
  flex: 1;
  overflow-y: auto;
  padding-top: 12px;
  padding-bottom: 48px;
}

/* Hero */
.agents-hero {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background:  #191210;
  padding: 40px;
  margin: 24px 40px 0;
  border: 1px solid rgba(197,160,89,0.1);
}
.hero-bg-img {
  position: absolute;
  top: 0; right: 0;
  width: 50%; height: 100%;
  opacity: 0.3;
  pointer-events: none;
}
.hero-bg-img img { width: 100%; height: 100%; object-fit: cover; }
.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--bg-brown), rgba(45,27,15,0.5), transparent);
}
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.hero-title {
  font-size: 48px;
  font-weight: 300;
  color: var(--primary);
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}
.hero-desc {
  color: #78716c;
  max-width: 560px;
  font-size: 16px;
  line-height: 1.6;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 24px 40px;
}
@media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }

.stat-card {
  background: var(--bg-card-high);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid rgba(78,70,57,0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #78716c;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.03em;
}
.stat-icon { font-size: 28px; color: var(--primary-gold); }

/* Agent Grid */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 0 40px;
}
@media (max-width: 1200px) { .agent-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .agent-grid { grid-template-columns: 1fr; } }

.agent-card {
  background: #231F1A;
  border: 1px solid var(--bg-brown);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.agent-card:hover {
  border-color: rgba(197,160,89,0.4);
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.agent-card--critical {
  border-color: rgba(197,160,89,0.2);
  box-shadow: 0 0 0 1px rgba(197,160,89,0.3);
}
.agent-card--critical:hover { border-color: rgba(197,160,89,0.5); }

.agent-card-img-wrap {
  height: 192px;
  position: relative;
  overflow: hidden;
}
.agent-card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.agent-card:hover .agent-card-img { transform: scale(1.1); }
.agent-card-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

.agent-status-badge {
  position: absolute;
  top: 16px; right: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}
.agent-status-badge.active {
  background: rgba(197,160,89,0.2);
  color: var(--primary-gold);
  border: 1px solid rgba(197,160,89,0.3);
}
.agent-status-badge.idle {
  background: #292524;
  color: #78716c;
  border: 1px solid #44403c;
}
.agent-status-badge.critical {
  background: rgba(127,29,29,0.4);
  color: #f87171;
  border: 1px solid rgba(239,68,68,0.3);
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--primary-gold);
  animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
}

.agent-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.agent-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.agent-card-header .material-symbols-outlined { color: var(--primary-gold); }
.agent-name { font-size: 18px; font-weight: 500; color: var(--on-surface); letter-spacing: 0.02em; }
.agent-desc { font-size: 14px; color: #78716c; flex: 1; margin-bottom: 24px; line-height: 1.6; }

.agent-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 2px solid ;color: #34261e;
}
.agent-last-active {
  font-size: 11px;
  color: #57534e;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.critical-text { color: #f87171; }

.agent-action-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--primary-gold);
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.agent-action-link:hover { opacity: 0.8; text-decoration: underline; }

.agent-fix-btn {
  padding: 6px 16px;
  background: var(--primary-gold);
  color: var(--bg-brown);
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: filter 0.2s;
}
.agent-fix-btn:hover { filter: brightness(1.1); }

/* Add Card */
.agent-card--add {
  border: 2px dashed var(--bg-brown);
  background: transparent;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}
.agent-card--add:hover { border-color: rgba(197,160,89,0.5); }
.add-icon-wrap {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--bg-brown);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  transition: background 0.2s;
}
.agent-card--add:hover .add-icon-wrap { background: rgba(197,160,89,0.1); }
.add-icon-wrap .material-symbols-outlined { color: var(--on-surface-variant); }
.add-name { font-size: 18px; font-weight: 500; color: #78716c; margin-bottom: 8px; letter-spacing: 0.02em; }
.add-desc { font-size: 12px; color: #57534e; max-width: 200px; }

@media (max-width: 768px) {
  .agents-hero { margin: 16px; padding: 24px; }
  .hero-title { font-size: 32px; }
  .stats-grid { margin: 24px 16px; }
  .agent-grid { margin: 0 16px; }
}

/* ── Consult Modal ── */
.consult-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 6, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.consult-modal {
  width: 100%;
  max-width: 560px;
  background: #1A1816;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(196, 154, 94, 0.2);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

/* Hero Banner */
.consult-hero {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}
.consult-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.65;
}
.consult-hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(10,8,6,0.2) 0%, rgba(26,24,22,0.85) 100%);
}
.consult-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  color: #a8a29e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
}
.consult-close:hover { background: rgba(0,0,0,0.8); color: #fff; }
.consult-close .material-symbols-outlined { font-size: 18px; }

.consult-hero-text {
  position: absolute;
  bottom: 20px;
  left: 24px;
  right: 24px;
  z-index: 1;
}
.consult-title {
  font-size: 18px;
  font-weight: 600;
  color: #e8d5b0;
  letter-spacing: 0.03em;
  margin-bottom: 6px;
}
.consult-subtitle {
  font-size: 13px;
  color: #a8967a;
  line-height: 1.6;
}

/* Body */
.consult-body {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex: 1;
}

.consult-hint {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #57534e;
}

/* Bubbles */
.consult-bubbles {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.consult-bubble {
  position: relative;
  background: #2A2420;
  border: 1px solid rgba(196,154,94,0.15);
  border-radius: 12px 12px 12px 4px;
  padding: 12px 16px;
  text-align: left;
  color: #c8b89a;
  font-size: 13.5px;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.consult-bubble:hover {
  background: #332C26;
  border-color: rgba(196,154,94,0.35);
  color: #e8d5b0;
  transform: translateX(3px);
}
.bubble-q {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #C49A5E;
  background: rgba(196,154,94,0.12);
  border-radius: 4px;
  padding: 2px 6px;
  margin-top: 1px;
}

/* Chat */
.consult-chat-wrap {
  background: #141210;
  border-radius: 12px;
  border: 1px solid rgba(78,70,57,0.4);
  overflow: hidden;
}
.consult-messages {
  min-height: 180px;
  max-height: 180px;
  overflow-y: auto;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #3a3530 transparent;
}
/* .consult-messages:empty { display: none; } */

.msg { display: flex; }
.msg.user { justify-content: flex-end; }
.msg.assistant { justify-content: flex-start; }
.msg-bubble {
  max-width: 80%;
  padding: 9px 13px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.55;
}
.msg.user .msg-bubble {
  background: rgba(196,154,94,0.18);
  color: #e8d5b0;
  border-radius: 12px 12px 4px 12px;
}
.msg.assistant .msg-bubble {
  background: #2A2420;
  color: #c8b89a;
  border-radius: 12px 12px 12px 4px;
}

.consult-input-row {
  display: flex;
  align-items: center;
  gap: 0;
  border-top: 1px solid rgba(78,70,57,0.4);
}
.consult-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 16px;
  font-size: 13.5px;
  color: #c8b89a;
  font-family: inherit;
}
.consult-input::placeholder { color: #57534e; }
.consult-send {
  width: 48px;
  height: 48px;
  background: #C49A5E;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;
  flex-shrink: 0;
}
.consult-send:hover { filter: brightness(1.15); }
.consult-send .material-symbols-outlined { font-size: 20px; color: #1A1816; }

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; transform: scale(0.96); }
</style>
