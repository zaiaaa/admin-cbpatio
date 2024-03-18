import { Api } from "../services/api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) =>{
    const [token, setToken] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [erros, setErros] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            console.log(token)
            const {data: esperado} = await Api.get(`/login/token/${token}`)
            console.log(esperado)

            if(esperado == "Token OK"){
                console.log("oiii1")

                setIsAuth(true)
    
                setToken({
                    token
                })
                return
            }

            if(esperado == "Token Inválido"){
                setIsAuth(false)
                localStorage.removeItem("token")
                return
            }
        }

        checkToken()
    }, [])


    const handleLogin = async (loginData) => {
        try{
            const {data} = await Api.post("/login", {usuario: loginData.login, senha: loginData.senha})
            
            if(data){
                setToken(data)
                localStorage.setItem("token", data)
                
                console.log("logado")
                
                setIsAuth(true)
                navigate('/campeonatos')

                Api.defaults.headers.Authorization = `Bearer ${data}`
            }else{
                console.log('logou nao')
            }

        }catch(e){
            e = "Login ou Senha inválidos"
            setErros(e)
            setTimeout(() => {
                setErros("")
            }, 2000);
        }
    }

    const logoff = () => {
        setIsAuth(false)
        setToken({})
        localStorage.clear()
        navigate('/')
    }


    return(<AuthContext.Provider value={{token, logoff, handleLogin, isAuth, erros}}>
        {children}
    </AuthContext.Provider>)
}

