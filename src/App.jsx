import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Create from "./components/Create.jsx";

function App() {
    return (
        <Router>
        <>
            <Navbar/>
            <Routes>
                <Route  path="/" element={<Home/>}/>
                <Route  path="/create" element={<Create/>}/>
            </Routes>
        </>
        </Router>
    )
}

export default App
