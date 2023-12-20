export default {
    path: "/auth",
    name: "auth",
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/auth/LoginView.vue")
      },
      {
        path: "register",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/auth/RegisterView.vue")
      },
      {
        path: "forget",
        meta: { 
          auth: false,
        },
        component: () => import("@/views/auth/ForgetView.vue")
      }
    ]
  }
  