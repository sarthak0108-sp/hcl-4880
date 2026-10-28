import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './component/Login.jsx'
import EmployeeDashboard from './component/EmployeeDashboard.jsx'
import Dashboard from './component/Dashboard.jsx'

function PrivateRoute({ children }) {
  const empid = localStorage.getItem('empid')
  return empid ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  )
}

export default App