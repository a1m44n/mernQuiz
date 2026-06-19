/* Rapid Fire Quiz - AI Powered
   Features:
   - Multiple question banks (MERN, Java Spring Boot)
   - Inline terminal input — no editor switching
   - Press Enter 3 times to submit, blank to skip
   - AI-powered grading via OpenAI
*/

const OpenAI = require('openai');
const colors = require('colors');
const readline = require('readline');
require('dotenv').config();

// --- CONFIGURATION ---
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// --- QUESTION BANKS ---
const quizBanks = [
    { name: 'MERN Stack',        file: './questions-mern'        },
    { name: 'Java Spring Boot',  file: './questions-springboot'  },
];

// --- QUIZ SELECTOR ---
async function selectQuiz() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '',
        });

        console.log(colors.bold.white('  Select a quiz:\n'));
        quizBanks.forEach((bank, i) => {
            console.log(`  ${colors.cyan(`[${i + 1}]`)}  ${bank.name}`);
        });
        console.log('');

        rl.question(colors.yellow('  > '), (answer) => {
            rl.close();
            const index = parseInt(answer.trim(), 10) - 1;
            if (isNaN(index) || !quizBanks[index]) {
                console.log(colors.red('\n  Invalid choice. Defaulting to MERN Stack.'));
                resolve(quizBanks[0]);
            } else {
                resolve(quizBanks[index]);
            }
        });
    });
}

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

// --- INLINE INPUT ---

// Captures multi-line input from the terminal.
// User types their answer line by line, then types '---' alone on a new line to submit.
// Submitting blank (just '---' with no content) skips the question.
function captureInlineAnswer() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '',
        });

        console.log(colors.cyan('\n  ✏  Type your answer. Press ') + colors.bold.white('Enter 3 times') + colors.cyan(' to submit (submit blank to skip):\n'));

        const lines = [];
        let consecutiveBlanks = 0;

        rl.on('line', (line) => {
            if (line.trim() === '') {
                consecutiveBlanks++;
                if (consecutiveBlanks >= 2) {
                    rl.close();
                } else {
                    lines.push(line); // keep first blank in case it's part of multi-line code
                }
            } else {
                consecutiveBlanks = 0;
                lines.push(line);
            }
        });

        rl.on('close', () => {
            // Strip any trailing blank lines before grading
            while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                lines.pop();
            }
            resolve(lines.join('\n').trim());
        });
    });
}

// --- MAIN LOOP ---

async function runQuiz() {
    console.clear();
    console.log(colors.rainbow("============================================="));
    console.log(colors.bold.white("        RAPID FIRE QUIZ  (AI POWERED)        "));
    console.log(colors.rainbow("=============================================\n"));

    if (!process.env.OPENAI_API_KEY) {
        console.log(colors.red("ERROR: No API Key found in .env file."));
        process.exit(1);
    }

    const selected = await selectQuiz();
    const questions = require(selected.file);

    console.log(colors.gray(`\n  ${questions.length} questions  |  Press Enter 3× to submit  |  Blank = skip\n`));

    try {
        const shuffledQuestions = shuffle(questions);
        let score = 0;
        let attempted = 0;
        let skipped = 0;

        // Track per-stage results for the breakdown
        const stageResults = {};

        for (let i = 0; i < shuffledQuestions.length; i++) {
            const q = shuffledQuestions[i];

            // Init stage tracker on first encounter
            if (!stageResults[q.stage]) {
                stageResults[q.stage] = { correct: 0, total: 0 };
            }

            console.log(`\n${colors.yellow(`Question ${i + 1}/${shuffledQuestions.length}`)} ${colors.gray(`[${q.stage}]`)}`);
            console.log(colors.bold.white(q.question));
            console.log(colors.gray("------------------------------------------------"));

            const userAnswer = await captureInlineAnswer();

            // Blank submission = skip
            if (!userAnswer) {
                skipped++;
                console.log(colors.gray("  — Skipped."));
                console.log(colors.green("  Reference: ") + q.reference);
                console.log(colors.gray("------------------------------------------------"));
                continue;
            }

            attempted++;
            stageResults[q.stage].total++;

            console.log(colors.blue("\n  Checking with AI..."));
            const result = await gradeWithAI(q.question, q.reference, userAnswer);

            if (result.correct) {
                console.log(colors.green.bold("  ✔ CORRECT!"));
                score++;
                stageResults[q.stage].correct++;
            } else {
                console.log(colors.red.bold("  ✘ INCORRECT"));
                console.log(colors.yellow("  Feedback : ") + result.feedback);
                console.log(colors.green("  Reference: ") + q.reference);
            }

            console.log(colors.gray("------------------------------------------------"));
        }

        // --- FINAL SUMMARY ---
        console.log("\n" + colors.rainbow("============================================="));
        console.log(colors.bold.white(`  FINAL SCORE: ${score}/${attempted} answered correctly`));
        if (skipped > 0) {
            console.log(colors.gray(`  (${skipped} question${skipped > 1 ? 's' : ''} skipped)`));
        }
        console.log(colors.rainbow("============================================="));

        // Per-stage breakdown
        console.log(colors.bold.white("\n  Results by stage:\n"));
        for (const [stage, data] of Object.entries(stageResults)) {
            const pct = Math.round((data.correct / data.total) * 100);
            const bar = pct >= 80
                ? colors.green(`${data.correct}/${data.total} (${pct}%)`)
                : pct >= 50
                    ? colors.yellow(`${data.correct}/${data.total} (${pct}%)`)
                    : colors.red(`${data.correct}/${data.total} (${pct}%)`);
            console.log(`  ${colors.gray(stage.padEnd(22))} ${bar}`);
        }
        console.log("");

    } catch (err) {
        console.log(colors.red("\nCRITICAL ERROR: " + err.message));
    }
}

runQuiz();