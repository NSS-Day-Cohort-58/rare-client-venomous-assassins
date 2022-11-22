import { useState, useEffect } from "react";
import { deleteTag, getTags, updateTags } from "../managers/Tags";


export const TagList = () => {

    const [tags, setTags] = useState([])
    const [tag, setTag] = useState({})
    const [userWantsToEditTag, setTagToEdit] = useState([false])
    const [selectedTag, setSelectedTag] = useState([])
    const localUser = localStorage.getItem("auth_token")
    const userObject = localUser
    

    useEffect(() => {
        getTags().then((TagsData) => setTags(TagsData))
    }, [])

    const handleControlledInputChange = (event) => {
        const newTag = Object.assign({}, tag)
        newTag[event.target.name] = event.target.value
        setTag(newTag)
      }
    
    const editTag = (selectedTag) => {

        updateTags({
            id: selectedTag.id,
            label: tag.label
        })
            .then(() => {
                window.location.reload()
            })
    }
    
    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()



        
    }

    return <>
        <h2>TAGS</h2>
        <section>
        {
            tags.map(
                (tag) => <>
                    <div>{tag.label}</div>
                    <button
                        onClick={() => {
                            setTagToEdit(!userWantsToEditTag)
                            setSelectedTag(tag)
                        }}
                        className="btn btn-primary">
                        Edit
                    </button>
                    <button onClick={() => deleteTag(tag).then(() => window.location.reload())}>Delete</button>
                    {
                        !userWantsToEditTag && selectedTag.id == tag.id
                            ? <>
                            <form className="tagForm">
                                <h2 className="tagForm_label">{"Edit Tag"}</h2>
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
                                        editTag(selectedTag)
                                }}
                                className="btn btn-primary">
                                {"Save"}
                              </button>
                            </form>
                        </>
                        : <></>
                            
                    }
                </>
                )
        }
    </section>

</>
}

//boolean state and selected tag state. flip boolean set selected tag.