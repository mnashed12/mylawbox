# MyLawBox - React + Django Full Stack

A simple full-stack web application with React frontend and Django backend.

## Quick Start

### 1. Start Frontend (React)
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### 2. Start Backend (Django)
Open a new terminal:
```bash
cd backend
python manage.py runserver
```
Backend runs on: http://localhost:8000

---

## Project Structure

```
mylawbox/
├── backend/          # Django REST API
│   ├── api/          # API app
│   ├── backend/      # Django settings
│   └── manage.py
└── frontend/         # React application
    ├── public/
    └── src/
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Setup Instructions

### Backend (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (if not already done):
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   source .venv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at `http://localhost:8000`

### Frontend (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Features

- **Backend**: Django REST Framework API with a simple "hello" endpoint at `/api/hello/`
- **Frontend**: React application that fetches and displays data from the backend
- **CORS**: Configured to allow communication between frontend and backend

## API Endpoints

- `GET /api/hello/` - Returns a greeting message from the backend

## Development

Both servers need to be running simultaneously:
- Django backend on port 8000
- React frontend on port 3000

The React app is configured to make API calls to the Django backend.

## Technologies Used

### Backend
- Django 4.2.9
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1

### Frontend
- React 18.2.0
- React Scripts 5.0.1

## License

This project is open source and available under the MIT License.
