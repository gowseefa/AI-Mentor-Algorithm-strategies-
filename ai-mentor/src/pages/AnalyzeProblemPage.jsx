import React, { useState } from 'react';

const AnalyzeProblemPage = () => {
    const [problemStatement, setProblemStatement] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!problemStatement.trim()) {
            alert("Please paste a problem statement to analyze.");
            return;
        }

        setIsAnalyzing(true);
        setResults(null);

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problemText: problemStatement })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();

            // Map backend schema to local results schema
            setResults({
                type: data.best_algorithm.type || "Algorithm",
                algorithm: data.best_algorithm.name,
                complexity: data.best_algorithm.time_complexity,
                explanation: data.best_algorithm.explanation
            });

        } catch (err) {
            console.error("API Error:", err);
            alert(`Error: ${err.message}. Please ensure the backend is running.`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="analyze-container">
            <div className="analyze-content">
                <h1 className="home-title">Analyze Problem</h1>
                <p className="home-subtitle">Paste your competitive programming problem here.</p>

                <form className="analyze-form" onSubmit={handleAnalyze}>
                    <div className="form-group">
                        <label htmlFor="problemStatement">Problem Statement</label>
                        <textarea
                            id="problemStatement"
                            placeholder="Paste the full problem description, constraints, and examples here..."
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            rows={8}
                            required
                            className="problem-textarea"
                        />
                    </div>

                    <button
                        type="submit"
                        className="get-started-button analyze-submit-button"
                        disabled={isAnalyzing}
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Problem'}
                    </button>
                </form>

                {results && (
                    <div className="results-card">
                        <h2 className="results-title">Analysis Complete</h2>
                        <div className="result-item">
                            <span className="result-label">Problem Type:</span>
                            <span className="result-value">{results.type}</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Recommended Algorithm:</span>
                            <span className="result-value">{results.algorithm}</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Time Complexity:</span>
                            <span className="result-value">{results.complexity}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzeProblemPage;
