# DESAFÍO TÉCNICO .NET

## 🎯 Descripción
Evaluación técnica completa con casos algorítmicos y sistema web full-stack dockerizado.

## 🏗️ Arquitectura
- **Frontend**: React 18 + TypeScript
- **Backend**: .NET 8 Web API
- **Base de datos**: PostgreSQL 15
- **Autenticación**: JWT
- **Containerización**: Docker + Docker Compose

## 🚀 Instrucciones de Ejecución

### Prerequisitos
- Docker y Docker Compose instalados

### Ejecución
```bash
# Clonar/descargar el proyecto
cd desafio-net

# Levantar todos los servicios
docker-compose up --build

# Acceder a las aplicaciones:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# PostgreSQL: localhost:5432
```

### Usuario de prueba
- **Email**: admin@test.com
- **Password**: Admin123!

## 📚 Casos Individuales

### CASO 1: OrderRange.cs
Separa números pares e impares, ordenándolos ascendentemente.
- Input: `[2,1,4,5]`
- Output: `pares=[2,4], impares=[1,5]`

### CASO 2: MoneyParts.cs
Genera todas las combinaciones monetarias para un monto dado.
- Denominaciones: [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200]
- Input: `"0.1"`
- Output: `[[0.05, 0.05], [0.1]]`

## 🌐 Sistema Web

### Backend Endpoints
- `POST /auth/login` - Autenticación
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PUT /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

### Frontend Features
- Login con validación
- Dashboard protegido
- CRUD de usuarios
- Formularios con diferentes tipos de campos

## 🗄️ Base de Datos
- Tabla Users con campos: texto, password, fecha, select, multiselect, checkbox
- Inicialización automática con usuario admin

## 🔧 Tecnologías
- .NET 8
- Entity Framework Core
- PostgreSQL
- React 18
- TypeScript
- JWT Authentication
- Docker & Docker Compose