import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EmployeeDashboard.css'

const EMP_API = 'http://localhost:8080/v1/user'
const ATT_API = 'http://localhost:8080/v1/user/attendance'

const ICONS = {
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  settings: <><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  bars: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
  hash: <><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></>,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
}

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  )
}

const pad = (n) => String(n).padStart(2, '0')

// local time in the format Spring's LocalDateTime accepts
const nowIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const todayStr = () => new Date().toLocaleDateString('en-CA')

const fmtTime = (dt) =>
  dt
    ? new Date(dt)
        .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
        .toLowerCase()
    : '—'

const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function EmployeeDashboard() {
  const navigate = useNavigate()
  const empid = localStorage.getItem('empid')

  const [employee, setEmployee] = useState(null)
  const [records, setRecords] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const [empRes, attRes] = await Promise.all([
        fetch(`${EMP_API}/findbyid/${empid}`),
        fetch(`${ATT_API}/employee/${empid}`),
      ])
      const empText = await empRes.text()
      setEmployee(empText ? JSON.parse(empText) : null)
      setRecords(attRes.ok ? await attRes.json() : [])
      setError('')
    } catch {
      setError('Could not load data. Check that the backend is running and CORS allows this port.')
    }
  }, [empid])

  useEffect(() => {
    load()
  }, [load])

  const today = todayStr()
  const monthPrefix = today.slice(0, 7)
  const todayRecord = records.find((r) => r.attendancedate === today)
  const daysThisMonth = records.filter((r) => (r.attendancedate || '').startsWith(monthPrefix)).length

  const canCheckIn = !todayRecord
  const canCheckOut = Boolean(todayRecord?.inTime && !todayRecord?.outTime)
  const finished = Boolean(todayRecord?.outTime)

  let status = 'Not checked in'
  let statusNote = 'You have not checked in yet'
  let statusTone = 'idle'
  if (canCheckOut) {
    status = 'Checked in'
    statusNote = 'Your attendance is recorded'
    statusTone = 'live'
  } else if (finished) {
    status = 'Checked out'
    statusNote = 'Have a good evening'
    statusTone = 'done'
  }

  const call = async (fn) => {
    setBusy(true)
    setMessage('')
    try {
      setMessage(await fn())
      await load()
    } catch {
      setMessage('Request failed. Is the backend running?')
    } finally {
      setBusy(false)
    }
  }

  const checkIn = () =>
    call(async () => {
      const res = await fetch(`${ATT_API}/markattendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee: { empId: Number(empid) }, inTime: nowIso() }),
      })
      return res.text()
    })

  const checkOut = () =>
    call(async () => {
      const res = await fetch(
        `${ATT_API}/markout?empid=${empid}&outTime=${encodeURIComponent(nowIso())}`,
        { method: 'PUT' }
      )
      return res.text()
    })

  const signOut = () => {
    localStorage.removeItem('empid')
    navigate('/login')
  }

  const name = employee?.empName || 'there'
  const initial = name.charAt(0).toUpperCase()

  const nav = [
    { label: 'Overview', icon: 'home', active: true },
    { label: 'Attendance', icon: 'calendar' },
    { label: 'Profile', icon: 'user' },
    { label: 'Settings', icon: 'settings' },
  ]

  return (
    <div className="pf">
      {/* ---------- sidebar ---------- */}
      <aside className="pf-sidebar">
        <div className="pf-brand">
          <span className="pf-brand-mark"><Icon name="users" size={20} /></span>
          <span className="pf-brand-name">hrms</span>
        </div>

        <nav className="pf-nav">
          {nav.map((n) => (
            <a key={n.label} className={`pf-nav-item ${n.active ? 'active' : ''}`}>
              <Icon name={n.icon} size={19} />
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="pf-me">
          <div className="pf-avatar sm">{initial}</div>
          <div className="pf-me-text">
            <strong>{name}</strong>
            <small>Employee #{empid}</small>
          </div>
          <button className="pf-icon-btn" onClick={signOut} title="Sign out">
            <Icon name="logout" size={18} />
          </button>
        </div>
      </aside>

      {/* ---------- main ---------- */}
      <main className="pf-main">
        <div className="pf-container">
          <header className="pf-header">
            <div>
              <div className="pf-eyebrow">Employee workspace</div>
              <h1 className="pf-title">
                {greeting()}, <span>{name}.</span>
              </h1>
              <p className="pf-muted">Here's what your workday looks like today.</p>
            </div>

            <div className="pf-header-right">
              <div className="pf-header-actions">
                <button className="pf-chip-btn icon" title="Notifications">
                  <Icon name="bell" size={18} />
                </button>
                <button className="pf-chip-btn" onClick={signOut}>
                  Sign out <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="pf-date">
                {new Date().toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </header>

          {error && <div className="pf-alert">{error}</div>}

          {/* stat cards */}
          <section className="pf-grid-3">
            <div className="pf-card pf-stat">
              <div className="pf-stat-head">
                <span className="pf-icon-box violet"><Icon name="clock" /></span>
                <span className={`pf-status-dot ${statusTone}`} />
              </div>
              <div className="pf-label">Today's status</div>
              <div className="pf-value">{status}</div>
              <div className="pf-note">{statusNote}</div>
            </div>

            <div className="pf-card pf-stat">
              <div className="pf-stat-head">
                <span className="pf-icon-box amber"><Icon name="calendar" /></span>
              </div>
              <div className="pf-label">Days this month</div>
              <div className="pf-value">{pad(daysThisMonth)}</div>
              <div className="pf-note">Attendance records this month</div>
            </div>

            <div className="pf-card pf-stat">
              <div className="pf-stat-head">
                <span className="pf-icon-box violet"><Icon name="hash" /></span>
              </div>
              <div className="pf-label">Employee ID</div>
              <div className="pf-value">#{empid}</div>
              <div className="pf-note">{employee?.designation || '—'}</div>
            </div>
          </section>

          {/* check in + profile */}
          <section className="pf-grid-2">
            <div className="pf-card pf-today">
              <div className="pf-today-head">
                <span className="pf-icon-box violet lg"><Icon name="calendar" size={22} /></span>
                <div>
                  <div className="pf-eyebrow">
                    Today ·{' '}
                    {new Date()
                      .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                      .toUpperCase()}
                  </div>
                  <h2 className="pf-h2">Make today count.</h2>
                  <p className="pf-muted">
                    {canCheckIn && 'You have not checked in yet. Start your day below.'}
                    {canCheckOut && "You're checked in. Remember to check out at the end of your day."}
                    {finished && "You're all done for today. See you tomorrow!"}
                  </p>
                </div>
              </div>

              <div className="pf-times">
                <div className="pf-time-box">
                  <span className={`pf-dot ${todayRecord?.inTime ? 'on' : ''}`} />
                  <div>
                    <small>Check In</small>
                    <strong>{fmtTime(todayRecord?.inTime)}</strong>
                  </div>
                </div>
                <div className="pf-time-box">
                  <span className={`pf-dot ${todayRecord?.outTime ? 'on' : ''}`} />
                  <div>
                    <small>Check Out</small>
                    <strong>{fmtTime(todayRecord?.outTime)}</strong>
                  </div>
                </div>
              </div>

              <div className="pf-action-row">
                {canCheckIn && (
                  <button className="pf-btn" onClick={checkIn} disabled={busy}>
                    {busy ? 'Please wait...' : 'Check in'} <Icon name="arrow" size={17} />
                  </button>
                )}
                {canCheckOut && (
                  <button className="pf-btn" onClick={checkOut} disabled={busy}>
                    {busy ? 'Please wait...' : 'Check out'} <Icon name="arrow" size={17} />
                  </button>
                )}
                {message && <span className="pf-message">{message}</span>}
              </div>
            </div>

            <div className="pf-card pf-profile">
              <div className="pf-profile-head">
                <h3 className="pf-h3">Your Profile</h3>
                <button className="pf-outline-btn">
                  <Icon name="edit" size={15} /> Edit
                </button>
              </div>

              <div className="pf-profile-who">
                <div className="pf-avatar lg">{initial}</div>
                <div>
                  <div className="pf-profile-name">{name}</div>
                  <div className="pf-muted">{employee?.designation || '—'}</div>
                </div>
              </div>

              <ul className="pf-info-list">
                <li>
                  <span><Icon name="hash" size={17} /> Employee ID</span>
                  <b>#{empid}</b>
                </li>
                <li>
                  <span><Icon name="layers" size={17} /> Team / Stack</span>
                  <b>{employee?.stack || '—'}</b>
                </li>
                <li>
                  <span><Icon name="briefcase" size={17} /> Designation</span>
                  <b>{employee?.designation || '—'}</b>
                </li>
              </ul>
            </div>
          </section>

          {/* history */}
          <section className="pf-card pf-history">
            <div className="pf-history-head">
              <span className="pf-icon-box violet"><Icon name="bars" /></span>
              <div>
                <h3 className="pf-h3">Attendance history</h3>
                <p className="pf-muted">Recent attendance records</p>
              </div>
              <span className="pf-pill">{records.length} records</span>
            </div>

            <div className="pf-table-wrap">
              <table className="pf-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check in</th>
                    <th>Check out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.attendanceId}>
                      <td>{fmtDate(r.attendancedate)}</td>
                      <td>{fmtTime(r.inTime)}</td>
                      <td>{fmtTime(r.outTime)}</td>
                      <td>
                        <span className={`pf-badge ${r.outTime ? 'done' : 'live'}`}>
                          <i /> {r.outTime ? 'Checked out' : 'Checked in'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td colSpan="4" className="pf-empty">No attendance records yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default EmployeeDashboard