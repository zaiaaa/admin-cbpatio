import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from './pages/login/login'
import { AuthContextProvider } from './context/auth'
import {MainRoutes} from './components/MainRoutes/MainRoutes'
import { Layout } from './components/Layout/Layout'

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
          <Layout>
            <MainRoutes />
          </Layout>
      </AuthContextProvider>
    </Router>
  )
}

export default App
