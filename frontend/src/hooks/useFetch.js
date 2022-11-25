import { useState , useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [pending, isPending] = useState(false)
    const[error, setError] = useState(false)

    useEffect(() =>{
    (() => {
        isPending(true);
        try{
            fetch(url)
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
            });
        }
        catch(error){
            setData([]);
            isPending(false);
            setError(true);    
        }
    }
    )();
    }, []);
    return {data, pending, error}
}

export default useFetch;