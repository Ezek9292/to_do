# To-Do API

A RESTful task management API where users can register, log in, and manage tasks with categories, deadlines, and completion status.

**Features**
- User registration and JWT-based authentication
- CRUD for tasks and categories
- Task search, category filter, and pagination
- Deadline views (today, this week, overdue)
- Task statistics (total, completed, pending)

**Tech Stack**
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth, bcrypt for password hashing

**Requirements**
- Node.js (LTS recommended)
- MongoDB connection string

**Getting Started**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```env
   PORT=5100
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Run the server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5100` (or your configured `PORT`).

**Scripts**
- `npm start` starts the server
- `npm run dev` starts with nodemon

**Authentication**
All `/api/tasks` and `/api/categories` endpoints require a bearer token:
```
Authorization: Bearer <JWT_TOKEN>
```

**API Endpoints**
Base URL: `/api`

Auth
- `POST /auth/register` register a new user
- `POST /auth/login` log in and receive a token

Categories
- `POST /categories` create a category
- `GET /categories` list categories
- `PUT /categories/:id` update a category
- `DELETE /categories/:id` delete a category

Tasks
- `POST /tasks` create a task
- `GET /tasks` list tasks
- `GET /tasks/:id` get a single task
- `PUT /tasks/:id` update a task
- `DELETE /tasks/:id` delete a task
- `PATCH /tasks/:id/toggle` toggle completion
- `GET /tasks/stats` task statistics
- `GET /tasks/overdue` overdue tasks
- `GET /tasks/today` tasks due today
- `GET /tasks/this-week` tasks due this week

**Query Parameters (GET /tasks)**
- `page` page number (default 1)
- `category` category id to filter
- `search` text search on task title (case-insensitive)

Pagination uses a fixed page size of 5.

**Data Shapes**
User (register/login)
```json
{
  "username": "jane",
  "email": "jane@example.com",
  "password": "plain-text-password"
}
```

Task
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "CATEGORY_ID",
  "deadline": "2026-03-23T18:00:00.000Z",
  "completed": false
}
```

Category
```json
{
  "name": "Personal"
}
```

**Project Structure**
- `src/app.js` Express app setup and routes
- `src/server.js` server bootstrap
- `src/config/db.js` MongoDB connection
- `src/controllers/` request handlers
- `src/models/` Mongoose schemas
- `src/routes/` route definitions
- `src/middleware/` auth and error handling

**Notes**
- Root route `GET /` returns a welcome message.
- Deadlines are stored as `Date` and should be sent as ISO 8601 strings.
