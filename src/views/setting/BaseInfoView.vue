<script setup>
import { useUserStore } from "@/stores"
import { ref } from "vue"
import { ServeUpdateUserSetting } from "@/api/user"
import { ElMessage } from "element-plus"

const userStore = useUserStore()

const isEditing = ref(true)
const startEditing = () => {
  isEditing.value = false
}

const saveChanges = () => {
  ServeUpdateUserSetting({
    id: userStore.id,
    username: userStore.username,
    sex: userStore.sex,
    phone: userStore.phone,
    email: userStore.email
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  })
  isEditing.value = true
  userStore.loadSetting()
  location.reload()
}
</script>

<template>
  <div>
    <div class="base-info">
      <div class="user-avatar flex">
        <h4>我的头像:</h4>
        <div><img src="http://localhost/avatar/我的头像" alt="" /></div>
      </div>
      <div class="user-id flex">
        <h4>用户ID:</h4>
        <span>{{ userStore.id }}</span>
      </div>
      <div class="username flex">
        <h4>用户名:</h4>
        <el-input :disabled="isEditing" v-model="userStore.username" />
      </div>
      <div class="user-sex flex">
        <h4>性别:</h4>
        <el-select :disabled="isEditing" v-model="userStore.sex" placeholder="Select">
          <el-option value="男" />
          <el-option value="女" />
          <el-option value="秘密" />
        </el-select>
      </div>
      <div class="user-phone flex">
        <h4>电话:</h4>
        <el-input :disabled="isEditing" v-model="userStore.phone" />
      </div>
      <div class="user-email flex">
        <h4>邮箱:</h4>
        <el-input :disabled="isEditing" v-model="userStore.email" />
      </div>
      <div class="user-role flex">
        <h4>角色:</h4>
        <span>{{ userStore.role }}</span>
      </div>
      <div class="user-works flex">
        <h4>作品数:</h4>
        <span>{{ userStore.works }}</span>
      </div>
      <div class="user-createtime flex">
        <h4>加入时间:</h4>
        <span>{{ userStore.createtime }}</span>
      </div>
      <div class="action">
        <el-button @click="startEditing" type="primary">编辑</el-button>
        <el-button @click="saveChanges" v-if="!isEditing" type="success">保存</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-info {
  padding: 20px;
  height: 520px;
  background-color: #eee;
}
.user-avatar {
  justify-content: left;
}
.base-info h4 {
  width: 100px;
  color: #666;
  padding-right: 20px;
}
.base-info span {
  color: #666;
}
.user-avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
}
.base-info div:first-child {
  padding: 0 0 20px 0;
}
.base-info div {
  padding: 3px 0;
  align-items: center;
}
.base-info div .el-input,
.el-select {
  width: 250px;
}
.base-info .action {
  margin-top: 20px;
}
</style>
