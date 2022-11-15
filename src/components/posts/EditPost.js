import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/TagManager"


export const EditPost = () => {
    let {postId} = useParams()

    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
  
    let navigate = useNavigate()

    const [tags, setTags] = useState([])
    const [originalTags, setOriginalTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const [doneLoading, setLoading] = useState(false)

    const [checkedTags, setCheckedTags] = useState([])
    
    /*useEffect(
        () => {
            postTags.map((postTag) => {
                 tags.map((tag) => {
                    if (postTag.tag_id === tag.id) {
                        tag.isChecked = true
                    }
                    else {
                        tag.isChecked = false
                    }
                })
            })
            setTags(tags)
        },
        [categories]
    )*/
        



    /*const matchingId = (id) => {

        let idArray = []

        postTags.map((postTag) => {
            if (postTag.tag_id === id) {
                idArray.push(postTag.tag_id)
            }
        }
        )

        if (idArray.length > 0) {
            return true‰
        }

        else {
            return false
        }
        
    }*/

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}`)
                .then(response => response.json())
                .then(post => setPost(post))
            .then(() => fetch(`http://localhost:8088/post_tags?post_id=${postId}`))
                .then(response =>response.json())
                .then(thisPostsTags => {
                    setPostTags(thisPostsTags)
                    getCategories().then(categoryData => setCategories(categoryData))
                    setLoading(true)
            
        }) 
            
        },
        [postId])

        useEffect(
            () => {

                getTags().then((tagData) => {
                    let newTagsArray = []
                    for (const tag of tagData) {
                        if(postTags){
                            for (const postTag of postTags) {
                                
                                if (postTag.tag_id === tag.id) {
                                    tag.isChecked = true
                                    tag.postTagId = postTag.id
                                    break
                                }
                                else {
                                    tag.isChecked = false
                                    tag.postTagId = postTag.id
                                }
                            }
                            newTagsArray.push(tag)
                        } else {
                            tag.isChecked = false
                            tag.postTagId = null
                            newTagsArray.push(tag)
                        }
                    }
                
               setTags(newTagsArray)
               setOriginalTags(newTagsArray)})
                
            },
            [doneLoading])


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

        if(originalTags !== tags){
            for (const tag of tags) {
                let foundPostTag = postTags.find(pt => {
                    return pt.post_id === parseInt(postId) && pt.tag_id === tag.id
                })
                if(!foundPostTag && tag.isChecked){
                    let postTagsToSendToAPI = {
                        post_id: postId,
                        tag_id: tag.id
                    }
                    fetch("http://localhost:8088/post_tags", { 
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(postTagsToSendToAPI)
                    })    
                    .then(response => response.json())
                } else if (tag.isChecked === false && foundPostTag){
                    fetch(`http://localhost:8088/post_tags/${tag.postTagId}`, {
                        method: "DELETE"
                    })
                }
            }
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

    const changeChecked = (e) => {
        const copy = structuredClone(tags)
        let tag = tags.find(t => t.id === parseInt(e.target.value))
        if(e.target.checked){
            tag.isChecked = true
        }else{
            tag.isChecked = false
        }
        for (const t of copy) {
            if(t.id === tag.id){
                t.isChecked = tag.isChecked
            }
        }
        setTags(copy)
    }

    if(doneLoading){
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
                <input type="checkbox" id={"tag-"+tag.id} name={tag.id}
                value={tag.id} checked={tag.isChecked? "checked": ""}
                onChange = {
                    (e) => {
                        changeChecked(e)
                    }
                }
                    
                />
                <label for={"tag-"+tag.id} value={tag.id}>{tag.label}</label>
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
    } else {
        return <>Loading</>
    }
}




