<script setup>
import TypeFilter from "../components/TypeFilter.vue"
import { ServiceGetBookList, ServiceGetBookCount } from "../api/book"
import { ref, onMounted, reactive } from "vue"
import HeaderFill from "../components/HeaderFill.vue"

const params = reactive({
  limit: 9,
  page: 1,
  audience: "全部",
  language: "全部",
  type: "全部",
  sort: "最热"
})

const handleSelecting = (selectedOptions) => {
  params.audience = selectedOptions.reader
  params.language = selectedOptions.lang
  params.type = selectedOptions.type
  params.sort = selectedOptions.sort
  dataLoad()
  getTotal()
}

const pageTotal = ref(0)
const getTotal = () => {
  ServiceGetBookCount(params).then((res) => {
    pageTotal.value = res
  })
}

const items = ref([])
const dataLoad = () => {
  ServiceGetBookList(params).then((res) => {
    items.value = res
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
    <TypeFilter @selecting="handleSelecting" />
    <div class="book-list-content">
      <div class="container">
        <div class="book-list">
          <ul class="flex">
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
            @current-change="dataLoad()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-list {
  margin: 0 20px;
}
.book-list ul {
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 0;
}
.book-list ul li {
  width: 400px;
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

/* .book-item .book-info .book-desc p::before {
  content: "\2003\2003";
} */

.book-list-content {
  margin: 20px 0;
}

.pagination {
  justify-content: right;
  margin-right: 110px;
}
</style>
