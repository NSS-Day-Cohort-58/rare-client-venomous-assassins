

export const getPosts = () => { 
    return fetch(`http://localhost:8000/posts`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

