// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import Siriwave from 'react-siriwave';
// import '../../css/siri-wave.css';
// import SendIcon from '@mui/icons-material/Send';
// import MicIcon from '@mui/icons-material/Mic';

// const SiriWave = () => {
//     const location = useLocation();
//     const { title } = location.state || {};
//     const [amplitude, setAmplitude] = useState(0);
//     const [transcript, setTranscript] = useState('Hi, we are going to ask technical questions about ');
//     const [interimTranscript, setInterimTranscript] = useState('');
//     const [inputAnswer, setInputAnswer] = useState('');
//     const siriWaveRef = useRef(null);
//     const [utterance, setUtterance] = useState(null);
//     const [isPaused, setIsPaused] = useState(false);
//     const questions = [
//         'What is the latest version of Angular?',
//         'How do you manage state in React?',
//         'Can you explain the difference between let, const, and var in JavaScript?',
//         'What is Node.js and how does it work?',
//         'How do you secure a MySQL database?'
//     ];
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
//     const [answers, setAnswers] = useState([]);
//     const [isComplete, setIsComplete] = useState(false);
//     const recognitionRef = useRef(null);
//     const micPressedRef = useRef(false);
   
//     useEffect(() => {
//         const synth = window.speechSynthesis;
//         const u = new SpeechSynthesisUtterance(`Hi, we are going to ask technical questions about ${title}. If you are ready, say start or type start.`);
//         u.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female'); // Change voice here

//         u.onstart = () => {
//             setAmplitude(5); 
//         };

//         u.onend = () => {
//             setAmplitude(0); 
//             startListening(); // Start listening for the "start" command
//         };

//         u.onerror = () => {
//             setAmplitude(0); // Reset amplitude if there's an error
//         };

//         setUtterance(u);

//         // Start speaking immediately
//         synth.speak(u);

//         return () => {
//             synth.cancel();
//         };
//     }, [title]);

//     const handlePlay = () => {
//         const synth = window.speechSynthesis;

//         if (utterance) {
//             if (isPaused) {
//                 synth.resume();
//             } else {
//                 synth.speak(utterance);
//             }
//             setIsPaused(false);
//         } else {
//             console.error('Utterance is not initialized');
//         }
//     };

//     const startListening = () => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         const recognition = new SpeechRecognition();

//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onresult = (event) => {
//             const lastResult = event.results[event.results.length - 1];
//             const transcript = lastResult[0].transcript.trim().toLowerCase();

//             if (transcript === 'start') {
//                 setTranscript(''); // Clear the transcript
//                 askQuestion(0); // Start asking questions from the first one
//             }

//             setInterimTranscript(transcript);
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//         };

//         recognitionRef.current = recognition;
//         recognition.start();
//     };

//     const startListeningForAnswer = () => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         const recognition = new SpeechRecognition();

//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onresult = (event) => {
//             const lastResult = event.results[event.results.length - 1];
//             const transcript = lastResult[0].transcript.trim();
//             if (lastResult.isFinal) {
//                 storeAnswer(transcript);
//                 setInterimTranscript('');
//                 askQuestion(currentQuestionIndex + 1); // Ask the next question
//             } else {
//                 setInterimTranscript(transcript);
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//         };

//         recognitionRef.current = recognition;
//         recognition.start();
//     };

//     const stopListening = () => {
//         if (recognitionRef.current) {
//             recognitionRef.current.stop();
//         }
//     };

//     const storeAnswer = (answer) => {
//         setAnswers(prevAnswers => [
//             ...prevAnswers,
//             { question: questions[currentQuestionIndex], answer }
//         ]);
//     };

//     const askQuestion = (index) => {
//         if (index >= questions.length) {
//             setIsComplete(true);
//             return;
//         }

//         setCurrentQuestionIndex(index);

//         const synth = window.speechSynthesis;
//         synth.cancel(); // Cancel any ongoing speech synthesis

//         const nextQuestion = questions[index];
//         const questionUtterance = new SpeechSynthesisUtterance(nextQuestion);
//         questionUtterance.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female'); // Change voice here


//         questionUtterance.onstart = () => {
//             setAmplitude(5); // Increase amplitude at the start of speech
//             stopListening(); // Stop listening while the question is being asked
//         };

//         questionUtterance.onend = () => {
//             setAmplitude(0); // Reset amplitude at the end of speech
//             // User can hold the mic icon to start answering
//         };

//         questionUtterance.onerror = () => {
//             setAmplitude(0); // Reset amplitude if there's an error
//         };

//         synth.speak(questionUtterance);
//     };

//     const handleSend = () => {
//         if (inputAnswer.trim().toLowerCase() === 'start') {
//             setInputAnswer('');
//             askQuestion(0); // Start from the first question
//         } else if (inputAnswer.trim()) {
//             storeAnswer(inputAnswer.trim());
//             setInputAnswer('');
//             askQuestion(currentQuestionIndex + 1); // Ask the next question
//         }
//     };

//     const handleInputChange = (e) => {
//         setInputAnswer(e.target.value);
//     };

//     const handleMicPress = () => {
//         micPressedRef.current = true;
//         startListeningForAnswer();
//     };

//     const handleMicRelease = () => {
//         micPressedRef.current = false;
//         stopListening();
//     };

//     if (isComplete) {
//         return (
//             <div className="results-container">
//                 <h2>Questions and Answers</h2>
//                 {answers.map((item, index) => (
//                     <div key={index} className="qa-item">
//                         <p><strong>Question:</strong> {item.question}</p>
//                         <p><strong>Answer:</strong> {item.answer}</p>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="parent-container">
//                 <div className="siri-wave">
//                     <Siriwave
//                         ref={siriWaveRef}
//                         theme="ios9"
//                         amplitude={amplitude}
//                         width={1500}
//                         height={500}
//                     />
//                 </div>
//             </div>
//             <div className="transcript-container">
//                 <p>{transcript}{title}. If you are ready, say start or type start.</p>
//                 <p>Interim Transcript: {interimTranscript}</p>
//             </div>
//             <div className='input-container' style={{ position: 'relative' }}>
//                 <textarea
//                     name="postContent"
//                     rows={4}
//                     cols={40}
//                     placeholder='Enter Your Answer Here...'
//                     value={inputAnswer}
//                     onChange={handleInputChange}
//                 />
//                 <SendIcon
//                     sx={{
//                         marginTop: 1,
//                         marginLeft: 3,
//                         fontSize: 50,
//                         position: 'absolute',
//                         pointerEvents: 'auto', // Allows the icon to be interactive
//                         cursor: 'pointer', // Shows a pointer cursor on hover
//                     }}
//                     onClick={handleSend}
//                 />
//                 <MicIcon
//                     sx={{
//                         marginTop: 1,
//                         marginLeft: 10,
//                         fontSize: 50,
//                         position: "absolute",
//                         pointerEvents: "auto", // Allows the icon to be interactive
//                         cursor: "pointer", // Shows a pointer cursor on hover
//                     }}
//                     onMouseDown={handleMicPress}
//                     onMouseUp={handleMicRelease}
//                     onTouchStart={handleMicPress}
//                     onTouchEnd={handleMicRelease}
//                 />
//             </div>
//         </>
//     );
// };

// export default SiriWave;


import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Siriwave from 'react-siriwave';
import '../../css/siri-wave.css';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';


const SiriWave = () => {
    const location = useLocation();
    const { title } = location.state || {};
    const [amplitude, setAmplitude] = useState(0);
    const [transcript, setTranscript] = useState('Hi, we are going to ask technical questions about ');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [inputAnswer, setInputAnswer] = useState('');
    const siriWaveRef = useRef(null);
    const [utterance, setUtterance] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const questions = [
        'What is the latest version of Angular?',
        'How do you manage state in React?',
        'Can you explain the difference between let, const, and var in JavaScript?',
        'What is Node.js and how does it work?',
        'How do you secure a MySQL database?'
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [answers, setAnswers] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const recognitionRef = useRef(null);
    const micPressedRef = useRef(false);
    const [editableIndex, setEditableIndex] = useState(null);
    const [editedAnswer, setEditedAnswer] = useState('');

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(`Hi, we are going to ask technical questions about ${title}. If you are ready, say start or type start.`);
        u.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female'); // Change voice here

        u.onstart = () => {
            setAmplitude(5); 
        };

        u.onend = () => {
            setAmplitude(0); 
            startListening(); // Start listening for the "start" command
        };

        u.onerror = () => {
            setAmplitude(0); // Reset amplitude if there's an error
        };

        setUtterance(u);

        // Start speaking immediately
        synth.speak(u);

        return () => {
            synth.cancel();
        };
    }, [title]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (utterance) {
            if (isPaused) {
                synth.resume();
            } else {
                synth.speak(utterance);
            }
            setIsPaused(false);
        } else {
            console.error('Utterance is not initialized');
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            const transcript = lastResult[0].transcript.trim().toLowerCase();

            if (transcript === 'start') {
                setTranscript(''); // Clear the transcript
                askQuestion(0); // Start asking questions from the first one
            }

            setInterimTranscript(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const startListeningForAnswer = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            const transcript = lastResult[0].transcript.trim();
            if (lastResult.isFinal) {
                storeAnswer(transcript);
                setInterimTranscript('');
                askQuestion(currentQuestionIndex + 1); // Ask the next question
            } else {
                setInterimTranscript(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const storeAnswer = (answer) => {
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { question: questions[currentQuestionIndex], answer }
        ]);
    };

    const askQuestion = (index) => {
        if (index >= questions.length) {
            setIsComplete(true);
            return;
        }

        setCurrentQuestionIndex(index);

        const synth = window.speechSynthesis;
        synth.cancel(); // Cancel any ongoing speech synthesis

        const nextQuestion = questions[index];
        const questionUtterance = new SpeechSynthesisUtterance(nextQuestion);
        questionUtterance.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female'); // Change voice here


        questionUtterance.onstart = () => {
            setAmplitude(5); // Increase amplitude at the start of speech
            stopListening(); // Stop listening while the question is being asked
        };

        questionUtterance.onend = () => {
            setAmplitude(0); // Reset amplitude at the end of speech
            // User can hold the mic icon to start answering
        };

        questionUtterance.onerror = () => {
            setAmplitude(0); // Reset amplitude if there's an error
        };

        synth.speak(questionUtterance);
    };

    const handleSend = () => {
        if (inputAnswer.trim().toLowerCase() === 'start') {
            setInputAnswer('');
            askQuestion(0); // Start from the first question
        } else if (inputAnswer.trim()) {
            storeAnswer(inputAnswer.trim());
            setInputAnswer('');
            askQuestion(currentQuestionIndex + 1); // Ask the next question
        }
    };

    const handleInputChange = (e) => {
        setInputAnswer(e.target.value);
    };

    const handleMicPress = () => {
        micPressedRef.current = true;
        startListeningForAnswer();
    };

    const handleMicRelease = () => {
        micPressedRef.current = false;
        stopListening();
    };


    const handleEdit = (index, answer) => {
        setEditableIndex(index);
        setEditedAnswer(answer);
    };

    const handleSave = (index) => {
        answers[index].answer = editedAnswer;
        setEditableIndex(null);
        setEditedAnswer('');
    };
    
    return (
        <>
            {isComplete ? (
                <div className="results-container">
                    <h2>Questions and Answers</h2>
                    {answers.map((item, index) => (
                        <div key={index} className="qa-item card-view">
                            <div className="question-header">
                                <span className="technical-question">Technical question</span>
                                <EditIcon
                                    sx={{ fontSize: 20, cursor: 'pointer' }}
                                    onClick={() => handleEdit(index, item.answer)}
                                />
                            </div>
                            <p><strong>Question:</strong> {item.question}</p>
                            <p>
                                <strong>Answer:</strong>
                                {editableIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedAnswer}
                                        onChange={(e) => setEditedAnswer(e.target.value)}
                                    />
                                ) : (
                                    item.answer
                                )}
                            </p>
                            {editableIndex === index && (
                                <button onClick={() => handleSave(index)}>Save</button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="parent-container">
                        <div className="siri-wave">
                            <Siriwave
                                ref={siriWaveRef}
                                theme="ios9"
                                amplitude={amplitude}
                                width={1500}
                                height={500}
                            />
                        </div>
                    </div>
                    <div className="transcript-container">
                        <p>{transcript}{title}. If you are ready, say start or type start.</p>
                        <p>Interim Transcript: {interimTranscript}</p>
                    </div>
                    <div className='input-container' style={{ position: 'relative' }}>
                        <textarea
                            name="postContent"
                            rows={4}
                            cols={40}
                            placeholder='Enter Your Answer Here...'
                            value={inputAnswer}
                            onChange={handleInputChange}
                        />
                        <SendIcon
                            sx={{
                                marginTop: 1,
                                marginLeft: 3,
                                fontSize: 50,
                                position: 'absolute',
                                pointerEvents: 'auto',
                                cursor: 'pointer',
                            }}
                            onClick={handleSend}
                        />
                        <MicIcon
                            sx={{
                                marginTop: 1,
                                marginLeft: 10,
                                fontSize: 50,
                                position: "absolute",
                                pointerEvents: "auto",
                                cursor: "pointer",
                            }}
                            onMouseDown={handleMicPress}
                            onMouseUp={handleMicRelease}
                            onTouchStart={handleMicPress}
                            onTouchEnd={handleMicRelease}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SiriWave;