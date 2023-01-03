import BASE_URL from "../api/axios";
import useAuth from "./useAuth";
import axios from "../api/axios"

const useRefreshToken = () => {
    const {setUser} = useAuth();

    // const refresh = async () => {
    //     const response = await axios.get('/refresh',{
    //         withCredentials: true
    //     });
    //     console.log(response);
    //     setUser(prevState => {
    //         console.log(prevState);
    //         console.log(response.data.accessToken);
    //         return {...prevState, accessToken: response.data.accessToken}
    //     })}

    //     return refresh;
    
    const refresh =  fetch(BASE_URL + "/refresh", {
            credentials: "include"
        }).then(res => {
            if(res.ok){
                return res.json()
            }
            throw new Error(res.status)
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
    return refresh;

    
}
 
export default useRefreshToken;