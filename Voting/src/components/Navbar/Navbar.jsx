import { Link } from "react-router-dom";

const Navbar=()=>{
return(
    <nav className="bg-gradient-to-l bg-green-400 from-orange-400 p-4">
        <div className="container mx-auto flex justify-between">
            <Link to="/" className="font-bold text-lg">Voting App</Link>
            <div>
                <Link to="/user/signup" className="mr-4">Signup</Link>
                <Link to="/user/login" className="mr-4">Login</Link>
                <Link to="/user/profile">Profile</Link>
            </div>
        </div>
    </nav>
    );
}
export default Navbar;