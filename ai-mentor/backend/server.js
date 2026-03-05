const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
 
const app = express();
const PORT = process.env.PORT || 5000;

// Gemini Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Helper to get detailed analysis using Gemini
const getAnalysisForProblem = async (text) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "PASTE_YOUR_API_KEY_HERE") {
        // Fallback to static logic if no API key
        return getStaticAnalysis(text);
    }

    const prompt = `You are an elite competitive programming AI mentor.
    Analyze the user's input: '${text}'.
    
    Identify the best algorithmic approaches. You MUST provide at least 4 distinct algorithms. Return EXACTLY this JSON structure:
    {
        "possible_algorithms": [
            {"name": "<Algorithm Name 1>", "type": "<Category>", "time_complexity": "<Time Complexity>", "space_complexity": "<Space Complexity>", "points": ["<Point 1>", "<Point 2>"]},
            {"name": "<Algorithm Name 2>", "type": "<Category>", "time_complexity": "<Time Complexity>", "space_complexity": "<Space Complexity>", "points": ["<Point 1>", "<Point 2>"]},
            {"name": "<Algorithm Name 3>", "type": "<Category>", "time_complexity": "<Time Complexity>", "space_complexity": "<Space Complexity>", "points": ["<Point 1>", "<Point 2>"]},
            {"name": "<Algorithm Name 4>", "type": "<Category>", "time_complexity": "<Time Complexity>", "space_complexity": "<Space Complexity>", "points": ["<Point 1>", "<Point 2>"]}
        ],
        "comparison_reasoning": "<A 1-2 sentence explanation of why the best one is best>",
        "best_algorithm": { 
            "name": "<The name of the absolute best algorithm from the list above>",
            "time_complexity": "<Time Complexity>",
            "space_complexity": "<Space Complexity>",
            "explanation": "<Short explanation>"
        }
    }
    
    Important: Format as raw valid JSON only, no markdown markdown formatting, no codeblocks.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const resText = response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(resText);
    } catch (error) {
        console.error("Gemini Error:", error);
        return getStaticAnalysis(text);
    }
};

const getStaticAnalysis = (text) => {
    const lower = text.toLowerCase();
    // (Existing static logic kept as backup)
    if (lower.includes('shortest path') || lower.includes('graph')) {
        return {
            possible_algorithms: [
                { name: "BFS", type: "Traversal", time_complexity: "O(V + E)", space_complexity: "O(V)", points: ["Shortest path in unweighted", "Uses a queue"] },
                { name: "Dijkstra", type: "Greedy", time_complexity: "O(E log V)", space_complexity: "O(V)", points: ["Pathfinding in weighted", "Optimal for positive weights"] },
                { name: "DFS", type: "Traversal", time_complexity: "O(V + E)", space_complexity: "O(V)", points: ["Cycle detection", "Recursive stack"] },
                { name: "Bellman-Ford", type: "DP", time_complexity: "O(V * E)", space_complexity: "O(V)", points: ["Handles negative weights", "Detects negative cycles"] }
            ],
            comparison_reasoning: "BFS is faster for unweighted cases, but Dijkstra is the global standard for weighted graphs with positive edges.",
            best_algorithm: { name: "Dijkstra", time_complexity: "O(E log V)", space_complexity: "O(V)", explanation: "Standard choice for weighted network paths." }
        };
    }
    // Default fallback
    return {
        possible_algorithms: [
            { name: "Brute Force", type: "Search", time_complexity: "O(N²)", space_complexity: "O(1)", points: ["Check every case", "Simple to code"] },
            { name: "Hash Map Cache", type: "Data Structure", time_complexity: "O(N)", space_complexity: "O(N)", points: ["O(1) lookups", "Speeds up searches"] }
        ],
        comparison_reasoning: "Brute force works for tiny limits, but caching is required for scale.",
        best_algorithm: { name: "Hash Map Cache", time_complexity: "O(N)", space_complexity: "O(N)", explanation: "Immediate caching resolves matching sequence requests safely." }
    };
};

// API Endpoints
app.post('/analyze', async (req, res) => {
    const { problemText } = req.body;
    if (!problemText) return res.status(400).json({ error: "No problem text provided" });
    const analysis = await getAnalysisForProblem(problemText);
    res.json(analysis);
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    try {
        const prompt = `You are a helpful, expert competitive programming mentor. 
        The user is asking: "${message}"
        Provide a concise, educational response. Explain core concepts and complexities. Use Markdown.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        res.status(500).json({ error: "Error contacting AI Mentor" });
    }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../dist')));
app.get("/", (req, res) => {
  res.send("AI System Backend is Running ");
});
// Listen
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\nAI Mentor Backend is active on port ${PORT}!`);
});
