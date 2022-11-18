export const getUsers = () => {
    return fetch("http://localhost:8000/members", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
  }

export const getUser = (id) => {
    return fetch (`http://localhost:8000/members/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}