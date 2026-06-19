/* MERN Rapid Fire - Question Bank
   Add, remove, or edit questions here.
   Each question needs: id, type, stage, question, reference
*/

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

module.exports = questions;