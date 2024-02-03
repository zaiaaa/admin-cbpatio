import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '../../services/privateRoute'
import { Campeonatos } from '../../pages/campeonatos/Campeonatos'
import { Valores } from '../../pages/valores/Valores'
import { Jogos } from '../../pages/jogos/Jogos'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'



const MainRoutes = () => {
    const { isAuth } = useContext(AuthContext)

    return (
        <>
            <Routes>
                
            </Routes>
        </>
    )

}

export { MainRoutes }