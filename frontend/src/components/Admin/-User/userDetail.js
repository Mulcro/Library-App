import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../api/baseUrl";
import BookCard from "../../bookCard";

const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserDetail = ({username}) => {
    const navigate = useNavigate();
    
    const [user,setUser] = useState({});
    const [books,setBooks] = useState([]);
    const [pending, setIsPending] = useState(true);
    const [error,setError] = useState("");

    const [returnBook, setReturnBook] = useState("");

    //User modification state
    const [mdfyUser,setMdfyUser] = useState(false);

    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    const [userEmail, setEmail] = useState('');
    const [validFname, setValidFname] = useState(false);
    const [validLname, setValidLname] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

    const [fnameFocus, setFnameFocus] = useState(false);
    const [lnameFocus, setLnameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [role,setRole] = useState("");

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setValidFname(result);
    }, [firstName])

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setValidLname(result);
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(userEmail);
        setValidEmail(result);
    }, [userEmail])


    const fetchUser = () => {
        axios(BASE_URL + `/users/${username}`,{
            roles:user.roles
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(data => {
            setUser(data.data);
            setBooks(data.data.books);
            setIsPending(false);
            setError(false);
        })
        .catch(err => {
            if(err.message === "404"){
                setError("The user was not found");
            }
            else if(err.message === "422"){
                setError("Invalid username entered");
            }
            else{
                setError("Something went wrong, please try again");
            }

            setUser({});
            setIsPending(false);
        })
    }

    useEffect(() => {
        fetchUser();
    },[])

    const handleReturnBook = () => {
        if(returnBook === "") return 0;
        axios.post(BASE_URL + `/users/${username}`,{
            bookId: returnBook,
            roles:user.roles
        })
        .then(res => {
            if(res.status === 200) return res;
            throw new Error(res.status)
        })
        .then(() => { 
            fetchUser();
            alert("Book has been returned");
            returnBook("");
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleUserModification = e => {
        e.preventDefault();

        axios.patch(BASE_URL + `/users/${username}`,{
            firstname: firstName, 
            lastname: lastName, 
            email:userEmail,
            roles:user.roles
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(() => {
            alert("User has been modified");
            navigate("/");
        })
        .catch(err => {
            setError(err);
            console.log(err);
        })
    }

    const handleAddRole = () => {
        axios.patch(BASE_URL + `/users/${username}/addrole`,{
         userRole:role,
         roles:user.roles
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(() => {
            alert("Role has been added");
            setRole("");
        })
        .catch(err => {
            setError(err);
            console.log(err);
        });
    }

    const handleDeleteRole = () => {
        axios.patch(BASE_URL + `/users/${username}/deleterole`,{
            userRole: role,
            roles:user.roles
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(() => {
            alert("Role has been deleted");
            setRole("");
        })
        .catch(err => {
            if(err.message === "404"){
                alert("This role is not present")
            }
        });
    }

    const deleteUser = () => {
        axios.delete(BASE_URL + `/users/${username}`,{
            data:{roles:user.roles}
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status)
        })
        .then(() => {
            alert("User has been deleted");
            navigate("/");
        })
        .catch(err => {
            setError(err);
            console.log(err);
        })
    }
    return (
        <>  
            {error &&
                <div className="error">{error}</div>
            }
            {pending &&
                <div className="loading">
                    loading..
                </div>
            }
            { user && !mdfyUser &&
                <section className="userInterface">
                    <div className="mainSection">
                        <div className="userNav">
                            <div className="userInfo">
                                <img className="profilePic" src={user.profile} alt="" />
                                <div className="userText">
                                    <h3>User Info</h3>
                                    <p>Name: {user.firstname} {user.lastname}</p>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            </div>
                            <div className="userButtons">
                                 {/* Make this work  */}
                                <button>Change user Picture</button>
                            </div>
                        </div>

                        <div className="bookSection">
                            <div>
                                <h3>Return Section</h3>
                                <select onChange={e => setReturnBook(e.target.value)}>
                                    <option value="">-Select book to be returned-</option>
                                    {books.map(book => (
                                        <option value={book._id} key={book._id}>{book.title}</option>
                                    ))} 
                                </select>
                                {/* Create function */}
                                <button onClick={() => handleReturnBook()}>Return</button>
                            </div>
                            <div>
                                <h3>Modify User</h3>
                                <ul>
                                    <li className="mdfyUser">
                                        <button onClick={() => setMdfyUser(true)}>Modify User Details</button>
                                    </li>
                                    <li className="mdfyUser role">
                                        <select onChange={e => setRole(e.target.value)}>
                                            <option value="">-Select Role to Add</option>
                                            <option value="10">Editor</option>
                                            <option value="1">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleAddRole()}
                                        >
                                            Add Role
                                        </button>
                                    </li>
                                    <li className="mdfyUser role">
                                        <select onChange={e => setRole(e.target.value)}>
                                            <option value="">-Select Role to Delete</option>
                                            <option value="10">Editor</option>
                                            <option value="1">Admin</option>
                                        </select>
                                        <button 
                                            onClick={() => handleDeleteRole()}
                                            className="delete"
                                        >Delete Role</button>
                                    </li>
                                    <li className="mdfyUser">
                                        <button
                                            onClick={() => {
                                                const result = window.confirm("Are you sure you want to delete this User?");
                                                if(result) deleteUser();
                                            }}
                                            className="delete"
                                        >Delete User</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            }
                        {mdfyUser &&
                <section className="Section">
                    <form onSubmit={e => handleUserModification(e)}>
                        <label>First Name</label>
                        <input 
                            type="text"
                            required
                            value={firstName}
                            onChange={e => setFname(e.target.value)}
                            onFocus={() => setFnameFocus(true)}
                            onBlur={() => setFnameFocus(false)} 
                        />
                        <p className={firstName && fnameFocus ? "instructions" : "hide"}> Enter the new First Name</p>
                        
                        <label>Last Name</label>
                        <input 
                            type="text"
                            required
                            value={lastName}
                            onChange={e => setLname(e.target.value)}
                            onFocus={() => setLnameFocus(true)}
                            onBlur={() => setLnameFocus(false)} 
                        />
                        <p className={lastName && lnameFocus ? "instructions" : "hide"}>Enter the new Last Name</p>
                        
                        <label>Email</label>
                        <input 
                            type="text"
                            required
                            value={userEmail}
                            onChange={e => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)} 
                        />
                        <p className={userEmail && emailFocus ? "instructions" : "hide"}>Enter the new Email</p>

                        <input type="submit" disabled={validFname && validLname && validEmail ? false : true} />
                    </form>
                </section>
            }

        </>
     );
}
 
export default UserDetail;