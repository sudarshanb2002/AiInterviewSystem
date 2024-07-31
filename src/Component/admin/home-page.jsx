import '../../css/home-page.css'
import image1 from '../../asset/image1.jpg'
import React, { useState } from 'react';
import LoginPage from '../../PopUp/LoginPage';



const HomePage = () => {
    const imageUrl = image1;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="parent-container">
            <div className="left-container">
                {/* <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
                    Empowering with AI
                </LinearGradient> */}
                <h1>Transform Interviews with AI <br></br>Instant Feedback, Unmatched Insights!</h1>
                <p>Revolutionize your interview process with our AI-powered platform. <br></br>Get instant, in-depth feedback and analysis to enhance candidate evaluation. 
                    <br></br>Experience unparalleled insights and streamline your hiring decisions like never before!!</p>
                <button className='button-style' onClick={togglePopup}>Login</button>
                <LoginPage isOpen={isPopupOpen} onClose={togglePopup} />
            </div>
            <div className="right-container">
                <img src={imageUrl} alt="Cover" className="cover-image" />
            </div>
        </div>
    );
};

export default HomePage;
