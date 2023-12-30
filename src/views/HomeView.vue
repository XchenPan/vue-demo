<script setup>
import { ref, reactive, onMounted } from "vue"
import { ServiveGetTopOneBook, ServiveGetTopListBook } from "../api/book"

const item = ref({})
const topOneBookLoad = () => {
  ServiveGetTopOneBook().then((res) => {
    item.value = res
  })
}

const items = reactive([])
const topBookListLoad = () => {
  ServiveGetTopListBook().then((res) => {
    items.values = res
  })
}

onMounted(() => {
  topOneBookLoad()
  topBookListLoad()
})
</script>

<template>
  <div>
    <div class="carousel">
    <div class="block text-center" m="t-4">
      <el-carousel trigger="click" height="400px">
        <el-carousel-item v-for="item in 5" :key="item">
          <img :src="`http://127.0.0.1/carousel/c${item}`" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div class="recommend">
    <div class="container">
      <div class="content">
        <h2>为你推荐</h2>
        <div class="recommend-list flex">
          <div class="recommend-list-first">
            <div class="first-book-content">
              <div class="book-cover" v-if="item.name">
                <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">
                  <img :src="`http://127.0.0.1/book-cover/${item.name}`" alt="" />
                </router-link>
              </div>
              <div class="book-info">
                <div class="title" v-if="item.name">
                  <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">{{
                    item.name
                  }}</router-link>
                </div>
                <div class="auther">{{ item.author }}</div>
                <p>{{ item.synopsis }}</p>
              </div>
            </div>
          </div>
          <div class="recommend-list-group">
            <ul class="flex">
              <li v-for="item in items.values" :key="item">
                <div class="group-book-content">
                  <div class="book-cover" v-if="item.name">
                    <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">
                      <img :src="`http://127.0.0.1/book-cover/${item.name}`" alt="" />
                    </router-link>
                  </div>
                  <div class="book-info">
                    <div class="title" v-if="item.name">
                      <router-link :to="{ name: 'bookdetail', params: { bookName: item.name } }">{{
                        item.name
                      }}</router-link>
                    </div>
                    <div class="auther">{{ item.author }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.recommend h2 {
  color: #475669;
}

.recommend-list {
  justify-content: space-between;
}

.recommend-list .recommend-list-first {
  width: 300px;
  height: 500px;
}

.recommend-list-first .book-cover {
  width: 260px;
  height: 360px;
  background-color: antiquewhite;
  margin-left: 20px;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
}

.recommend-list-first .book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 0.5s;
}

.recommend-list-first .book-cover img:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.recommend-list-first .book-info {
  margin-left: 20px;
  margin-top: 10px;
}

.recommend-list-first .book-info .title a {
  font-size: 24px;
  color: #000;
}

.recommend-list-first .book-info .auther {
  color: rgba(0, 0, 0, 0.4);
}

.recommend-list-first .book-info p {
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.4);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 显示三行，后面省略 */
  overflow: hidden;
}

.recommend-list .recommend-list-group {
  width: 900px;
  height: 530px;
}
.recommend-list-group ul {
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
}

.group-book-content .book-cover {
  width: 140px;
  height: 180px;
  background-color: blueviolet;
  margin-top: 10px;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
}

.group-book-content .book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 0.5s;
}

.group-book-content .book-cover img:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.group-book-content .book-info {
  margin-left: 10px;
  margin-top: 10px;
}

.group-book-content .book-info .title a {
  font-size: 18px;
  color: #000;
}

.group-book-content .book-info .auther {
  color: rgba(0, 0, 0, 0.4);
}
</style>
