<script setup>
import { User, Close } from "@element-plus/icons-vue"
import { useUserStore } from "@/stores"

const userStore = useUserStore()
const handleSignOut = () => {
  userStore.logoutLogin()
}
</script>

<template>
  <div class="avatar">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar src="http://localhost/avatar/我的头像" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><el-icon><User /></el-icon><router-link to="/setting">个人中心</router-link></el-dropdown-item
          >
          <el-dropdown-item divided @click="handleSignOut"
            ><el-icon><Close /></el-icon>安全退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-dropdown-link {
  outline: unset;
}
</style>
