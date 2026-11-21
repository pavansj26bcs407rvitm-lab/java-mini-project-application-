const mysql = require('mysql2/promise');
let pool;
async function connectDB() {
  const required = ['DB_HOST','DB_USER','DB_NAME'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) throw new Error(`Missing MySQL settings in .env: ${missing.join(', ')}`);
  pool = mysql.createPool({
    host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER, password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME, waitForConnections: true,
    connectionLimit: 10, queueLimit: 0, charset: 'utf8mb4'
  });
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL, email VARCHAR(190) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, role ENUM('student','admin') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, subject ENUM('OOPS','DSA','PDS','DDCO') NOT NULL,
    description TEXT, instructions TEXT, duration_minutes INT NOT NULL DEFAULT 30,
    pass_percentage DECIMAL(5,2) NOT NULL DEFAULT 40, is_published BOOLEAN NOT NULL DEFAULT FALSE,
    questions JSON NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_quiz_title_subject (title, subject)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS attempts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL, quiz_id BIGINT UNSIGNED NOT NULL,
    answers JSON NOT NULL, score DECIMAL(10,2) NOT NULL, total_marks DECIMAL(10,2) NOT NULL,
    percentage DECIMAL(6,2) NOT NULL, correct_count INT NOT NULL, incorrect_count INT NOT NULL,
    unanswered_count INT NOT NULL, passed BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attempt_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS exam_violations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL, quiz_id BIGINT UNSIGNED NOT NULL,
    reason VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_violation_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_violation_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  console.log('MySQL connected and tables are ready');
  return pool;
}
function db(){ if(!pool) throw new Error('MySQL pool is not initialized'); return pool; }
module.exports = { connectDB, db };
