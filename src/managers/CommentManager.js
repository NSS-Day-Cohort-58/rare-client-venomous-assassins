export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}

export const createComment = (commentObject) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(commentObject)
    })
}