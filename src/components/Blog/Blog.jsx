import BlogList from './BlogList.jsx'
import useFetch from "../useFetch.jsx";
import Loader from "../Loader.jsx";

const Blog = () => {
const [data, isPending, isError] = useFetch('http://localhost:8000/blogs');


    return (
        <>
            {/*<main className="main_body">*/}
            {/*    {blogs && <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDeleteFn}/>}*/}
            {/*    {blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "John Doe"))} handleDelete={handleDeleteFn} title="John Doe's Blog"/>}*/}
            {/*    {blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "Jane Smith"))} handleDelete={handleDeleteFn} title="Jane Smith's Blog"/>}*/}
            {/*</main>*/}


                {isPending && <Loader errorStatus={isError}/>}
                {data && <BlogList blogs={data} title="All Blogs" />}

                {/*{blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "John Doe"))}  title="John Doe's Blog"/>}*/}
                {/*{blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "Jane Smith"))}  title="Jane Smith's Blog"/>}*/}

        </>
    )
}

export default Blog;

//take not of logical and '&&' and using null as false. Is very key in react