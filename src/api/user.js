import { post, get} from "@/utils/request"

export const ServeLogin = (data) => {
    return get("/UserServlet?action=login", data)
}

export const ServeGetUserSetting = (data) => {
    return get("/UserServlet?action=getUserSetting", data)
}

export const ServeUpdateUserSetting = (data) => {
    return get("/UserServlet?action=updateUserSetting", data)
}

export const ServeUpdateUserPassword = (data) => {
    return get("/UserServlet?action=updateUserPassword", data)
}