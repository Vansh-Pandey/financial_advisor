# BudgetBot

**Your AI-Powered Partner for Smarter Financial Decisions**

BudgetBot is a real-time personal finance tracker that uses Fetch AI’s autonomous agents for financial data analysis and Pathway for real-time data processing. It offers users actionable insights into their spending patterns and provides personalized financial advice using an Agentic RAG system.

## Features
- **Real-time Expense Tracking:** Monitor your expenses in real time.
- **AI-Powered Insights:** Get personalized financial tips and recommendations.
- **Interactive Chatbot:** Ask BudgetBot any financial questions and receive relevant answers.
- **User-Friendly Interface:** Intuitive dashboard built with Next.js and Tailwind CSS.

---

## Project Structure
```
📦 BudgetBot
├─ .gitignore
├─ Cache
├─ README.md
├─ ai-agents            # AI agents for financial analysis and RAG
│  ├─ csv_json.py
│  ├─ dummy.csv
│  ├─ enhancer_prompt.py
│  ├─ finance_agent.py
│  ├─ main.py
│  ├─ requrements.txt
│  └─ tempCodeRunnerFile.py
├─ backend               # Backend API built with FastAPI
│  ├─ downloads
│  ├─ main.py
├─ database              # Database setup
│  └─ db_setup.py
├─ frontendfinal         # Frontend with Next.js and Tailwind CSS
│  ├─ app
│  │  ├─ (home)
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.jsx
│  ├─ components
│  │  ├─ Features.jsx
│  │  ├─ Footer.jsx
│  │  └─ ui
│  │     ├─ Hero.jsx
│  │     └─ Navbar.jsx
├─ pathwayfinal          # Pathway implementation for real-time processing
│  ├─ Dockerfile
│  ├─ data
│  ├─ main.py
│  ├─ requirements.txt
│  └─ run.py
└─ utils                 # Utility functions and logging
   ├─ format_data.py
   └─ logger.py
```

---

## Installation

### Prerequisites
- Python 3.12
- Node.js
- Docker

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### AI Agents Setup
```bash
cd ai-agents
pip install -r requrements.txt
python main.py
```

### Pathway Setup
```bash
cd pathwayfinal
pip install -r requirements.txt
docker build -t pathway-app .
docker run -p 8000:8000 pathway-app
```

### Frontend Setup
```bash
cd frontendfinal
npm install
npm run dev
```

---

## Usage
1. Launch the backend, AI agents, and Pathway services.
2. Open the frontend at `http://localhost:3000`.
3. Interact with BudgetBot using the chatbot for financial queries.

---

## Contributing
We welcome contributions! Please submit a pull request or raise an issue if you have suggestions.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

