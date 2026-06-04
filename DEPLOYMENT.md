# Deployment Plan: Student Management System (SMS)

This document provides a step-by-step guide to deploying the Student Management System to a production environment.

## 1. Code Transfer to Server
The most professional way to get your code onto a cloud server is using **Git**.

### Step A: Initialize Local Repository (On your Computer)
1.  **Initialize Git:**
    ```bash
    git init
    ```
2.  **Create a .gitignore:**
    Ensure you don't upload `node_modules`, `.jar` files, or sensitive secrets.
3.  **Add and Commit:**
    ```bash
    git add .
    git commit -m "Initial commit of Student Management System"
    ```
4.  **Push to GitHub/GitLab:**
    - Create a private repository on GitHub.
    - Connect your local folder and push:
      ```bash
      git remote add origin https://github.com/your-username/student-management.git
      git branch -M main
      git push -u origin main
      ```

### Step B: Clone to Cloud Server (On your VPS)
1.  **SSH into your server:**
    ```bash
    ssh ubuntu@your-server-ip
    ```
2.  **Clone the code:**
    ```bash
    git clone https://github.com/your-username/student-management.git
    cd student-management
    ```

---

## 2. Infrastructure Requirements
- **Server:** Linux (Ubuntu 22.04 LTS recommended)
- **RAM:** Minimum 2GB (4GB recommended)
- **Disk:** 20GB+
- **Software:**
    - Java 17+ (JRE or JDK)
    - Node.js 18+ & npm
    - PostgreSQL 14+
    - Nginx (Reverse Proxy)

---

## 2. Database Setup (PostgreSQL)
1.  **Install PostgreSQL:**
    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```
2.  **Create Database and User:**
    ```bash
    sudo -u postgres psql
    CREATE DATABASE sms_db;
    CREATE USER sms_user WITH PASSWORD 'your_secure_password';
    GRANT ALL PRIVILEGES ON DATABASE sms_db TO sms_user;
    \q
    ```

---

## 3. Backend Deployment (Spring Boot)
1.  **Build the Application:**
    Navigate to the `backend` folder and run:
    ```bash
    mvn clean package -DskipTests
    ```
2.  **Configure Environment Variables:**
    Instead of hardcoding in `application.properties`, use environment variables:
    ```bash
    export DB_URL=jdbc:postgresql://localhost:5432/sms_db
    export DB_USER=sms_user
    export DB_PASS=your_secure_password
    export JWT_SECRET=your_super_secret_64_char_hex_key
    ```
3.  **Run as a Systemd Service:**
    Create `/etc/systemd/system/sms-backend.service`:
    ```ini
    [Unit]
    Description=SMS Backend Service
    After=syslog.target

    [Service]
    User=ubuntu
    ExecStart=/usr/bin/java -jar /path/to/sms-0.0.1-SNAPSHOT.jar
    SuccessExitStatus=143
    Environment=SPRING_DATASOURCE_URL=${DB_URL}
    Environment=SPRING_DATASOURCE_USERNAME=${DB_USER}
    Environment=SPRING_DATASOURCE_PASSWORD=${DB_PASS}

    [Install]
    WantedBy=multi-user.target
    ```
4.  **Start Service:**
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start sms-backend
    sudo systemctl enable sms-backend
    ```

---

## 4. Frontend Deployment (Angular + Nginx)
1.  **Build the Frontend:**
    Navigate to the `frontend` folder and run:
    ```bash
    npm install
    npm run build --configuration=production
    ```
    This generates files in `frontend/dist/frontend/browser`.
2.  **Configure Nginx:**
    Create `/etc/nginx/sites-available/sms`:
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;

        root /var/www/sms/frontend/dist/frontend/browser;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Proxy API requests to Backend
        location /api/ {
            proxy_pass http://localhost:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```
3.  **Enable Site and Restart Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/sms /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

---

## 5. Dockerized Deployment (Recommended Alternative)
If you have Docker and Docker Compose installed:
1.  **Create a `docker-compose.yml` in the root:**
    ```yaml
    services:
      db:
        image: postgres:15
        environment:
          POSTGRES_DB: sms_db
          POSTGRES_PASSWORD: password
      backend:
        build: ./backend
        ports:
          - "8080:8080"
        depends_on:
          - db
      frontend:
        build: ./frontend
        ports:
          - "80:80"
    ```
2.  **Deploy:**
    ```bash
    docker-compose up -d --build
    ```

---

## 6. Security & Maintenance
- **SSL:** Use Certbot (Let's Encrypt) to enable HTTPS:
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d yourdomain.com
  ```
- **Backups:** Schedule a cron job for `pg_dump` to back up the database daily.
- **Monitoring:** Use `pm2` or `systemctl status` to monitor processes.
