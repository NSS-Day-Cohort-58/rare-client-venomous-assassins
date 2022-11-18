export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`,{
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const createCategory = (cat) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(cat)
    })
}

export const updateCategory = cat => {
    return fetch(`http://localhost:8000/categories/${cat.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(cat)
    })
}

export const deleteCategory = (cat) => {
    return fetch(`http://localhost:8000/categories/${cat.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }  
    })
}