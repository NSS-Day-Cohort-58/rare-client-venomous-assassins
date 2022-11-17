export const getCategories = () => {
    return fetch(`http://localhost:8000/categories?_sortBy=label`, {
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
         
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
            
        },
        body: JSON.stringify(cat)
    })
}

