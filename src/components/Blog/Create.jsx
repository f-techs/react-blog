import {useState} from "react";

const Create = ()=>{
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor]=useState('')

    return (
        <>
            <div className="create_main">
                <h2>Create New Blog</h2>
                <div className="form_container">
                    <label>Blog Title</label>
                    <input
                        type="text"
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value={title}
                        />
                    <label>Blog Content</label>
                    <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} rows="10"></textarea>
                    <label>Blog Author</label>
                    <select value={author} onChange={(e)=>{setAuthor(e.target.value)}}>
                        <option value="Select Author" selected disabled>Select Author</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Alice Johnson">Alice Johnson</option>
                        <option value="John Doe">John Doe</option>
                    </select>
                    <button className="blog_button">Create Blog</button>
                </div>
            </div>
        </>
    )
}

export default Create;