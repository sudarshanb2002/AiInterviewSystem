import React, { useState } from 'react';
import '../../css/admin-page.css';
import { useNavigate } from 'react-router-dom';
import angularIcon from '../../asset/angular.png';
import python from '../../asset/python.png';
import reactjs from '../../asset/reactjs.png';
import nodejs from '../../asset/nodejs.png';
import mysql from '../../asset/mysql.png';
import Cplus from '../../asset/Cplus.png';
import html from '../../asset/html.png';
import Java from '../../asset/Java.png';
import wordpress from '../../asset/wordpress.png';
import golang from '../../asset/golang.png';
import rust from '../../asset/rust.png';
import php from '../../asset/php.png';
import SiriWave from './siri-wave';
const InterviewPage  = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const cards = [
        {
            id: 1,
            title: 'Angular',
            description: 'Learn Angular from scratch',
            icon: angularIcon,
        },
        {
            id: 2,
            title: 'React Js',
            description: 'Dive into React and build interactive UIs',
            icon: reactjs,
        },
        {
            id: 3,
            title: 'Python',
            description: 'Master Python and its applications',
            icon: python,
        },
        {
            id: 4,
            title: 'Node Js',
            description: 'Master Node Js and its applications',
            icon: nodejs,
        },
        {
            id: 5,
            title: 'My Sql',
            description: 'Manage My Sql and their permissions',
            icon: mysql,
        },
        {
            id: 6,
            title: 'C++',
            description: 'Analyze your project data and insights',
            icon: Cplus,
        }, ,
        {
            id: 7,
            title: 'Html and Css',
            description: 'Analyze your project data and insights',
            icon: html,
        },
        {
            id: 8,
            title: 'Java',
            description: 'Analyze your project data and insights',
            icon: Java,
        },
        {
            id: 9,
            title: 'wordpress',
            description: 'Analyze your project data and insights',
            icon: wordpress,
        },
        {
            id: 10,
            title: 'Go Lang',
            description: 'Analyze your project data and insights',
            icon: golang,
        },
        {
            id: 11,
            title: 'Php',
            description: 'Analyze your project data and insights',
            icon: php,
        },
        {
            id: 12,
            title: 'Rust',
            description: 'Analyze your project data and insights',
            icon: rust,
        }
    ];
    const handleCardClick = (card) => {
        setSelectedCard(card);
        navigate('/siri-wave', { state: { title: card.title, id: card.id } });
    };

    return (
        <div className="container">
            <div className="top-container">
               <h2>Select The Language You Are Familiar</h2>
            </div>
            <div className="cards-container">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${selectedCard === card.id ? 'selected' : ''}`}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className="card-content">
                            <img src={card.icon} alt={`${card.title} icon`} className="card-icon" />
                            <div className="card-text">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewPage ;
