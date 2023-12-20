<script setup>
import { ref, reactive, onMounted } from "vue"
import { Check, Close, Search } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import {
  ServeGetUserList,
  ServeGetUserCount,
  ServeSwitchUserState,
  ServeDeleteUser,
  ServeDeleteUsers,
  ServeUpdateUserData,
  ServeCreateNewUser,
} from "@/api/manage/userManage"

const centerDialogVisible = ref(false)
const addDialogVisible = ref(false)
const form = reactive({
  id: 0,
  username: "",
  password: "",
  sex: "",
  phone: "",
  email: "",
  role: "",
  works: 0
})

const createNewUser = () => {
  ServeCreateNewUser(form).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  }).finally(() => {
    addDialogVisible.value = false
    handleSearch()
  })
}

const updateUserData = (row) => {
  ServeUpdateUserData(form).then((res) => {
    if (res.code == 200) {
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  }).finally(() => {
    row.dialogVisible = false
    handleSearch()
  })
}

const handleEditUser = (row) => {
  row.dialogVisible = true
  form.id = row.id
  form.username = row.username
  form.password = row.password
  form.sex = row.sex
  form.phone = row.phone
  form.email = row.email
  form.role = row.role
  form.works = row.works
}

const handleSizeChange = (pageSize) => {
  params.limit = pageSize
  dataLoad()
}
const handleCurrentChange = (currentPage) => {
  params.currentPage = currentPage
  dataLoad()
}

const idsString = ref("")
const deleteButtonDisabled = ref(true)
const handleSelectionChange = (selection) => {
  const ids = selection.map((item) => item.id)
  idsString.value = ids.join(",")
  deleteButtonDisabled.value = selection.length === 0
}

const handleDeleteUsers = () => {
  ServeDeleteUsers({
    ids: idsString.value
  })
    .then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
    .finally(() => {
      handleSearch()
    })
}

const handleDeleteUser = (uid) => {
  ServeDeleteUser({
    uid: uid
  })
    .then((res) => {
      if (res.code == 200) {
        ElMessage({ showClose: true, message: res.message, type: "success" })
      } else {
        ElMessage({ showClose: true, message: res.message, type: "warning" })
      }
    })
    .finally(() => {
      handleSearch()
    })
}

const initParams = () => {
  return reactive({
    searchText: "",
    sex: "",
    role: "",
    state: "",
    currentPage: 1,
    limit: 10
  })
}
let params = initParams()

const totalPage = ref(10)
const getTotalPage = () => {
  ServeGetUserCount({
    searchText: params.searchText,
    sex: params.sex,
    role: params.role,
    state: params.state,
    currentPage: params.currentPage,
    limit: params.limit
  }).then((res) => {
    totalPage.value = res.data
  })
}

const tableData = ref([])
const dataLoad = () => {
  ServeGetUserList({
    searchText: params.searchText,
    sex: params.sex,
    role: params.role,
    state: params.state,
    currentPage: params.currentPage,
    limit: params.limit
  }).then((res) => {
    tableData.value = res.data
  })
}

const handleSwitchState = (row, uid, state) => {
  ServeSwitchUserState({
    uid: uid,
    state: state === true ? 1 : 0
  }).then((res) => {
    if (res.code == 200) {
      row.state = state
      ElMessage({ showClose: true, message: res.message, type: "success" })
    } else {
      ElMessage({ showClose: true, message: res.message, type: "warning" })
    }
  })
}

const handleSearch = () => {
  getTotalPage()
  dataLoad()
}
const heanleInitSearch = () => {
  params = initParams()
  handleSearch()
}

onMounted(() => {
  getTotalPage()
  dataLoad()
})
</script>

<template>
  <div class="global-action flex">
    <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
    <el-dialog
          v-model="addDialogVisible"
          title="编辑"
          width="30%"
          center
          :append-to-body="true"
        >
          <el-form :model="form" label-width="120px" style="width: 400px">
            <el-form-item label="用户名称">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择用户性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
                <el-option label="秘密" value="秘密" />
              </el-select>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="form.role" placeholder="请选择用户角色">
                <el-option label="读者" value="读者" />
                <el-option label="作家" value="作家" />
              </el-select>
            </el-form-item>
            <el-form-item label="作品数">
              <el-input v-model="form.works" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createNewUser">提交</el-button>
              <el-button @click="addDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
    </el-dialog>
    <el-popconfirm title="确认继续该操作？" @confirm="handleDeleteUsers">
      <template #reference>
        <el-button :disabled="deleteButtonDisabled" type="danger">删除</el-button>
      </template>
    </el-popconfirm>
    <div class="global-search flex">
      <el-input
        v-model="params.searchText"
        size="default"
        placeholder="请输入用户名称"
        width="100px"
        :suffix-icon="Search"
      />
      <el-select v-model="params.sex" placeholder="性别" size="default">
        <el-option value="男" />
        <el-option value="女" />
        <el-option value="秘密" />
      </el-select>
      <el-select v-model="params.role" placeholder="角色" size="default">
        <el-option value="读者" />
        <el-option value="作家" />
      </el-select>
      <el-select v-model="params.state" placeholder="状态" size="default">
        <el-option label="启用" value="1" />
        <el-option label="禁用" value="0" />
      </el-select>
      <div class="global-search-action">
        <el-button @click="handleSearch" type="primary">查询</el-button>
        <el-button @click="heanleInitSearch" type="primary">重置</el-button>
      </div>
    </div>
  </div>
  <el-table
    :border="true"
    fit
    highlight-current-row
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column align="center" type="selection" width="50px" />
    <el-table-column prop="id" align="center" label="用户ID" width="100px" />
    <el-table-column prop="username" align="center" label="用户名称" width="100px" />
    <el-table-column prop="password" align="center" label="用户密码" width="100px" />
    <el-table-column prop="sex" align="center" label="性别" width="100px" />
    <el-table-column prop="phone" align="center" label="电话" width="150px" />
    <el-table-column prop="email" align="center" label="邮箱" width="150px" />
    <el-table-column prop="role" align="center" label="角色" width="100px" />
    <el-table-column prop="works" align="center" label="作品数" width="100px" />
    <el-table-column prop="createtime" align="center" label="创建时间" width="150px" />
    <el-table-column prop="" align="center" label="  " />
    <el-table-column align="center" label="用户状态" width="100px">
      <template #default="{ row }">
        <el-popconfirm
          title="确认继续该操作？"
          @confirm="handleSwitchState(row, row.id, !row.state)"
        >
          <template #reference>
            <el-switch
              :model-value="row.state"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
            />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
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
            <el-form-item label="用户名称">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择用户性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
                <el-option label="秘密" value="秘密" />
              </el-select>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="form.role" placeholder="请选择用户角色">
                <el-option label="读者" value="读者" />
                <el-option label="作家" value="作家" />
              </el-select>
            </el-form-item>
            <el-form-item label="作品数">
              <el-input v-model="form.works" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserData(row)">提交</el-button>
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
