<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon-wrap">
        <div class="logo-icon-inner">
          <span class="material-symbols-outlined icon-filled">coffee</span>
        </div>
      </div>
      <div>
        <div class="logo-title">Star Coffee</div>
        <div class="logo-sub">自家烘培 高端品质轻奢咖啡馆</div>
      </div>
    </div>

    <!-- Action Button -->
    <button class="sidebar-action-btn" @click="handleActionClick">
      <span class="material-symbols-outlined" style="font-size:18px">add</span>
      <span>{{ actionLabel }}</span>
    </button>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <RouterLink to="/chat" class="nav-item" :class="{ active: route.path === '/chat' }">
        <span class="material-symbols-outlined">smart_toy</span>
        <span>AI 聊天</span>
      </RouterLink>
      <RouterLink to="/knowledge" class="nav-item" :class="{ active: route.path === '/knowledge' }">
        <span class="material-symbols-outlined">menu_book</span>
        <span>知识库</span>
      </RouterLink>
      <RouterLink to="/agents" class="nav-item" :class="{ active: route.path === '/agents' }">
        <span class="material-symbols-outlined">psychology</span>
        <span>智能体</span>
      </RouterLink>

      <!-- Knowledge Category Accordion -->
      <div v-if="route.path === '/knowledge'" class="sidebar-section">
        <div class="sidebar-section-toggle" style="pointer-events:none">
          <span>知识库分类</span>
        </div>
        <div class="knowledge-cat-list">
          <div v-for="(cat, idx) in knowledgeCategories" :key="idx" class="kcat-item">
            <button
              class="kcat-header"
              :class="{ active: activeKnowledgeCat === idx }"
              @click="toggleKnowledgeCat(idx)"
            >
              <span class="material-symbols-outlined kcat-icon">{{ cat.icon }}</span>
              <span class="kcat-name">{{ cat.name }}</span>
              <span class="material-symbols-outlined kcat-arrow" :class="{ open: activeKnowledgeCat === idx }">chevron_right</span>
            </button>
            <div class="kcat-children" :class="{ expanded: activeKnowledgeCat === idx }">
              <div>
                <button v-for="(child, ci) in cat.children" 
                :key="ci" 
                class="kcat-child" 
                :class="{ active: child === currentLabel }" 
                @click="goToKnowledgeWithLabel(child)">
                  <span class="kcat-dot"></span>
                  {{ child }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other pages section -->
      <div v-else class="sidebar-section">
        <button class="sidebar-section-toggle" @click="sectionOpen = !sectionOpen">
          <span>{{ sectionLabel }}</span>
          <span class="material-symbols-outlined icon-filled" style="font-size:18px;transition:transform 0.3s" :style="{ transform: sectionOpen ? 'rotate(180deg)' : 'rotate(0)' }">expand_more</span>
        </button>
        <div v-if="sectionOpen" class="sidebar-section-list">
          <a v-for="item in sectionItems" :key="item.label" href="#" class="sidebar-section-item">
            <span>{{ item.label }}</span>
            <span v-if="item.count" class="count">{{ item.count }}</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- User -->
    <div class="sidebar-user">
      <img src="/images/common/touxiang.png" alt="店长头像" />
      <div>
        <div class="sidebar-user-name">店长 赵秀玲</div>
        <div class="sidebar-user-role">Premium Manager</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const showCreateKnowledgeModal = inject('showCreateKnowledgeModal', ref(false))

const route = useRoute()
const router = useRouter() // ← 新增

const sectionOpen = ref(true)
const activeKnowledgeCat = ref(null)

const knowledgeCategories = [
  {
    icon: 'menu_book',
    name: '产品与菜单手册',
    children: ['咖啡菜单', '咖啡豆档案', '饮品&食品标准配方', '新品研发流程与测试记录'],
  },
  {
    icon: 'store',
    name: '运营与现场管理',
    children: ['门店 SOP(开店/闭店、清洁消毒)', '库存管理、损耗控制', '食品安全规范', '设备操作与维护','故障应急处理'],
  },
 
  {
    icon: 'favorite',
    name: '顾客体验与营销',
    children: ['迎宾、点单、客诉处理', '会员体系与私域运营策略', '品牌视觉规范、内容素材库', '本地化营销方案'],
  },
  {
    icon: 'groups',
    name: '人员与制度规范',
    children: ['企业规章制度', '岗位职责与晋升路径', '培训资料', '劳动合规与应急预案'],
  },
  {
    icon: 'inventory_2',
    name: '供应链与成本管控',
    children: ['供应商管理', '采购标准', '成本核算模型'],
  },
  {
    icon: 'bar_chart',
    name: '数据与持续改进',
    children: ['经营数据报表模板', '顾客反馈/改进行动追踪', '知识库更新机制与版本管理'],
  },
]

function toggleKnowledgeCat(idx) {
  activeKnowledgeCat.value = activeKnowledgeCat.value === idx ? null : idx
}
// ===== 新增代码：跳转到 knowledge 页面并携带 label 查询参数 =====
function goToKnowledgeWithLabel(label) {
  router.push({
    path: '/knowledge',
    query: { label: label }
  })
}
// 在 Sidebar.vue 的 script setup 中
const currentLabel = computed(() => route.query.label || '')

const actionLabel = computed(() => {
  if (route.path === '/chat') return '开启新对话'
  if (route.path === '/knowledge') return '新建知识库'
  if (route.path === '/agents') return '新建智能体'
  return '新建'
})

const sectionLabel = computed(() => {
  if (route.path === '/chat') return '对话记录'
  if (route.path === '/agents') return '智能体工作记录'
  return '记录'
})

const sectionItems = computed(() => {
  if (route.path === '/chat') return [
    { label: '美式销量分析' },
    { label: 'Q3 特调成本优化' },
    { label: '节日活动策划建议' },
    { label: '门店客流峰值复盘' },
  ]
  if (route.path === '/agents') return [
    { label: '咖啡顾问智能体巡检' },
    { label: '库存助手补货建议' },
    { label: '质量监控告警复盘' },
    { label: '会员推荐策略迭代' },
  ]
  return []
})

function handleActionClick() {
  if (route.path === '/knowledge') {
    showCreateKnowledgeModal.value = true
  }
}
</script>

<style>
.kcat-child.active {
  color: var(--primary-gold);
  font-weight: bold;
}
</style>
