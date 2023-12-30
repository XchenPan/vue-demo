import { post, get} from "@/utils/request"

export const ServiceGetComments = (data) => {
    return get("/CommentServlet?action=getComments", data)
}

export const ServiceCreateNewComment = (data) => {
    return get("/CommentServlet?action=createNewComment", data)
}