import { useEffect, useState } from "react"

export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
}


export const addTag = tag => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
}