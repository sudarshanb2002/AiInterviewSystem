import React, { useState } from 'react';
import '../css/login-page.css'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader'


const LoginPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state


    const handleEmailChange = (e) => {
        const emailValue = e.target.value.toLowerCase();
        setEmail(emailValue);

        // Email validation
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };


    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        // Password validation (at least 6 characters)
        if (passwordValue.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
        } else {
            setPasswordError('');
        }
    };

    const handleclose = () => {
        setEmail('')
        setPassword('')
        onClose(true)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true before submitting

        try {
            // Simulate an asynchronous operation (replace with your actual login logic)
            onClose(true)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Successful login, navigate to the admin page
            navigate('/admin');
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
        } finally {
            setLoading(false); // Set loading to false after the operation is complete
        }
    };

    return (
        loading ? (
            <div className="overlay">
                <div className="loader">
                    <RingLoader
                        color="#0fcec0"
                        loading
                        size={100}
                    />
                </div>
            </div>
        ) : (
            isOpen && (
                <div className="overlay">
                    <div className="wrapper">
                        <div className="title">
                            Login Form

                            <CloseIcon
                                sx={{
                                    marginTop: 2,
                                    marginLeft: 6,
                                    position: 'absolute',
                                }}
                                onClick={handleclose}
                            />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Email Address</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Email Address'
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                {emailError && <div className="error-message">{emailError}</div>}
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder='Enter Your Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                {passwordError && <div className="error-message">{passwordError}</div>}
                            </div>
                            <div className="field">
                                <button type='submit' className='button'>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        )
    );
};

export default LoginPopup;