<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { ref } from "vue"
import { useUserStore } from "@/stores"
import { isLoggedIn } from "@/utils/auth"

const isAdd = ref(false)
const handlescroll = (event) => {
  const scrollTop = event.scrollTop
  isAdd.value = scrollTop > 50
}

const userStore = useUserStore()
const init = () => {
  if (!isLoggedIn()) return
  userStore.loadSetting()
}
init()
</script>

<template>
  <div>
    <el-scrollbar height="100vh" @scroll="handlescroll">
      <Header :addActiveClass="isAdd" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer />
    </el-scrollbar>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
