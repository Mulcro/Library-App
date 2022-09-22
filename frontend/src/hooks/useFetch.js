import { useState , useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [pending, isPending] = useState(false)
    const[error, setError] = useState(false)

    useEffect(() =>{
    (async () => {
        isPending(true);
        let result;
        try{
            const response = await fetch(url);
            result = (await response.json()).books
            console.log(result);
            setError(false);
            isPending(false);
        }
        catch(error){
            console.log(error);
            result = []
            isPending(false);
            setError(true);    
        }
        setData(result);
    }
    )();
    }, []);

    return {data, pending, error}
}

export default useFetch;