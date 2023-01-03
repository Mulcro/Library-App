import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;