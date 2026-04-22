import { useState, useRef } from 'react';
import { FiPlus, FiUploadCloud, FiFileText, FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { extractTextFromPDF } from '../utils/pdfParser';
import axios from 'axios';
import './Onboarding.css';

export default function Onboarding({ onComplete, onImportData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file 📄');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Extract text locally
      const text = await extractTextFromPDF(file);
      
      // 2. Send to AI parser
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/ai/parse`, { text });
      
      if (response.data && response.data.data) {
        const extracted = response.data.data;
        setSuccess({
          stats: {
            experience: extracted.experience?.length || 0,
            skills: extracted.skills?.length || 0,
            education: extracted.education?.length || 0
          }
        });
        setTimeout(() => {
          onImportData(extracted);
          onComplete();
        }, 2000);
      } else {
        throw new Error('Failed to parse resume data');
      }
    } catch (err) {
      console.error('PDF Extraction or Parse Error:', err);
      // More specific error message for the user if it's a network error
      if (err.message.includes('Network Error')) {
        setError('Cannot connect to the backend. Please ensure the server is running on port 5000.');
      } else {
        setError('There was an error parsing the resume. Please try again or start from scratch.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1>How would you like to start?</h1>
          <p>Choose an option below to begin building your professional resume with AI-powered guidance.</p>
        </div>

        <div className="onboarding-grid">
          {/* Option 1: Scratch */}
          <div 
            className="onboarding-card scratch" 
            onClick={onComplete}
            style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'all' }}
          >
            <div className="card-icon scratch"><FiPlus size={36} /></div>
            <h3>Create from Scratch</h3>
            <p>Start with a blank resume and fill in your details manually.</p>
            <button className="card-btn">Start Fresh</button>
          </div>

          {/* Option 2: Upload */}
          <div 
            className={`onboarding-card upload ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
            onClick={() => !loading && !success && fileInputRef.current.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".pdf" 
              onChange={handleFileUpload}
            />
            
            <div className="card-icon upload">
              {loading ? <FiLoader className="spin" size={36} /> : 
               success ? <FiCheckCircle size={36} /> : 
               <FiUploadCloud size={36} />}
            </div>

            <h3>Upload Existing Resume</h3>
            <p>Upload your previous PDF resume and auto-fill your details instantly.</p>
            
            <div className="upload-status-area">
              {loading && <p className="status-text">Structuring your resume...</p>}
              {success && (
                <div className="extraction-summary">
                  <p className="status-text success">Resume details imported successfully. Please review and edit.</p>
                  <div className="extraction-chips">
                    <span className="chip">Profile Summary</span>
                    <span className="chip">Experience Details</span>
                    <span className="chip">Technical Skills</span>
                    <span className="chip">Projects & Awards</span>
                  </div>
                </div>
              )}
              {error && <p className="status-text error"><FiAlertCircle /> {error}</p>}
            </div>

            <button className="card-btn primary">
              {loading ? 'Processing...' : success ? 'Redirecting...' : 'Upload PDF'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
