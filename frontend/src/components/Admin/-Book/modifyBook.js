import { useState } from "react";
import BASE_URL from "../../../api/baseUrl";


const ModifyBook = () => {

    const [query, setQuery] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(query)
        }
        try{
            fetch(BASE_URL + "/books", options)
        }
        catch(err){
            console.log(err);
        }
    }
    return ( 
        <section className="section">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">Enter Book Title</label>
                <input 
                    type="text"
                    value={query}
                    required
                    ref={queryRef}
                    onChange={(e) => setQuery(e.target.value)} 
                    />
                <input type="submit" />
            </form>

        </section>
     );
}
 
export default ModifyBooK;