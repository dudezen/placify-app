import './UploadForm.css'
import { useState } from 'react'

function UploadForm({ onSubmit, loading }) {
  const [resume, setResume] = useState(null)
  const [jd, setJd] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      if (files[0].type === 'application/pdf') {
        setResume(files[0])
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      if (files[0].type === 'application/pdf') {
        setResume(files[0])
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (resume && jd.trim()) {
      onSubmit(resume, jd)
    }
  }

  return (
    <div className="upload-form-container">
      <div className="form-header">
        <h1>📄 PLACIFY</h1>
        <p>Analyze your resume against job descriptions with AI-powered insights</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Resume Upload */}
        <div className="form-group">
          <label className="form-label">Upload Resume (PDF)</label>
          <div
            className={`upload-area ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-input"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="file-input"
            />
            <label htmlFor="resume-input" className="upload-label">
              {resume ? (
                <>
                  <span className="upload-icon">✓</span>
                  <span className="file-name">{resume.name}</span>
                </>
              ) : (
                <>
                  <span className="upload-icon">📤</span>
                  <span className="upload-text">
                    Drag & drop your resume here or click to browse
                  </span>
                  <span className="upload-hint">PDF files only</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label htmlFor="jd" className="form-label">
            Job Description
          </label>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            disabled={loading}
            className="form-textarea"
            rows="8"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!resume || !jd.trim() || loading}
          className="submit-button"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              <span>🔍</span>
              Analyze Resume
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadForm
