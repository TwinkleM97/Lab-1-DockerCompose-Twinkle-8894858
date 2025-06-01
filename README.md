
# Docker Compose Project: Multi-Service Web Application

## Project Overview

This project demonstrates the use of **Docker Compose** to orchestrate multiple services:
- MySQL database with phpMyAdmin GUI
- PostgreSQL database with pgAdmin GUI
- A full-stack web application with:
  - ReactJS frontend (multi-stage build)
  - NodeJS backend API (express.js)
  - MySQL database (for backend data storage)
  - Nginx reverse proxy for load balancing and routing

## 🗂️ Folder Structure

```
.
├── react-node-multistage/
│   ├── backend/
│   ├── frontend/
│   ├── nginx/
│   ├── docker-compose.yml
│   ├── init.sql
│   └── .env
└── postgres-pgadmin/
    ├── docker-compose.yml
    └── .env
```

##  MySQL + phpMyAdmin Setup

- **MySQL** is configured with:
  - User: `myuser`
  - Password: `myuserpass`
  - Database: `mydb`
  - (Alternatively, you can use **root** user with password `rootpass` if preferred.)
- **phpMyAdmin** is available at `http://localhost:8081`
- The `init.sql` file automatically creates the `mydb` database and a `users` table.

Data is persisted in Docker volumes.

---

##  PostgreSQL + pgAdmin Setup

- **PostgreSQL** is configured with:
  - User: `pguser`
  - Password: `pgpass`
  - Database: `pgdb`
- **pgAdmin** is available at `http://localhost:8080`
- Login to pgAdmin with:
  - Email: `admin@example.com`
  - Password: `admin123`

## After logging in to pgAdmin, create a new server connection:

- Name: Postgres
- Host name/address: postgres-db
- Port: 5432
- Maintenance database: pgdb
- Username: pguser
-Password: pgpass

 `pgAdmin` depends on PostgreSQL and is fully configured via `.env`.

---

## Full-Stack Web Application

- ReactJS frontend (multi-stage build)
- NodeJS backend API (connected to MySQL)
- Nginx reverse proxy
- 3 replicas each for frontend and backend for scaling

Access the app at:
- `http://localhost:3000` (frontend)
- `http://localhost:3000/api/users` (backend API endpoint)

---

##  Setup Instructions

1️⃣ Clone the repository:
```bash
git clone https://github.com/TwinkleM97/Lab-1-DockerCompose-Twinkle-8894858.git
cd Lab-1-DockerCompose-Twinkle-8894858
```

2️⃣ Start **PostgreSQL + pgAdmin**:
```bash
cd postgres-pgadmin
docker-compose up -d
```

3️⃣ Start **React + NodeJS + MySQL + phpMyAdmin**:
```bash
cd ../react-node-multistage
docker-compose up -d --build
```

4️⃣ Open in browser:
- `http://localhost:3000` for the React app
- `http://localhost:3000/api/users` for API
- `http://localhost:8081` for phpMyAdmin
- `http://localhost:8080` for pgAdmin

---

## Screenshots

Add screenshots of:
- Docker Compose running (`docker ps`)
- Applications in browser (`localhost:3000`, `/api/users`, `phpMyAdmin`, `pgAdmin`)
- Docker Destop, docker-compose run 

---

## Notes

- `init.sql` auto-creates the `users` table on first MySQL startup.
- For repeated testing, you may need to reset volumes (`docker-compose down -v`).
- React app uses a multi-stage Docker build.
- MySQL credentials: `myuser` / `myuserpass` or `root` / `rootpass`.

---
