import {useState} from 'react'

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)

    return ( 
        <div className="navbar">
            <h1>Library App</h1>
        </div>
     );
}
 
export default Navbar;