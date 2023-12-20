import { post, get} from "@/utils/request"

export const ServeGetBookAverageRating = (data) => {
    return get("/RatingServlet?action=getBookAverageRating", data)
}

export const ServeAddBookRating = (data) => {
    return get("/RatingServlet?action=addBookRating", data)
}