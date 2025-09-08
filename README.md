

---

```markdown
# 🏠 Bete Real Estate Platform

**Bete** is a full-stack real estate platform that connects property owners, agents, and customers.  
It provides property listings, search & filtering, chat with agents, and role-based access control for admins, owners, and team members.  

This repository is a **monorepo** containing both the backend and frontend:

```

Bete/
├── backend/   # API + database (deployed on Render)
└── frontend/  # User interface (deployed on Vercel)

```

---

## 🚀 Features
- 🔑 Role management: Admins, Owners, Team Members with permissions  
- 🏘 Property CRUD: Add, update, delete property listings  
- 🔍 Advanced search & filtering for customers  
- 💬 Real-time chat between customers and agents  
- 📊 Reports & analytics for admins  
- 🔒 Secure authentication & authorization  

---

## 🛠️ Tech Stack
- **Frontend:** React , TailwindCSS → deployed on **Vercel**  
- **Backend:** Django , PostgreSQL → deployed on **Render**  
- **Database & Caching:** PostgreSQL, Redis  
- **Version Control:** Git & GitHub (monorepo structure)  

---

## 📂 Repository Structure
```

Bete/
├── backend/       # Backend source code
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/      # Frontend source code
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md

````

---

## ⚙️ Local Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/siyanet/BeteRealstateLiting.git
cd Bete
````

### 2️⃣ Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
source venv/bin/activate   # On Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs on 👉 `http://localhost:8000`

---

### 3️⃣ Frontend (React/Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

Runs on 👉 `http://localhost:5173`

---

## 🌐 Deployment

* **Frontend** → Vercel (root directory: `frontend/`)
* **Backend** → Render (root directory: `backend/`)

---

## 👥 Authors

* [@siyanet](https://github.com/siyanet)

---

```

---


