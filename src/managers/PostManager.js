

export const getPosts = () => { 
    return fetch(`http://localhost:8000/posts`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

