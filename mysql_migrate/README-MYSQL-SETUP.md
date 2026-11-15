# Quick Application Quiz — MySQL edition

This edition uses MySQL (`mysql2`) instead of MongoDB/Mongoose. Student signup/login, admin quiz management, exam checking/submission, results and leaderboard are stored in MySQL. Quiz questions are stored as JSON in the `quizzes.questions` column, while users and attempts are stored in relational tables.

## Requirements
- Node.js 18+
- MySQL 8+ (or compatible MySQL/MariaDB)

## 1. Create the database
Open MySQL Workbench or phpMyAdmin and run `database/schema.sql`. This creates `quick_application_exam`. The backend creates the `users`, `quizzes`, and `attempts` tables automatically on startup.

## 2. Configure credentials
In the project root, copy `.env.example` to `.env`, then set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME and a private JWT_SECRET. Set ADMIN_EMAIL and ADMIN_PASSWORD for the admin account. Never commit or share `.env`.

## 3. Install and seed
Run from the project root:

```bash
npm install
npm run seed:quizzes
npm run seed:admin
npm run dev
```

The quiz seed inserts/updates the four original 10-question subject quizzes and the bundled 100-question OOPS bank. Re-running it updates matching quiz titles instead of duplicating them. Admin seeding creates or updates the configured admin user.

## 4. Open the app
Visit http://localhost:5000. Log in with ADMIN_EMAIL / ADMIN_PASSWORD from `.env`, or register a student account.

## Notes
- This project no longer needs MongoDB Atlas or a MongoDB connection string.
- Questions are stored in the MySQL `quizzes` table as JSON in the `questions` column. This preserves the existing app's nested MCQ structure.
- Existing MongoDB data is not automatically migrated. The seed script repopulates the included four 10-question quizzes plus the 100-question OOPS bank. Existing user accounts and exam attempts must be migrated separately if you need to keep them.
