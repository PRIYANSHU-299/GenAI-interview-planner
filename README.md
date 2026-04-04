# 🤖 GenAI Interview Planner

> AI-powered interview preparation platform that analyzes your resume, self-description, and target job to generate a personalized interview strategy.

**Live Demo:** [gen-ai-interview-planner.vercel.app](https://gen-ai-interview-planner.vercel.app)  
**Built by:** [Priyanshu Rana](https://github.com/PRIYANSHU-299)

---

## ✨ Features

- 🎯 **AI Match Score** — See how well your profile matches the job description
- ❓ **Technical Questions** — Get role-specific technical interview questions with answers
- 🧠 **Behavioral Questions** — Prepare for soft-skill and situational questions
- 📊 **Skill Gap Analysis** — Identify missing skills with severity levels
- 🗓️ **Preparation Roadmap** — Day-by-day personalized study plan
- 📄 **AI Resume Generator** — Download a tailored, ATS-friendly resume PDF
- 🔐 **Secure Authentication** — JWT-based auth with HTTP-only cookies

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React | UI framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| SCSS | Styling |
| Vite | Build tool |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Multer | File uploads |
| pdf-parse | Resume PDF parsing |
| Puppeteer | Resume PDF generation |
| Google Gemini AI | AI report generation |

### Deployment
| Service | Usage |
|---------|-------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key ([get one here](https://aistudio.google.com))

### Clone the repo
```bash
git clone https://github.com/PRIYANSHU-299/GenAI-interview-planner.git
cd GenAI-interview-planner
```

### Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start backend:
```bash
nodemon src/server.js
```

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`  
> Backend runs on `http://localhost:3000`

---

## 📁 Project Structure

```
GenAI-interview-planner/
├── backend/
│   └── src/
│       ├── config/         # DB config
│       ├── controllers/    # Route controllers
│       ├── middlewares/    # Auth & file middleware
│       ├── models/         # Mongoose models
│       ├── routes/         # Express routes
│       ├── services/       # AI service (Gemini)
│       ├── app.js          # Express app setup
│       └── server.js       # Server entry point
│
└── frontend/
    └── src/
        └── Features/
            ├── Auth/       # Login, Register, useAuth
            └── Interview/  # Home, Report, useInterview
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |

---

## 📸 Screenshots

> Add screenshots of your app here

<img width="923" height="889" alt="image" src="https://github.com/user-attachments/assets/0332140d-2710-45b6-a6d2-201be7a9b114" />

<img width="521" height="514" alt="image" src="https://github.com/user-attachments/assets/94fff6a0-f25d-40b5-8274-2597933002bf" />


---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT License — feel free to use this project for your own portfolio!

---

## 👨‍💻 Author

**Priyanshu Rana**  
GitHub: [@PRIYANSHU-299](https://github.com/PRIYANSHU-299)

---

⭐ **If you found this useful, please star the repo!**
