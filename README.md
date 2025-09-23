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
- **Docker y Docker Compose** instalados ([Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/))

### Ejecución rápida (solo Docker)
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

### 🖥️ Ejecución por Línea de Comandos

#### Prerequisitos para desarrollo local
- **.NET 8 SDK** instalado ([Descargar aquí](https://dotnet.microsoft.com/download/dotnet/8.0))
- **Git** (opcional, para clonar)

#### Comandos disponibles

**Opción 1: Usando dotnet directamente**
```bash
# Navegar al directorio de casos individuales
cd casos-individuales

# Ejecutar OrderRange con números personalizados
dotnet run orderrange 5,2,8,1,9,4
dotnet run or 10,15,20,25,30

# Ejecutar MoneyParts con montos personalizados
dotnet run moneyparts 0.15
dotnet run mp 1.5
dotnet run mp 2.3

# Ejecutar todos los casos de prueba predefinidos
dotnet run test

# Mostrar ayuda
dotnet run help
```

**Opción 2: Usando scripts (desde la raíz del proyecto)**
```bash
# Windows
test-casos.bat orderrange 5,2,8,1,9,4
test-casos.bat moneyparts 0.15
test-casos.bat test

# Linux/Mac
./test-casos.sh orderrange 5,2,8,1,9,4
./test-casos.sh moneyparts 0.15
./test-casos.sh test
```

#### Ejemplos de uso
```bash
# Ejemplo 1: OrderRange
$ dotnet run orderrange 12,7,3,18,5,9
=== CASO 1: OrderRange ===
Input: [12, 7, 3, 18, 5, 9]
Pares: [12, 18]
Impares: [3, 5, 7, 9]

# Ejemplo 2: MoneyParts
$ dotnet run moneyparts 0.25
=== CASO 2: MoneyParts ===
Monto: 0.25
Denominaciones disponibles: [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200]
Combinaciones encontradas: 4
Todas las combinaciones:
  1: [0.05, 0.05, 0.05, 0.05, 0.05]
  2: [0.05, 0.05, 0.05, 0.1]
  3: [0.05, 0.2]
  4: [0.1, 0.1, 0.05]
```

#### Notas importantes
- Para **MoneyParts**, usa valores menores o iguales a 5 para evitar timeouts
- Valores sugeridos: 0.15, 0.25, 0.5, 1, 1.5, 2, 3, 5
- Para **OrderRange**, puedes usar cualquier cantidad de números enteros

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