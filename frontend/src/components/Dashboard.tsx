import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>
      
      <div className="row">
        <div className="col">
          <div className="card">
            <h3>Bienvenido, {user?.firstName} {user?.lastName}!</h3>
            <p>
              Este es el sistema de gestión de usuarios desarrollado como parte del desafío técnico .NET.
            </p>
            <p>
              <strong>Email:</strong> {user?.email}<br />
              <strong>País:</strong> {user?.country}<br />
              <strong>Idiomas:</strong> {user?.languages?.join(', ')}<br />
              <strong>Estado:</strong> {user?.isActive ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <h3>Gestión de Usuarios</h3>
            <p>Administra los usuarios del sistema.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/users" className="btn btn-primary">
                Ver Usuarios
              </Link>
              <Link to="/users/new" className="btn btn-success">
                Crear Usuario
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <h3>Casos Algorítmicos</h3>
            <p>Los casos OrderRange.cs y MoneyParts.cs están implementados en el backend.</p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>OrderRange:</strong> Separa números pares e impares ordenadamente</p>
              <p><strong>MoneyParts:</strong> Genera combinaciones monetarias para un monto</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <h3>Tecnologías Utilizadas</h3>
            <div className="row">
              <div className="col">
                <h4>Frontend</h4>
                <ul>
                  <li>React 18</li>
                  <li>TypeScript</li>
                  <li>React Router</li>
                  <li>Axios</li>
                </ul>
              </div>
              <div className="col">
                <h4>Backend</h4>
                <ul>
                  <li>.NET 8 Web API</li>
                  <li>Entity Framework Core</li>
                  <li>JWT Authentication</li>
                  <li>BCrypt</li>
                </ul>
              </div>
              <div className="col">
                <h4>Base de Datos</h4>
                <ul>
                  <li>PostgreSQL 15</li>
                  <li>UUID para IDs</li>
                  <li>Arrays para multiselect</li>
                  <li>Triggers automáticos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;