# Full-Stack Private Coaching Platform

A modern, full-stack web application designed for booking and managing one-on-one private coaching sessions. The platform provides secure user authentication, responsive UI/UX, and robust API endpoints.

## 🚀 Technologies Used

### Frontend
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Icons:** Lucide React
* **Deployment:** Vercel (Targeted)

### Backend
* **Framework:** Spring Boot (Java 21)
* **Database:** MySQL (Hosted on Aiven)
* **Security:** Spring Security & JWT (JSON Web Tokens)
* **Deployment:** Render (Targeted)

---

## 🛠️ Local Setup Instructions

### Prerequisites
* Node.js (v18+)
* Java Development Kit (JDK 21)
* Maven
* Git

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure Environment Variables:
   Create a `.env` file in the root of the `backend` directory and add your MySQL database credentials and JWT Secret. (Note: `.env` is ignored by Git).
   ```env
   DB_URL=jdbc:mysql://your-aiven-mysql-url:port/defaultdb?ssl-mode=REQUIRED
   DB_USER=your_db_username
   DB_PASS=your_db_password
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

3. Build and Run the Backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   *The backend will start running on `http://localhost:8080`*

### 2. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Run the Development Server:
   ```bash
   npm run dev
   ```
   *The frontend will start running on `http://localhost:3000`*

---

## 📖 API Documentation

The backend exposes the following RESTful API endpoints. Base URL locally is `http://localhost:8080`.

### Authentication Endpoints

#### 1. User Registration
* **Endpoint:** `/api/auth/register`
* **Method:** `POST`
* **Description:** Registers a new user in the system.
* **Request Body:**
  ```json
  {
    "name": "Saman Kumara",
    "username": "saman",
    "email": "saman@example.com",
    "password": "password123"
  }
  ```
* **Success Response:** `200 OK` (User registered successfully)

#### 2. User Login
* **Endpoint:** `/api/auth/login`
* **Method:** `POST`
* **Description:** Authenticates a user and returns JWT tokens.
* **Request Body:**
  ```json
  {
    "email": "saman@example.com",
    "password": "password123"
  }
  ```
* **Success Response:** `200 OK`
  ```json
  {
    "code": 200,
    "data": {
      "accessToken": "eyJhbGci...",
      "refreshToken": "eyJhbGci..."
    }
  }
  ```

#### 3. Guest Login
* **Endpoint:** `/api/auth/guest`
* **Method:** `POST`
* **Description:** Allows users to log in anonymously as a guest.
* **Success Response:** `200 OK` (Returns JWT access and refresh tokens)

### Protected Endpoints

*Requires Header: `Authorization: Bearer <your_access_token>`*

#### 4. Access Dashboard
* **Endpoint:** `/api/dashboard`
* **Method:** `GET`
* **Description:** Retrieves secure dashboard data for authenticated users.
* **Success Response:** `200 OK` (Dashboard statistics/data)

---

## 🌍 Deployment

* **Frontend:** Configured to be deployed on **Vercel**. Ensure build commands are set to `npm run build` and output directory is `.next`.
* **Backend:** Configured to be deployed on **Render** as a Web Service. Ensure environment variables (`DB_URL`, `DB_USER`, `DB_PASS`, `JWT_SECRET`) are added to the Render Environment dashboard.

Frontend URL - https://coaching-platform-2026.vercel.app/
Backend URL - https://coaching-backend-k0np.onrender.com