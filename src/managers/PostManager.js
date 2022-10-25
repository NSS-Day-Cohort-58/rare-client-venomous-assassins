

export const getPosts = () => { 
    return fetch(`http://localhost:8088/posts`)
        .then(response => response.json())
}

export const getPostsByCategory = (category_id) => {
    return fetch(`http://localhost:8088/posts?category_id=${category_id}`)
        .then(response => response.json())
}

export const getPostsByUser = (user_id) => {
    return fetch(`http://localhost:8088/posts?user_id=${user_id}`)
        .then(response => response.json())
}
export const getPostsByTag = (tag_id) => {
    return fetch(`http://localhost:8088/posts?tag_id=${tag_id}`)
        .then(res => res.json())
}