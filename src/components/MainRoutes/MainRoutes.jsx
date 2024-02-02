import { Route, Routes } from 'react-router-dom'
import { Home } from '../../pages/home/home'
import { PrivateRoute } from '../../services/privateRoute'
import { Campeonatos } from '../../pages/campeonatos/Campeonatos'
import { Valores } from '../../pages/valores/Valores'
import { Jogos } from '../../pages/jogos/Jogos'


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/home' element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>} />
                <Route path='/campeonatos' element={
                    <PrivateRoute>
                        <Campeonatos />
                    </PrivateRoute>} />
                <Route path='/valores' element={
                    <PrivateRoute>
                        <Valores />
                    </PrivateRoute>} />
                <Route path='/jogos' element={
                    <PrivateRoute>
                        <Jogos />
                    </PrivateRoute>} />
            </Routes>
        </>
    )

}

export { MainRoutes }