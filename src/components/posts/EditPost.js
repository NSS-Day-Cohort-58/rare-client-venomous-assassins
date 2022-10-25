import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/Tags"


export const EditPost = () => {
    let {postId} = useParams()

    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
  
    let navigate = useNavigate()

    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])

    const [checked, setChecked] = useState([])

    const handleCheck = (event) => {
        let updatedList = [...checked]
        if (event.target.checked) {
            updatedList = [...checked, event.target.value]
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1)
        }
        setChecked(updatedList)
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}`)
                .then(response => response.json())
                .then(post => setPost(post))
            .then(() => fetch(`http://localhost:8088/post_tags?post_id=${postId}`))
                .then(response =>response.json())
                .then(thisPostsTags => {
                    setPostTags(thisPostsTags)
                }) 
            getCategories().then(categoryData => setCategories(categoryData))
            getTags().then(tagData => setTags(tagData))
        },[postId])


    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    
    const updatePost = (event) => {
        event.preventDefault()

        const updatedPostToSendToAPI = {
            user_id: userObject,
            category_id: post.category_id,
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content
        }

        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedPostToSendToAPI)
        })
        .then(
            () => {
                navigate(`/posts/${postId}`)
            }
        )
    }

    const matchingId = (id) => {

        let idArray = []

        postTags.map((postTag) => {
            if (postTag.tag_id === id) {
                idArray.push(postTag.tag_id)
            }
        }
        )

        if (idArray.length > 0) {
            return true
        }

        else {
            return false
        }
        
    }

    return <>
    <form className="newPostForm">
        <h2 className="title">Edit Post</h2>
        <fieldset className="formSection">
            <label htmlFor="name">Title:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                value={post.title}
                onChange = {
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.title = evt.target.value
                        setPost(copy)
                    }
                }/>
        </fieldset>
        <fieldset className="formSection">
            <div>
                <label htmlFor="type">Category: </label>
            </div>
            <select class="form_select" 
            onChange = {
                (evt) => {
                    const copy = structuredClone(post)
                    copy.category_id = evt.target.value
                    setPost(copy)
                }
            }>
                <option value="0">{post?.category?.label}</option>
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
                type="text"
                className="form-control"
                value={post.publication_date}
                onChange = {
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.publication_date = evt.target.value
                        setPost(copy)
                    }
                }/>
        </fieldset>
        <fieldset className="formSection">
            <label htmlFor="image">Image:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                value={post.image_url}
                onChange = {
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.image_url = evt.target.value
                        setPost(copy)
                    }
                }
                 />
        </fieldset>
        <fieldset className="formSection">
            <label htmlFor="content">Content:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                value={post.content}
                onChange = {
                    (evt) => {
                        const copy = structuredClone(post)
                        copy.content = evt.target.value
                        setPost(copy)
                    }                
                }
                />
        </fieldset>
        <fieldset>
            {
                tags.map(tag => <>
                <input type="checkbox" id="tag" name="tag" 
                value={tag.id} checked={matchingId(tag.id)? "checked": ""}
                onChange = {
                    (evt) => {
                        handleCheck(evt)
                    }
                }/>
                <label htmlFor="tag" value={tag.id}>{tag.label}</label>
                </>
                )
            }
        </fieldset>
        <button
        onClick={
            (evt) => {
                updatePost(evt)
            }
        }>Update Post</button>
    </form>
    </>
}



