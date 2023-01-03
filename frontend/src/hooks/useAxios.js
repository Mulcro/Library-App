import { useState , useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState([]);
    const [pending, isPending] = useState(false);
    const[error, setError] = useState(false);

    useEffect(() => {
        isPending(true);

        axios(url
        // ,{
        //     headers:{
        //         "Authorization":`Bearer ${accessToken}`
        //     }
        // }
        )
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status)
        })
        .then(data => {
            isPending(false);
            setError(false);
            setData(data.data)
        })
        .catch(() => {
            isPending(false)
            setError(true)
            setData([])
        }) 
    },[])
    
    return {data,pending,error}
}

export default useAxios;