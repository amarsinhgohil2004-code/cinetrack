# 🎬 CineTrack

CineTrack is a full-stack MERN web application that helps users manage their personal movie watchlist. Users can register, log in, add movies, edit movie details, mark movies as watched, and delete movies. Each user's data is securely stored and accessible only to their account.

## 🚀 Features

- 🔐 User Authentication (Register & Login using JWT)
- 🎥 Add new movies
- ✏️ Edit movie details
- 🗑️ Delete movies
- ✅ Mark movies as watched
- 🔍 Search movies
- 🎭 Filter by genre
- 📊 Sort by name, year, and rating
- 📈 Dashboard with movie statistics
- 📱 Fully responsive UI
- 🔒 Protected routes
- 🔔 Toast notifications
- ☁️ MongoDB Atlas database

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
cinetrack/
│
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── ...
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/cinetrack.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📷 Screenshots

Add screenshots here after deployment.

### Home

![Home](screenshots/home.png)

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

## 🌐 Live Demo

Frontend:

```
https://your-vercel-link.vercel.app
```

Backend API:

```
https://your-render-link.onrender.com
```

---

## 👨‍💻 Author

**Amarsinh Gohil**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

## 📄 License

This project is developed for educational purposes and personal portfolio.
