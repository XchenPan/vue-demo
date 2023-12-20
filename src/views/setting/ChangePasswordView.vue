<script setup>
import { useUserStore } from "@/stores"
import { ref } from "vue"
import { ServeUpdateUserPassword } from "@/api/user"
import { ElMessage } from "element-plus"

const userStore = useUserStore()

const originalPassword = ref("")
const password = ref("")
const confirmationPassword = ref("")
const saveChanges = () => {
  if (password.value !== confirmationPassword.value) {
    ElMessage({ showClose: true, message: "密码与确认密码不一致", type: "warning" })
  } else if (
    !password.value.length ||
    !originalPassword.value.length ||
    !confirmationPassword.value.length
  ) {
    ElMessage({ showClose: true, message: "请勿随意提交", type: "warning" })
  } else {
    ServeUpdateUserPassword({
      id: userStore.id,
      originalPassword: originalPassword.value,
      password: password.value,
    }).then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
  }
  location.reload()
}
</script>

<template>
  <div>
    <div class="change-password">
      <div class="original-password flex">
        <h4>原密码:</h4>
        <el-input type="password" v-model="originalPassword" />
      </div>
      <div class="password flex">
        <h4>新密码:</h4>
        <el-input type="password" v-model="password" />
      </div>
      <div class="confirmation-password flex">
        <h4>确认密码:</h4>
        <el-input type="password" v-model="confirmationPassword" />
      </div>
      <div class="action">
        <el-button @click="saveChanges" type="success">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.change-password {
  padding: 20px;
  height: 520px;
  background-color: #eee;
}
.change-password h4 {
  width: 100px;
  color: #666;
  padding-right: 20px;
}

.change-password div {
  padding: 5px 0;
  align-items: center;
}

.change-password div .el-input {
  width: 250px;
}
</style>
