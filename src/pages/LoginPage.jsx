import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLoginThunk, loginThunk, logoutThunk } from '../features/auth/loginThunk';
import GoogleButton from "react-google-button";
import { Logo } from "../components/";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const CustomGoogleButton = ({ setIsSubmitting }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onError = (error) => {
        toast.error("Failed to Login", {
            containerId: "error"
        });
        setIsSubmitting(false)
        console.warn(error)
    }
    const onSuccess = async (response) => {
        try {
            await dispatch(googleLoginThunk({ access_token: response.access_token })).unwrap();
            navigate('/dashboard');
        } catch (e) {
            onError(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: response => onSuccess(response),
        onError: error => onError(error),
    });

    return (
        <button
            onClick={() => {
                setIsSubmitting(true);
                googleLogin();
            }}

            className="w-full flex h-10 border py-1.5 mt-2 bg-white rounded-md items-center"
        >
            <FcGoogle className="text-2xl ml-2" />
            <p className=" text-sm text-center w-full "> Sign in with Google</p>
        </button>
    );
};



const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('email is empty');
    const [passwordError, setPasswordError] = useState('password is empty');
    const [formValid, setFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isAuth = useSelector((state) => state.auth.isAuth);

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
            setEmailError('Incorrect email');

        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 35) {
            setPasswordError('password to 3 -35');
            if (!e.target.value) {
                setPasswordError('Password must be between 3 and 35 characters');
            }
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        e.target.name === 'email' ? setEmailDirty(true) : setPasswordDirty(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValid) return;
        setIsSubmitting(true);

        try {
            await dispatch(loginThunk({ email, password })).unwrap();
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to login:', err);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(logoutThunk());
        }
    }, []);

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
                        className={`mb-3 mt-1 block w-full px-2 py-1.5 border rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${emailDirty && emailError ? 'border-red-500 ring-red-500' : 'border-gray-300 '}`}
                        type="text"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        onBlur={blurHandler}
                        autoComplete="email"
                        placeholder="Enter Your email..."
                    />
                    {emailDirty && emailError && <div className="text-red-500 text-sm">{emailError}</div>}
                    <label className="text-sm font-medium">Password</label>
                    <input
                        className={`mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${passwordDirty && passwordError ? 'border-red-500 ring-red-500' : ''}`}
                        type="password"
                        name="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={passwordHandler}
                        onBlur={blurHandler}
                        placeholder="Enter Your password..."
                    />
                    {passwordDirty && passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
                    <button
                        className={`brn bg-gray-700 px-4 py-1.5 focus:bg-gray-500 rounded-md shadow-lg bg-sky-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300 ${!formValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={!formValid || isSubmitting}
                    >
                        <span id="login_process_state" className={`transition-opacity duration-300 ${isSubmitting ? 'block' : 'hidden'}`}>Checking...</span>
                        <span id="login_default_state" className={`transition-opacity duration-300 ${isSubmitting ? 'hidden' : 'block'}`}>Login</span>
                    </button>
                </form>
                <div id="signInButton">
                    <GoogleOAuthProvider clientId={clientId}>
                        <CustomGoogleButton setIsSubmitting={setIsSubmitting} />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;
