import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (isSignUp && !formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }

        if (isSignUp && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords match error";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        if (isSignUp) {
            const userExists = users.some(u => u.email === formData.email);
            if (userExists) {
                setErrors({ email: "Email already taken" });
                return;
            }

            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            navigate('/dashboard');
        } else {
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/dashboard');
            } else {
                setErrors({ auth: "Invalid credentials" });
            }
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setErrors({});
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <div style={{ marginBottom: '2rem' }}>
                    <div className="flex justify-center" style={{ marginBottom: '1.5rem', gap: '1rem', background: '#111827', padding: '0.4rem', borderRadius: '12px' }}>
                        <button
                            type="button"
                            onClick={() => !isSignUp && toggleMode()}
                            style={{
                                flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                background: isSignUp ? '#3b82f6' : 'transparent', color: isSignUp ? 'white' : '#9ca3af',
                                fontWeight: '700', transition: '0.2s'
                            }}
                        >Sign Up</button>
                        <button
                            type="button"
                            onClick={() => isSignUp && toggleMode()}
                            style={{
                                flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                background: !isSignUp ? '#3b82f6' : 'transparent', color: !isSignUp ? 'white' : '#9ca3af',
                                fontWeight: '700', transition: '0.2s'
                            }}
                        >Sign In</button>
                    </div>
                </div>

                <form onSubmit={handleAuth}>
                    {isSignUp && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    {isSignUp && (
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                    )}

                    {errors.auth && (
                        <p className="error-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{errors.auth}</p>
                    )}

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
