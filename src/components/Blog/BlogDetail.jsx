import {Link, replace, useNavigate, useParams} from "react-router-dom";
import useFetch from "../useFetch.jsx";
import Loader from "../UI/Loader.jsx";
import {useMemo, useEffect, useState} from "react";
import Overlay from "../UI/Overlay.jsx";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal.jsx";

const BlogDetail = () => {
    const {id} = useParams();
    const [pageId, setPageId] = useState(id)
    const [blogs, setBlogs] = useState(null);
    const [totalBlogs] = useFetch('https://react-blog-f-techs.netlify.app/blogs');
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [blogTitle, setBlogTitle]=useState('');//for modal confirmation delete
    const [isNext, setIsNext]=useState(null);
    const [isPrevious, setIsPrevious]=useState(null);



    useEffect(() => {

        const fetchData = async ()=>{
            try{
            const fetchBlog = await fetch(`https://react-blog-f-techs.netlify.app/blogs/${pageId}`);
            if(!fetchBlog.ok){
                throw new Error("failed to fetch blog")
            }else{
                const blog = await fetchBlog.json()
                if(blog){
                    setBlog(blog)
                    setIsError(null)
                    setIsPending(false)
                    setBlogTitle(blog.title)
                    navigate(`/blogs/${pageId}`, {replace: true})
                }
            }
            const fetchBlogs = await fetch('https://react-blog-f-techs.netlify.app/blogs')
            if(!fetchBlogs.ok){
                throw new Error("failed to fetch blogs")
            }else{
                const blogs = await fetchBlogs.json()
                if(blogs){
                    setBlogs(blog)
                    // if(blogs.length > 1){
                    //     setIsNext(true)
                    // }

                    const indexOfCurrentBlog = blogs.findIndex((blog) => (blog.id === pageId));
                    const nextBlogPage = blogs[indexOfCurrentBlog + 1];
                    const prevBlogPage = blogs[indexOfCurrentBlog - 1];


                    if(nextBlogPage === undefined)
                    {
                        setIsNext(false)
                    }else{
                        setIsNext(true)
                    }
                    if(prevBlogPage === undefined)
                    {
                        setIsPrevious(false)
                    }else{
                        setIsPrevious(true)
                    }


                }
            }
            }catch(err){
                console.log(err.message)
            }
        }

        setTimeout(()=>{
            fetchData();
        }, 1000)

    }, [pageId])


    const goToNextPageHandle = () => {
        const indexOfCurrentBlog = totalBlogs.findIndex((blog) => (blog.id === pageId));
        const nextBlogPage = totalBlogs[indexOfCurrentBlog + 1];
        if(nextBlogPage === undefined)
        {
            setIsNext(false)
            return
        }
        setPageId(nextBlogPage.id)

    }

    const goToPreviousPageHandle = () => {
        const indexOfCurrentBlog = totalBlogs.findIndex((blog) => (blog.id === pageId));
        const prevBlogPage = totalBlogs[indexOfCurrentBlog - 1];
        if(prevBlogPage === undefined)
        {
            setIsPrevious(false)
            return
        }
        setPageId(prevBlogPage.id)


    }

    const confirmDeteletionHandler = ()=>{
        setIsModal(true)
        setDeleteId(id);
    }
    const blogDeletHandler = (id) => {
        fetch(`https://react-blog-f-techs.netlify.app/blogs/${id}`, {
            method: "DELETE"
        }).then((result) => {
            if (result) {
                navigate('/', {replace: true})
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const navigateToEditHandler = (id) => {
        navigate(`/blog/edit/${id}`)
    }

    const cancelModalHandler = ()=>{
        setIsModal(false);
    }

    const closeHandler = ()=>{
        setIsModal(false)
    }


    return (
        <div className="blog_details">
            {isModal && ReactDOM.createPortal(<Modal
                closeHandlerFn={closeHandler}
                respondOneFn={()=>{
                    blogDeletHandler(deleteId)
                }}
                respondTwoFn={cancelModalHandler}
                respond_one="Okay"
                respond_two="No, Cancel"
                title="Confirm Blog Deletion"
                content={`Are your sure you want to delete the blog with title: ${blogTitle}`}
                />

                , document.getElementById("modal"))}
            {isModal && ReactDOM.createPortal(<Overlay/>
                , document.getElementById("overlay"))}
            {isPending && <Loader errorStatus={isError}/>}
            {blog && <article>
                <div className="blog_header">
                    <h1>{blog.category + ': ' + blog.title}</h1>
                    <div className="action_buttons">
                        <button onClick={() => {
                            navigateToEditHandler(blog.id)
                        }} className="blog_edit_button">Edit
                        </button>
                        <button onClick={confirmDeteletionHandler}
                                className="blog_del_button">Delete
                        </button>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: blog.content}}/>
                <div className="blog_footer">
                    <span>Written By: {blog.author}</span>
                </div>
                <div className="blog_footer_buttons">

                    {
                    isPrevious && (<button className="blog_button" onClick={goToPreviousPageHandle}>Previous Blog</button>)
                    }

                    {
                        isNext &&    (<button className="blog_button" onClick={goToNextPageHandle}>Next Blog</button>)
                    }

                </div>
            </article>}
        </div>
    )
}

export default BlogDetail;