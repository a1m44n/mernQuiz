/* MERN Stack Quiz - "Rapid Fire" Edition
   Features: 
   - Auto-resume on file close (No "Press Enter" required)
   - Smarter validation (ignores default comments)
   - .js syntax highlighting
*/

const inquirer = require('inquirer');
const OpenAI = require('openai');
const colors = require('colors');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config();

// --- CONFIGURATION ---
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const TEMP_FILENAME = 'answer.js'; 
const DEFAULT_TEXT = '// Type your code below this line...';

// --- RAPID FIRE QUESTION BANK ---
const questions = [
    // STAGE 1: SERVER SETUP
    {
        id: 1,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Write the single line of code used to initialize an Express application instance.",
        reference: "const app = express();"
    },
    {
        id: 2,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Write the code to listen on port 4000 and log a message when ready.",
        reference: `app.listen(4000, () => {\n  console.log('listening on port 4000')\n})`
    },
    {
        id: 3,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Write the command to install `nodemon` globally.",
        reference: "npm install -g nodemon"
    },

    // STAGE 2: DATABASE
    {
        id: 4,
        type: "snippet",
        stage: "Stage 2: Database",
        question: "Write the specific 'mongoose.connect' line using the environment variable 'MONGO_URI'.",
        reference: "await mongoose.connect(process.env.MONGO_URI);"
    },
    {
        id: 5,
        type: "snippet",
        stage: "Stage 2: Database",
        question: "In server.js, what line connects your '/api/notes' endpoint to the 'notesRoutes' file?",
        reference: `app.use("/api/notes", notesRoutes);`
    },

    // STAGE 3: LOGIC & CONTROLLERS
    {
        id: 6,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Write the Schema definition object for a 'title' field that is a String and required.",
        reference: `title: { type: String, required: true }`
    },
    {
        id: 7,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Write the Mongoose command to create a model named 'Note' from a schema named 'noteSchema'.",
        reference: `const Note = mongoose.model("Note", noteSchema);`
    },
    {
        id: 8,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Inside a controller, write the line that actually SAVES a new note instance to the database (assume 'note' is the object).",
        reference: "const savedNote = await note.save();"
    },
    {
        id: 9,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Write the line to export 'getAllNotes' so it can be used in other files.",
        reference: "module.exports = { getAllNotes };"
    },

    // STAGE 4: FRONTEND
    {
        id: 10,
        type: "snippet",
        stage: "Stage 4: Frontend",
        question: "In 'main.jsx', what component must wrap <App /> to enable the router?",
        reference: "<BrowserRouter>"
    },
    {
        id: 11,
        type: "snippet",
        stage: "Stage 4: Frontend",
        question: "Write a Route component for the home path '/' that renders the <HomePage /> component.",
        reference: `<Route path="/" element={<HomePage/>} />`
    },

    // STAGE 5: STYLING
    {
        id: 12,
        type: "snippet",
        stage: "Stage 5: Styling",
        question: "Write the command to initialize a tailwind config file.",
        reference: "npx tailwindcss init -p"
    },
    {
        id: 13,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Write the command to initialize a new 'package.json' file with default settings.",
        reference: "npm init -y"
    },
    {
        id: 14,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Which folder do you create to store your route definitions?",
        reference: "routes"
    },
    {
        id: 15,
        type: "snippet",
        stage: "Stage 1: Backend",
        question: "Write the line to import the 'express' library at the top of a file.",
        reference: "const express = require('express');"
    },

    // STAGE 2: CONFIG & ENV
    {
        id: 16,
        type: "snippet",
        stage: "Stage 2: Database",
        question: "Write the line in your .env file that sets the server port to 5001.",
        reference: "PORT=5001"
    },
    {
        id: 17,
        type: "snippet",
        stage: "Stage 2: Database",
        question: "In 'db.js', what command is used to stop the process if the database connection fails?",
        reference: "process.exit(1);"
    },

    // STAGE 3: LOGIC (CONTROLLERS & ROUTES)
    {
        id: 18,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Write the line to initialize an Express Router instance.",
        reference: "const router = express.Router();"
    },
    {
        id: 19,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "Write the HTTP method function to handle a POST request to the root path '/' inside a router.",
        reference: "router.post('/', createNote);"
    },
    {
        id: 20,
        type: "snippet",
        stage: "Stage 3: Logic",
        question: "In a controller, how do you send a JSON response with a status code of 200?",
        reference: "res.status(200).json(notes)"
    },

    // STAGE 4: FRONTEND LOGIC
    {
        id: 21,
        type: "snippet",
        stage: "Stage 4: Frontend",
        question: "What command do you run to install 'react-router' and 'react-hot-toast'?",
        reference: "npm i react-router react-hot-toast"
    },
    {
        id: 22,
        type: "snippet",
        stage: "Stage 4: Frontend",
        question: "Write the boilerplate arrow function for a component named 'HomePage' and export it.",
        reference: `const HomePage = () => {\n  return <div>HomePage</div>;\n};\nexport default HomePage;`
    },

    // STAGE 5: STYLING & TOOLS
    {
        id: 23,
        type: "snippet",
        stage: "Stage 5: Styling",
        question: "What package do you install to get the 'daisyui' component library?",
        reference: "npm i daisyui@4.12.24 -D"
    },
    {
        id: 24,
        type: "snippet",
        stage: "Stage 5: Styling",
        question: "Write the line to add the 'daisyui' plugin inside the 'tailwind.config.js' plugins array.",
        reference: "require('daisyui')"
    }
];

// --- UTILITIES ---

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function gradeWithAI(question, reference, userAnswer) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                {
                    role: "system",
                    content: `You are a strict code reviewer. 
                    The user is answering "Rapid Fire" snippets.
                    Rules:
                    1. Focus on the SPECIFIC logic requested. 
                    2. If syntax is correct, mark CORRECT.
                    3. Respond ONLY with JSON: { "correct": boolean, "feedback": "brief explanation" }`
                },
                {
                    role: "user",
                    content: `Question: ${question}\n\nReference:\n${reference}\n\nUser Answer:\n${userAnswer}`
                }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("AI Error:", error.message);
        return { correct: false, feedback: "Error connecting to AI judge." };
    }
}

// --- CUSTOM EDITOR HANDLER (BLOCKING) ---
function captureCodeFromEditor() {
    // 1. Create file with default text
    fs.writeFileSync(TEMP_FILENAME, DEFAULT_TEXT);

    console.log(colors.cyan("  >> Opening editor... (Save & Close file to submit)"));

    try {
        // 2. Open editor synchronously (BLOCKS until close)
        // cmd /c ensures it runs correctly in Windows shell
        execSync(`${process.env.EDITOR_CMD} ${TEMP_FILENAME}`, { stdio: 'inherit' });
    } catch (e) {
        console.log(colors.red("Error launching editor. Make sure it is installed and in your PATH."));
    }

    // 3. Read content immediately after close
    let content = "";
    try {
        content = fs.readFileSync(TEMP_FILENAME, 'utf8');
    } catch (e) {
        return "";
    }

    // 4. Cleanup
    try {
        fs.unlinkSync(TEMP_FILENAME);
    } catch (e) { /* ignore */ }

    // 5. Sanitize Answer
    const cleanContent = content.replace(DEFAULT_TEXT, '').trim();
    return cleanContent;
}

// --- EDITOR SETUP ---

async function setupEditor() {
    const { editorChoice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'editorChoice',
            message: 'Select your preferred code editor:',
            choices: [
                // THE KEY FIX: Using 'cmd /c code --wait' ensures Node pauses until the tab closes
                { name: 'VS Code', value: 'cmd /c code --wait' }, 
                { name: 'Notepad', value: 'notepad' }, 
                { name: 'Vim', value: 'vim' },
                { name: 'Nano', value: 'nano' }
            ]
        }
    ]);

    process.env.EDITOR_CMD = editorChoice;
    console.log(colors.cyan(`✔ Editor configured.`));
}

// --- MAIN LOOP ---

async function runQuiz() {
    console.clear();
    console.log(colors.rainbow("============================================="));
    console.log(colors.bold.white("      MERN RAPID FIRE QUIZ (AI POWERED)      "));
    console.log(colors.rainbow("============================================="));
    
    if (!process.env.OPENAI_API_KEY) {
        console.log(colors.red("ERROR: No API Key found in .env file."));
        process.exit(1);
    }

    try {
        await setupEditor();

        const shuffledQuestions = shuffle(questions);
        let score = 0;

        for (let i = 0; i < shuffledQuestions.length; i++) {
            const q = shuffledQuestions[i];
            
            console.log(`\n${colors.yellow("Question " + (i + 1) + "/" + shuffledQuestions.length)} [${q.stage}]`);
            console.log(colors.bold.white(q.question));
            console.log(colors.gray("------------------------------------------------"));

            // Pause to let user read
            await inquirer.prompt([
                { type: 'input', name: 'continue', message: 'Press ENTER to open editor...' }
            ]);

            // Open custom editor (Blocks execution until closed)
            const userAnswer = captureCodeFromEditor();

            if (!userAnswer) {
                console.log(colors.red("No answer provided (or file was blank)."));
                console.log(colors.green("Reference:\n" + q.reference));
                continue;
            }

            console.log(colors.blue("Checking logic..."));
            const result = await gradeWithAI(q.question, q.reference, userAnswer);

            if (result.correct) {
                console.log(colors.green.bold("✔ CORRECT!"));
                score++;
            } else {
                console.log(colors.red.bold("✘ INCORRECT"));
                console.log(colors.yellow("Feedback: " + result.feedback));
                console.log(colors.green("Reference Code:\n" + q.reference));
            }
            
            console.log(colors.gray("------------------------------------------------"));
        }

        console.log("\n=============================================");
        console.log(colors.bold.white(`FINAL SCORE: ${score}/${questions.length}`));
        console.log("=============================================");

    } catch (err) {
        console.log(colors.red("\nCRITICAL ERROR: " + err.message));
    }
}

runQuiz();