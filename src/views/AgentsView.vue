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

      <!-- Agent 4: 风味顾问 (CRITICAL) -->
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
            <h3 class="agent-name">风味顾问</h3>
          </div>
          <p class="agent-desc">通过会员画像提供个性化手冲建议，并基于当日温湿度调整研磨度建议。当前有 2 项配置待优化。</p>
          <div class="agent-card-footer">
            <span class="agent-last-active critical-text">REQUIRES ATTENTION</span>
            <button class="agent-fix-btn">立即修复</button>
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
  </div>
</template>

<script setup>
const stats = [
  { label: '活跃智能体', value: '03', icon: 'smart_toy' },
  { label: '任务完成率', value: '98.5%', icon: 'task_alt' },
  { label: '响应时效', value: '240ms', icon: 'bolt' },
  { label: '服务客次', value: '12.4k', icon: 'groups' },
]
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
  background: var(--bg-brown);
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
  border-top: 1px solid var(--bg-brown);
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
</style>
