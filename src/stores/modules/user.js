import { defineStore } from "pinia"
import { delAccessToken } from "@/utils/auth"
import { storage } from "@/utils/storage"
import { ServeGetUserSetting } from "@/api/user"

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => {
    return {
      id: 0,
      username: "",
      sex: "",
      phone: "",
      email: "",
      role: "",
      works: 0,
      createtime: "",
    }
  },
  getters: {},
  actions: {
    logoutLogin() {
      this.$reset()
      storage.remove("user_info")
      delAccessToken()
      location.reload()
    },
    loadSetting() {
      ServeGetUserSetting().then((res) => {
        if (res.code == 200) {
          this.id = res.data.id
          this.username = res.data.username
          this.sex = res.data.sex
          this.phone = res.data.phone || ""
          this.email = res.data.email || ""
          this.role = res.data.role
          this.works = res.data.works
          this.createtime = res.data.createtime

          storage.set("user_info", res.data)
        }
      })
    },
  }
})
