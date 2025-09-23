import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface CasoResult {
  titulo: string;
  descripcion: string;
  funcionamiento: string;
  ejemplos: any[];
  denominaciones?: number[];
}

const CasosIndividuales: React.FC = () => {
  const [orderRangeData, setOrderRangeData] = useState<CasoResult | null>(null);
  const [moneyPartsData, setMoneyPartsData] = useState<CasoResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'order-range' | 'money-parts'>('order-range');

  useEffect(() => {
    fetchCasosData();
  }, []);

  const fetchCasosData = async () => {
    try {
      setLoading(true);
      const [orderResponse, moneyResponse] = await Promise.all([
        api.get('/casos/order-range'),
        api.get('/casos/money-parts')
      ]);
      
      setOrderRangeData(orderResponse.data);
      setMoneyPartsData(moneyResponse.data);
    } catch (error) {
      console.error('Error al cargar casos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomTest = async () => {
    if (!customInput.trim()) return;

    try {
      let result;
      if (activeTab === 'order-range') {
        // Parsear números separados por comas
        const numbers = customInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
        result = await api.post('/casos/order-range', numbers);
      } else {
        // Validar que el monto no sea demasiado alto antes de enviar
        const monto = parseFloat(customInput.trim());
        if (!isNaN(monto) && monto > 5) {
          setCustomResult({ 
            error: `El monto ${customInput.trim()} es demasiado alto. Por favor ingrese un valor menor o igual a 5 para evitar timeouts. Valores sugeridos: 0.15, 1.5, 2, 3, 5.`
          });
          return;
        }
        
        // Enviar monto como string
        result = await api.post('/casos/money-parts', `"${customInput.trim()}"`);
      }
      
      setCustomResult(result.data);
    } catch (error: any) {
      setCustomResult({ error: error.response?.data?.error || 'Error al procesar' });
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando casos algorítmicos...</div>
      </div>
    );
  }

  const currentData = activeTab === 'order-range' ? orderRangeData : moneyPartsData;

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/" className="btn btn-secondary">
          ← Volver al Inicio
        </Link>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        🧮 Casos Algorítmicos Individuales
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'order-range' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => {
            setActiveTab('order-range');
            setCustomResult(null);
            setCustomInput('');
          }}
          style={{ borderRadius: '4px 4px 0 0', marginRight: '5px', marginBottom: '5px' }}
        >
          Caso 1: OrderRange
        </button>
        <button
          className={`btn ${activeTab === 'money-parts' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => {
            setActiveTab('money-parts');
            setCustomResult(null);
            setCustomInput('');
          }}
          style={{ borderRadius: '4px 4px 0 0', marginBottom: '5px' }}
        >
          Caso 2: MoneyParts
        </button>
      </div>

      {currentData && (
        <div>
          {/* Información del caso */}
          <div className="card" style={{ marginBottom: '20px', maxWidth: '100%', overflow: 'hidden' }}>
            <h2 style={{ color: '#007bff' }}>{currentData.titulo}</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
              {currentData.descripcion}
            </p>
            
            {activeTab === 'money-parts' && currentData.denominaciones && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Denominaciones disponibles:</strong>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {currentData.denominaciones.join(', ')}
                </div>
              </div>
            )}

            <div>
              <strong>🔧 Funcionamiento:</strong>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '4px',
                fontSize: '14px',
                lineHeight: '1.6',
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                overflow: 'hidden',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}>
                {currentData.funcionamiento}
              </div>
            </div>
          </div>

          {/* Ejemplos predefinidos */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3>📊 Ejemplos de Funcionamiento</h3>
            {currentData.ejemplos.map((ejemplo, index) => (
              <div key={index} style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                {activeTab === 'order-range' ? (
                  <div>
                    <div><strong>Input:</strong> [{ejemplo.input.join(', ')}]</div>
                    <div><strong>Pares:</strong> [{ejemplo.pares.join(', ')}]</div>
                    <div><strong>Impares:</strong> [{ejemplo.impares.join(', ')}]</div>
                  </div>
                ) : (
                  <div>
                    <div><strong>Monto:</strong> {ejemplo.monto}</div>
                    <div><strong>Combinaciones encontradas:</strong> {ejemplo.combinacionesEncontradas}</div>
                    {ejemplo.combinaciones && ejemplo.combinaciones.length > 0 && (
                      <div>
                        <strong>Primeras combinaciones:</strong>
                        {ejemplo.combinaciones.map((comb: number[], idx: number) => (
                          <div key={idx} style={{ fontSize: '14px', marginLeft: '10px' }}>
                            [{comb.join(', ')}]
                          </div>
                        ))}
                      </div>
                    )}
                    {ejemplo.error && (
                      <div style={{ color: 'red' }}>
                        <strong>Error:</strong> {ejemplo.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prueba personalizada */}
          <div className="card">
            <h3>🧪 Prueba Personalizada</h3>
            <div className="form-group">
              <label>
                {activeTab === 'order-range' 
                  ? 'Ingresa números separados por comas (ej: 5,2,8,1,9):' 
                  : 'Ingresa un monto (ej: 0.15, 1.5, 5):'}
              </label>
              <input
                type="text"
                className="form-control"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={activeTab === 'order-range' ? '5,2,8,1,9' : '0.15'}
              />
            </div>
            
            <button 
              onClick={handleCustomTest}
              className="btn btn-primary"
              disabled={!customInput.trim()}
            >
              Probar
            </button>

            {customResult && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                backgroundColor: customResult.error ? '#f8d7da' : '#d4edda',
                borderRadius: '4px'
              }}>
                {customResult.error ? (
                  <div style={{ color: '#721c24' }}>
                    <strong>Error:</strong> {customResult.error}
                  </div>
                ) : (
                  <div>
                    {activeTab === 'order-range' ? (
                      <div>
                        <div><strong>Input:</strong> [{customResult.input.join(', ')}]</div>
                        <div><strong>Pares:</strong> [{customResult.pares.join(', ')}]</div>
                        <div><strong>Impares:</strong> [{customResult.impares.join(', ')}]</div>
                      </div>
                    ) : (
                      <div>
                        <div><strong>Monto:</strong> {customResult.monto}</div>
                        <div><strong>Combinaciones encontradas:</strong> {customResult.combinacionesEncontradas}</div>
                        {customResult.combinaciones && customResult.combinaciones.length > 0 && (
                          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <strong>Todas las combinaciones:</strong>
                            {customResult.combinaciones.map((comb: number[], idx: number) => (
                              <div key={idx} style={{ fontSize: '14px', marginLeft: '10px' }}>
                                [{comb.join(', ')}]
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CasosIndividuales;