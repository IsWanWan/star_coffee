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

      <!-- Section -->
      <div class="sidebar-section">
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sectionOpen = ref(true)

const actionLabel = computed(() => {
  if (route.path === '/chat') return '开启新对话'
  if (route.path === '/knowledge') return '新建知识库'
  if (route.path === '/agents') return '新建智能体'
  return '新建'
})

const sectionLabel = computed(() => {
  if (route.path === '/chat') return '对话记录'
  if (route.path === '/knowledge') return '知识库分类'
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
  if (route.path === '/knowledge') return [
    { label: '产品手册', count: '12' },
    { label: '运营 SOP', count: '28' },
    { label: '培训资料', count: '20' },
    { label: '供应链标准', count: '16' },
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
  // placeholder for future action
}
</script>
