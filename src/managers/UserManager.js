export const getUsers = () => {
    return fetch("http://localhost:8000/rare_users")
        .then(res => res.json())
}

export const getUser = (id) => {
    return fetch(`http://localhost:8000/rare_users/${id}`)
        .then(res => res.json())
}