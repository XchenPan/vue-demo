<script setup>
import { ref } from "vue"

const emit = defineEmits(["selecting"])


const readerOptions = ["全部", "男生", "女生"]
const langOptions = ["全部", "中文", "英文"]
const typeOptions = ["全部", "IT科技", "文学", "哲学", "人文社科", "人物传记"]
const sortOptions = ["最热", "最新"]

const selectedOptions = {
  reader: ref("全部"),
  lang: ref("全部"),
  type: ref("全部"),
  sort: ref("最热")
}

const handleClick = (key, value) => {
  selectedOptions[key].value = value
  emit("selecting", {
    reader: selectedOptions.reader.value,
    lang: selectedOptions.lang.value,
    type: selectedOptions.type.value,
    sort: selectedOptions.sort.value,
  })
}
</script>

<template>
  <div class="book-filter-panel">
    <div class="container">
      <div class="filter-panel">
        <div class="filter">
          <div class="filter-content flex">
            <div class="content-title">读者:</div>
            <div class="content-item" v-for="item in readerOptions" :key="item" @click="handleClick('reader', item)" :class="{ 'selected': selectedOptions.reader.value === item }">{{ item }}</div>
          </div>
        </div>
        <div class="filter">
          <div class="filter-content flex">
            <div class="content-title">语言:</div>
            <div class="content-item" v-for="item in langOptions" :key="item" @click="handleClick('lang', item)" :class="{ 'selected': selectedOptions.lang.value === item }">{{ item }}</div>
          </div>
        </div>
        <div class="filter">
          <div class="filter-content flex">
            <div class="content-title">类型:</div>
            <div class="content-item" v-for="item in typeOptions" :key="item" @click="handleClick('type', item)" :class="{ 'selected': selectedOptions.type.value === item }">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="filter-menu">
        <div class="filter flex">
          <div class="filter-item" v-for="item in sortOptions" :key="item" @click="handleClick('sort', item)" :class="{ 'selected': selectedOptions.sort.value === item }">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-panel .filter {
  height: 20px;
  margin: 20px;
  font-size: 14px;
}
.filter-panel .filter .content-title {
  margin-right: 40px;
  color: rgba(0, 0, 0, 0.8);
}
.filter-panel .filter .content-item {
  margin-right: 40px;
  color: rgba(0, 0, 0, 0.5);
}
.filter-panel .filter .content-item:hover {
  cursor: pointer;
  color: #409eff;
}
.filter-menu {
  margin: 20px 20px;
  font-size: 14px;
}
.filter-menu .filter {
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.filter-menu .filter .filter-item {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.5);
}
.filter-menu .filter .filter-item:hover {
  cursor: pointer;
  color: #409eff;
}
.selected {
    color: #409eff !important;
    font-weight: bold;
}
</style>
