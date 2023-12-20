<script setup>
import { ElNotification } from "element-plus"
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import { ServiveGetBookByNameOrAuthor, ServiveGetBookCountByNameOrAuthor } from "../api/book"
import HeaderFill from "../components/HeaderFill.vue"

const route = new useRoute()
const router = new useRouter()

const params = ref({
  query: route.query.query || "",
  limit: 4,
  page: 1
})
const items = ref({})
const dataLoad = () => {
  ServiveGetBookByNameOrAuthor({
    query: params.value.query,
    limit: params.value.limit,
    page: params.value.page
  }).then((res) => {
    items.value = res
  })
}

const pageTotal = ref(0)
const getTotal = () => {
  ServiveGetBookCountByNameOrAuthor({
    query: params.value.query
  }).then((res) => {
    pageTotal.value = res
  })
}

const handleSubmit = () => {
  const searchText = params.value.query
  router.replace({
    query: {
      query: searchText
    }
  })
  getTotal()
  dataLoad()
}

onMounted(() => {
  getTotal()
  dataLoad()
})

const addBook = () => {
  ElNotification({
    title: "Success",
    message: "加入成功",
    type: "success"
  })
}
</script>

<template>
  <div>
    <HeaderFill />
    <div class="search">
      <div class="container">
        <div class="search-bar">
          <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="请输入书名或作者名" v-model="params.query" />
            <button>搜索</button>
          </form>
        </div>
        <div class="search-result">
          <div v-show="!pageTotal" class="warning flex">
            <h3>当前搜索结果为0</h3>
          </div>
          <ul>
            <li v-for="item in items" :key="item">
              <div class="book-item">
                <div class="book-cover" v-if="item.name">
                  <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">
                    <img :src="`http://127.0.0.1/book-cover/${item.name}`" alt="" />
                  </router-link>
                </div>
                <div class="book-info">
                  <div class="book-name">
                    <h2 v-if="item.name">
                      <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">{{
                        item.name
                      }}</router-link>
                    </h2>
                  </div>
                  <div class="book-author">
                    <span>{{ item.author }}</span>
                  </div>
                  <div class="book-read-count">
                    <span>{{ item.reading }}</span>
                  </div>
                  <div class="book-desc">
                    <p>{{ item.synopsis }}</p>
                  </div>
                </div>
                <div class="book-action">
                  <el-button round>立即阅读</el-button>
                  <el-button type="primary" round @click="addBook">加入书架</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination flex">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageTotal"
            :page-size="params.limit"
            v-model:current-page="params.page"
            @current-change="handleSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  background-color: rgba(0, 0, 0, 0.05);
}

.search .container {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
  background-color: white;
  overflow: hidden;
}

.search-bar form {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar input {
  width: 400px;
  height: 45px;
  background-image: url(../assets/搜索.svg);
  background-repeat: no-repeat;
  border-radius: 30px 0px 0px 30px;
  padding-left: 50px;
  background-position: 10px 8px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  border: none;
  outline: rgba(0, 0, 0, 0.5) solid 1px;
}

.search-bar input:focus {
  outline: coral solid 1px;
}

.search-bar button {
  width: 90px;
  height: 47px;
  border: none;
  background-color: coral;
  color: #fff;
  border-radius: 0px 20px 20px 0px;
  font-size: 20px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #ff5900;
}

.search-total,
.search-result {
  margin: 0 60px;
}

.search-result .warning {
  justify-content: center;
}

.search-result .warning h3 {
  color: #333;
}

.search-result ul li {
  display: flex;
  justify-content: space-between;
}

.search-result ul li .book-item {
  width: 1120px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.book-action {
  margin-left: 515px;
  margin-top: 70px;
}

.book-item {
  display: flex;
  width: 300px;
  flex-shrink: 0;
}

.book-item .book-cover {
  width: 120px;
  height: 160px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
}

.book-item .book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 0.5s;
}

.book-item .book-cover img:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.book-item .book-info {
  margin-left: 10px;
  width: 170px;
}

.book-item .book-info .book-name h2 a {
  color: black;
  font-weight: lighter;
}

.book-item .book-info .book-name h2 a:hover {
  color: #ff4f00;
}

.book-item .book-info .book-author {
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.6);
}
.book-item .book-info .book-author span::before {
  content: '作者:';
}
.book-item .book-info .book-read-count {
  margin-top: 5px;
}
.book-item .book-info .book-read-count span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.book-item .book-info .book-read-count span::after {
  content: '人在读';
}
.book-item .book-info .book-desc {
  margin-top: 10px;
}
.book-item .book-info .book-desc p {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 显示三行，后面省略 */
  overflow: hidden;
}

.pagination {
  justify-content: center;
  margin: 20px;
}
</style>
