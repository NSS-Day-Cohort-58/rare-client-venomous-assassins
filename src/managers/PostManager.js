

export const getPosts = () => { 
    return fetch(`http://localhost:8088/posts`)
        .then(response => response.json())
}

export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8088/posts?category_id=${categoryId}`)
        .then(response => response.json())
}

export const getPostsByUser = (userId) => {
    return fetch(`http://localhost:8088/posts?user_id=${userId}`)
}