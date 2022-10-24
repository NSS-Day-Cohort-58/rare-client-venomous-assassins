import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getTags } from "../../managers/Tags"

export const PostForm = () => {


    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [post, setNewPost] = useState({
        user_id: "",
        category_id: "",
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
    })
    const [tags, setTags] = useState([])


    const [checkedState, setCheckedState] = useState(
        new Array(tags.length).fill(false)
    )
   
    const handleOnChange = () => {
        setCheckedState(!checkedState)
    }

    useEffect(
        () => {
            fetch('http://localhost:8088/categories?_sortBy=label')
                .then(response => response.json())
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
            getTags().then(tagData => setTags(tagData))
        },
        []
    )


    const createPost = (postObject) => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObject)
        })
            .then(response => response.json())
    }


    const saveButton = (event) => {
        event.preventDefault()

        const localUser = localStorage.getItem("auth_token")
        const userObject = JSON.parse(localUser)

        const postToSendToAPI = {
            user_id: userObject,
            category_id: post.category_id,
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content,

        }

        createPost(postToSendToAPI)
            .then(newPost => navigate(`/comments/${newPost.id}`))
    }


    return <form className="newPostForm">
        <h2 className="title">New Post Form</h2>
        <fieldset className="formSection">
            <label htmlFor="name">Title:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="What's it called?"
                value={post.title}
                onChange={
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.title = evt.target.value
                        setNewPost(copy)
                    }
                } />
        </fieldset>
        <fieldset className="formSection">
            <div>
                <label htmlFor="type">Category:</label>
            </div>
            <select
                class="form_select"
                onChange={
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.category_id = evt.target.value
                        setNewPost(copy)
                    }
                }>
                <option value="0">Choose Category</option>
                {categories.map(
                    (category) => {
                        return <option className="form-option" value={`${category.id}`}>{category.label}</option>
                    }
                )
                }
            </select>
        </fieldset>
        <fieldset className="formSection">
            <label htmlFor="publicationDate">Date:</label>
            <input
                required autoFocus
                type="date"
                className="form-control"
                placeholder="What's today's date?"
                value={post.publication_date}
                onChange={
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.publication_date = evt.target.value
                        setNewPost(copy)
                    }
                } />
        </fieldset>
        <fieldset className="formSection">
            <label htmlFor="image">Image:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Paste image URL here!"
                value={post.image_url}
                onChange={
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.image_url = evt.target.value
                        setNewPost(copy)
                    }
                } />
        </fieldset>
        <fieldset className="formSection">
            <label htmlFor="content">Content:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Tell me about it!"
                value={post.content}
                onChange={
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.content = evt.target.value
                        setNewPost(copy)
                    }
                } />
        </fieldset>
        <fieldset>
            {
                tags.map(tag => <>
                <input type="checkbox" id="tag" name="tag" 
                onChange = {
                    () => {
                        handleOnChange()
                    }
                }/>
                <label htmlFor="tag" value={tag.id}>{tag.label}</label>
                </>
                )
            }
        </fieldset>
        <button
            onClick={(clickEvent) => saveButton(clickEvent)}
            className="save_button">
            Submit New Post
        </button>
    </form>
}