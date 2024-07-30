import BlogList from './BlogList.jsx'
import {useState, useEffect} from "react";

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);
    // const handleDeleteFn = (id) => {
    //     const filteredBlogs = blogs.filter((blog) => (blog.id !== id))
    //     setBlogs(filteredBlogs)
    //     console.log('clicked')
    // }

    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:8000/blogs')
                .then((res)=> {
                 if(!res.ok)
                 {
                    throw new Error("Failed to fetch data")
                 }
                    return res.json()
                })
                .then((data)=>{
                    setBlogs(data)
                    setIsPending(false) // helps use to know the loading of the data
                    setIsError(null)
                })
                .catch((err)=>{
                    setIsError(err.message)
                    console.log(err.message)
                    console.log(isError)
                })
        }, 2000)

    },[])

    return (
        <>
            {/*<main className="main_body">*/}
            {/*    {blogs && <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDeleteFn}/>}*/}
            {/*    {blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "John Doe"))} handleDelete={handleDeleteFn} title="John Doe's Blog"/>}*/}
            {/*    {blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "Jane Smith"))} handleDelete={handleDeleteFn} title="Jane Smith's Blog"/>}*/}
            {/*</main>*/}

            <main className="main_body">
                {isPending && <div className="loading_preview">{isError ? isError : 'Loading...'}</div>}
                {blogs && <BlogList blogs={blogs} title="All Blogs" />}

                {/*{blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "John Doe"))}  title="John Doe's Blog"/>}*/}
                {/*{blogs && <BlogList blogs={blogs.filter((blog) => (blog.author === "Jane Smith"))}  title="Jane Smith's Blog"/>}*/}
            </main>
        </>
    )
}

export default Home;

//take not of logical and '&&' and using null as false. Is very key in react