import {useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import ModifyAuthor from "./-Author/modifyAuthor";
import PostBook from "./-Book/postbook";
import ModifyCategory from "./-Category/modifyCategory";
import DisplayUsers from "./-User/displayUsers";
import useAuth from "../../hooks/useAuth";

const Admin = () => {
    const {user} = useAuth();    


    //Make names more explicit
    const [renderCreate, setRenderCreate] = useState(false);
    const [renderAuthor, setRenderAuthor] = useState(false);
    const [renderCategory, setRenderCategory] = useState(false);
    const [renderHandleUsers, setHandleUsers] = useState(false);


    const handleRenderCreate = () => {
        setRenderCreate(true);
        setRenderAuthor(false);
        setRenderCategory(false);
        setHandleUsers(false)
    }
    const handleRenderAuthor = () => {
        setRenderAuthor(true);
        setRenderCreate(false);
        setRenderCategory(false);
        setHandleUsers(false)
    }

    const handleRenderCategory = () => {
        setRenderCategory(true);
        setRenderCreate(false);
        setRenderAuthor(false);
        setHandleUsers(false);
    }

    const handleRenderUser = () => {
        setHandleUsers(true);
        setRenderCategory(false);
        setRenderCreate(false);
        setRenderAuthor(false);
    }
    const handleGoBack = () => {
        setHandleUsers(false);
        setRenderCreate(false);
        setRenderAuthor(false);
        setRenderCategory(false);
    }
    
    //Have to find a way to integrate createBook component into the admin page

    return ( 
        <>
        {user && !renderAuthor && !renderCreate && !renderCategory && !renderHandleUsers &&
           <section className="adminSection">
                <h1>Welcome to the admin page {user.user}</h1>
                {/* <h2>What would you like to do?</h2> */}
                <div className="Selection">
                    
                    <div className="Card" onClick={() => handleRenderCreate()}>
                        <div className="CardText">
                            <Link to="/createbook">Create Book</Link>
                        </div>
                    </div>
                    <div className="Card" onClick={() => handleRenderCategory()}>
                        <div className="CardText">
                            Modify Categories
                        </div>
                    </div>
                    <div className="Card" onClick={() => handleRenderAuthor()}>
                        <div className="CardText">
                            Modify Author
                        </div>
                    </div>
                    <div className="Card" onClick={() => handleRenderUser()}>
                        <div className="CardText">
                            Hanlde Users
                        </div>
                    </div>
                </div>
            </section>
        }
        { renderCreate &&
            <section>   
                <button onClick={handleGoBack} className="back">Back</button>
                <PostBook/>     
            </section>  
        }
        { renderAuthor &&
            <>
                <button onClick={handleGoBack} className="back">Back</button>
                <ModifyAuthor/>
            </>
        }
        {renderCategory &&
            <>
                <button onClick={handleGoBack} className="back">Back</button>
                <ModifyCategory/>
            </>
        }
        { renderHandleUsers &&
            <>
                <button onClick={handleGoBack} className="back">Back</button>
                <DisplayUsers/>
            </>
        }
        </>

     );
}
 
export default Admin;