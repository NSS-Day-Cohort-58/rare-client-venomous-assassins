export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
  }

export const getUser = (id) => {
    return fetch (`http://localhost:8000/users/${id}`)
        .then(res => res.json())
}