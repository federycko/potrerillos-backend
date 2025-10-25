# 🏔️ Potrerillos CMS - Backend

Sistema de gestión de contenidos para el sitio web del Dique Potrerillos, Mendoza.

## 🚀 Características

- **CMS Headless** con Strapi v5
- **Base de datos** PostgreSQL 15
- **Caché** con Redis 7

## 📋 Prerequisitos

- Docker Desktop
- Node.js 20+ (opcional, para desarrollo sin Docker)
- Git

## 🛠️ Instalación Local

### Con Docker (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/potrerillos-backend.git
cd potrerillos-backend

# 2. Copiar archivo de entorno
cp .env.example .env

# 3. Editar .env con tus valores
nano .env

# 4. Construir e iniciar servicios
docker-compose up -d

# 5. Verificar estado de los servicios
docker-compose ps

# 6. Ver logs (opcional)
docker-compose logs -f
```

## 🌐 Acceso al servicio

Después de iniciar los contenedores, espera aproximadamente 2 minutos para que todos los servicios estén listos:

| Servicio | URL | Puerto | Descripción |
|----------|-----|--------|-------------|
| **Strapi Admin** | http://localhost:1337/admin | 1337 | Panel de administración CMS |
| **Strapi API** | http://localhost:1337/api | 1337 | API REST de Strapi |
| **PostgreSQL** | localhost:5432 | 5432 | Base de datos |
| **Redis** | localhost:6380 | 6380 | Sistema de caché |

### Credenciales por defecto

**PostgreSQL:**
- Sistema: PostgreSQL
- Servidor: postgres
- Usuario: `dev_user`
- Contraseña: `dev_password`
- Base de datos: `potrerillos_dev`

**Strapi:**
- Crear cuenta de administrador en el primer acceso: http://localhost:1337/admin

## 🐳 Arquitectura de contenedores

El proyecto utiliza 3 contenedores Docker:

1. **postgres** (`potrerillos_db`): Base de datos PostgreSQL 15 Alpine
2. **redis** (`potrerillos_redis`): Sistema de caché Redis 7 Alpine
3. **strapi** (`potrerillos_strapi`): Backend CMS Strapi

## 🔧 Comandos útiles

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs de un servicio específico
docker-compose logs -f strapi

# Reconstruir contenedores
docker-compose build --no-cache

# Reiniciar un servicio
docker-compose restart strapi

# Acceder a la shell de un contenedor
docker exec -it potrerillos_strapi sh

# Limpiar todo (⚠️ elimina volúmenes)
docker-compose down -v
```

## 📂 Estructura del proyecto

```
potrerillos-backend/
├── config/               # Configuración de Strapi
├── src/                  # Código fuente del backend
├── public/               # Archivos públicos
├── database/             # Scripts de base de datos
├── types/                # Tipos generados
├── Dockerfile            # Dockerfile para producción
├── Dockerfile.dev        # Dockerfile para desarrollo
├── docker-compose.yml    # Orquestación de contenedores
├── .env                  # Variables de entorno
└── README.md
```

## 🚀 Deployment en Producción (Raspberry Pi)

### Opción 1: Docker

1. Copiar el repositorio a la Raspberry Pi:
```bash
git clone https://github.com/tu-usuario/potrerillos-backend.git
cd potrerillos-backend
```

2. Configurar variables de entorno:
```bash
cp .env.production.example .env.production
# Editar .env.production con tus valores de producción
```

3. Construir y ejecutar con Docker:
```bash
# Construir imagen
docker build -t potrerillos-backend .

# Ejecutar contenedor
docker run -d \
  --name potrerillos-backend \
  --env-file .env.production \
  -p 1337:1337 \
  potrerillos-backend
```

### Opción 2: Docker Compose

1. Configurar el archivo [docker-compose.prod.yml](file:///home/fgallo/projects/cms-diquepotrerillos/CMS-Dique-Potrerillos/backend/docker-compose.prod.yml):
```yaml
version: '3.8'

services:
  strapi:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: potrerillos_strapi
    restart: unless-stopped
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 1337
      
      # Configura estas variables según tu entorno
      DATABASE_CLIENT: postgres
      DATABASE_HOST: your-db-host
      DATABASE_PORT: 5432
      DATABASE_NAME: your-db-name
      DATABASE_USERNAME: your-db-user
      DATABASE_PASSWORD: your-db-password
      DATABASE_SSL: false
      
      APP_KEYS: your-production-app-keys
      API_TOKEN_SALT: your-api-token-salt
      ADMIN_JWT_SECRET: your-admin-jwt-secret
      TRANSFER_TOKEN_SALT: your-transfer-token-salt
      JWT_SECRET: your-jwt-secret

      ADMIN_ALLOWED_HOSTS: your-domain.com,www.your-domain.com
      PUBLIC_URL: https://your-domain.com
      FRONTEND_URL: https://your-frontend-domain.com
    ports:
      - "1337:1337"
    volumes:
      - strapi_uploads:/app/public/uploads
    networks:
      - potrerillos_network

volumes:
  strapi_uploads:

networks:
  potrerillos_network:
    driver: bridge
```

2. Ejecutar con Docker Compose:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Configuración de producción

Para producción, asegúrate de:

1. Cambiar todas las claves y secretos:
   - `APP_KEYS`
   - `API_TOKEN_SALT`
   - `ADMIN_JWT_SECRET`
   - `TRANSFER_TOKEN_SALT`
   - `JWT_SECRET`

2. Actualizar `ADMIN_ALLOWED_HOSTS` con tus dominios reales

3. Usar contraseñas seguras para la base de datos

4. Configurar SSL si es necesario

## 🩺 Health Checks

Los servicios incluyen health checks automáticos:

- **PostgreSQL**: Verifica cada 10s con `pg_isready`
- **Redis**: Verifica cada 10s con `redis-cli ping`

Los servicios dependientes esperan a que estos checks pasen antes de iniciarse.

## 🐛 Troubleshooting

### Los servicios no inician
```bash
# Ver logs detallados
docker-compose logs

# Verificar health checks
docker-compose ps
```

### Strapi no conecta a PostgreSQL
```bash
# Verificar que PostgreSQL esté saludable
docker-compose ps postgres

# Revisar logs de PostgreSQL
docker-compose logs postgres
```

## 📝 Notas de desarrollo

- Los volúmenes de desarrollo están montados para hot-reload
- `node_modules` se gestiona dentro del contenedor
- Los uploads de Strapi se persisten en volumen `strapi_uploads`
- PostgreSQL y Redis usan volúmenes nombrados para persistencia

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contacto

Proyecto Dique Potrerillos - [@tu-usuario](https://github.com/tu-usuario)