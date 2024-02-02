import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login/login'
import { AuthContext, AuthContextProvider } from './context/auth'
import { MainRoutes } from './components/MainRoutes/MainRoutes'
import { Layout } from './components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { useContext } from 'react'



function App() {
  const { isAuth } = useContext(AuthContext)
  console.log(isAuth)
  return (
    <Router>
      <AuthContextProvider>
        <ChakraProvider>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
          <Layout>
            <MainRoutes />
          </Layout>
        </ChakraProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
