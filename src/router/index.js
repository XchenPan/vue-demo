import { createRouter, createWebHistory } from "vue-router"
import AuthRouter from "./modules/auth"
import SettingRouter from "./modules/setting"
import ManageRouter from "./modules/manage"
import { isLoggedIn } from "@/utils/auth"
import { ElMessage } from "element-plus"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("@/layout/Layout.vue"),
      redirect: "/home",
      meta: {
        auth: false
      },
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            auth: false
          },
          component: () => import("@/views/HomeView.vue")
        },
        {
          path: "/books",
          name: "books",
          meta: {
            auth: false
          },
          component: () => import("@/views/BooksView.vue")
        },
        {
          path: "/bookshelf",
          name: "bookshelf",
          meta: {
            auth: true
          },
          component: () => import("@/views/BookshelfView.vue")
        },
        {
          path: "/writer",
          name: "writer",
          meta: {
            auth: false
          },
          component: () => import("@/views/WriterView.vue")
        },
        {
          path: "/search",
          name: "search",
          meta: {
            auth: false
          },
          component: () => import("@/views/SearchView.vue")
        },
        {
          path: "/bookdetail/:bookName",
          name: "bookdetail",
          meta: {
            auth: false
          },
          component: () => import("@/views/BookDetailView.vue")
        },
        SettingRouter
      ]
    },
    AuthRouter, //登陆注册，找回密码
    ManageRouter,
    {
      path: "/:pathMatch(.*)*",
      name: "404 NotFound",
      component: () => import("@/views/other/NotFoundView.vue")
    }
  ]
})

// 设置中间件，权限验证
router.beforeEach((to) => {
  if (to.meta?.auth && !isLoggedIn()) {
    ElMessage({ showClose: true, message: "请先登录", type: "warning" })
    return {
      path: "/auth/login",
      query: { redirect: to.fullPath }
    }
  }
})

export default router
