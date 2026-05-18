# PLACIFY - Resume & Job Description Analyzer

A full-stack web application that analyzes resumes against job descriptions, providing comprehensive skill matching, gap analysis, and personalized suggestions using AI.

## Features

- 📄 **PDF Resume Upload** - Drag & drop or click to upload PDF resumes
- 🤖 **AI-Powered Analysis** - Gemini 1.5 Flash API integration
- 📊 **Comprehensive Metrics** - Overall score, skill score, and detailed analysis
- 🎯 **Gap Analysis** - Identify matched, missing, and bonus skills
- 💡 **Smart Suggestions** - Get 3 AI-generated resume rewrites for improvement
- 🎨 **Clean UI** - Modern green-themed interface with responsive design
- ⚡ **Fast Analysis** - Real-time processing with loading states

## Tech Stack

### Backend
- **Framework**: FastAPI
- **PDF Processing**: PyMuPDF (fitz)
- **AI API**: Google Generative AI (Gemini 1.5 Flash)
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Variables

## Prerequisites

- Python 3.8+
- Node.js 16+
- Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

## Installation & Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variable
export GEMINI_API_KEY="your-gemini-api-key"

# Run server
python main.py
```

The backend will start on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Health Check
```
GET /health
```

### Analyze Resume
```
POST /analyze
Content-Type: multipart/form-data

Body:
- resume: PDF file
- jd: Job description text
```

**Response:**
```json
{
  "overall_score": 85,
  "skill_score": 90,
  "gap_analysis": [
    {
      "skill": "Python",
      "in_resume": true,
      "required": true
    }
  ],
  "suggestions": [
    {
      "original": "Worked on web development projects",
      "rewrites": [
        "Led development of 5+ full-stack web applications...",
        "Architected and deployed scalable web solutions...",
        "Designed and implemented responsive web interfaces..."
      ]
    }
  ]
}
```

## Project Structure

```
placify/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt      # Python dependencies
└── frontend/
    ├── index.html           # HTML entry point
    ├── vite.config.js       # Vite configuration
    ├── package.json         # Node dependencies
    └── src/
        ├── main.jsx         # React entry point
        ├── App.jsx          # Main app component
        ├── App.css          # App styling
        ├── index.css        # Global styling
        └── components/
            ├── UploadForm.jsx       # File upload component
            ├── UploadForm.css       # Upload form styling
            ├── Results.jsx          # Results display component
            └── Results.css          # Results styling
```

## Usage

1. **Start the backend server**:
   ```bash
   cd backend
   python main.py
   ```

2. **In another terminal, start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Upload a resume (PDF)** and paste a job description

5. **Click "Analyze Resume"** to get comprehensive analysis

6. **Review results** including skill matching, gaps, and suggestions

## Environment Variables

### Backend (.env or export)
- `GEMINI_API_KEY`: Your Google Gemini API key

## Color Scheme

- **Primary Green**: `#1D9E75`
- **Text Color**: `#2d2d2d`
- **Light Text**: `#666666`
- **Background**: `#f5f5f3`
- **Border**: `#e5e5e3`
- **White**: `#ffffff`

## Features in Detail

### Metrics Dashboard
- **Overall Score**: General fit percentage
- **Skill Score**: Technical skills match percentage
- **Matched Skills**: Count of skills present in both resume and JD
- **Missing Skills**: Required skills not in resume

### Gap Analysis Table
- Shows all analyzed skills with status badges
- **Matched**: Skill present in resume and required
- **Missing**: Skill required but not in resume
- **Bonus**: Skill in resume but not required
- Clear ✓/✗ indicators for presence and requirement

### Smart Suggestions
- Numbered suggestion cards
- Original resume text highlighted
- 3 AI-generated rewrites for each suggestion
- Actionable improvements for resume enhancement

## Development

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
Already production-ready with Uvicorn

### Testing API

Using curl:
```bash
curl -X POST http://localhost:8000/analyze \
  -F "resume=@resume.pdf" \
  -F "jd=Job description text here"
```

## Error Handling

- Invalid PDF files: User-friendly error messages
- Missing fields: Form validation prevents submission
- API errors: Graceful error display with retry option
- Network errors: Timeout and connection error handling

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please create an issue in the repository.
