import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const API_URL = 'http://localhost:8080/v1/user'

function Login() {
  const [empid, setEmpid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // sent as form data because the backend uses @RequestParam
      const body = new URLSearchParams()
      body.append('empid', empid)
      body.append('password', password)

      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      const text = await res.text()

      if (res.ok) {
        localStorage.setItem('empid', empid)
        navigate('/dashboard')
      } else {
        setError(text || 'Login failed')
      }
    } catch (err) {
      setError('Cannot reach the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '24rem' }}>
        <h3 className="text-center mb-4">HRMS Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="empid">Employee ID</label>
            <input
              type="number"
              className="form-control"
              id="empid"
              placeholder="Enter employee ID"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login