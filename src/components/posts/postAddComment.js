import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { createComment } from "../../managers/CommentManager"

export const AddComment = () => {

    const { postId } = useParams()
    const navigate = useNavigate()


    const [comment, setComment] = useState({
        content: ""
    })


    const saveButton = (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            content: comment.content, 
            post: postId
        }

        createComment(commentToSendToAPI)
            .then(() => navigate(`/comments/${postId}`))
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