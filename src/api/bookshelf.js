import { post, get} from "@/utils/request"

export const ServiceGetBookshelfCount = (data) => {
    return get("/BookshelfServlet?action=getBookshelfCount", data)
}

export const ServiceGetBookshelf = (data) => {
    return get("/BookshelfServlet?action=getBookshelf", data)
}

export const ServiceDeleteBookFromBookshelf = (data) => {
    return get("/BookshelfServlet?action=deleteBookFromBookshelf", data)
}

export const ServiceAddBookToBookshelf = (data) => {
    return get("/BookshelfServlet?action=addBookToBookshelf", data)
}