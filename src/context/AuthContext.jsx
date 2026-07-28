import { useState, useEffect } from "react";
import { createContext } from "react";
import { auth, getUser } from "../services/Auth/AuthService";

export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {return localStorage.getItem("token")});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init(){
            if(!token){
                setLoading(false);
                return;
            }

            try {
                const me = await getUser();
                setUser(me.data);
            } catch (error) {
                setUser(null);
                localStorage.removeItem("token");
            }

            setLoading(false);
        }

        init();
    }, []);

    const login = async (credentials) => {
        const response = await auth(credentials);
        console.log(response);

        localStorage.setItem("token", response.data);
        setToken(response.data);

        const me = await getUser();
        setUser(me.data);

        return me;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}> 
            {children}
        </AuthContext.Provider>
    );

}