import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('empid')
    navigate('/login')
  }

  const items = [
    { label: 'Dashboard', icon: '⌂', active: true },
    { label: 'Attendance', icon: '◈' },
    { label: 'Employees', icon: '☺' },
    { label: 'Leave', icon: '◇' },
  ]

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">H</div>
        <span className="brand-name">HRMS</span>
      </div>

      <nav className="nav-list">
        {items.map((item) => (
          <div key={item.label} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span className="logout-icon">⎋</span> Logout
      </button>
    </aside>
  )
}

export default Sidebar