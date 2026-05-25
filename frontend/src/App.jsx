// App.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Accueil from './pages/Accueil'

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>
  )
}
export default App