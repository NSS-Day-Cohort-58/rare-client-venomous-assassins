export const getCategories = () => {
    return fetch(`http://localhost:8000/categories?_sortBy=label`)
        .then(res => res.json())
}

export const createCategory = (cat) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
}