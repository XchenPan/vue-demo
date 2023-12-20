<script setup>
import { reactive, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { User, Lock } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { ServeLogin } from "@/api/user"
import { setAccessToken } from "@/utils/auth"
import { useUserStore } from "@/stores"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const formRef = ref()

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
  code: {
    required: true,
    trigger: ["blur", "input"],
    message: "验证码不能为空"
  }
}

const formData = reactive({
  username: "",
  password: "",
  code: "",
  loading: false
})
const onLogin = () => {
  formData.loading = true

  const response = ServeLogin({
    username: formData.username,
    password: formData.password,
  })

  response.then(async (res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
      setAccessToken(res.data.token, res.data.expires)
      userStore.loadSetting()
      router.push(route.query.redirect || "/")
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  })

  response.finally(() => {
    formData.loading = false
  })
}

const codeImageUrl = ref("http://localhost:8080/CodeServlet?action=getCode")
const updateCode = () => {
  const timestamp = new Date().getTime()
  codeImageUrl.value = `http://localhost:8080/CodeServlet?action=getCode&_=${timestamp}`
}

const onValidate = (event) => {
  event.preventDefault()

  formRef.value.validate((errors) => {
    !errors && onLogin()
  })
}
</script>

<template>
  <div class="login flex">
    <el-form
      ref="formRef"
      class="form"
      size="large"
      :model="formData"
      style="max-width: 400px"
      :rules="rules"
    >
      <h2>用户登录</h2>
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
        />
      </el-form-item>
      <div class="code flex">
        <el-form-item style="width: 100px" prop="code">
          <el-input v-model="formData.code" @keydown.enter="onValidate" placeholder="验证码" />
        </el-form-item>
        <el-form-item>
          <div class="code-btn" @click="updateCode">
            <img class="code-image" :src="codeImageUrl" alt="看不清？点击刷新验证码" />
          </div>
        </el-form-item>
      </div>
      <div class="submit flex">
        <el-form-item>
          <el-button type="primary" @click="onValidate" :loading="formData.loading"
            >立即登录</el-button
          >
        </el-form-item>
      </div>
      <div class="login-help flex">
        <el-button link>找回密码</el-button>
        <el-button link>账号注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login {
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/bg.png');
}
.login .form {
  padding: 20px 40px;
  border: 1px solid #999;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}
.login .form h2 {
  margin-bottom: 20px;
  color: #222;
}
.code {
  justify-content: space-between;
}
.code-btn {
  width: 100px;
  height: 38px;
  cursor: pointer;
}
.code-btn .code-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.submit {
  justify-content: center;
}
.submit button {
  width: 250px;
}
.login-help {
  justify-content: space-between;
}
</style>
