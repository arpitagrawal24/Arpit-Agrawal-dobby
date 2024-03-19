/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const Auth = ({ setIsLoggedIn }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isSignup) {
                response = await axios.post(`${import.meta.env.VITE_SERVER}/auth/signup`, { name, email, password });
            } else {
                response = await axios.post(`${import.meta.env.VITE_SERVER}/auth/login`, { email, password });
            }
            // console.log(response.data);

            localStorage.setItem('user', JSON.stringify(response.data.data));
            setIsLoggedIn(true);
            window.location.reload();

        } catch (error) {
            setError('Invalid username or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">
                {isSignup ? 'Sign Up' : 'Login'}
            </h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <input
                        type="text"
                        className="block w-full border rounded-md py-2 px-3 mb-2"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}

                <input
                    type="email"
                    className="block w-full border rounded-md py-2 px-3 mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="block w-full border rounded-md py-2 px-3 mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>

                <p className="mt-4">
                    {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                    <a
                        href="/signup"
                        className="text-blue-500 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSignup(!isSignup);
                        }}
                    >
                        {isSignup ? 'Login' : 'Sign up'}
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Auth;
