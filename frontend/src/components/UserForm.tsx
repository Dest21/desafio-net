import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, UserCreateDto, UserUpdateDto, COUNTRIES, LANGUAGES } from '../types';
import { userService } from '../services/api';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    country: '',
    languages: [] as string[],
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchUser(id);
    }
  }, [isEditing, id]);

  const fetchUser = async (userId: string) => {
    try {
      setLoading(true);
      const user = await userService.getUser(userId);
      setFormData({
        email: user.email,
        password: '', // Never populate password field
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
        country: user.country || '',
        languages: user.languages || [],
        isActive: user.isActive
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing && id) {
        const updateData: UserUpdateDto = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate || undefined,
          country: formData.country || undefined,
          languages: formData.languages.length > 0 ? formData.languages : undefined,
          isActive: formData.isActive
        };
        await userService.updateUser(id, updateData);
      } else {
        const createData: UserCreateDto = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate || undefined,
          country: formData.country || undefined,
          languages: formData.languages.length > 0 ? formData.languages : undefined,
          isActive: formData.isActive
        };
        await userService.createUser(createData);
      }
      navigate('/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        languages: prev.languages.filter(lang => lang !== language)
      }));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h1>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              {!isEditing && (
                <div className="form-group">
                  <label htmlFor="password">Contraseña *</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    minLength={6}
                  />
                </div>
              )}

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre *</label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastName">Apellido *</label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="birthDate">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      id="birthDate"
                      className="form-control"
                      value={formData.birthDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="country">País</label>
                    <select
                      id="country"
                      className="form-control"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    >
                      <option value="">Seleccionar país...</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Idiomas</label>
                <div style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  padding: '10px',
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}>
                  {LANGUAGES.map(language => (
                    <div key={language} style={{ marginBottom: '5px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={(e) => handleLanguageChange(language, e.target.checked)}
                          style={{ marginRight: '8px' }}
                        />
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    style={{ marginRight: '8px' }}
                  />
                  Usuario activo
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => navigate('/users')}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;