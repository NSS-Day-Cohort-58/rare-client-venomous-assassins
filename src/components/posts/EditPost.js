import { useParams } from "react-router-dom"

export const EditPost = () => {
    let {postId} = useParams()

    return <>
    <form className="newPostForm">
        <h2 className="title">Edit Post</h2>
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
        <button
            onClick={(clickEvent) => saveButton(clickEvent)}
            className="save_button">
            Submit New Post
        </button>
    </form>
    
    
    </>
}