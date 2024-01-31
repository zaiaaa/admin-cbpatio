import { Api } from "../services/api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) =>{
    const [token, setToken] = useState({})
    const [isAuth, setIsAuth] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            setIsAuth(true)

            setToken({
                token
            })
        }
    }, [])


    const handleLogin = async (loginData) => {
        try{
            const {data} = await Api.post("/login", {usuario: loginData.login, senha: loginData.senha})
            
            if(data){
                setToken(data)
                localStorage.setItem("token", data)
                
                console.log("logado")
                
                setIsAuth(true)
                navigate('/home')

                Api.defaults.headers.Authorization = `Bearer ${data}`
            }else{
                console.log('logou nao')
            }

        }catch(e){
            console.log(e)
        }
    }

    const logoff = () => {
        setIsAuth(false)
        setToken({})
        localStorage.clear()
    }


    return(<AuthContext.Provider value={{token, logoff, handleLogin, isAuth}}>
        {children}
    </AuthContext.Provider>)
}

