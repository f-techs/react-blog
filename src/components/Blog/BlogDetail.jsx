import {Link, useNavigate, useParams} from "react-router-dom";
import useFetch from "../useFetch.jsx";
import Loader from "../Loader.jsx";
import {useEffect, useState} from "react";

const BlogDetail = () => {
    const {id} = useParams();
    const [pageId, setPageId] = useState(parseInt(id))
    const [blogs] = useFetch('http://localhost:8000/blogs');
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);


    useEffect(() => {
        fetch(`http://localhost:8000/blogs/${pageId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to Fetch Data')
                }
                return res.json()
            })
            .then((data) => {
                setBlog(data)
                setIsPending(false)
                setIsError(null)
                navigate(`/blogs/${pageId}`, {replace: true})
            })
            .catch((err)=>{
                setIsError(err.message)
                setIsPending(true)
            })
    }, [pageId])


    const goToNextPageHandle = () => {
        setPageId(pageId + 1)
    }


    const goToPreviousPageHandle = () => {
        setPageId(pageId - 1)
    }

    console.log('PageID:' + pageId)

    return (
        <div className="blog_details">
            {isPending && <Loader errorStatus={isError}/>}
            {blog && <article>
                <div className="blog_header">
                    <h1>{blog.title}</h1>
                </div>
                <p>{blog.content}</p>
                <div className="blog_footer">
                    <span>Written: {blog.author}</span>
                </div>
                <div className="blog_footer_buttons">

                    {blogs && pageId > 1 &&
                        <button className="blog_button" onClick={goToPreviousPageHandle}>Previous Blog</button>}


                    {blogs && blogs.length > pageId &&
                        <button className="blog_button" onClick={goToNextPageHandle}>Next Blog</button>}

                </div>
            </article>}
        </div>
    )
}

export default BlogDetail;