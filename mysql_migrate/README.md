# Quick Application Quiz — MySQL edition

A college quiz application with student accounts, admin quiz management, multiple-choice exams, instant answer checking and result tracking. This project uses **MySQL** for persistent storage; MongoDB is not required.

## Quick setup
1. Install Node.js 18+ and MySQL 8+.
2. Run `database/schema.sql` in MySQL Workbench or phpMyAdmin to create the `quick_application_exam` database.
3. Copy `.env.example` to `.env` in the project root and enter your own MySQL credentials and admin login.
4. From the project root run:

```bash
npm install
npm run seed:quizzes
npm run seed:admin
npm run dev
```

5. Open http://localhost:5000.

See [README-MYSQL-SETUP.md](README-MYSQL-SETUP.md) for detailed setup and troubleshooting.
