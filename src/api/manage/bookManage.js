import { post, get} from "@/utils/request"

export const ServeGetBookList = (data) => {
    return get("/BookManageServlet?action=getBookList", data)
}

export const ServeGetBookListCount = () => {
    return get("/BookServlet?action=getBookCount")
}

export const ServeUpdateBookData = (data) => {
    return get("/BookManageServlet?action=updateBookData", data)
}

export const ServeCreateNewBook = (data) => {
    return get("/BookManageServlet?action=createNewBook", data)
}

export const ServeDeleteBook = (data) => {
    return get("/BookManageServlet?action=deleteBook", data)
}