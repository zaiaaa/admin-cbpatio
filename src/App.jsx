import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login/login'
import { AuthContext, AuthContextProvider } from './context/auth'
import { Layout } from './components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { useContext } from 'react'
import { PrivateRoute } from './services/privateRoute'
import { Campeonatos } from './pages/campeonatos/Campeonatos'
import { Valores } from './pages/valores/Valores'
import { Jogos } from './pages/jogos/Jogos'
import { EditarCampeonato } from './pages/editarCampeonato/EditarCampeonato'
import { ChaveCampeonato } from './pages/chaveCampeonato/ChaveCampeonato'
import { ValoresCampeonato } from './pages/valoresCampeonato/ValoresCampeonato'
import { CapitaesCampeonato } from './pages/capitaesCampeonato/CapitaesCampeonato'


function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ChakraProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/campeonatos' element={
              <PrivateRoute>
                <Layout>
                  <Campeonatos />
                </Layout>
              </PrivateRoute>} />
            <Route path='/campeonatos/editar/:id' element={
              <PrivateRoute>
                <Layout>
                  <EditarCampeonato />
                </Layout>
              </PrivateRoute>} />
            <Route path='/campeonatos/:id/capitaes' element={
              <PrivateRoute>
                <Layout>
                  <CapitaesCampeonato />
                </Layout>
              </PrivateRoute>} />
            <Route path='/valores' element={
              <PrivateRoute>
                <Layout>
                  <Valores />
                </Layout>
              </PrivateRoute>} />
            <Route path='/valores/:id' element={
              <PrivateRoute>
                <Layout>
                  <ValoresCampeonato/>
                </Layout>
              </PrivateRoute>} />
            <Route path='/jogos' element={
              <PrivateRoute>
                <Layout>
                  <Jogos />
                </Layout>
              </PrivateRoute>} />
            <Route path='/jogos/:id/chave' element={
              <PrivateRoute>
                <Layout>
                  <ChaveCampeonato/>
                </Layout>
              </PrivateRoute>} />
          </Routes>
        </ChakraProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
