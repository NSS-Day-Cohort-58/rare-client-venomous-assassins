import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTag } from "../../managers/Tags"


export const TagForm = () => {
    const [tag, setTag] = useState({})
    const navigate = useNavigate()

    const handleControlledInputChange = (event) => {
        const newTag = Object.assign({}, tag)
        newTag[event.target.name] = event.target.value
        setTag(newTag)
      }
    
    const constructNewTag = () => {

        addTag({
            label: tag.label
        })
            .then(() => {
                window.location.reload()
            })
    }

    return (
    <form className="tagForm">
        <h2 className="tagForm_label">{"Create Tag"}</h2>
        <fieldset>
        <div className="form-group">
            <label htmlFor="label"></label>
            <input type="text" name="label" required autoFocus className="form-control"
            placeholder="Tag"
            defaultValue={tag.label}
            onChange={handleControlledInputChange}
            />
        </div>
        </fieldset>
        <button type="submit"
            onClick={evt => {
                evt.preventDefault()
                constructNewTag()
        }}
        className="btn btn-primary">
        {"Save"}
      </button>
    </form>
    )

}
