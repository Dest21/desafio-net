import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          🎯 DESAFÍO TÉCNICO .NET
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '50px' }}>
          Selecciona qué parte de la solución deseas explorar
        </p>
      </div>

      <div className="row" style={{ justifyContent: 'center', gap: '30px' }}>
        <div className="col" style={{ maxWidth: '350px' }}>
          <div className="card" style={{ height: '100%', textAlign: 'center' }}>
            <div style={{ padding: '20px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '15px' }}>
                🧮 CASOS ALGORÍTMICOS
              </h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Explora los dos casos individuales implementados con explicaciones detalladas y ejemplos interactivos.
              </p>
              
              <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                <p><strong>Caso 1:</strong> OrderRange - Separar pares e impares</p>
                <p><strong>Caso 2:</strong> MoneyParts - Combinaciones monetarias</p>
              </div>

              <Link 
                to="/casos-individuales" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                Ver Casos Algorítmicos
              </Link>
            </div>
          </div>
        </div>

        <div className="col" style={{ maxWidth: '350px' }}>
          <div className="card" style={{ height: '100%', textAlign: 'center' }}>
            <div style={{ padding: '20px' }}>
              <h2 style={{ color: '#28a745', marginBottom: '15px' }}>
                🌐 SISTEMA WEB
              </h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Sistema completo de gestión de usuarios con autenticación JWT y CRUD funcional.
              </p>
              
              <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                <p><strong>Incluye:</strong> Login, Dashboard, CRUD de usuarios</p>
                <p><strong>Tecnologías:</strong> .NET 8 + React + PostgreSQL</p>
              </div>

              <Link 
                to="/login" 
                className="btn btn-success"
                style={{ width: '100%', padding: '12px' }}
              >
                Acceder al Sistema
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px' }}>🛠️ Información Técnica</h3>
        <div className="row" style={{ justifyContent: 'center' }}>
          <div className="col-auto">
            <strong>Backend:</strong> .NET 8 Web API
          </div>
          <div className="col-auto">
            <strong>Frontend:</strong> React 18 + TypeScript
          </div>
          <div className="col-auto">
            <strong>Base de datos:</strong> PostgreSQL
          </div>
          <div className="col-auto">
            <strong>Containerización:</strong> Docker
          </div>
        </div>
        <p style={{ marginTop: '15px', color: '#666' }}>
          Toda la aplicación está dockerizada y se ejecuta con un solo <code>docker compose up --build</code>
        </p>
      </div>
    </div>
  );
};

export default HomePage;