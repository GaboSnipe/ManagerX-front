import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../features/auth/loginThunk';
import { Logo } from "../components/";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('TestPass123');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('emaili ar unda iyos carieli');
    const [passwordError, setPasswordError] = useState('paroli ar unda iyos carieli');
    const [formValid, setFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Not correct email!');
        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 35) {
            setPasswordError('Password must be between 3 and 35 characters');
            if (!e.target.value) {
                setPasswordError('Password is required');
            }
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValid) return;
        setIsSubmitting(true);
    
        try {
            await dispatch(loginThunk({ email, password })).unwrap();
            setIsSubmitting(false);
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to login:', err);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-tr from-sky-200 to-sky-500 min-h-screen flex items-center justify-center">
            <div className="p-6 bg-sky-100 bg-gray-100 rounded-md max-w-md w-full">
                <div className="flex items-center justify-center text-4xl font-black text-sky-900 mb-6">
                    <Logo className="w-10 h-10 text-gray-700" />
                    <h1 className="tracking-wide">Manager X</h1>
                </div>
                <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        className={`mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${emailDirty && emailError ? 'border-red-500 ring-red-500' : ''
                            }`}
                        type="text"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        onBlur={blurHandler}
                        placeholder="Enter Your email..."
                    />
                    {emailDirty && emailError && <div className="text-red-500 text-sm">{emailError}</div>}
                    <label className="text-sm font-medium">Password</label>
                    <input
                        className={`mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${passwordDirty && passwordError ? 'border-red-500 ring-red-500' : ''
                            }`}
                        type="password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                        onBlur={blurHandler}
                        placeholder="Enter Your password..."
                    />
                    {passwordDirty && passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
                    <button
                        className={`brn bg-gray-700 px-4 py-1.5 focus:bg-gray-500 rounded-md shadow-lg bg-sky-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300 ${!formValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        type="submit"
                        disabled={!formValid || isSubmitting}
                    >
                        <span id="login_process_state" className={`transition-opacity duration-300 ${isSubmitting ? 'block' : 'hidden'}`}>Checking...</span>
                        <span id="login_default_state" className={`transition-opacity duration-300 ${isSubmitting ? 'hidden' : 'block'}`}>Login</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
