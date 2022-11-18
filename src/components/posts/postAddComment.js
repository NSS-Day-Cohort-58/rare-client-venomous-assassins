import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const AddComment = () => {

    const { postId } = useParams()
    const navigate = useNavigate()

    const localUser = localStorage.getItem("auth_token")
    // const userObject = JSON.parse(localUser)

    const [comment, setComment] = useState({
        post_id: parseInt(postId),
        content: ""
    })

    const createComment = (commentObject) => {
        return fetch(`http://localhost:8000/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(commentObject)
        })
    }


    const saveButton = (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            post_id: postId,
            content: comment.content,
            subject: "test"

        }

        createComment(commentToSendToAPI)
            .then(newComment => navigate(`/comments/${postId}`))
    }

    return <form className="newPostForm">
        <h2 className="title">New Comment</h2>
        <fieldset className="formSection">
            <label htmlFor="name">What did you think?:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="?"
                value={comment.content}
                onChange={
                    (evt) => {
                        const copy = structuredClone(comment)
                        copy.content = evt.target.value
                        setComment(copy)
                    }
                } />
        </fieldset>
        <button
            onClick={(clickEvent) => saveButton(clickEvent)}
            className="save_button">
            Submit New Comment
        </button>
    </form>

}