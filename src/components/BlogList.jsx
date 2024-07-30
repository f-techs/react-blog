const BlogList = ({blogs, title})=>{ //destructing becos props is an object
    return (
        <>
            <div className="blog_container">
                <h2>{title}</h2>
                {
                    blogs.map((blog)=>(
                        <div className="blog_preview" key={blog.id}>
                            <h2>{blog.title}</h2>
                            <p>Author: {blog.author}</p>
                            {/*<button>Delete</button>*/}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BlogList