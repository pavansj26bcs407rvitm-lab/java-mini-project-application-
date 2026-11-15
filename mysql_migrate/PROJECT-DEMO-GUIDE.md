# Quick Application — Project Demonstration Guide

## 1. Start the project

1. Extract the ZIP and open the folder containing `package.json` in VS Code.
2. Keep your existing project-root `.env` file private. It must contain `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. In the VS Code terminal run:

```powershell
npm install
npm run seed:admin
npm run seed:quizzes
npm start
```

4. Open `http://localhost:5000`.

`npm run seed:quizzes` creates or refreshes four published sample quizzes: Quiz1 (OOPS), Quiz2 (DSA), Quiz3 (PDS), Quiz4 (DDCO). Each contains 10 MCQs, 1 mark each, no negative marking, and a 15-minute timer. Re-running the seed updates these four named quizzes rather than creating duplicates.

## 2. Demonstrate the frontend

- `frontend/index.html`: page entry point and app container.
- `frontend/style.css`: layout, colors, responsive design, green correct-answer and red wrong-answer styles.
- `frontend/app.js`: page rendering, login/signup interactions, subject filtering, quiz navigation, answer selection, timer, submit flow, results and API calls.

Suggested demo: welcome page → student login/signup → student dashboard → choose a subject → open Quiz1/Quiz2/Quiz3/Quiz4 → choose a wrong answer and show it in red while the correct answer appears in green → change the selected option → Previous/Next → submit → show result/history.

This is a practice-mode feature: answer feedback is shown immediately. It is not intended for secure, high-stakes examinations because the correct answer is deliberately revealed during the quiz.

## 3. Demonstrate the backend

- `backend/server.js`: creates the Express server, serves frontend files, mounts API routes and connects MongoDB.
- `backend/config/db.js`: connects Mongoose to MongoDB using `MONGODB_URI`.
- `backend/middleware/auth.js`: verifies JWT login tokens and restricts admin-only routes.
- `backend/routes/authRoutes.js`: signup, login and current-user API endpoints.
- `backend/routes/quizRoutes.js`: list published quizzes, fetch quiz details, and admin create/update/delete/publish operations.
- `backend/routes/resultRoutes.js`: check selected answers, submit attempts, calculate scores, retrieve student history, admin results and leaderboard.
- `backend/models/User.js`: user schema.
- `backend/models/Quiz.js`: quiz and MCQ schema.
- `backend/models/Attempt.js`: saved student attempt and result schema.
- `backend/seedAdmin.js`: creates/updates the configured admin account.
- `backend/seedQuizzes.js`: seeds the four demo quizzes.

Explain the request flow: browser JavaScript sends an HTTP request to `/api/...`; Express route validates the request and user; Mongoose reads/writes MongoDB; Express returns JSON; frontend updates the page.

## 4. Demonstrate MongoDB Atlas

1. Open MongoDB Atlas → your project → Cluster0 → Browse Collections.
2. Expand the database whose name is in your `MONGODB_URI` (the part after the host and before `?`; if omitted, MongoDB/Mongoose may use the default database).
3. Show these collections after running the app and saving records:
   - `users`: registered students and admin accounts. Passwords are hashed; never display or share credentials.
   - `quizzes`: Quiz1, Quiz2, Quiz3, Quiz4 and their questions/options/correct-answer indexes.
   - `attempts`: submitted student answers, score, total marks, percentage, correct/incorrect/unanswered counts and pass status.
4. If a collection is missing, first check that `.env` points to the same Atlas cluster/database and that you have signed up, seeded quizzes, and submitted a quiz. Collections appear when documents are first inserted.

Do not share `.env`, MongoDB connection strings, database passwords, JWT secrets, or student private information in screenshots.

## 5. OOPS explanation — be accurate

This application is written in JavaScript/Node.js, not Java. It uses Mongoose schemas/models to organize and validate data and functions/modules to separate responsibilities. Do not claim that all four Java OOPS pillars are explicitly implemented as Java classes. Explain the Java OOPS principles separately with your Java lab examples if asked.

## 6. Limitations to mention honestly

The answer-check API reveals the correct option during practice mode. The timer currently runs in the browser and is not a server-enforced deadline. This is a college learning/demo project, not a secure high-stakes assessment system.
