import { useState } from "react";
import {Link} from "react-router-dom";
import AuthorDetail from "./authorDetail";

const ModifyAuthor = () => {
    const [renderModify, setRenderModify] = useState(false);

    const handleRenderModify = () => {
        setRenderModify(true);
    }
    return ( 
        <>
            {!renderModify &&
                <section className="section">
                    <div className="Selection">
                        <div className="Card">
                            <Link to="/createauthor">
                                <p className="CardText">Add new author</p>
                            </Link>
                        </div>
                        <div 
                            onClick={() => handleRenderModify()}
                            className="Card">
                            <p className="CardText">Modify/Delete existing author</p>
                        </div>
                    </div>
                </section>
            }
            {renderModify &&
                <>
                <AuthorDetail/>
                </>
            }
        </>
     );
}
 
export default ModifyAuthor;