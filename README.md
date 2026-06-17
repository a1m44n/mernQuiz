# MERN Rapid Fire Quiz (AI-Powered)

An interactive, command-line interface (CLI) quiz application designed to test your **MERN (MongoDB, Express, React, Node.js) Stack** knowledge.

This application poses rapid-fire coding questions spanning server setup, database schema design, backend routes, logic/controllers, styling/Tailwind, and React frontend configurations.

## 🚀 Features

- **Integrated Editor Support:** Automatically prompts and opens your choice of editor (VS Code, Notepad, Vim, Nano) for writing answers.
- **AI Grading/Feedback:** Evaluates your answers against target references using the OpenAI API (`gpt-4o-mini`) for smart and strict syntax/logic review.
- **Colorized Output:** Rich console experience using the `colors` package.
- **Diverse Questions:** Includes 24+ core MERN questions covering all aspects of MERN development.

## 🛠️ Tech Stack & Dependencies

- **Node.js**
- **Inquirer** (for interactive CLI prompts)
- **OpenAI Node SDK** (for AI grading)
- **dotenv** (for environment variables management)
- **colors** (for clean terminal formatting)

## 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/a1m44n/mernQuiz.git
   cd mernQuiz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```

4. **Run the Quiz:**
   ```bash
   node quiz.js
   ```
