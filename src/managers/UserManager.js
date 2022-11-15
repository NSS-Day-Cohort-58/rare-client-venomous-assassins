export const getUsers = () => {
    return fetch("http://localhost:8000/users")
        .then(res => res.json())
  }

export const getUser = (id) => {
    return fetch (`http://localhost:8000/users/${id}`)
        .then(res => res.json())
}