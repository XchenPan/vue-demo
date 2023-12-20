<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
let second = ref(5)

onMounted(() => {
  let timer = setInterval(() => {
    second.value--

    if (second.value <= 0) {
      clearInterval(timer)
      router.push("/")
    }
  }, 1000)
})
</script>

<template>
  <div>
    <section class="not-found">
      <div class="not-found-left">
        <img src="@/assets/not-found.svg" />
      </div>
      <div class="not-found-right">
        <h1>404</h1>
        <p>抱歉，你访问的页面不存在...</p>
        <div>
          <el-button type="primary" size="small"> 返回首页 ({{ second }}S) </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.not-found {
  position: fixed;
  width: 600px;
  height: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.not-found-left {
  width: 300px;
  height: 300px;
  float: left;
}

.svg-notfount {
  width: 300px;
  height: 300px;
}

.not-found-right {
  width: 300px;
  height: 300px;
  float: left;
  color: #666;
}

.not-found-right h1 {
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
  padding-left: 30px;
  margin-top: 50px;
}

.not-found-right p {
  padding-left: 30px;
  margin-bottom: 16px;
  font-size: 20px;
  line-height: 28px;
}

.not-found-right div {
  padding-left: 30px;
  margin-top: 20px;
}
</style>
