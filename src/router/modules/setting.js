export default {
  path: "/setting",
  name: "setting",
  redirect: "/setting/base-info",
  meta: {
    auth: true
  },
  component: () => import("@/views/SettingView.vue"),
  children: [
    {
      path: "base-info",
      name: "base-info",
      meta: {
        auth: true
      },
      component: () => import("@/views/setting/BaseInfoView.vue")
    },
    {
      path: "change-password",
      name: "change-password",
      meta: {
        auth: true
      },
      component: () => import("@/views/setting/ChangePasswordView.vue")
    },
    {
      path: "join-ours",
      name: "join-ours",
      meta: {
        auth: true
      },
      component: () => import("@/views/setting/JoinOursView.vue")
    }
  ]
}
