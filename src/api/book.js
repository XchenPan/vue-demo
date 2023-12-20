import { post, get} from "@/utils/request"

export const ServiceGetBook = (data) => {
    return get("/BookServlet?action=getBook", data)
}

export const ServiceGetBookList = (data) => {
    return get("/BookServlet?action=getBookList", data)
}

export const ServiceGetBookCount = (data) => {
    return get("/BookServlet?action=getBookCount", data)
}

export const ServiveGetTopOneBook = () => {
    return get("/BookServlet?action=getTopOneBook")
}

export const ServiveGetTopListBook = () => {
    return get("/BookServlet?action=getTopListBook")
}

export const ServiveGetBookByNameOrAuthor = (data) => {
    return get("/BookServlet?action=getBookListByNameOrAuthor", data)
}

export const ServiveGetBookCountByNameOrAuthor = (data) => {
    return get("/BookServlet?action=getBookCountByNameOrAuthor", data)
}