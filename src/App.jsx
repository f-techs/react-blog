import Navbar from "./components/Navbar.jsx";
import Blog from "./components/Blog/Blog.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Create from "./components/Blog/Create.jsx";
import MainBody from "./components/MainBody.jsx";
import Comment from "./components/Comments/Comment.jsx";

function App() {
    return (
        <Router>
        <>
            <Navbar/>
            <MainBody>
            <Routes>
                <Route  path="/" element={<Blog/>}/>
                <Route  path="/create" element={<Create/>}/>
                <Route path="/wedding-message" element={<Comment/>} />
            </Routes>
            </MainBody>
        </>
        </Router>
    )
}

export default App
