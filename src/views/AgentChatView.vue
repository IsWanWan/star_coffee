<!-- views/AgentChatView.vue -->
<template>
  <div class="agent-chat-view">
    <!-- Agent 头部信息 -->
    <div class="agent-header">
      <div class="agent-avatar">
        <img :src="currentAgent.bg" :alt="currentAgent.title" />
      </div>
      <h1 class="agent-title">{{ currentAgent.title }}</h1>
      <p class="agent-desc">{{ currentAgent.desc }}</p>
    </div>

    <!-- 消息区域 -->
    <section class="chat-messages" ref="messagesEl">
      <!-- 快捷提问 -->
      <div v-if="!hasUserMessage" class="welcome-card">
        <div class="starter-prompts">
          <button
            v-for="(prompt, i) in currentAgent.prompts"
            :key="i"
            @click="quickAsk(prompt)"
            class="prompt-btn"
          >
            {{ prompt }}
          </button>
        </div>
      </div>

      <!-- 消息列表 -->
      <div v-for="msg in messages" :key="msg.id" class="msg-row" :class="msg.role">
        <template v-if="msg.role === 'user'">
          <div class="msg-avatar">
            <img src="/images/common/touxiang.png" alt="用户头像" />
          </div>
          <div class="msg-bubble user-bubble">
            <p>{{ msg.content }}</p>
          </div>
        </template>

        <template v-else>
          <div class="ai-avatar">
            <span class="material-symbols-outlined icon-filled" style="color:#16130e">smart_toy</span>
          </div>
          <div class="ai-body">
            <div class="ai-card">
              <h6 class="ai-card-title">
                <span class="material-symbols-outlined" style="font-size:16px">analytics</span>
                {{ currentAgent.title }}
              </h6>
              <p class="ai-card-desc">{{ msg.summary }}</p>
              <div class="ai-reasons">
                <div v-for="r in msg.reasons" :key="r.label" class="reason-item">
                  <div class="reason-label">{{ r.label }}</div>
                  <p class="reason-text">{{ r.text }}</p>
                </div>
              </div>
            </div>
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

    <!-- 输入区 -->
    <div class="chat-input-wrap">
      <div class="chat-input-box">
        <div class="input-glow"></div>
        <div class="input-inner">
          <div class="input-toolbar">
            <button class="toolbar-btn" title="图片"><span class="material-symbols-outlined" style="font-size:20px">image</span></button>
            <button class="toolbar-btn" title="附件"><span class="material-symbols-outlined" style="font-size:20px">attach_file</span></button>
            <button class="toolbar-btn" title="表格"><span class="material-symbols-outlined" style="font-size:20px">table_chart</span></button>
            <div class="toolbar-divider"></div>
            <button class="toolbar-btn" title="语音"><span class="material-symbols-outlined" style="font-size:20px">mic</span></button>
          </div>
          <div class="input-row">
            <textarea
              v-model="inputText"
              class="chat-textarea"
              :placeholder="`向${currentAgent.title}提问...`"
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
  import { ref, nextTick, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  // ========================
  // 🔥 新增：智能体配置映射
  // ========================
  const agentConfigs = {
    'bar-tender': {
      title: '吧台助手',
      desc: '协助处理门店订单流转，负责咖啡豆原产地、风味描述等专业 Q&A 咨询。',
      bg: '/images/agent/brew_coffee.png',
      prompts: [
        // '推荐一款适合夏天的冰美式',
        '如何向顾客介绍埃塞俄比亚耶加雪菲？',
        '今天的订单高峰期是什么时候？'
      ],
      apiEndpoint: '/starcoffee/bar/chat'
    },
    'kefu': {
      title: '客服工单处理',
      desc: '高效受理、分类、跟踪客户反馈与投诉。',
      bg: '/images/agent/kefu.png',
      prompts: [
        '有顾客投诉咖啡太苦怎么办？',
        '如何处理退款请求？',
        '查看今日待处理工单'
      ],
      apiEndpoint: '/starcoffee/kefu/chat'
    },
    'yingxiao': {
      title: '营销策划智能体',
      desc: '全天候监控咖啡生豆及辅料库存，基于历史销售数据进行补货预测与成本预警。',
      bg: '/images/agent/yingxiao.png',
      prompts: [
        '本周哪些产品需要补货？',
        '生成下周社交媒体内容计划',
        '分析上月促销活动 ROI'
      ],
      apiEndpoint: '/starcoffee/marketing/chat'
    },
    // 可继续添加其他智能体...
    'default': {
      title: '智能助手',
      desc: '您好！我是您的数字员工，请问有什么可以帮您？',
      bg: '/images/agent/kafeiji_beijing.png',
      prompts: ['你好', '你能做什么？'],
      apiEndpoint: '/starcoffee/general/chat'
    }
  }
  
  // ========================
  // 🔥 新增：获取当前智能体
  // ========================
  const route = useRoute()
  const agentId = route.params.agentId
  const currentAgent = computed(() => {
    return agentConfigs[agentId] || agentConfigs['default']
  })
  
  // ========================
  // 🔥 新增：快速提问
  // ========================
  const quickAsk = (text) => {
    inputText.value = text
    sendMessage()
  }
  
  // ========================
  // 原 ChatView 逻辑（稍作适配）
  // ========================
  const messagesEl = ref(null)
  const textareaEl = ref(null)
  const inputText = ref('')
  const isTyping = ref(false)
  const messages = ref([])
  let nextId = 1
  
  const hasUserMessage = computed(() => messages.value.some(m => m.role === 'user'))
  
  async function sendMessage() {
    const text = inputText.value.trim()
    if (!text) return
  
    messages.value.push({ id: nextId++, role: 'user', content: text })
    inputText.value = ''
    if (textareaEl.value) textareaEl.value.style.height = 'auto'
    await scrollToBottom()
  
    isTyping.value = true
    await scrollToBottom()
  
    try {
      // 🔥 新增：使用当前智能体的 API endpoint
      const res = await fetch(`http://localhost:8000${currentAgent.value.apiEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          session_id: `agent_${agentId}_${Date.now()}`, 
          user_input: text 
        }),
      })
  
      isTyping.value = false
      if (!res.ok) throw new Error('API error')
  
      const data = await res.json()
      messages.value.push({
        id: nextId++,
        role: 'ai',
        summary: data.summary || '已收到您的问题，正在处理...',
        reasons: data.reasons || [{ label: '提示', text: '这是模拟响应。' }]
      })
    } catch (error) {
      isTyping.value = false
      messages.value.push({
        id: nextId++,
        role: 'ai',
        summary: '抱歉，服务暂时不可用，请稍后再试。',
        // reasons: [{ label: '错误', text: error.message }]
      })
    }
  
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
  
  // 可选：页面加载时自动聚焦输入框
  onMounted(() => {
    if (textareaEl.value) textareaEl.value.focus()
  })
  </script>
  
<style scoped>
/* ===== 根容器：flex 列，撑满父级 main-content ===== */
.agent-chat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

/* ===== Agent 头部信息 ===== */
.agent-header {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px;
  gap: 12px;
}
.agent-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(197, 160, 89, 0.4);
  box-shadow: 0 0 0 4px rgba(197, 160, 89, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
}
.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.agent-title {
  font-size: 20px;
  font-weight: 700;
  color: #e9c176;
  margin: 0;
  line-height: 1.3;
}
.agent-desc {
  font-size: 13px;
  color: #d1c5b4;
  margin: 0;
  line-height: 1.5;
  opacity: 0.85;
  text-align: center;
  max-width: 480px;
}

/* ===== 消息区域 ===== */
.chat-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  /* padding: 32px 24px; */
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* ===== 快捷提问 ===== */
.welcome-card {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}
.starter-prompts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.prompt-btn {
  background: rgba(196, 154, 94, 0.15);
  border: 1px solid rgba(196, 154, 94, 0.3);
  color: #e8d5b0;
  padding: 12px 16px;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.prompt-btn:hover {
  background: rgba(196, 154, 94, 0.28);
  transform: translateX(4px);
}

/* ===== 消息行 ===== */
.msg-row {
  display: flex;
  gap: 16px;
  width: 100%;
}
.msg-row.user {
  flex-direction: row-reverse;
}

.msg-bubble.user-bubble {
  background: var(--bg-brown);
  border: 1px solid rgba(78,70,57,0.3);
  padding: 12px;
  border-radius: 12px 0 12px 12px;
  max-width: 80%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.msg-bubble.user-bubble p {
  font-size: 14px;
  color: var(--on-surface);
  margin: 0;
}

.msg-avatar img {
  width: 40px; height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(78,70,57,0.3);
  object-fit: cover;
  flex-shrink: 0;
}

.ai-avatar {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-gold), var(--bg-brown));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(197,160,89,0.3);
}

.ai-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ai-card {
  padding: 12px;
  border-radius: 12px;
  background: var(--surface-container);
  border: 1px solid rgba(78,70,57,0.2);
  box-shadow: 0 4px 24px rgba(45,27,15,0.2);
}
.ai-card-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; letter-spacing: 0.02em;
  color: var(--primary);
  margin-bottom: 8px;
}
.ai-card-desc {
  color: var(--on-surface-variant);
  margin-bottom: 16px;
  font-size: 14px;
}

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
.reason-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 4px;
}
.reason-text {
  font-size: 13px;
  color: var(--on-surface-variant);
}

/* ===== Typing indicator ===== */
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

/* ===== 输入区 ===== */
.chat-input-wrap {
  flex-shrink: 0;
  padding: 16px 24px 32px;
  background: linear-gradient(to top, rgba(10, 8, 6, 0.95) 70%, transparent);
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
.chat-input-box:focus-within .input-glow {
  opacity: 0.6;
  filter: blur(2px);
}

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
.toolbar-btn:hover {
  color: var(--primary);
  background: var(--surface-container);
}
.toolbar-divider {
  width: 1px;
  height: 16px;
  background: rgba(78,70,57,0.3);
  margin: 0 4px;
}

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
.chat-textarea::placeholder {
  color: rgba(209,197,180,0.4);
}

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
.send-btn:hover {
  box-shadow: 0 4px 20px rgba(233,193,118,0.3);
  transform: scale(1.05);
}
.send-btn:active { transform: scale(0.95); }
.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}
</style>