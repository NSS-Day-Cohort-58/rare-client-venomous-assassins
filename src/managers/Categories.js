export const getCategories = () => {
    return fetch(`http://localhost:8088/categories?_sortBy=label`)
        .then(res => res.json())
}