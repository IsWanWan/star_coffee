<template>
  <div class="app-layout">
    <SideNav />
    <div class="main-content">
      <TopBar />
      <RouterView />
    </div>
    <!-- Background decoration -->
    <div class="bg-deco bg-deco--top-right"></div>
    <div class="bg-deco bg-deco--bottom-left"></div>
  </div>
</template>

<script setup>
import SideNav from '@/components/SideNav.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
.bg-deco {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}
.bg-deco--top-right {
  top: 0; right: 0;
  width: 600px; height: 600px;
  background: rgba(233, 193, 118, 0.05);
  filter: blur(120px);
}
.bg-deco--bottom-left {
  bottom: 0; left: 0;
  width: 400px; height: 400px;
  background: rgba(45, 27, 15, 0.2);
  filter: blur(100px);
}
</style>
