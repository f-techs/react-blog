import {Link} from "react-router-dom";

const Navbar = () => {
    return ( 
        <>
        <nav className="main_nav">
            <h1><Link to="/">ftechs blog</Link></h1>
            <ul className="nav_links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">New Blog</Link></li>
                <li><Link to="/wedding-message">Comments</Link></li>
            </ul>
        </nav>
        </>
     );
}
 
export default Navbar;

