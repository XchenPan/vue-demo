import { post, get} from "@/utils/request"

export const ServeGetUserList = (data) => {
    return get("/UserManagerServlet?action=getUserList", data)
}

export const ServeGetUserCount = (data) => {
    return get("/UserManagerServlet?action=getUserListCount", data)
}

export const ServeSwitchUserState = (data) => {
    return get("/UserManagerServlet?action=updateUserState", data)
}

export const ServeDeleteUser = (data) => {
    return get("/UserManagerServlet?action=deleteUser", data)
}

export const ServeDeleteUsers = (data) => {
    return get("/UserManagerServlet?action=deleteUsers", data)
}

export const ServeUpdateUserData = (data) => {
    return get("/UserManagerServlet?action=updateUserData", data)
}

export const ServeCreateNewUser = (data) => {
    return get("/UserManagerServlet?action=createNewUser", data)
}