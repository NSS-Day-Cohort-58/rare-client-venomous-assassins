export const getUsers = () => {
    return fetch("http://localhost:8000/rare_users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getUser = (id) => {
    return fetch(`http://localhost:8000/rare_users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}