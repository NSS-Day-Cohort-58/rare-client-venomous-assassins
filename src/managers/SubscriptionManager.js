export const getSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const createSubscription = (sub) => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(sub)
    })
}

export const deleteSubscripton = (id) => {
    return fetch(`http://localhost:8000/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
export const getMySubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions?mine", {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}