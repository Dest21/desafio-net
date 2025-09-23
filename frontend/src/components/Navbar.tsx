import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Desafío Técnico .NET
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
          <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>
            Usuarios
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#ccc' }}>
              Hola, {user?.firstName} {user?.lastName}
            </span>
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '5px 15px', fontSize: '14px' }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;