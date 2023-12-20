<script setup>
import HeaderFill from "../components/HeaderFill.vue"
import { ServiceGetBookshelfCount, ServiceGetBookshelf, ServiceDeleteBookFromBookshelf } from "../api/bookshelf"
import { ref, onMounted } from "vue"
import { useUserStore } from "@/stores"
import { ElMessage } from "element-plus"

const userStore = useUserStore()

const params = ref({
  limit: 6,
  page: 1
})

const pageTotal = ref(0)
const getTotal = () => {
  ServiceGetBookshelfCount({
    uid: userStore.id
  }).then((res) => {
    pageTotal.value = res.data
  })
}

const items = ref([])
const dataLoad = () => {
  ServiceGetBookshelf({
    uid: userStore.id,
    limit: params.value.limit,
    page: params.value.page
  }).then((res) => {
    items.value = res.data
  })
}

const deleteBook = (ubid) => {
  ServiceDeleteBookFromBookshelf({
    ubid: ubid
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
      dataLoad()
      getTotal()
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
      dataLoad()
      getTotal()
    }
  })
}

onMounted(() => {
  dataLoad()
  getTotal()
})
</script>

<template>
  <div>
    <HeaderFill />
    <div class="bookshelf">
      <div class="container">
        <h2>{{ userStore.username }}的书架</h2>
        <div class="book-list">
          <div class="tip flex" v-show="!items.length">
            <h3>当前书架为空，快去添加吧</h3>
          </div>
          <ul class="flex">
            <li v-for="item in items" :key="item">
              <div class="book-item">
                <div class="book-cover">
                  <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">
                    <img :src="`http://127.0.0.1/book-cover/${item.name}`" alt="" />
                  </router-link>
                </div>
                <div class="book-info">
                  <div class="book-name">
                    <h2>
                      <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">{{
                        item.name
                      }}</router-link>
                    </h2>
                  </div>
                  <div class="book-author">
                    <span>{{ item.author }}</span>
                  </div>
                  <div class="book-read-count">
                    <span>{{ item.readcount }}</span>
                  </div>
                  <div class="book-desc">
                    <p>{{ item.synopsis }}</p>
                  </div>
                </div>
              </div>
              <div class="book-action flex">
                <el-button round>立即阅读</el-button>
                <el-popconfirm :title="`确认要移除《${ item.name }》`" @confirm="deleteBook(item.ubid)">
                  <template #reference>
                    <el-button type="danger" round>移除书架</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination flex" v-show="items.length">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageTotal"
            :page-size="6"
            v-model:current-page="params.page"
            @current-change="dataLoad()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookshelf {
  background-color: rgba(0, 0, 0, 0.05);
}
.container {
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
}

.container h2 {
  color: #555;
  padding-left: 40px;
  padding-top: 20px;
}

.tip {
  justify-content: center;
}

.tip h3 {
  color: #555;
}

.book-list ul {
  padding: 20px 110px;
  justify-content: left;
  flex-wrap: wrap;
}
.book-list ul li {
  width: 300px;
  height: 250px;
  margin: 20px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.book-item {
  display: flex;
  width: 300px;
  margin-bottom: 20px;
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
.book-item .book-info .book-name h2 {
  padding: 0;
}

.book-item .book-info .book-name h2 a {
  color: black;
  font-weight: lighter;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  /* 显示三行，后面省略 */
  overflow: hidden;
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
.book-item .book-info .book-read-count span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.book-item .book-info .book-read-count span::before {
  content: '已读过';
}
.book-item .book-info .book-read-count span::after {
  content: '次';
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

.book-action {
  margin-top: 40px;
  justify-content: center;
}

.pagination {
  justify-content: right;
  margin-right: 80px;
  padding-bottom: 40px;
}
</style>
