# Express.js and MongoDB Project Guide

This guide explains how the Octofit Tracker project is organized, what each folder and file does, how the application runs, and the order you would use to create a similar project from the beginning.

## 1. Big Picture

Octofit Tracker is a multi-tier application:

```text
Browser
  -> React frontend on port 5173
  -> Express backend API on port 8000
  -> MongoDB database on port 27017
```

- React displays pages such as users, teams, activities, leaderboard, and workouts.
- Express.js receives API requests from React.
- Mongoose connects Express to MongoDB and gives each collection a schema.
- MongoDB stores the real data.

## 2. Root Folder Purpose

```text
octofit-tracker/
  backend/
  frontend/
```

### backend

The backend is the logic/API tier. It owns the Express server, MongoDB connection, Mongoose models, API routes, and seed data script.

### frontend

The frontend is the presentation tier. It owns the React app, browser routes, page components, API helper functions, and styling.

## 3. Backend Folder and File Purpose

```text
backend/
  package.json
  tsconfig.json
  src/
    index.ts
    server.ts
    config/
      apiUrl.ts
      database.ts
    models/
      Activity.ts
      LeaderboardEntry.ts
      Team.ts
      User.ts
      Workout.ts
    routes/
      activities.ts
      leaderboard.ts
      teams.ts
      users.ts
      workouts.ts
    scripts/
      seed.ts
```

### backend/package.json

Defines the backend package, dependencies, and commands.

Important dependencies:

- `express`: creates the HTTP API server.
- `mongoose`: connects Node.js code to MongoDB.
- `typescript`: lets the backend use TypeScript.
- `ts-node-dev`: runs TypeScript directly during development and restarts on changes.

Important scripts:

```bash
npm --prefix octofit-tracker/backend run dev
npm --prefix octofit-tracker/backend run build
npm --prefix octofit-tracker/backend run seed
```

### backend/tsconfig.json

Configures TypeScript compilation for backend code. It tells TypeScript how to convert files from `src/` into JavaScript output.

### backend/src/index.ts

This is a small entry file:

```ts
import './server';
```

Its only job is to load `server.ts`. In this project, the development script starts `src/server.ts` directly, but `index.ts` still shows the normal idea of an application entry point.

### backend/src/server.ts

This is the main backend startup file. It does these things in order:

1. Imports Express.
2. Imports the database connection file.
3. Imports route files.
4. Creates the Express app.
5. Enables JSON request body parsing with `app.use(express.json())`.
6. Connects route files to API paths such as `/api/users`.
7. Adds a health check at `/api/health`.
8. Starts listening on port `8000`.

Example route mounting:

```ts
app.use('/api/users', usersRouter);
```

That means a browser request to `/api/users` is handled by `routes/users.ts`.

### backend/src/config/database.ts

Connects the backend to MongoDB with Mongoose.

```ts
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
```

This means:

- If `MONGODB_URI` exists, use it.
- Otherwise connect to the local MongoDB database named `octofit_db`.

If MongoDB is not running, this file logs the error and exits the backend process.

### backend/src/models

Models describe the shape of MongoDB documents. Each model normally maps to one MongoDB collection.

For example, `models/User.ts` defines fields such as:

- `username`
- `displayName`
- `email`
- `role`
- `profile.age`
- `profile.fitnessGoal`
- `profile.experienceLevel`

Then it exports the model:

```ts
export const User = model('User', userSchema);
```

The route files use this model to read or write users in MongoDB.

### backend/src/routes

Routes define API endpoints. A route receives an HTTP request and sends an HTTP response.

For example, `routes/users.ts` handles `GET /api/users`:

```ts
router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 }).lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});
```

What happens here:

1. Express receives a `GET /api/users` request.
2. The users route runs.
3. Mongoose asks MongoDB for all users.
4. Results are sorted by `displayName`.
5. Express sends JSON back to the frontend.

### backend/src/scripts/seed.ts

This script inserts sample data into MongoDB. It is useful when you want the app to show users, teams, activities, leaderboard rows, and workout suggestions without manually entering data.

Run it with:

```bash
npm --prefix octofit-tracker/backend run seed
```

## 4. Frontend Folder and File Purpose

```text
frontend/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    api.js
    App.css
    index.css
    styles.css
    components/
      Activities.jsx
      DataPage.jsx
      Leaderboard.jsx
      Teams.jsx
      Users.jsx
      Workouts.jsx
```

### frontend/package.json

Defines the frontend package, dependencies, and commands.

Important dependencies:

- `react`: builds the UI.
- `react-dom`: renders React into the browser.
- `react-router-dom`: handles browser navigation.
- `bootstrap`: provides styling utilities and components.
- `vite`: runs the frontend development server.

Important scripts:

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```

### frontend/index.html

The browser loads this file first. Vite injects the React app into the root HTML element.

### frontend/src/main.jsx

The React entry point. It renders the main React application into the page and usually wraps it with providers such as `BrowserRouter`.

### frontend/src/App.jsx

Defines the main application layout and frontend routes.

It creates navigation links for:

- Activities
- Leaderboard
- Teams
- Users
- Workouts

It also maps browser paths to React components:

```jsx
<Route path="/users" element={<Users />} />
```

### frontend/src/api.js

Contains helper functions for calling the Express API.

Important function:

```js
fetchCollection(resource)
```

This function builds the API URL, calls `fetch`, checks for errors, and returns array data to React components.

### frontend/src/components/DataPage.jsx

Reusable table page component. It fetches one API collection, shows loading/error/empty states, and renders rows in a Bootstrap table.

### frontend/src/components/*.jsx

These files define each page. For example:

- `Users.jsx` tells `DataPage` to load the `users` API resource.
- `Teams.jsx` tells `DataPage` to load the `teams` API resource.
- `Activities.jsx` tells `DataPage` to load the `activities` API resource.

## 5. How One Request Works

Example: opening the Users page.

```text
1. Browser opens React app on port 5173.
2. React route /users loads Users.jsx.
3. Users.jsx uses DataPage.jsx.
4. DataPage.jsx calls fetchCollection('users').
5. api.js sends GET http://localhost:8000/api/users/.
6. Express server.ts has mounted usersRouter at /api/users.
7. routes/users.ts runs User.find().
8. Mongoose queries MongoDB collection for users.
9. MongoDB returns user documents.
10. Express sends JSON back to React.
11. React displays the users in a table.
```

## 6. How to Start This Project

First check whether MongoDB is running:

```bash
ps aux | grep mongod
```

Install backend dependencies:

```bash
npm --prefix octofit-tracker/backend install
```

Install frontend dependencies:

```bash
npm --prefix octofit-tracker/frontend install
```

Seed the database with sample data:

```bash
npm --prefix octofit-tracker/backend run seed
```

Start the backend API:

```bash
npm --prefix octofit-tracker/backend run dev
```

Start the frontend app:

```bash
npm --prefix octofit-tracker/frontend run dev
```

Then open the frontend URL on port `5173`. The frontend will call the backend API on port `8000`.

## 7. Order to Create a Similar Project From Scratch

When starting from an empty folder, create the project in this order.

### Step 1: Create the main app folder

```text
octofit-tracker/
```

This folder holds both tiers: backend and frontend.

### Step 2: Create the backend folder

```text
octofit-tracker/backend/
```

Create `package.json`, install Express, Mongoose, TypeScript, and backend tooling.

### Step 3: Create backend TypeScript config

```text
octofit-tracker/backend/tsconfig.json
```

This makes TypeScript understand how to compile backend files.

### Step 4: Create backend source folders

```text
octofit-tracker/backend/src/
octofit-tracker/backend/src/config/
octofit-tracker/backend/src/models/
octofit-tracker/backend/src/routes/
octofit-tracker/backend/src/scripts/
```

Each folder has one responsibility:

- `config`: setup files such as database connection.
- `models`: Mongoose schemas and models.
- `routes`: Express API endpoints.
- `scripts`: one-off utility scripts such as database seeding.

### Step 5: Create the database connection

```text
octofit-tracker/backend/src/config/database.ts
```

Create this before routes because route handlers need models, and models need a working MongoDB connection when the server runs.

### Step 6: Create the models

```text
octofit-tracker/backend/src/models/User.ts
octofit-tracker/backend/src/models/Team.ts
octofit-tracker/backend/src/models/Activity.ts
octofit-tracker/backend/src/models/LeaderboardEntry.ts
octofit-tracker/backend/src/models/Workout.ts
```

Start with the simplest model, usually `User`, then create models that reference users, such as teams and activities.

### Step 7: Create the routes

```text
octofit-tracker/backend/src/routes/users.ts
octofit-tracker/backend/src/routes/teams.ts
octofit-tracker/backend/src/routes/activities.ts
octofit-tracker/backend/src/routes/leaderboard.ts
octofit-tracker/backend/src/routes/workouts.ts
```

Routes should import models and expose API endpoints. Begin with a simple `GET /` route for each resource.

### Step 8: Create the Express server

```text
octofit-tracker/backend/src/server.ts
```

Create the Express app, load database config, register route files, add health check, and listen on port `8000`.

### Step 9: Create the backend entry file

```text
octofit-tracker/backend/src/index.ts
```

This can simply import `server.ts`.

### Step 10: Create the seed script

```text
octofit-tracker/backend/src/scripts/seed.ts
```

Use the Mongoose models to insert sample data. This helps confirm that schemas and database connection work.

### Step 11: Create the frontend folder

```text
octofit-tracker/frontend/
```

Create the React app with Vite and install React Router and Bootstrap.

### Step 12: Create the frontend entry files

```text
octofit-tracker/frontend/index.html
octofit-tracker/frontend/src/main.jsx
octofit-tracker/frontend/src/App.jsx
```

`main.jsx` starts React. `App.jsx` defines layout and routes.

### Step 13: Create the frontend API helper

```text
octofit-tracker/frontend/src/api.js
```

Keep API URL building and `fetch` logic in one file so components stay simple.

### Step 14: Create reusable frontend components

```text
octofit-tracker/frontend/src/components/DataPage.jsx
```

Build one reusable table/loading/error component before creating many pages.

### Step 15: Create page components

```text
octofit-tracker/frontend/src/components/Users.jsx
octofit-tracker/frontend/src/components/Teams.jsx
octofit-tracker/frontend/src/components/Activities.jsx
octofit-tracker/frontend/src/components/Leaderboard.jsx
octofit-tracker/frontend/src/components/Workouts.jsx
```

Each page should configure `DataPage` with a title, API resource, table columns, and empty message.

## 8. Development Mental Model

When adding a new feature, follow this path:

```text
Database shape
  -> Mongoose model
  -> Express route
  -> React API call
  -> React page/component
```

For example, to add achievements:

1. Create `models/Achievement.ts`.
2. Create `routes/achievements.ts`.
3. Mount it in `server.ts` with `app.use('/api/achievements', achievementsRouter)`.
4. Add a frontend page component such as `Achievements.jsx`.
5. Add a route and navigation link in `App.jsx`.

That is the normal Express plus MongoDB workflow.