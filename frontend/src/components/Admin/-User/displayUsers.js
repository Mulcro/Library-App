import { useEffect, useState } from "react";
import BASE_URL from "../../../api/baseUrl";
import UserDetail from "./userDetail";
import moment from 'moment';
import useAxios from "../../../hooks/useAxios";

//Implement live search where as search param is entered results are displayed live. 
const DisplayUsers = () => {
    
    const [usersPage, setUserPage] = useState(true);
    const [renderUserDetail, setRenderUserDetail] = useState(false);

    const {data: users, pending, error} = useAxios(BASE_URL + '/users'); //removed accessToken as cookie auth isn't working
    const [query, setQuery] = useState("");
    const [user, setUsername] = useState('');

    // useEffect(() => {
    //     const searchUsers = () => {
            
    //     }
    // }
    // ,[query])
    
    // undefined value being returned by this function meaning nothing is being passed through as an arguement
    useEffect(() => {
        if(user){
            setRenderUserDetail(true);
        }
    },[user])

    return ( 
        <section className="">
            {usersPage && !renderUserDetail &&
                <>
                <h1>All Users</h1>
                {error && 
                    <div>
                        Error while loading resource
                    </div>
                }
                {pending &&
                    <div className="loading">
                        loading...
                    </div>
                }
                {users &&

                    <div className="userDisplay">
                    <table className="userTable">
                            <th>View details</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Created on</th>

                        <tbody>
                        {users.map(user => (
                            // Objects seem not to accept value attributes and I can't pass the user object as an arguement to the renderUserPage function
                            <tr key={user.id}>
                                <td><button className="userbtn" value={user.username} onClick={(e) => setUsername(e.target.value)} ></button></td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{moment(user.createdOn).format("DD/MM/YYYY")}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                }
                </>
            }
            {renderUserDetail &&
                <UserDetail username={user}/>
            }
        </section>
     );
}
 
export default DisplayUsers;