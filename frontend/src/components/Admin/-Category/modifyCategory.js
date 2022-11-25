import { useContext, useState } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import CategoryDetail from "./categoryDetail";

const ModifyCategory = () => {
    const [renderModify, setRenderModify] = useState(false);
    const {user} = useContext(UserContext);
    const handleRenderModify = () => {
        setRenderModify(true);
    }
    return ( 
        <>
            {!renderModify &&
                <section className="section">
                    <div className="Selection">
                        <div className="Card">
                            <Link to="/createcategory">
                                <p className="CardText">Add new Category</p>
                            </Link>
                        </div>
                        <div 
                            onClick={() => handleRenderModify()}
                            className="Card">
                            <p className="CardText">Modify/Delete existing Category</p>
                        </div>
                    </div>
                </section>
            }
            {renderModify &&
                <>
                <CategoryDetail user={user}/>
                </>
            }
        </>
     );
}
 
export default ModifyCategory;