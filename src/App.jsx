import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import SignUp from './pages/SignUp'
import Browse from './pages/Browse'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true to stay on home/browse on refresh

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/browse" 
          element={
            isAuthenticated ? <Browse /> : <Navigate to="/signup" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
