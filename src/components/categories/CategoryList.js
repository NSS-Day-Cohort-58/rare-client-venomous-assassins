import { useEffect, useState } from "react"
import { getCategories } from "../../managers/CategoryManager"



export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
    }, [])

    return <>
    <div>Categories</div>
    <article>
        {
            categories.map(category => <div>{category.label}
            <button>Edit</button>
            <button>Delete</button>
            </div>)
        }
    </article>
    </>
}