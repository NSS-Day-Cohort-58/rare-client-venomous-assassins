

export const loginUser = (user) => {
  

  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Token ${JSON.parse(localStorage.getItem("auth_token"))["token"]}`
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => res.json())
}

export const registerUser = (newUser) => {
  return fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}
