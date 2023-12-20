export default {
    path: "/manage",
    name: "manage",
    redirect: "/manage/console",
    component: () => import("@/views/ManageView.vue"),
    children: [
      {
        path: "console",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/manage/ConsoleView.vue")
      },
      {
        path: "userManager",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/manage/UserManageView.vue")
      },
      {
        path: "bookManager",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/manage/BookManageView.vue")
      },
      {
        path: "adminInfo",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/manage/AdminInfoView.vue")
      }
    ]
  }
  