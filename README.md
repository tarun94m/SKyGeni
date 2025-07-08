# 📊 Sales Dashboard (React + D3 + Node.js)

This full-stack web dashboard visualizes sales and revenue data across multiple dimensions including:

- Customer Type
- Sales Team
- Industry
- ACV Range

Built with:

- **Frontend:** React.js + TypeScript + Material UI + D3.js
- **Backend:** Node.js + Express + TypeScript

---

## 📸 Screenshot

> Add a screenshot of your running dashboard here

```
📍 Screenshot Placeholder
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sales-dashboard.git
cd sales-dashboard
```

### 2. Setup Backend (Node.js)

```bash
cd backend
npm install
npx ts-node server.ts
```

- The backend will start at: `http://localhost:5000`
- APIs:
  - `/api/customer-type`
  - `/api/account-industry`
  - `/api/team`
  - `/api/acv-range`

### 3. Setup Frontend (React.js)

```bash
cd frontend
npm install
npm start
```

- The frontend will launch at: `http://localhost:3000`
- Navigate to pages:
  - `/customer`
  - `/team`
  - `/industry`
  - `/acv-range`

---

## 📂 Project Structure

```
backend/
  ├── data/                     // JSON source data
  └── server.ts                // Express server
frontend/
  └── src/
      ├── components/          // Reusable chart and card components
      ├── api/                 // Axios API layer
      └── App.tsx             // Routed dashboard layout
```

---

## 📊 Charts Used

- **Bar Chart:** Revenue or count by category
- **Doughnut Chart:** Share of ACV by customer type

---

## 🧩 Dependencies

### Backend:

- express
- cors
- typescript

### Frontend:

- react
- react-router-dom
- @mui/material
- d3
- axios

---

## ✅ To Do (Optional Enhancements)

- [ ] Export charts to PNG/SVG
- [ ] Add legends and tooltips
- [ ] Add authentication for admin view
- [ ] Deploy to Vercel / Render

---

## 👤 Author

- GitHub: [your-username](https://github.com/your-username)

---

## 📄 License

MIT License
