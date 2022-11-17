import { useEffect, useState } from "react"
import { getCategories, createCategory } from "../../managers/CategoryManager.js"
import "./categories.css"

/* 
    TO-DO:
    - Create functionality for both the "Edit" and "Delete" buttons in the return
*/

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
    }, [])

    const handleControlledInputChange = (event) => {
        const newCategory = Object.assign({}, category)
        newCategory.label = event.target.value
        setCategory(newCategory)
    }

    const newCategory = () => {
        createCategory(category)
            .then(() => {
                window.location.reload()
            })
    }

    return <>
        <div>Categories</div>
        <div className="both-things">
            <article>
                {
                    categories.map(category => <div>{category.label}
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>)
                }
            </article>
            <article>
                <h3>Create Category</h3>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="category"></label>
                            <input type="text" name="category" required className="form-control"
                                placeholder="category"
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            newCategory()
                        }}
                        className="btn btn-primary">
                        {"Save"}
                    </button>
                </form>
            </article>
        </div>
    </>
}