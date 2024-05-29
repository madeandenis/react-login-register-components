import React, { FormEvent, useState, useEffect, useRef } from 'react';
import './AuthForm.css';

import ApiEndpoints from '../../utility/ApiEndpoints.tsx';
import FlashMessage from '../utils/FlashMessage.tsx';
import validator from 'validator';
import PasswordStrengthBar from 'react-password-strength-bar';

const Register: React.FC = () => {
    const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [showFlash, setShowFlash] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // True -> disabled, False -> enabled 
    const [registerButtonState, setRegisterButtonState] = useState(true);
    const passwordStrengthRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(passwordStrengthRef.current) {
            const passwordStrength = passwordStrengthRef.current.textContent;
            setRegisterButtonState(
                !username ||
                !validator.isEmail(email) ||
                password !== confirmPassword ||
                (passwordStrength !== 'good' && passwordStrength !== 'strong')
            )
        }
    }, [username,email,password,confirmPassword]);
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (!validator.isEmail(e.target.value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFlashMessage(null);
        setShowFlash(false);

        fetch(ApiEndpoints.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.type === "success"){
                setFlashMessage({ type: 'success', message: data.message });
                setShowFlash(true);
            }
            else{
                setFlashMessage({ type: 'error', message: data.message });
                setShowFlash(true);
            }
        })
        .catch(error => {
            setFlashMessage({ type: 'error', message: 'An error occurred. Please try again.' });
            setShowFlash(true);
        });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Create Account</h2>
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
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleEmailChange}
                        className={emailError ? 'input-error' : ''}
                    />
                </div>
                {emailError &&
                    <div className="email-error-message">
                        *{emailError}
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handlePasswordChange}
                        className={passwordError ? 'input-error' : ''}
                    />
                </div>
                <div ref={passwordStrengthRef}>
                    <PasswordStrengthBar password={password} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        required
                        onChange={handleConfirmPasswordChange}
                        className={passwordError ? 'input-error' : ''}
                    />
                </div>
                {passwordError &&
                    <div className="password-error-message">
                        *{passwordError}
                    </div>
                }
                <button type="submit" className="login-button" disabled={registerButtonState}>Register</button>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
            {flashMessage && (
                <FlashMessage
                    type={flashMessage.type}
                    message={flashMessage.message}
                />
            )}
        </div>
    );
}

export default Register;
