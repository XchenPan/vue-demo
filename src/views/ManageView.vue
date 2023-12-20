<script setup>
import { UserFilled, Odometer, EditPen, Avatar } from "@element-plus/icons-vue"
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="logo flex">
          <router-link to="/manage/console"><img src="../assets/logo.svg" alt="" /></router-link>
          <router-link to="/manage/console"><span>大橘子后台管理系统</span></router-link>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul>
            <li>
              <router-link to="/manage/console" active-class="active"
                ><el-icon><Odometer /></el-icon><span>控制台</span></router-link
              >
            </li>
            <li>
              <router-link to="/manage/userManager" active-class="active"
                ><el-icon><UserFilled /></el-icon><span>用户管理</span></router-link
              >
            </li>
            <li>
              <router-link to="/manage/bookManager" active-class="active"
                ><el-icon><EditPen /></el-icon><span>书籍管理</span></router-link
              >
            </li>
            <li>
              <router-link to="/manage/adminInfo" active-class="active"
                ><el-icon><Avatar /></el-icon><span>个人中心</span></router-link
              >
            </li>
          </ul>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header {
  background-color: #213d5b;
}
.el-header .logo {
  align-items: center;
}
.el-header .logo img {
  height: 50px;
}
.el-header .logo span {
  font-size: 24px;
  padding-left: 10px;
  color: rgba(255, 255, 255, 0.8);
}
.el-aside {
  background-color: #1d3043;
  height: calc(100vh - 60px);
}
.el-aside ul {
  padding: 0;
}
.el-aside a {
  display: flex;
  align-items: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.4);
}
.el-aside a span {
  padding-left: 10px;
}
.el-main {
  width: calc(100vw - 200px);
  height: calc(100vh - 60px);
}
.active {
  background-color: #111e2b;
}
.active * {
  color: rgba(255, 255, 255, 0.8);
}
</style>
