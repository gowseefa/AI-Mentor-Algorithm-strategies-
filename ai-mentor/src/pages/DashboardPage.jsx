import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DashboardPage.css';

// --- MAIN LAYOUT COMPONENT ---
const DashboardPage = () => {
    // We use location to determine which sub-page to show
    // This allows exact routing like /history, /chat while reusing the Layout
    // fallback to /dashboard if unknown (since App.jsx might route here indiscriminately)
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className="layout-container">
            {/* LEFT SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-title">AI Mentor</div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className={`sidebar-link ${path === '/dashboard' || path === '/' ? 'active' : ''}`}>
                        <span>📊</span> Dashboard
                    </Link>
                    <Link to="/history" className={`sidebar-link ${path === '/history' ? 'active' : ''}`}>
                        <span>📜</span> Previous Problems
                    </Link>
                    <Link to="/chat" className={`sidebar-link ${path === '/chat' ? 'active' : ''}`}>
                        <span>💬</span> AI Mentor
                    </Link>
                    <Link to="/quiz" className={`sidebar-link ${path === '/quiz' ? 'active' : ''}`}>
                        <span>🧠</span> Algorithm Quiz
                    </Link>
                    <Link to="/performance" className={`sidebar-link ${path === '/performance' ? 'active' : ''}`}>
                        <span>📈</span> Performance Insights
                    </Link>
                </nav>

                <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
                    {user && (
                        <div className="user-profile" style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '0.25rem' }}>Active Session</div>
                            <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)' }}>{user.name}</div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="sidebar-link"
                        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9ca3af', fontWeight: '600' }}
                    >
                        <span>🚪</span> Log Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="main-content">
                {(path === '/dashboard' || path === '/') && <AnalysisView />}
                {path === '/history' && <HistoryView />}
                {path === '/chat' && <ChatView />}
                {path === '/quiz' && <QuizView />}
                {path === '/performance' && <PerformanceView />}
            </main>
        </div>
    );
};

// --- SUB-PAGE COMPONENTS ---

// 1. Dashboard Analysis View
const AnalysisView = () => {
    const [problemStatement, setProblemStatement] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const getAnalysisForKeyword = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('shortest path')) {
            return {
                possible_algorithms: [
                    {
                        name: "Breadth-First Search (BFS)", type: "Graph", time_complexity: "O(V + E)", space_complexity: "O(V)",
                        points: [
                            "What it does: Explores all nodes layer by layer using a queue.",
                            "Why it works: Easily finds the shortest path without needing edge weights by counting level layers.",
                            "Works best: Unweighted graphs or grids where each movement costs exactly the same.",
                            "Inefficient: Completely unreliable if pathways have varying weight factors."
                        ]
                    },
                    {
                        name: "Dijkstra's Algorithm", type: "Graph", time_complexity: "O(E log V)", space_complexity: "O(V)",
                        points: [
                            "What it does: Finds the shortest path by continuously selecting the nearest reachable node.",
                            "Why it works: Safely locks in distances guaranteeing minimal accumulation without backward steps.",
                            "Works best: General routing/graph networks with varying positive distances and weights.",
                            "Inefficient: Fails entirely if any negative paths exist; overkill for unweighted grids."
                        ]
                    },
                    {
                        name: "Bellman-Ford Algorithm", type: "Graph", time_complexity: "O(V × E)", space_complexity: "O(V)",
                        points: [
                            "What it does: Relaxes and recalculates every single edge V-1 times.",
                            "Why it works: Corrects paths repeatedly ensuring negative edge discounts are accounted for.",
                            "Works best: Financial/Network graphs containing negative weights or cost benefits.",
                            "Inefficient: Extremely slow on dense graphs; overkill for standard shortest path tests."
                        ]
                    },
                    {
                        name: "Floyd-Warshall Algorithm", type: "Graph / DP", time_complexity: "O(V³)", space_complexity: "O(V²)",
                        points: [
                            "What it does: Compares every possible path between all pairs of nodes using a matrix.",
                            "Why it works: Dynamically builds the shortest paths by trying to route through every intermediate node.",
                            "Works best: When you explicitly need distances between EVERY pair of nodes instantly.",
                            "Inefficient: Triggers catastrophic time limits when the graph has over 500 nodes."
                        ]
                    }
                ],
                comparison_reasoning: "BFS is your absolute first choice if edges are unweighted. Dijkstra covers 95% of standard weight problems. Bellman handles negative anomalies, while Floyd is specifically an 'all-pairs' solution matrix.",
                best_algorithm: { name: "Dijkstra's Algorithm", time_complexity: "O(E log V)", space_complexity: "O(V)", explanation: "Standard competitive problems heavily utilize distinct positive weights prioritizing logarithmic priority queues." }
            };
        } else if (lower.includes('subset')) {
            return {
                possible_algorithms: [
                    {
                        name: "Brute Force / Backtracking", type: "Search", time_complexity: "O(2^N)", space_complexity: "O(N)",
                        points: [
                            "What it does: Chooses to literally include or exclude each element generating every mathematical combination.",
                            "Why it works: Tests absolutely every possibility ensuring no valid subset is missed.",
                            "Works best: Very small constraint environments (N < 20).",
                            "Inefficient: Faces catastrophic exponential explosion rendering it useless for mid-size arrays."
                        ]
                    },
                    {
                        name: "0/1 Knapsack (Dynamic Prog)", type: "DP", time_complexity: "O(N × W)", space_complexity: "O(W)",
                        points: [
                            "What it does: Memoizes previous valid sum accumulations in an array rather than recomputing them.",
                            "Why it works: Subsets with identical sums overlap; this saves those overlapping states globally.",
                            "Works best: Standard constrained constraints where target sum (W) easily fits in memory limits.",
                            "Inefficient: Fails severely if the target Sum itself approaches over ten million digits."
                        ]
                    },
                    {
                        name: "Meet in the Middle", type: "Search / Array", time_complexity: "O(N × 2^(N/2))", space_complexity: "O(2^(N/2))",
                        points: [
                            "What it does: Divides the dataset purely in half, processes both exponentially, then merges answers via searching.",
                            "Why it works: Halving an exponent massively reduces the workload payload (e.g. 2^20 vs 2^40).",
                            "Works best: Medium sized inputs strictly bounding ~40 elements where DP arrays max out memory.",
                            "Inefficient: Still fundamentally exponential; useless for massive sequences."
                        ]
                    },
                    {
                        name: "Greedy Strategy", type: "Greedy", time_complexity: "O(N log N)", space_complexity: "O(1)",
                        points: [
                            "What it does: Sorts arrays initially and accumulates the largest pieces directly without planning.",
                            "Why it works: Simple arithmetic accumulation quickly filters simple combinations.",
                            "Works best: Variations analyzing basic fractions or easily mathematically divisible arrays.",
                            "Inefficient: Fundamentally fails pure subset-sum math puzzles requiring exact integer matches."
                        ]
                    }
                ],
                comparison_reasoning: "Backtracking guarantees exactness but chokes quickly. DP scales safely against values instead of array lengths. Meet-in-the-Middle hacks moderate lengths lacking DP memory limits.",
                best_algorithm: { name: "0/1 Knapsack (DP)", time_complexity: "O(N × W)", space_complexity: "O(W)", explanation: "Standard competitive platforms strictly balance sum targets safely inside DP dimensions ensuring O(N×W) executes cleanly." }
            };
        } else {
            return {
                possible_algorithms: [
                    {
                        name: "Brute Force Iteration", type: "Search", time_complexity: "O(N²)", space_complexity: "O(1)",
                        points: [
                            "What it does: Checks every single element against every other element using nested loops.",
                            "Why it works: Explores the complete dataset ensuring no relationships go unchecked.",
                            "Works best: Tiny constraints (N < 1000) where rapid code completion is vital.",
                            "Inefficient: Automatically timeouts when array lengths hit 10^5 causing millions of operations."
                        ]
                    },
                    {
                        name: "Sorting + Binary Search", type: "Search", time_complexity: "O(N log N)", space_complexity: "O(1)",
                        points: [
                            "What it does: Re-orders the data completely and halves the search space repetitively looking for pairs.",
                            "Why it works: Sorted data lets you mathematically skip scanning thousands of irrelevant numbers.",
                            "Works best: Elements lack specific index locations permitting sorting manipulations.",
                            "Inefficient: Useless if preserving the original array locations exactly is required for the puzzle."
                        ]
                    },
                    {
                        name: "Two Pointers Technique", type: "Greedy / Array", time_complexity: "O(N)", space_complexity: "O(1)",
                        points: [
                            "What it does: Keeps two tracker fingers (start/end) and squeezes them together based on logic conditions.",
                            "Why it works: Avoids moving backwards through the array, guaranteeing exactly one linear pass.",
                            "Works best: Sorted input variables seeking paired targets or validating bounded subarrays.",
                            "Inefficient: Extremely rigid; fails if data is strictly unsorted and relationships jump widely randomly."
                        ]
                    },
                    {
                        name: "Hash Map Cache", type: "Data Structure", time_complexity: "O(N)", space_complexity: "O(N)",
                        points: [
                            "What it does: Remembers everything seen previously in a dictionary/map matching instantly (O(1)).",
                            "Why it works: Converts search time strictly into memory consumption ensuring immediate lookups.",
                            "Works best: Target tracking (e.g. Two Sum) specifically operating on chaotic unsorted integers.",
                            "Inefficient: Consumes heavy memory and fails if dictionary hashing suffers massive internal collisions."
                        ]
                    }
                ],
                comparison_reasoning: "Brute forcing easily checks limits. Standard sorting scales search speeds flawlessly but Hash Maps completely destroy time constraints securely sacrificing memory.",
                best_algorithm: { name: "Hash Map Cache", time_complexity: "O(N)", space_complexity: "O(N)", explanation: "Memory is heavily abundant in competitive tests; immediately caching results linearly resolves 99% of matching sequence requests safely." }
            };
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!problemStatement.trim()) return;
        setIsAnalyzing(true);

        console.log("Sending request to /analyze with:", problemStatement);

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problemText: problemStatement })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server returned ${response.status}`);
            }

            const result = await response.json();
            console.log("Received result:", result);

            setAnalysisResult(result);
            setIsAnalyzing(false);

            // Save to local storage for History page
            const history = JSON.parse(localStorage.getItem('algoHistory') || '[]');
            const newItem = {
                id: Date.now(),
                title: problemStatement.substring(0, 40) + "...",
                fullText: problemStatement,
                algo: result.best_algorithm.name,
                fullResult: result,
                date: new Date().toLocaleDateString()
            };
            localStorage.setItem('algoHistory', JSON.stringify([newItem, ...history].slice(0, 5)));

            // Update performance stats
            const stats = JSON.parse(localStorage.getItem('algoStats') || '{"total":0}');
            localStorage.setItem('algoStats', JSON.stringify({ ...stats, total: (stats.total || 0) + 1 }));

        } catch (err) {
            console.error("API Error:", err);
            setIsAnalyzing(false);
            alert(`Error: ${err.message}. Please make sure the backend is running command: 'node backend/server.js'`);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="page-header">
                <h1>Algorithm Strategy Finder</h1>
            </div>
            <div style={{ maxWidth: '850px', margin: '0 auto 4rem auto' }}>
                <form onSubmit={handleAnalyze} className="dashboard-form">
                    <textarea
                        className="strategy-textarea"
                        placeholder="Paste your programming problem here..."
                        value={problemStatement}
                        onChange={(e) => setProblemStatement(e.target.value)}
                        style={{ background: 'var(--bg-card)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', border: '1px solid var(--border)' }}
                    />
                    <button type="submit" className="btn-primary" disabled={isAnalyzing} style={{ padding: '0.9rem', fontSize: '1.1rem' }}>
                        {isAnalyzing ? 'Decoding logical patterns...' : 'Find Strategies'}
                    </button>
                </form>
            </div>

            {analysisResult && (
                <div className="analysis-results">
                    <div className="section-title">Possible Strategies</div>
                    <div className="cards-grid">
                        {analysisResult.possible_algorithms.map((algo, i) => {
                            const isRecommended = algo.name === analysisResult.best_algorithm.name;
                            return (
                                <div className={`compact-card ${isRecommended ? 'recommended-card' : ''}`} key={i}>
                                    {isRecommended && <div className="rec-badge">RECOMMENDED</div>}
                                    <span className="compact-badge">{algo.type}</span>
                                    <h3>{algo.name}</h3>
                                    <div className="compact-stats">
                                        <span className="compact-complexity">⏳ {algo.time_complexity}</span>
                                        <span className="compact-complexity">💾 {algo.space_complexity}</span>
                                    </div>
                                    <div className="compact-content">
                                        <ul className="desc-points">
                                            {algo.points.map((pt, j) => <li key={j}>{pt}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="section-title">Final Recommendation</div>
                    <div className="minimal-glow-box">
                        <div className="highlight-text-small">{analysisResult.best_algorithm.name}</div>
                        <div className="compact-stats recommended-stats">
                            <span className="compact-complexity">Complexity: {analysisResult.best_algorithm.time_complexity}</span>
                        </div>
                        <p style={{ margin: '0 auto', fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                            {analysisResult.best_algorithm.explanation}
                        </p>
                    </div>

                    <div className="section-title" style={{ marginTop: '3rem' }}>Comparison Reasoning</div>
                    <div className="compact-comparison">
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.6' }}>{analysisResult.comparison_reasoning}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// 2. History View
const HistoryView = () => {
    const [history, setHistory] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('algoHistory') || '[]');
        // We only show the last 5 as per requirement
        setHistory(saved.slice(0, 5));
    }, []);

    return (
        <div className="history-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="page-header">
                <h1>Previous Problems</h1>
            </div>

            <div className="history-list">
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="history-card">
                            <div className="history-card-header">
                                <div className="history-card-main">
                                    <h3 className="history-card-title">{item.title}</h3>
                                    <div className="history-card-meta">
                                        <span className="history-card-algo">
                                            <strong>Algorithm:</strong> {item.algo}
                                        </span>
                                        <span className="history-card-date">
                                            <strong>Analyzed:</strong> {item.date}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="view-btn"
                                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                >
                                    {expandedId === item.id ? 'Close Details' : 'View Details'}
                                </button>
                            </div>

                            {expandedId === item.id && (
                                <div className="history-card-details">
                                    <div className="details-section">
                                        <label>Problem Statement</label>
                                        <p>{item.fullText || "Original text not available."}</p>
                                    </div>
                                    {item.fullResult && (
                                        <div className="details-section">
                                            <label>Recommended Strategy</label>
                                            <div className="strategy-summary">
                                                <div className="strategy-name">{item.fullResult.best_algorithm.name}</div>
                                                <div className="strategy-complexity">
                                                    ⏳ {item.fullResult.best_algorithm.time_complexity} | 💾 {item.fullResult.best_algorithm.space_complexity}
                                                </div>
                                                <p className="strategy-explanation">{item.fullResult.best_algorithm.explanation}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-history">
                        <p>No problems analyzed yet. Analyze a problem from the dashboard.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// 3. Chat View
const ChatView = () => {
    const [messages, setMessages] = useState(() => {
        return JSON.parse(localStorage.getItem('algoChat') || '[{"id":1, "source":"sys","text":"Hello! I am your AI Mentor. Ask me anything about competitive programming or algorithms."}]');
    });
    const [input, setInput] = useState('');

    const sendMsg = async () => {
        if (!input.trim()) return;
        const newMsg = { id: Date.now(), source: 'user', text: input };
        const updatedMsgs = [...messages, newMsg];
        setMessages(updatedMsgs);
        localStorage.setItem('algoChat', JSON.stringify(updatedMsgs));
        setInput('');

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) throw new Error("Server error");
            const data = await response.json();

            const sysMsg = { id: Date.now() + 1, source: 'sys', text: data.reply };
            const finalMsgs = [...updatedMsgs, sysMsg];
            setMessages(finalMsgs);
            localStorage.setItem('algoChat', JSON.stringify(finalMsgs));
        } catch (error) {
            const errMsg = { id: Date.now() + 1, source: 'sys', text: "Sorry, I'm having trouble connecting to the mentor service. Please ensure the backend is running." };
            setMessages(prev => [...prev, errMsg]);
        }
    };

    return (
        <div className="chat-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header">
                <h1>Ask AI Mentor</h1>
            </div>
            <div className="chat-card">
                <div className="chat-messages">
                    {messages.map((m) => (
                        <div key={m.id} className={`chat-bubble ${m.source === 'sys' ? 'bubble-sys' : 'bubble-user'}`}>
                            {m.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-row">
                    <input
                        type="text"
                        placeholder="e.g., Explain Time Complexity..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                    />
                    <button className="btn-primary" onClick={sendMsg}>Send</button>
                </div>
            </div>
        </div>
    );
};

// 4. Quiz View
const QuizView = () => {
    const [qIndex, setQIndex] = useState(() => parseInt(localStorage.getItem('quizIndex') || '0'));
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(() => parseInt(localStorage.getItem('quizScore') || '0'));
    const [total, setTotal] = useState(() => parseInt(localStorage.getItem('quizTotal') || '0'));
    const [answered, setAnswered] = useState(false);

    const questions = [
        {
            q: "Which technique finds the shortest path in an UNWEIGHTED graph?",
            options: ["Dijkstra's", "DFS", "BFS", "Bellman-Ford"],
            ans: 2,
            reason: "BFS explores layer-by-layer, guaranteeing the shortest path in unweighted graphs."
        },
        {
            q: "What is Kadane's Algorithm used for?",
            options: ["Shortest Path", "Maximum Subarray Sum", "Matrix Multiplication", "Tree Traversal"],
            ans: 1,
            reason: "Kadane's algorithm computes the maximum sum contiguous subarray in O(N)."
        },
        {
            q: "What dictates that a problem MUST be solved with DP instead of recursion?",
            options: ["Large inputs", "Overlapping Subproblems", "Sorted data", "Pointers"],
            ans: 1,
            reason: "Memoization (DP) is only useful when subproblems are repeated (Overlapping Subproblems)."
        }
    ];

    const currentQ = questions[qIndex % questions.length];

    const handleSelect = (i) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        const newTotal = total + 1;
        let newScore = score;
        if (i === currentQ.ans) newScore += 1;

        setTotal(newTotal);
        setScore(newScore);
        localStorage.setItem('quizScore', newScore.toString());
        localStorage.setItem('quizTotal', newTotal.toString());
    };

    const nextQuestion = () => {
        setAnswered(false);
        setSelected(null);
        const nextId = qIndex + 1;
        setQIndex(nextId);
        localStorage.setItem('quizIndex', nextId.toString());
    };

    return (
        <div className="quiz-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header">
                <h1>Quick Quiz <small>(Score: {score}/{total})</small></h1>
            </div>
            <div className="quiz-card card">
                <div className="quiz-question">{currentQ.q}</div>
                <div className="quiz-options">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            className={`quiz-opt-btn ${selected === i ? 'selected' : ''} ${answered && i === currentQ.ans ? 'correct' : ''} ${answered && selected === i && i !== currentQ.ans ? 'wrong' : ''}`}
                            onClick={() => handleSelect(i)}
                            disabled={answered}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {answered && (
                    <div className={`quiz-feedback ${selected === currentQ.ans ? 'feedback-correct' : 'feedback-wrong'}`}>
                        <strong>{selected === currentQ.ans ? 'Correct! ' : 'Wrong. '}</strong>
                        {currentQ.reason}
                    </div>
                )}

                {answered && (
                    <button className="btn-primary next-btn" onClick={nextQuestion}>Next Question</button>
                )}
            </div>
        </div>
    );
};

// 5. Performance View
const PerformanceView = () => {
    const stats = JSON.parse(localStorage.getItem('algoStats') || '{"total": 0}');
    const history = JSON.parse(localStorage.getItem('algoHistory') || '[]');
    const qScore = parseInt(localStorage.getItem('quizScore') || '0');
    const qTotal = parseInt(localStorage.getItem('quizTotal') || '0');

    const accuracy = qTotal > 0 ? Math.round((qScore / qTotal) * 100) : 0;

    let mostUsed = "None Yet";
    if (history.length > 0) {
        const counts = {};
        history.forEach(item => { counts[item.algo] = (counts[item.algo] || 0) + 1; });
        mostUsed = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    let level = "Beginner";
    if (stats.total > 10 && accuracy > 80) level = "Expert";
    else if (stats.total > 5) level = "Intermediate";

    return (
        <div className="performance-container">
            <div className="page-header">
                <h1>Your Programming Stats</h1>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <label>Analyzed Problems</label>
                    <div className="stat-value">{stats.total}</div>
                </div>

                <div className="stat-card">
                    <label>Most Recommended</label>
                    <div className="stat-value-small">{mostUsed.replace(' Algorithm', '')}</div>
                </div>

                <div className="stat-card">
                    <label>Quiz Accuracy</label>
                    <div className="stat-value">{accuracy}%</div>
                    <p className="stat-sub">Answered: {qTotal}</p>
                </div>

                <div className="stat-card">
                    <label>Skill Level</label>
                    <div className="stat-value-small">{level}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
