import { BrowserRouter as Router, Link, Route ,Routes } from 'react-router-dom'
import { Login } from './pages/login/login'
import { AuthContextProvider } from './context/auth'
import { Home } from './pages/home/home'
import { PrivateRoute } from './services/privateRoute'

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>}/>
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
