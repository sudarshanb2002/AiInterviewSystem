import React, { useState } from 'react';
import '../css/kbupload.css';
import Toast from './toast';

const UploadPopup = ({ card, onClose }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
            handleFileUpload();
        } else {
            setError('Please upload a PDF file');
        }
    };

    const handleFileUpload = () => {
        setUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setUploading(false);
            }
        }, 200);
    };

    const handleClearFile = () => {
        setFile(null);
        setError('');
        onClose(true)
    };
    const handleShowToast = () => {
        setShowToast(true);
       
      };
    
      const handleCloseToast = () => {
        setShowToast(false);
      };

    return (
        <div className="upload-popup">
            <div className="upload-popup-content">
                <h3>Upload File for {card.title}</h3>
                <div className="upload-area">
                    <div className="upload-file">
                        <label htmlFor="file-upload" className="file-upload-label">
                            {uploading ? (
                                <>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <span>{uploadProgress}%</span>
                                </>
                            ) : (
                                <>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="file-input"
                                        onChange={handleFileChange}
                                    />
                                    <span>Drop your files here</span>
                                </>
                            )}
                        </label>
                    </div>
                    {file && !uploading && (
                        <div className="uploaded-file">
                            <span>{file.name}</span>
                            <button onClick={handleClearFile} className="clear-button">X</button>
                        </div>
                    )}
                    {error && <span className="error-message">{error}</span>}
                </div>
                <button onClick={handleClearFile} className="cancel-button">Cancel</button>
                <button onClick={handleShowToast} className="continue-button">Continue</button>            </div>
            {showToast && <Toast message="File Uploaded Successfully !!" onClose={handleCloseToast} />}
        </div>
        
    );
};

export default UploadPopup;
