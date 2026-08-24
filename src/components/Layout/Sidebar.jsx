import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/', label: 'Inicio' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/sobre', label: 'Sobre' },
]

const styles = {
  sidebar: {
    width: 240,
    minHeight: '100vh',
    padding: 16,
    borderRight: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  nav: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    display: 'block',
    padding: '10px 14px',
    borderRadius: 6,
    color: '#374151',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background-color 0.2s, color 0.2s',
  },
  activeLink: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
  logoutButton: {
    width: '100%',
    marginTop: 'auto',
    padding: '10px 14px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#ef4444',
    color: '#ffffff',
    cursor: 'pointer',
    font: 'inherit',
    fontWeight: 600,
    textAlign: 'left',
  },
}

const Sidebar = ({ handleLogout }) => {
  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            {item.label}
          </NavLink>
        ))}

        <button type="button" onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
