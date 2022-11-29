import { useContext, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ModifyAuthor from "./-Author/modifyAuthor";
import PostBook from "./-Book/postbook";
import ModifyCategory from "./-Category/modifyCategory";

const Admin = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(!user){
            navigate("/login");
        }
        else if(user.roles.includes(0)){
            setAuth(true);
        }
        else{
            navigate("/");
        }
    }, []);



    const [renderCreate, setRenderCreate] = useState(false);
    const [renderAuthor, setRenderAuthor] = useState(false);
    const [renderCategory, setRenderCategory] = useState(false);


    const handleCreate = () => {
        setRenderCreate(true);
        setRenderAuthor(false);
        setRenderCategory(false);
    }
    const handleAuthor = () => {
        setRenderAuthor(true);
        setRenderCreate(false);
        setRenderCategory(false);
    }

    const handleCategory = () => {
        setRenderCategory(true);
        setRenderCreate(false);
        setRenderAuthor(false);
    }

    const handleGoBack = () => {
        setRenderCreate(false);
        setRenderAuthor(false);
        setRenderCategory(false);
    }
    
    //Have to find a way to integrate createBook component into the admin page

    return ( 
        <>
        {user && auth && !renderAuthor && !renderCreate && !renderCategory &&
           <section className="adminSection">
                <h1>Welcome to the admin page {user.user}</h1>
                {/* <h2>What would you like to do?</h2> */}
                <div className="Selection">
                    
                    <div className="Card" onClick={() => handleCreate()}>
                        <div className="CardText">
                            <Link to="/createbook">Create Book</Link>
                        </div>
                    </div>
                    <div className="Card" onClick={() => handleCategory()}>
                        <div className="CardText">
                            Modify Categories
                        </div>
                    </div>
                    <div className="Card" onClick={() => handleAuthor()}>
                        <div className="CardText">
                            Modify Author
                        </div>
                    </div>
                    <div className="Card">
                        <div className="CardText">
                            View Logs
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
        </>

     );
}
 
export default Admin;