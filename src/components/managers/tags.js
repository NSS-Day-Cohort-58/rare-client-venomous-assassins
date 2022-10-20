import { useEffect, useState } from "react"

export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
}