import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router'

export const Home = () => {
  
    const {isAuth, logoff} = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(isAuth)

    useEffect(() => {
        if(!isAuth){
            navigate('/')
        }
    }, [])
    
    return (
        <>
            <div>{isAuth ? "vc ta autenticado" : 'nao ta autenticado'}</div>
            <button onClick={logoff}>deslogar</button>
        </>
    )
}
