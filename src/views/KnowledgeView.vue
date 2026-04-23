<template>
  <div class="knowledge-view">
    <!-- Header -->
    <header class="knowledge-header">
      <div class="knowledge-header-inner">
        <div class="header-title-group">
          <h2 class="header-title">企业知识库</h2>
          <p class="header-subtitle">检索 Star Coffee 核心运营标准与技术参数</p>
        </div>
        <div class="header-controls">
          <div class="search-wrap">
            <span class="material-symbols-outlined search-icon">search</span>
            <input
              v-model="searchQuery"
              class="search-input"
              placeholder="搜索文档、配方、术语或流程..."
              type="text"
            />
          </div>
          <button class="filter-btn">
            <span class="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>
      <!-- Quick Filters -->
      <div class="quick-filters">
        <span class="filter-label">快捷筛选:</span>
        <div class="filter-tags">
          <button
            v-for="tag in filterTags"
            :key="tag"
            class="filter-tag"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          ># {{ tag }}</button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="knowledge-content">
      <div class="knowledge-main">
        <!-- Hero Banner -->
        <section class="hero-banner">
          <img src="/images/knowledge/kaifei_beijing.png" alt="Coffee Background" class="hero-img" />
          <div class="hero-gradient"></div>
          <div class="hero-body">
            <div class="hero-badge">
              <span class="material-symbols-outlined" style="font-size:14px">auto_awesome</span>
              每日重点推荐
            </div>
            <h2 class="hero-title">Q3 夏日特调:<br /><span class="hero-title-accent">落日琥珀配方解析</span></h2>
            <p class="hero-desc">揭秘本季度最受欢迎的冷萃新品。掌握分层美学、特制海盐芝士奶盖的黄金比例，以及如何向顾客介绍其独特的风味层次。</p>
            <div style="display:flex;justify-content:flex-end">
              <button class="hero-btn">立即学习</button>
            </div>
          </div>
        </section>

        <!-- Document Grid -->
        <div class="doc-grid">
          <!-- Card 1 -->
          <div class="doc-card glass-card">
            <div class="doc-card-img-wrap">
              <img src="/images/knowledge/kafeiji.png" alt="Espresso Machine" class="doc-card-img" />
              <div class="doc-card-img-overlay"></div>
              <span class="doc-card-tag">技术标准</span>
            </div>
            <div class="doc-card-body">
              <div class="doc-card-row">
                <h4 class="doc-card-title">意式浓缩萃取 v2.1</h4>
                <span class="doc-card-id">DOC-6623</span>
              </div>
              <p class="doc-card-desc">适用于旗舰店主要型号咖啡机的标准化萃取曲线。包含粉重、液重、压力和流速控制。</p>
              <div class="doc-card-footer">
                <span class="doc-card-time">2 小时前更新</span>
                <span class="doc-card-link">查看详情</span>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="doc-card glass-card">
            <div class="doc-card-img-wrap">
              <img src="/images/knowledge/coffee1.png" alt="Latte Art" class="doc-card-img" />
              <div class="doc-card-img-overlay"></div>
              <span class="doc-card-tag">服务话术</span>
            </div>
            <div class="doc-card-body">
              <div class="doc-card-row">
                <h4 class="doc-card-title">过敏源应答话术库</h4>
                <span class="doc-card-id">DOC-8890</span>
              </div>
              <p class="doc-card-desc">针对坚果、乳糖、麸质等过敏源的标准化服务术语与替代建议，确保食品安全沟通合规。</p>
              <div class="doc-card-footer">
                <span class="doc-card-time">昨日更新</span>
                <span class="doc-card-link">查看详情</span>
              </div>
            </div>
          </div>

          <!-- Card 3: AI Tool -->
          <div class="doc-card doc-card--ai glass-card">
            <div class="doc-card-new-badge">NEW ASSET</div>
            <div class="doc-card-ai-icon">
              <span class="material-symbols-outlined" style="font-size:24px;color:#0F0E0D">auto_awesome</span>
            </div>
            <h4 class="doc-card-title" style="margin-bottom:8px">AI 咖啡风味匹配模型</h4>
            <p class="doc-card-desc" style="margin-bottom:24px">利用神经元网络算法根据顾客口味偏好（酸甜苦醇）自动匹配最优选咖啡豆。目前处于内测阶段。</p>
            <div class="doc-card-footer">
              <div class="doc-card-meta">
                <span class="doc-card-meta-item"><span class="material-symbols-outlined" style="font-size:12px">schedule</span> 刚刚</span>
                <span class="doc-card-meta-item"><span class="material-symbols-outlined" style="font-size:12px">visibility</span> 142</span>
              </div>
              <span class="doc-card-link">开启工具</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="doc-card glass-card">
            <div class="doc-card-img-wrap">
              <img src="/images/knowledge/kafeitou.png" alt="Coffee Beans" class="doc-card-img" />
              <div class="doc-card-img-overlay"></div>
              <span class="doc-card-tag">供应链</span>
            </div>
            <div class="doc-card-body">
              <div class="doc-card-row">
                <h4 class="doc-card-title">埃塞俄比亚原产地手册</h4>
                <span class="doc-card-id">DOC-5501</span>
              </div>
              <p class="doc-card-desc">了解我们的耶加雪菲和西达摩产区。包含处理法、风味轮以及供应商质量控制标准。</p>
              <div class="doc-card-footer">
                <span class="doc-card-time">3 天前更新</span>
                <span class="doc-card-link">查看详情</span>
              </div>
            </div>
          </div>

          <!-- Card 5: Add New -->
          <div class="doc-card doc-card--add">
            <div class="add-icon-wrap">
              <span class="material-symbols-outlined" style="font-size:28px">add</span>
            </div>
            <h4 class="add-title">新建知识库</h4>
            <p class="add-desc">点击创建新的知识库条目，上传文档并配置分类与检索标签</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="knowledge-sidebar">
        <!-- Reading Path -->
        <div class="sidebar-widget glass-card">
          <h3 class="widget-title">推荐阅读路径</h3>
          <div class="reading-path">
            <div class="path-item">
              <span class="material-symbols-outlined" style="font-size:18px">looks_one</span>
              <p>先读《意式浓缩萃取 v2.1》，掌握萃取参数基线。</p>
            </div>
            <div class="path-item">
              <span class="material-symbols-outlined" style="font-size:18px">looks_two</span>
              <p>再学习《过敏源应答话术库》，完善门店服务规范。</p>
            </div>
            <div class="path-item">
              <span class="material-symbols-outlined" style="font-size:18px">looks_3</span>
              <p>最后查看《AI 咖啡风味匹配模型》，提升个性化推荐效率。</p>
            </div>
          </div>
        </div>

        <!-- Weekly Updates -->
        <div class="sidebar-widget glass-card">
          <div class="widget-header">
            <h3 class="widget-title">本周更新动态</h3>
            <span class="widget-count">共 7 条</span>
          </div>
          <div class="update-list">
            <div class="update-item" v-for="u in weeklyUpdates" :key="u.title">
              <p class="update-title">{{ u.title }}</p>
              <p class="update-meta">{{ u.time }} · {{ u.category }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- FAB -->
    <button class="fab">
      <span class="material-symbols-outlined" style="font-size:28px;color:#0F0E0D">chat_bubble</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const activeTag = ref('全部')
const filterTags = ['全部', '新品', '高毛利', '易出错', '需审批', '顾客高频问']

const weeklyUpdates = [
  { title: '新增：冷萃出杯时长标准', time: '2 小时前', category: '运营 SOP' },
  { title: '修订：会员问答话术模板', time: '昨天', category: '培训资料' },
  { title: '归档：春季风味推荐手册', time: '3 天前', category: '产品手册' },
]
</script>

<style scoped>
.knowledge-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 12px;
}

/* Header */
.knowledge-header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--bg-brown);
  background: #110e09;
  padding: 24px 32px;
  z-index: 40;
}
.knowledge-header-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .knowledge-header-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.header-title { font-size: 24px; font-weight: 500; color: var(--primary-gold); margin-bottom: 4px; }
.header-subtitle { font-size: 12px; color: rgba(197,160,89,0.4); }

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 600px;
}
.search-wrap {
  position: relative;
  flex: 1;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(197,160,89,0.6);
  font-size: 18px;
}
.search-input {
  width: 100%;
  background: var(--bg-base);
  border: 1px solid var(--bg-brown);
  border-radius: 8px;
  padding: 10px 16px 10px 40px;
  color: var(--on-surface);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}
.search-input::placeholder { color: rgba(197,160,89,0.3); }
.search-input:focus { border-color: var(--primary-gold); box-shadow: 0 0 0 1px var(--primary-gold); }

.filter-btn {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px;
  background: rgba(22,19,14,0.6);
  border: 1px solid rgba(197,160,89,0.15);
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.filter-btn:hover { background: rgba(197,160,89,0.1); }
.filter-btn .material-symbols-outlined { color: var(--primary-gold); }

/* Quick Filters */
.quick-filters {
  display: flex;
  align-items: center;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-top: 24px;
}
.filter-label {
  font-size: 10px;
  font-weight: 700;
  color: rgba(197,160,89,0.4);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
}
.filter-tags { display: flex; gap: 8px; }
.filter-tag {
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(45,27,15,0.4);
  color: rgba(197,160,89,0.6);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.filter-tag:hover { border-color: rgba(197,160,89,0.2); color: var(--primary-gold); }
.filter-tag.active { background: var(--primary-gold); color: #0F0E0D; font-weight: 500; }

/* Content layout */
.knowledge-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  display: flex;
  gap: 48px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
.knowledge-main { flex: 1; display: flex; flex-direction: column; gap: 48px; min-width: 0; }
.knowledge-sidebar { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 24px; }

/* Hero Banner */
.hero-banner {
  position: relative;
  height: 300px;
  border-radius: 16px;
  /* overflow: hidden; */
  cursor: pointer;
  border: 1px solid rgba(197,160,89,0.1);
}
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.hero-banner:hover .hero-img { transform: scale(1.05); }
.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(22,19,14,1) 0%, rgba(22,19,14,0.4) 50%, rgba(22,19,14,0) 100%);
}
.hero-body {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 48px;
  max-width: 600px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--primary-gold);
  color: #0F0E0D;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
  width: fit-content;
}
.hero-title {
  font-size: 36px;
  font-weight: 300;
  color: white;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: 0.03em;
}
.hero-title-accent { font-weight: 700; color: var(--primary-gold); }
.hero-desc { font-size: 14px; color: rgba(197,160,89,0.8); line-height: 1.6; margin-bottom: 24px; }
.hero-btn {
  background: var(--primary-gold);
  color: #0F0E0D;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: filter 0.2s;
}
.hero-btn:hover { filter: brightness(1.1); }

/* Doc Grid */
.doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.doc-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s;
}
.doc-card:hover { border-color: rgba(197,160,89,0.4); }

.doc-card-img-wrap {
  height: 200px;
  position: relative;
  overflow: hidden;
}
.doc-card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.doc-card:hover .doc-card-img { transform: scale(1.1); }
.doc-card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-base), transparent);
  opacity: 0.6;
}
.doc-card-tag {
  position: absolute;
  bottom: 16px; left: 16px;
  background: rgba(197,160,89,0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(197,160,89,0.3);
  color: var(--primary-gold);
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
}

.doc-card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.doc-card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.doc-card-title {
  font-size: 18px;
  font-weight: 500;
  color: white;
  transition: color 0.2s;
}
.doc-card:hover .doc-card-title { color: var(--primary-gold); }
.doc-card-id { font-size: 10px; font-family: monospace; color: rgba(197,160,89,0.4); }
.doc-card-desc {
  font-size: 12px;
  color: rgba(197,160,89,0.6);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.doc-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--bg-brown);
  margin-top: auto;
}
.doc-card-time { font-size: 10px; color: rgba(197,160,89,0.4); }
.doc-card-link {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary-gold);
  transition: transform 0.2s;
}
.doc-card:hover .doc-card-link { transform: translateX(4px); }

/* AI Card */
.doc-card--ai {
  padding: 24px;
  border-color: rgba(197,160,89,0.3);
  box-shadow: 0 4px 12px rgba(197,160,89,0.1);
  position: relative;
}
.doc-card--ai:hover { border-color: rgba(197,160,89,0.6); box-shadow: 0 8px 24px rgba(197,160,89,0.2); }
.doc-card-new-badge {
  position: absolute;
  top: 16px; right: 16px;
  background: var(--primary-gold);
  color: #0F0E0D;
  font-size: 8px;
  padding: 2px 8px;
  border-radius: 2px;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.doc-card-ai-icon {
  width: 48px; height: 48px;
  background: var(--primary-gold);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}
.doc-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  color: rgba(197,160,89,0.4);
}
.doc-card-meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Add Card */
.doc-card--add {
  border: 2px dashed var(--bg-brown);
  background: transparent;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 320px;
  transition: border-color 0.2s;
}
.doc-card--add:hover { border-color: rgba(197,160,89,0.5); }
.add-icon-wrap {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--bg-brown);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  transition: background 0.2s;
}
.doc-card--add:hover .add-icon-wrap { background: rgba(197,160,89,0.1); }
.add-icon-wrap .material-symbols-outlined { color: var(--on-surface-variant); }
.add-title { font-size: 16px; color: #78716c; margin-bottom: 8px; }
.add-desc { font-size: 12px; color: #57534e; max-width: 220px; }

/* Sidebar Widgets */
.sidebar-widget {
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(197,160,89,0.2);
}
.widget-title { font-size: 14px; font-weight: 600; color: var(--primary-gold); margin-bottom: 16px; }
.widget-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.widget-count { font-size: 10px; color: rgba(197,160,89,0.4); }

.reading-path { display: flex; flex-direction: column; gap: 12px; }
.path-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(45,27,15,0.3);
}
.path-item .material-symbols-outlined { color: var(--primary-gold); flex-shrink: 0; }
.path-item p { font-size: 12px; color: rgba(197,160,89,0.7); line-height: 1.5; }

.update-list { display: flex; flex-direction: column; gap: 16px; }
.update-item { padding-bottom: 16px; border-bottom: 1px solid var(--bg-brown); }
.update-item:last-child { border-bottom: none; padding-bottom: 0; }
.update-title { font-size: 12px; color: rgba(197,160,89,0.8); margin-bottom: 4px; }
.update-meta { font-size: 10px; color: rgba(197,160,89,0.4); }

/* FAB */
.fab {
  position: fixed;
  bottom: 32px; right: 32px;
  width: 56px; height: 56px;
  background: var(--primary-gold);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 32px rgba(197,160,89,0.3);
  transition: all 0.2s;
  z-index: 50;
}
.fab:hover { filter: brightness(1.1); }
.fab:active { transform: scale(0.95); }

@media (max-width: 1024px) {
  .knowledge-sidebar { display: none; }
}
@media (max-width: 768px) {
  .knowledge-content { padding: 16px; }
  .knowledge-header { padding: 16px; }
  .hero-body { padding: 0 24px; }
  .hero-title { font-size: 24px; }
}
</style>
