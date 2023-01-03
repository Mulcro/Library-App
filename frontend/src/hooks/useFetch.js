import { useState , useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [pending, isPending] = useState(false)
    const[error, setError] = useState(false)
    // console.log(user);
    useEffect(() =>{
    (() => {
        isPending(true);
        
        fetch(url,{
            credentials:"include"
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error();
        })
        .then( data => {
            setData(data);
            setError(false);
            isPending(false);
        })
        .catch(() => {
            setData([]);
            isPending(false);
            setError(true);    
        })
    }
    )();
    }, []);
    return {data, pending, error}
}

export default useFetch;