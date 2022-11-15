

export const getPosts = () => { 
    return fetch(`http://localhost:8000/posts`)
        .then(response => response.json())
}

