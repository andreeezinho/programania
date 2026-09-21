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
                setUser(me);
                localStorage.setItem("user", JSON.stringify(me));
            } catch (error) {
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }

            setLoading(false);
        }

        init();
    }, []);

    const login = async (credentials) => {
        const response = await auth(credentials);
        console.log(response);

        localStorage.setItem("token", response.token);
        setToken(response.token);

        const me = await getUser();
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));

        return me;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}> 
            {children}
        </AuthContext.Provider>
    );

}