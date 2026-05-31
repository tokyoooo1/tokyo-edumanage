import { getRoutesForRole } from '../routes/roleRoutes'
import { useAuth } from '../hooks/useAuth'

export default function AdminLayout({ children, currentPath = '/' }) {
  const { user, logout } = useAuth()
  const routes = getRoutesForRole(user?.role)

  function handleLogout() {
    logout()
    window.location.hash = '#/'
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <strong>EduManage</strong>
            <small>{user?.school}</small>
          </div>
        </div>
        <nav className="nav-list">
          {routes.map((route) => (
            <a
              className={`nav-link ${currentPath === route.path ? 'nav-link-active' : ''}`}
              key={route.path}
              href={route.href}
            >
              {route.icon}
              <span>{route.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">School Management System</span>
            <h1>Good afternoon, {user?.name}</h1>
          </div>
          <div className="topbar-actions">
            <div className="profile-pill">
              <span>{user?.title ?? user?.role}</span>
            </div>
            <button className="button button-secondary" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
