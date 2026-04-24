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
          <button class="filter-btn" @click="handleFilterClick"> 
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
            @click="activeTag = tag;handleFilterClick()"
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
          <div  
          v-for="item in knowledgeList"
          key="item.id"
          class="doc-card glass-card"
          >
            <div class="doc-card-img-wrap">
              
              <img :src="'http://localhost:8000' + item.image_url" :alt="item.name" class="doc-card-img" />
              <div class="doc-card-img-overlay"></div>
              <span class="doc-card-tag">{{ item.label }}</span>
            </div>
            <div class="doc-card-body">
              <div class="doc-card-row">
                <h4 class="doc-card-title">{{ item.name }}</h4>
                <span class="doc-card-id">{{ item.code }}</span>
              </div>
              <p class="doc-card-desc">{{ item.description }}</p>
              <div class="doc-card-footer">
                <span class="doc-card-time">2 小时前更新</span>
                <span class="doc-card-link">查看详情</span>
              </div>
            </div>
          </div>

         

        

          <!-- Card 5: Add New -->
          <div class="doc-card doc-card--add" @click="showCreateModal = true">
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

    <!-- Create Knowledge Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <div class="modal-header">
            <div class="modal-title-group">
              <div class="modal-icon">
                <span class="material-symbols-outlined" style="font-size:20px;color:#0F0E0D">library_books</span>
              </div>
              <div>
                <h3 class="modal-title">新建知识库</h3>
                <p class="modal-subtitle">创建新的知识库条目并配置检索信息</p>
              </div>
            </div>
            <button class="modal-close" @click="closeModal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- Name -->
            <div class="form-group">
              <label class="form-label">知识库名称 <span class="required">*</span></label>
              <input
                v-model="form.name"
                class="form-input"
                placeholder="例：食品规范/设备操作指南"
                type="text"
              />
            </div>

            <!-- Category -->
            <div class="form-group">
              <label class="form-label">分类</label>
              <div class="select-wrap">
                <select v-model="form.category" class="form-select">
                  <option value="">请选择分类</option>
                  <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                </select>
                <span class="material-symbols-outlined select-arrow">expand_more</span>
              </div>
            </div>

             <!-- Tags -->
             <div class="form-group">
              <label class="form-label">检索标签</label>
              <div v-if="!form.category" class="tags-empty-hint">请先选择分类</div>
              <template v-else>
                <div class="tag-options">
                  <button
                    v-for="tag in availableTags"
                    :key="tag"
                    type="button"
                    class="tag-option"
                    :class="{ selected: form.tags.includes(tag) }"
                    @click="toggleTag(tag)"
                  >
                    <span class="tag-option-check material-symbols-outlined" v-if="form.tags.includes(tag)">check</span>
                    # {{ tag }}
                  </button>
                </div>
                <div v-if="form.tags.length" class="tags-selected-summary">
                  已选 {{ form.tags.length }} 个标签
                </div>
              </template>
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label">简介</label>
              <textarea
                v-model="form.description"
                class="form-textarea"
                placeholder="简要描述该知识库的内容与用途..."
                rows="3"
              ></textarea>
            </div>

           

            <!-- Cover Image -->
            <div class="form-group">
              <label class="form-label">封面图片</label>
              <div
                class="cover-upload-zone"
                :class="{ 'cover-upload-zone--active': isCoverDragging, 'cover-upload-zone--filled': form.coverPreview }"
                @dragover.prevent="isCoverDragging = true"
                @dragleave="isCoverDragging = false"
                @drop.prevent="handleCoverDrop"
                @click="triggerCoverInput"
              >
                <input ref="coverInputRef" type="file" accept="image/*" style="display:none" @change="handleCoverChange" />
                <template v-if="form.coverPreview">
                  <img :src="form.coverPreview" class="cover-preview-img" alt="封面预览" />
                  <div class="cover-preview-overlay">
                    <span class="material-symbols-outlined" style="font-size:20px">edit</span>
                    <span style="font-size:12px">更换图片</span>
                  </div>
                  <button class="cover-remove-btn" @click.stop="removeCover">
                    <span class="material-symbols-outlined" style="font-size:14px">close</span>
                  </button>
                </template>
                <template v-else>
                  <span class="material-symbols-outlined cover-upload-icon">add_photo_alternate</span>
                  <p class="upload-text">拖拽图片至此，或 <span class="upload-link">点击上传</span></p>
                  <p class="upload-hint">支持 JPG、PNG、WebP，建议比例 16:9</p>
                </template>
              </div>
            </div>

            <!-- Upload -->
            <div class="form-group">
              <label class="form-label">上传文档</label>
              <div
                class="upload-zone"
                :class="{ 'upload-zone--active': isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
              >
                <input ref="fileInputRef" type="file" multiple accept=".pdf,.doc,.docx,.txt,.md" style="display:none" @change="handleFileChange" />
                <span class="material-symbols-outlined upload-icon">upload_file</span>
                <p class="upload-text">拖拽文件至此，或 <span class="upload-link">点击上传</span></p>
                <p class="upload-hint">支持 PDF、Word、TXT、Markdown，单文件最大 20MB</p>
                <div v-if="form.files.length" class="file-list">
                  <div v-for="(f, i) in form.files" :key="i" class="file-item">
                    <span class="material-symbols-outlined" style="font-size:14px;color:var(--primary-gold)">description</span>
                    <span class="file-name">{{ f.name }}</span>
                    <button class="tag-remove" @click.stop="removeFile(i)">
                      <span class="material-symbols-outlined" style="font-size:12px">close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-cancel" @click="closeModal">取消</button>
            <button class="btn-submit" :disabled="!form.files.length" @click="handleSubmit">
              <span class="material-symbols-outlined" style="font-size:16px">add</span>
              创建知识库
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject , onMounted} from 'vue'
// ===== 新增代码：导入 axios =====
import axios from 'axios'

const searchQuery = ref('')
const activeTag = ref('全部')
// ===== 新增代码：用于存储实际传递给后端的 label =====
const selectedLabelForFilter = computed(() => {
  // 如果选中的是“全部”，则不传 label 参数
  return activeTag.value === '全部' ? '' : activeTag.value;
});
const filterTags = ['全部', '菜单', '企业规章制度', '食品标准配方', '私域运营策略','会员体系','设备操作与维护','品牌视觉规范','门店 SOP']

const weeklyUpdates = [
  { title: '新增：冷萃出杯时长标准', time: '2 小时前', category: '运营 SOP' },
  { title: '修订：会员问答话术模板', time: '昨天', category: '培训资料' },
  { title: '归档：春季风味推荐手册', time: '3 天前', category: '产品手册' },
]

const categories_nav = [
  { icon: 'menu_book', name: '产品与菜单手册', children: ['咖啡菜单', '咖啡豆档案', '饮品&食品标准配方', '新品研发流程与测试记录'] },
  { icon: 'store', name: '运营与现场管理', children: ['门店 SOP(开店/闭店、清洁消毒)', '库存管理、损耗控制', '食品安全规范', '设备操作与维护', '故障应急处理'] },
  { icon: 'favorite', name: '顾客体验与营销', children: ['迎宾、点单、客诉处理', '会员体系','私域运营策略', '品牌视觉规范、内容素材库', '本地化营销方案'] },
  { icon: 'groups', name: '人员与制度规范', children: ['企业规章制度', '岗位职责与晋升路径', '培训资料', '劳动合规与应急预案'] },
  { icon: 'inventory_2', name: '供应链与成本管控', children: ['供应商管理', '采购标准', '成本核算模型'] },
  { icon: 'bar_chart', name: '数据与持续改进', children: ['经营数据报表模板', '顾客反馈/改进行动追踪', '知识库更新机制与版本管理'] },
]

const activeCategory = ref(null)
const activeChild = ref(null)



function toggleCategory(idx) {
  activeCategory.value = activeCategory.value === idx ? null : idx
}

const categoryTagMap = {
  '产品与菜单手册': ['咖啡菜单', '咖啡豆档案', '饮品&食品标准配方', '新品研发流程与测试记录'],
  '运营与现场管理': ['门店 SOP(开店/闭店、清洁消毒)', '库存管理、损耗控制', '食品安全规范', '设备操作与维护', '故障应急处理'],
  '顾客体验与营销': ['迎宾、点单、客诉处理', '会员体系与私域运营策略', '品牌视觉规范、内容素材库', '本地化营销方案'],
  '人员与制度规范': ['企业规章制度', '岗位职责与晋升路径', '培训资料', '劳动合规与应急预案'],
  '供应链与成本管控': ['供应商管理', '采购标准', '成本核算模型'],
  '数据与持续改进': ['经营数据报表模板', '顾客反馈/改进行动追踪', '知识库更新机制与版本管理'],
}

// Modal
const showCreateModal = inject('showCreateKnowledgeModal', ref(false))
const isDragging = ref(false)
const fileInputRef = ref(null)
const isCoverDragging = ref(false)
const coverInputRef = ref(null)
// ===== 新增代码：添加 loading 状态 =====
const isLoading = ref(false)
const categories = Object.keys(categoryTagMap)

const defaultForm = () => ({ name: '', category: '', description: '', tags: [], files: [], coverPreview: '' })
const form = ref(defaultForm())

const availableTags = computed(() => categoryTagMap[form.value.category] ?? [])
// ===== 新增代码：定义知识库列表的响应式变量 =====
const knowledgeList = ref([])

watch(() => form.value.category, () => { form.value.tags = [] })

function toggleTag(tag) {
  const idx = form.value.tags.indexOf(tag)
  if (idx === -1) form.value.tags.push(tag)
  else form.value.tags.splice(idx, 1)
}

// ===== 新增代码：定义获取知识库列表的函数 =====
async function fetchKnowledgeList(keyword = '', label = '') {
  try {
    // 构建查询参数
    const params = {};
    if (keyword) params.keyword = keyword;
    if (label) params.label = label;

    const response = await axios.get('http://localhost:8000/starcoffee/knowledge/get/',{params})
    console.log('获取知识库列表成功:', response.data)
    // 假设后端返回的数据结构为 { data: [...] }
    knowledgeList.value = response.data.data || []
  } catch (error) {
    console.error('获取知识库列表失败:', error)
    alert('加载知识库列表失败，请稍后重试。')
    // 可以在这里设置一个错误状态变量用于在UI上显示
  }
}

// ===== 新增代码：在组件挂载时调用获取函数 =====
onMounted(() => {
  fetchKnowledgeList()
})

// ===== 新增代码：处理筛选按钮点击 =====
function handleFilterClick() {
  fetchKnowledgeList(searchQuery.value.trim(), selectedLabelForFilter.value);
}

function closeModal() {
  showCreateModal.value = false
  form.value = defaultForm()
   // ===== 新增代码：重置 loading 状态 =====
   isLoading.value = false
}

function triggerFileInput() { fileInputRef.value?.click() }

function handleFileChange(e) {
  form.value.files.push(...Array.from(e.target.files))
  e.target.value = ''
}

function handleDrop(e) {
  isDragging.value = false
  form.value.files.push(...Array.from(e.dataTransfer.files))
}

function triggerCoverInput() { coverInputRef.value?.click() }

function setCoverFile(file) {
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = e => { form.value.coverPreview = e.target.result }
  reader.readAsDataURL(file)
  // ===== 新增代码：保存原始文件对象 =====
  form.value.coverFile = file

}

function handleCoverChange(e) {
  setCoverFile(e.target.files[0])
  e.target.value = ''
}

function handleCoverDrop(e) {
  isCoverDragging.value = false
  setCoverFile(e.dataTransfer.files[0])
}

function removeCover() { 
  form.value.coverPreview = '' 
   // ===== 新增代码：重置封面文件 =====
  form.value.coverFile = null
}

function removeFile(i) { form.value.files.splice(i, 1) }

// function handleSubmit() {
//   console.log('create knowledge base', form.value)
//   closeModal()
// }
// ===== 新增代码：验证表单 =====
function validateForm() {
  if (!form.value.name.trim()) {
    alert('请填写知识库名称')
    return false
  }
  if (!form.value.category) {
    alert('请选择分类')
    return false
  }
  if (form.value.tags.length === 0) {
    alert('请至少选择一个标签')
    return false
  }
  if (!form.value.description.trim()) {
    alert('请填写简介')
    return false
  }
  if (!form.value.coverFile) {
    alert('请上传封面图片')
    return false
  }
  if (form.value.files.length === 0) {
    alert('请上传至少一个文档')
    return false
  }
  return true
}

// ===== 新增代码：提交表单到后端 =====
async function handleSubmit() {
  // 验证表单
  if (!validateForm()) return
  
  // 设置 loading 状态
  isLoading.value = true
  
  try {
    // 创建 FormData 对象
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('category', form.value.category)
    formData.append('label', form.value.tags.join(',')) // 多个标签用逗号拼接
    formData.append('description', form.value.description)
    
    // 添加封面图片
    formData.append('image', form.value.coverFile)
    
    // 添加文档文件（支持多个）
    form.value.files.forEach(file => {
      formData.append('file', file)
    })
    
    // 发送请求
    const response = await axios.post('http://localhost:8000/starcoffee/rag/knowledge', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    // 处理成功响应
    console.log('知识库创建成功:', response.data)
    alert(response.data.message)
    
    // 关闭模态框
    closeModal()
  } catch (error) {
    // 处理错误
    console.error('创建知识库失败:', error)
    if (error.response) {
      // 服务器返回了错误响应
      alert(`创建失败: ${error.response.data.message || error.response.statusText}`)
    } else if (error.request) {
      // 请求已发出但没有收到响应
      alert('网络错误，请检查服务器是否运行')
    } else {
      // 其他错误
      alert('创建失败: ' + error.message)
    }
  } finally {
    // 重置 loading 状态
    isLoading.value = false
  }
}


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

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 5, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}
.modal-box {
  background: #1c1710;
  border: 1px solid rgba(197,160,89,0.2);
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6);
}
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 20px;
  border-bottom: 1px solid rgba(197,160,89,0.1);
  flex-shrink: 0;
}
.modal-title-group { display: flex; align-items: center; gap: 14px; }
.modal-icon {
  width: 40px; height: 40px;
  background: var(--primary-gold);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.modal-title { font-size: 18px; font-weight: 600; color: white; margin-bottom: 2px; }
.modal-subtitle { font-size: 12px; color: rgba(197,160,89,0.5); }
.modal-close {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(197,160,89,0.15);
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.modal-close:hover { background: rgba(197,160,89,0.1); }
.modal-close .material-symbols-outlined { color: rgba(197,160,89,0.6); font-size: 18px; }

.modal-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 12px; font-weight: 600; color: rgba(197,160,89,0.7); letter-spacing: 0.05em; }
.required { color: #e57373; }
.form-input, .form-select, .form-textarea {
  background: rgba(22,19,14,0.8);
  border: 1px solid rgba(197,160,89,0.15);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--on-surface);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--primary-gold);
  box-shadow: 0 0 0 1px rgba(197,160,89,0.3);
}
.form-input::placeholder, .form-textarea::placeholder { color: rgba(197,160,89,0.25); }
.form-textarea { resize: vertical; min-height: 80px; }
.select-wrap { position: relative; }
.form-select { width: 100%; appearance: none; cursor: pointer; }
.form-select option { background: #1c1710; }
.select-arrow {
  position: absolute;
  right: 12px; top: 50%;
  transform: translateY(-50%);
  color: rgba(197,160,89,0.5);
  font-size: 18px;
  pointer-events: none;
}

.tags-input-wrap {
  background: rgba(22,19,14,0.8);
  border: 1px solid rgba(197,160,89,0.15);
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  transition: border-color 0.2s;
}
.tags-empty-hint {
  font-size: 12px;
  color: rgba(197,160,89,0.3);
  padding: 10px 14px;
  background: rgba(22,19,14,0.8);
  border: 1px solid rgba(197,160,89,0.15);
  border-radius: 8px;
}
.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-option {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(22,19,14,0.8);
  border: 1px solid rgba(197,160,89,0.2);
  color: rgba(197,160,89,0.6);
  cursor: pointer;
  transition: all 0.15s;
}
.tag-option:hover { border-color: rgba(197,160,89,0.5); color: var(--primary-gold); }
.tag-option.selected { background: rgba(197,160,89,0.15); border-color: var(--primary-gold); color: var(--primary-gold); }
.tag-option-check { font-size: 12px; }
.tags-selected-summary { font-size: 11px; color: rgba(197,160,89,0.4); margin-top: 4px; }

.tags-list { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(197,160,89,0.15);
  border: 1px solid rgba(197,160,89,0.3);
  color: var(--primary-gold);
  font-size: 12px;
}
.tag-remove {
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; cursor: pointer;
  color: rgba(197,160,89,0.6); padding: 0;
  transition: color 0.2s;
}
.tag-remove:hover { color: var(--primary-gold); }
.tags-input {
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--on-surface);
  font-size: 13px;
  padding: 2px 0;
}
.tags-input::placeholder { color: rgba(197,160,89,0.25); }

.cover-upload-zone {
  border: 2px dashed rgba(197,160,89,0.2);
  border-radius: 10px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cover-upload-zone:hover,
.cover-upload-zone--active {
  border-color: rgba(197,160,89,0.5);
  background: rgba(197,160,89,0.04);
}
.cover-upload-zone--filled { border-style: solid; border-color: rgba(197,160,89,0.3); }
.cover-upload-icon { font-size: 32px; color: rgba(197,160,89,0.4); }
.cover-preview-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.cover-preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,8,5,0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: rgba(197,160,89,0.9);
  opacity: 0;
  transition: opacity 0.2s;
}
.cover-upload-zone:hover .cover-preview-overlay { opacity: 1; }
.cover-remove-btn {
  position: absolute;
  top: 8px; right: 8px;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: rgba(10,8,5,0.7);
  border: 1px solid rgba(197,160,89,0.3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: rgba(197,160,89,0.8);
  transition: background 0.2s;
  z-index: 1;
}
.cover-remove-btn:hover { background: rgba(197,160,89,0.2); }

.upload-zone {
  border: 2px dashed rgba(197,160,89,0.2);
  border-radius: 10px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.upload-zone:hover, .upload-zone--active {
  border-color: rgba(197,160,89,0.5);
  background: rgba(197,160,89,0.04);
}
.upload-icon { font-size: 32px; color: rgba(197,160,89,0.4); }
.upload-text { font-size: 13px; color: rgba(197,160,89,0.6); }
.upload-link { color: var(--primary-gold); font-weight: 600; }
.upload-hint { font-size: 11px; color: rgba(197,160,89,0.3); }
.file-list { width: 100%; margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(45,27,15,0.5);
  border: 1px solid rgba(197,160,89,0.1);
}
.file-name { flex: 1; font-size: 12px; color: rgba(197,160,89,0.8); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(197,160,89,0.1);
  flex-shrink: 0;
}
.btn-cancel {
  padding: 9px 20px;
  border-radius: 8px;
  font-size: 14px;
  background: transparent;
  border: 1px solid rgba(197,160,89,0.2);
  color: rgba(197,160,89,0.7);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover { border-color: rgba(197,160,89,0.4); color: var(--primary-gold); }
.btn-submit {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: var(--primary-gold);
  color: #0F0E0D;
  border: none;
  cursor: pointer;
  transition: filter 0.2s;
}
.btn-submit:hover:not(:disabled) { filter: brightness(1.1); }
.btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }

/* ===== 新增代码：加载状态样式 ===== */
.btn-submit.loading {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-submit.loading::after {
  content: "...";
}
</style>
