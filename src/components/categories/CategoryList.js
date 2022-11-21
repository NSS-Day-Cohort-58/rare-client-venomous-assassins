import { useEffect, useState } from "react"
import { getCategories, createCategory, deleteCategory, updateCategory } from "../../managers/CategoryManager.js"
import "./categories.css"



export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [userWantsToEditCat, setCatToEdit] = useState([false])
    const [selectedCat, setSelectedCat] = useState([])
    const [updatedCategory, setUpdatedCategory] = useState([])

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
    }, [])

    const handleControlledInputChange = (event) => {
        if(event.target.id === "newCat"){
            const newCategory = Object.assign({}, category)
            newCategory.label = event.target.value
            setCategory(newCategory)
        } else if (event.target.id === "editCat"){
            const newCategory = Object.assign({}, category)
            newCategory.id = selectedCat.id
            newCategory.label = event.target.value
            setUpdatedCategory(newCategory)
        }

        }

    const newCategory = () => {
        createCategory(category)
            .then(() => {
                window.location.reload()
            })
    }

    const editCat = (evt) => {
        updateCategory(updatedCategory)
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
                    <button
                        onClick={() => {
                            setCatToEdit(!userWantsToEditCat)
                            setSelectedCat(category)
                        }}
                        className="btn btn-primary">
                        Edit
                    </button>
                    <button onClick={() => deleteCategory(category).then(() => window.location.reload())}>Delete</button>
                    {
                        !userWantsToEditCat && selectedCat.id === category.id
                            ? <>
                            <form className="catForm">
                                <h2 className="catForm">{"Edit Category"}</h2>
                                <fieldset>
                                <div className="form-group">
                                    <label htmlFor="label"></label>
                                    <input type="text" name="label" required autoFocus className="form-control" id="editCat"
                                    placeholder="Category"
                                    defaultValue={category.label}
                                    onChange={handleControlledInputChange}
                                    />
                                </div>
                                </fieldset>
                                <button type="submit"
                                    onClick={evt => {
                                        evt.preventDefault()
                                        editCat(evt)
                                }}
                                className="btn btn-primary">
                                {"Save"}
                              </button>
                            </form>
                        </>
                        : <></>
                            
                    }
            </div>)
        }
    </article>
    <article>
    <h3>Create Category</h3>
    <form>
    <fieldset>
        <div className="form-group">
            <label htmlFor="category"></label>
            <input type="text" name="category" required className="form-control" id="newCat"
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