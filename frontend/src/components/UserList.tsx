import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { userService } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      return;
    }

    try {
      await userService.deleteUser(id);
      await fetchUsers(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar usuario');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Gestión de Usuarios</h1>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <Link to="/users/new" className="btn btn-success">
              Crear Nuevo Usuario
            </Link>
          </div>

          <div className="card">
            {users.length === 0 ? (
              <p>No hay usuarios registrados.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>País</th>
                    <th>Idiomas</th>
                    <th>Estado</th>
                    <th>Fecha Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.country || '-'}</td>
                      <td>{user.languages?.join(', ') || '-'}</td>
                      <td>
                        <span style={{ 
                          color: user.isActive ? 'green' : 'red',
                          fontWeight: 'bold'
                        }}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <Link 
                            to={`/users/edit/${user.id}`}
                            className="btn btn-warning"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-danger"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;