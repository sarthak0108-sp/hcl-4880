import { useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar.jsx'
import './Dashboard.css'

const API_URL = 'http://localhost:8080/v1/user/attendance'

const todayStr = () => new Date().toLocaleDateString('en-CA') // YYYY-MM-DD

const fmtDate = (d) =>
  d
    ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

const fmtTime = (dt) =>
  dt
    ? new Date(dt)
        .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
        .toLowerCase()
    : '—'

function Dashboard() {
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const empid = localStorage.getItem('empid') || ''

  useEffect(() => {
    fetch(`${API_URL}/all`)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => setRecords(data))
      .catch(() => setError('Could not load attendance. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const today = todayStr()
  const presentToday = records.filter((r) => r.attendancedate === today && r.inTime).length
  const uniqueEmployees = new Set(records.map((r) => r.employee?.empId)).size

  const todayLabel = new Date(today + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return [...records]
      .sort((a, b) => {
        const d = (b.attendancedate || '').localeCompare(a.attendancedate || '')
        return d !== 0 ? d : (b.inTime || '').localeCompare(a.inTime || '')
      })
      .filter((r) => {
        if (!q) return true
        return (
          (r.employee?.empName || '').toLowerCase().includes(q) ||
          (r.employee?.designation || '').toLowerCase().includes(q) ||
          String(r.employee?.empId || '').includes(q)
        )
      })
  }, [records, search])

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">HR MANAGEMENT</div>
            <h1 className="page-title">Attendance Dashboard</h1>
          </div>
          <div className="top-actions">
            <div className="bell">🔔</div>
            <span className="top-id">{empid}</span>
            <div className="avatar">{empid.charAt(0)}</div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon blue">▦</div>
            <div>
              <div className="stat-label">Total Records</div>
              <div className="stat-value">{records.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <div className="stat-label">Present Today</div>
              <div className="stat-value">{presentToday}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">◔</div>
            <div>
              <div className="stat-label">Unique Employees</div>
              <div className="stat-value">{uniqueEmployees}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">◇</div>
            <div>
              <div className="stat-label">Selected Date</div>
              <div className="stat-value">{todayLabel}</div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <div className="eyebrow">EMPLOYEE ATTENDANCE</div>
              <h2 className="panel-title">Attendance Records</h2>
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {error && <div className="error-box">{error}</div>}

          <table className="table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>EMPLOYEE ID</th>
                <th>DATE</th>
                <th>IN TIME</th>
                <th>OUT TIME</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r, i) => {
                const name = r.employee?.empName || 'Unknown'
                const present = Boolean(r.inTime)
                return (
                  <tr key={r.attendanceId ?? i}>
                    <td>
                      <div className="emp-cell">
                        <div className="emp-avatar">{name.charAt(0).toUpperCase()}</div>
                        <div>
                          <div className="emp-name">{name}</div>
                          <div className="emp-role">{r.employee?.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="emp-id">EMP-{r.employee?.empId}</td>
                    <td>{fmtDate(r.attendancedate)}</td>
                    <td>{fmtTime(r.inTime)}</td>
                    <td>{fmtTime(r.outTime)}</td>
                    <td>
                      <span className={`badge ${present ? 'present' : 'absent'}`}>
                        <span className="dot" /> {present ? 'Present' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {!loading && visible.length === 0 && !error && (
            <div className="empty">No attendance records found.</div>
          )}

          <div className="table-foot">
            Showing {visible.length} of {records.length} records
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard