import axios from 'axios';
const BASE_URL = "http://localhost:4500";


export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// export const axiosPrivate = axios.create({
//     baseUrl: BASE_URL,
//     headers:{"Content-Type":"application/json"},
//     withCredentials: true
// });

