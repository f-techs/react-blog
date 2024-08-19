import Navbar from "./components/Navbar.jsx";
import Blog from "./components/Blog/Blog.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Create from "./components/Blog/Create.jsx";
import MainBody from "./components/MainBody.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import Edit from "./components/Blog/Edit.jsx";

function App() {
    return (
        <Router>
        <>
            <Navbar/>
            <MainBody>
            <Routes>
                <Route  path="/" element={<Blog/>}/>
                <Route  path="/create" element={<Create/>}/>
                <Route path="/blogs/:id" element={<BlogDetail/>} />
                <Route path="/blog/edit/:id" element={<Edit/>} />
            </Routes>
            </MainBody>
        </>
        </Router>
    )
}

export default App
