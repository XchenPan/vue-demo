<script setup>
import { User, Lock, Iphone } from "@element-plus/icons-vue"
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { ServeRegister } from "@/api/user"

const formRef = ref()
const router = useRouter()
const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "账号不能为空"
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空"
  },
  phone: {
    required: true,
    trigger: ["blur", "input"],
    message: "电话不能为空"
  }
}

const formData = reactive({
  username: "",
  password: "",
  phone: "",
  loading: false
})
const onRegister = () => {
  formData.loading = true

  const response = ServeRegister({
    username: formData.username,
    password: formData.password,
    phone: formData.phone
  })

  response.then(async (res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
      router.push("/auth/login")
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  })
  response.finally(() => {
    formData.loading = false
  })
}

const onValidate = (event) => {
  event.preventDefault()
  if (formData.username.length == 0 || formData.password == 0 || formData.phone.length == 0) {
    return
  }
  onRegister()
  formRef.value.validate((errors) => {
    !errors && onRegister()
  })
}
</script>

<template>
  <div class="register flex">
    <el-form
      ref="formRef"
      class="form"
      size="large"
      :model="formData"
      style="max-width: 400px"
      :rules="rules"
    >
      <h2>用户注册</h2>
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          :prefix-icon="User"
          @keydown.enter="onValidate"
          placeholder="请输入用户名称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          :prefix-icon="Lock"
          @keydown.enter="onValidate"
          placeholder="请输入用户密码"
          type="password"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="formData.phone"
          :prefix-icon="Iphone"
          @keydown.enter="onValidate"
          placeholder="请输入电话号码"
        />
      </el-form-item>
      <div class="submit flex">
        <el-form-item>
          <el-button type="primary" @click="onValidate" :loading="formData.loading"
            >立即注册</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.register {
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/bg.png');
}

.register .form {
  padding: 20px 40px;
  border: 1px solid #999;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}
.register .form h2 {
  margin-bottom: 20px;
  color: #222;
}
.submit {
  justify-content: center;
}
.submit button {
  width: 250px;
}
</style>
