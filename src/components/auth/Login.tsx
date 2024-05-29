import React, { FormEvent, useState } from 'react';
import './AuthForm.css';
import FlashMessage from '../utils/FlashMessage.tsx';
import ApiEndpoints from '../../utility/ApiEndpoints.tsx';

const Login: React.FC = () => {
    const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFlashMessage(null);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const usernameOrEmail= formData.get('usernameOrEmail');
        const password = formData.get('password');

        fetch(ApiEndpoints.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail: usernameOrEmail, password: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.type === "success"){
                setFlashMessage({ type: 'success', message: data.message });
            }
            else{
                setFlashMessage({ type: 'error', message: data.message });
            }
        })
        .catch(error => {
            setFlashMessage({ type: 'error', message: 'An error occurred. Please try again.' });
        });
    };

    return (
        <div className="login-container">
            {flashMessage && (
                <FlashMessage
                    type={flashMessage.type}
                    message={flashMessage.message}
                />
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Welcome Back</h2>
                <div className="auth-options">
                    <a href="/auth/google" className="auth-option">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="auth-icon" />
                        <span>oogle</span>
                    </a>
                    <a href="/auth/github" className="auth-option">
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" alt="GitHub" className="auth-icon" />
                        <span>GitHub</span>
                    </a>
                    <a href="/auth/microsoft" className="auth-option">
                        <img src="https://img.icons8.com/color/48/000000/microsoft.png" alt="Microsoft" className="auth-icon" />
                        <span>Microsoft</span>
                    </a>
                </div>
                <div className="divider">
                    <hr />
                    <span>or</span>
                    <hr />
                </div>
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username or Email</label>
                    <input
                        type="text"
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
}

export default Login;