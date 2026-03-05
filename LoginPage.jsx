import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = (e) => {
        e.preventDefault();

        // Simulate authentication for both sign-in and sign-up
        if (isSignUp) {
            if (name && email && password) {
                navigate('/dashboard');
            } else {
                alert("Please fill in all fields to sign up.");
            }
        } else {
            if (email && password) {
                navigate('/dashboard');
            } else {
                alert("Please enter email and password to sign in.");
            }
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
                <p className="login-subtitle">
                    {isSignUp ? 'Sign up to start your competitive programming journey.' : 'Please sign in to continue.'}
                </p>

                <form className="login-form" onSubmit={handleAuth}>
                    {isSignUp && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={isSignUp ? "Create a password" : "Enter your password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-submit-button">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-toggle">
                    {isSignUp ? (
                        <p>Already have an account? <button type="button" className="auth-toggle-btn" onClick={toggleMode}>Sign in</button></p>
                    ) : (
                        <p>Don't have an account? <button type="button" className="auth-toggle-btn" onClick={toggleMode}>Sign up</button></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
