import { useState } from 'react'
import { BrowserRouter as Router, Link, Route ,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={""}/>
      </Routes>
    </Router>
  )
}

export default App
