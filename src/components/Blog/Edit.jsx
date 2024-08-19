import {useEffect, useRef, useState} from "react";
import useFetch from "../useFetch.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from "../UI/Loader.jsx";

const
    Edit = () => {
        const {id} = useParams();
        // const [blog, isPending] = useFetch(`http://localhost:8000/blogs/${id}`)
        const [isPending, setIsPending] = useState(false);
        const [isError, setIsError] = useState(null);
        const [title, setTitle] = useState('')
        const [content, setContent] = useState(null)
        const [author, setAuthor] = useState('')
        const [category, setCategory] = useState('')
        const [blogs] = useFetch('http://localhost:8000/blogs');
        const navigate = useNavigate();

        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['clean']                                         // remove formatting button
        ];

        const modules = {
            toolbar: toolbarOptions
        }

        useEffect(() => {
            fetch(`http://localhost:8000/blogs/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to Fetch Data')
                    }
                    return res.json()
                })
                .then((data) => {
                    setTitle(data.title)
                    setAuthor(data.author)
                    setContent(data.content)
                    setCategory(data.category)
                    setIsPending(false)
                })
                .catch((err) => {
                    console.log(err)
                    setIsPending(true)
                    setIsError(err)
                })

        }, [])

        const handleSubmit = (e) => {
            e.preventDefault()
            let blog;
            if (blogs.length > 0) {
                const newBlogId = parseInt(blogs[blogs.length - 1].id) + 1
                blog = {id: newBlogId.toString(), title, category, author, content}
            } else {
                blog = {id: '1', title, category, author, content}
            }


            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'PUT',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(blog)
            }).then((result) => {
                if (result) {
                    navigate(`/blogs/${id}`, {replace: true})
                }
            }).catch((error) => {
                console.log(error.message)
            })

        }


        return (
            <>  {isPending && <Loader errorStatus={isError}/>}
                {
                    <div className="create_main">
                        <h2>Create New Blog</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form_container">
                                <label>Blog Category</label>
                                <select value={category} onChange={(e) => {
                                    setCategory(e.target.value)
                                }
                                }>
                                    <option value="LARAVEL" defaultValue>LARAVEL</option>
                                    <option value="REACT" defaultValue>REACT</option>
                                    <option value="DOTNET">DOTNET</option>
                                </select>
                                <label>Blog Title</label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    value={title}
                                />
                                <label>Blog Content</label>

                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    className="blog_content"
                                    onChange={setContent}
                                    value={content}
                                />

                                <label>Blog Author</label>
                                <input value={author} onChange={(e) => {
                                    setAuthor(e.target.value)
                                }}/>

                                <button className="blog_button">Update Blog</button>
                            </div>
                        </form>
                    </div>
                }
            </>
        )
    }

export default Edit;