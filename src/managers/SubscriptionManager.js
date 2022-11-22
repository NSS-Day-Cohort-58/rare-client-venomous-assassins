export const getSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
  }

export const createSubscription = (sub) => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
    })
}

export const deleteSubscripton = (event) => {
    return fetch(`http://localhost:8000/subscriptions/${parseInt(event.target.id)}`, {
        method: "DELETE"
    })
}
