export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE"
    })
}