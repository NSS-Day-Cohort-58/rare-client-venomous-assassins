import { useEffect, useState } from "react"

export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}


export const addTag = tag => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(tag)
    })
}

export const updateTags = tag => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(tag)
    })
}

export const deleteTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: "DELETE", 
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}