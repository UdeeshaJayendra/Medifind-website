import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AnimatedBackground from "../components/AnimatedBackground";
import './Loging2.css';

export default function Loging2() {
   
    const navigate = useNavigate();

    const handleRegistrationClick = () => {
       
        navigate('/pharmacy-registration');
    };

    return (
        <div className="loging2-container">
            <AnimatedBackground />

            <div className="card">
                <div className="card-icon">💊</div>

                <h1>
                    Pharmacy <span style={{ color: '#2f6f55' }}>Network</span>
                    <br /> Registration
                </h1>

                <p style={{ margin: '20px 0', color: '#444', fontSize: '1.1rem' }}>
                    Connect your pharmacy to the digital world.
                    <br /> Fast, secure, and professional.
                </p>

                <button
                    className="register-btn"
                    onClick={handleRegistrationClick} 
                >
                    SECURE YOUR SPOT
                </button>
            </div>
        </div>
    );
}