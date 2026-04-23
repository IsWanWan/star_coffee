import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import KnowledgeView from '@/views/KnowledgeView.vue'
import AgentsView from '@/views/AgentsView.vue'

const routes = [
  { path: '/', redirect: '/chat' },
  { path: '/chat', component: ChatView, meta: { title: 'AI 聊天' } },
  { path: '/knowledge', component: KnowledgeView, meta: { title: '知识库' } },
  { path: '/agents', component: AgentsView, meta: { title: '智能体' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Star Coffee'} — Star Coffee AI`
})

export default router
