import { Link } from "react-router-dom";
import { SidebarData } from "../data/sidebarData";

const Sidebar = () => {
    return ( 
 
    <div className="sidebar">
        <div className='side-menu-active'>
            {SidebarData.map((item,key) => {
                return (
                    <li key={key} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </div>
    </div>
     );
}
 
export default Sidebar;