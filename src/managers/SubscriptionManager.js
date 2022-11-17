export const getSubscriptions = () => {
    return fetch("http://localhost:8088/subscriptions")
        .then(res => res.json())
}

export const createSubscription = (sub) => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sub)
    })
}

export const deleteSubscription = (event) => {
    return fetch(`http://localhost:8088/subscriptions/${parseInt(event.target.id)}`, {
        method: "DELETE"
    })
}
