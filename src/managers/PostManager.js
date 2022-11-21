

export const getPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getSubscribedPosts = () => {
    return fetch(`http://localhost:8000/posts?status=subscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getCreatedPosts = () => {
    return fetch(`http://localhost:8000/posts?status=created`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}
