<script setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage } from "element-plus"
import { ServeGetBookList, ServeGetBookListCount, ServeUpdateBookData, ServeCreateNewBook, ServeDeleteBook } from "@/api/manage/bookManage"

const addDialogVisible = ref(false)
const form = reactive({
  id: 0,
  name: "",
  author: "",
  type: "",
  language: "",
  audience: "",
  synopsis: "",
  content: "",
  reading: 0,
  rating: 0,
  addtime: "2023-12-20"
})

const createNewBook = () => {
  ServeCreateNewBook(form)
    .then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
    .finally(() => {
      addDialogVisible.value = false
      getTotalPage()
      dataLoad()
    })
}

const updateBookData = (row) => {
  ServeUpdateBookData(form)
    .then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
    .finally(() => {
      row.dialogVisible = false
      getTotalPage()
      dataLoad()
    })
}

const handleEditUser = (row) => {
  row.dialogVisible = true
  form.id = row.id
  form.name = row.name
  form.author = row.author
  form.type = row.type
  form.language = row.language
  form.audience = row.audience
  form.synopsis = row.synopsis
  form.content = row.content
  form.addtime = "2023-01-01"
}

const handleSizeChange = (pageSize) => {
  params.limit = pageSize
  dataLoad()
}
const handleCurrentChange = (currentPage) => {
  params.currentPage = currentPage
  dataLoad()
}



const handleDeleteUser = (bid) => {
  ServeDeleteBook({
    bid: bid
  })
    .then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
    .finally(() => {
      getTotalPage()
      dataLoad()
    })
}

const initParams = () => {
  return reactive({
    currentPage: 1,
    limit: 10
  })
}
let params = initParams()

const totalPage = ref(10)
const getTotalPage = () => {
  ServeGetBookListCount().then((res) => {
    totalPage.value = res
  })
}

const tableData = ref([])
const dataLoad = () => {
  ServeGetBookList({
    currentPage: params.currentPage,
    limit: params.limit
  }).then((res) => {
    tableData.value = res.data
  })
}

onMounted(() => {
  getTotalPage()
  dataLoad()
})
</script>

<template>
  <div class="global-action">
    <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
    <el-dialog
          v-model="addDialogVisible"
          title="添加"
          width="30%"
          center
          :append-to-body="true"
        >
          <el-form :model="form" label-width="120px" style="width: 400px">
            <el-form-item label="书名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="form.author" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择书籍类型">
                <el-option label="IT科技" value="IT科技" />
                <el-option label="文学" value="文学" />
                <el-option label="哲学" value="哲学" />
                <el-option label="人文社科" value="人文社科" />
                <el-option label="人物传记" value="人物传记" />
              </el-select>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="form.language" placeholder="请选择书籍语言">
                <el-option label="中文" value="中文" />
                <el-option label="英文" value="英文" />
              </el-select>
            </el-form-item>
            <el-form-item label="受众">
              <el-select v-model="form.audience" placeholder="请选择书籍受众">
                <el-option label="全部" value="全部" />
                <el-option label="男生" value="男生" />
                <el-option label="女生" value="女生" />
              </el-select>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="form.synopsis" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createNewBook">提交</el-button>
              <el-button @click="addDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
  </div>
  <el-table
    :border="true"
    fit
    highlight-current-row
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column prop="id" align="center" label="书籍ID" width="100px" />
    <el-table-column prop="name" align="center" label="书名" width="100px" />
    <el-table-column prop="author" align="center" label="作者" width="100px" />
    <el-table-column prop="type" align="center" label="类型" width="100px" />
    <el-table-column prop="language" align="center" label="语言" width="100px" />
    <el-table-column prop="audience" align="center" label="受众" width="100px" />
    <el-table-column prop="synopsis" align="center" label="简介" width="150px" />
    <el-table-column prop="content" align="center" label="内容" width="150px" />
    <el-table-column prop="reading" align="center" label="在读人数" width="100px" />
    <el-table-column prop="rating" align="center" label="评分" width="100px" />
    <el-table-column prop="addtime" align="center" label="添加时间" width="150px" />
    <el-table-column prop="" align="center" label="  " />
    <el-table-column align="center" label="操作" width="150px">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="handleEditUser(row)">编辑</el-button>
        <el-dialog
          :key="row.id"
          v-model="row.dialogVisible"
          title="编辑"
          width="30%"
          center
          :append-to-body="true"
        >
          <el-form :model="form" label-width="120px" style="width: 400px">
            <el-form-item label="书名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="form.author" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择书籍类型">
                <el-option label="IT科技" value="IT科技" />
                <el-option label="文学" value="文学" />
                <el-option label="哲学" value="哲学" />
                <el-option label="人文社科" value="人文社科" />
                <el-option label="人物传记" value="人物传记" />
              </el-select>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="form.language" placeholder="请选择书籍语言">
                <el-option label="中文" value="中文" />
                <el-option label="英文" value="英文" />
              </el-select>
            </el-form-item>
            <el-form-item label="受众">
              <el-select v-model="form.audience" placeholder="请选择书籍受众">
                <el-option label="全部" value="全部" />
                <el-option label="男生" value="男生" />
                <el-option label="女生" value="女生" />
              </el-select>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="form.synopsis" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateBookData(row)">提交</el-button>
              <el-button @click="row.dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-popconfirm title="确认继续该操作？" @confirm="handleDeleteUser(row.id)">
          <template #reference>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      v-model:current-page="params.currentPage"
      :page-sizes="[10, 15, 20, 25]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.global-action {
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
.global-search {
  margin-left: 50px;
}
.global-search .el-input {
  width: 220px;
}
.global-search .el-select {
  width: 100px;
}
.global-search-action {
  margin-left: 20px;
}
</style>
