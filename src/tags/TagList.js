import { useState, useEffect } from "react";
import { getTags } from "../managers/Tags";


export const TagList = () => {

    const [tags, setTags] = useState([])
    

    useEffect(() => {
        getTags().then((TagsData) => setTags(TagsData))
    }, [])
    
    return <>
        <h2>TAGS</h2>
        <section>
        {
            tags.map(
                (tag) => <>
                    <div>{tag.label}</div>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
                )
        }
    </section>

</>
}