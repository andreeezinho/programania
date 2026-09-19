import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/fases', label: 'Fases', icon: '↻' },
  { to: '/minhas-fases', label: 'Minhas Fases', icon: '▤' },
  { to: '/ajuda', label: 'Ajuda', icon: '?' },
  { to: '/perfil', label: 'Meu Perfil', icon: '♙' },
]

const styles = {
  sidebar: {
    width: 218,
    minHeight: 'calc(100vh - 32px)',
    margin: 16,
    padding: '26px 12px 12px',
    borderRadius: 14,
    backgroundColor: '#789345',
    boxSizing: 'border-box',
    boxShadow: '0 5px 8px rgba(49, 55, 35, 0.24)',
  },
  nav: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: 7,
  },
  link: {
    display: 'block',
    padding: '10px 9px',
    borderRadius: 8,
    color: '#f5f5e9',
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background-color 0.2s, color 0.2s',
  },
  activeLink: {
    backgroundColor: '#607a32',
    color: '#ffffff',
  },
  logoutButton: {
    width: '100%',
    marginTop: 'auto',
    padding: '10px 12px',
    border: 'none',
    borderRadius: 8,
    backgroundColor: '#ee655d',
    color: '#ffffff',
    cursor: 'pointer',
    font: 'inherit',
    fontWeight: 500,
    textAlign: 'left',
  },
}

const Sidebar = ({ handleLogout }) => {
  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        <div style={{ padding: '0 4px 17px', marginBottom: 15, borderBottom: '1px solid rgba(245,245,233,.32)', color: '#f5f5e9', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
          LOGO
        </div>

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
            <span style={{ display: 'inline-flex', width: 21, justifyContent: 'center', marginRight: 3, fontSize: 17, lineHeight: 1 }}>{item.icon}</span>
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
