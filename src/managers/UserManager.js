export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
  }

export const getUser = (id) => {
    return fetch (`http://localhost:8088/users/${id}`)
        .then(res => res.json())
}