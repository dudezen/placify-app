import os
import json
import fitz
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS for localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def extract_text_from_pdf(pdf_file: bytes) -> str:
    """Extract text from PDF using PyMuPDF."""
    try:
        doc = fitz.open(stream=pdf_file, filetype="pdf")
        text = ""
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += page.get_text()
        return text
    except Exception as e:
        raise ValueError(f"Failed to extract text from PDF: {str(e)}")


def strip_markdown_fences(text: str) -> str:
    """Remove markdown code fences from text."""
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(resume: UploadFile = File(...), jd: str = Form(...)):
    """
    Analyze resume against job description.
    
    Args:
        resume: PDF file of the resume
        jd: Job description text
        
    Returns:
        JSON with analysis results
    """
    try:
        # Read and extract text from PDF
        pdf_content = await resume.read()
        resume_text = extract_text_from_pdf(pdf_content)
        
        if not resume_text.strip():
            return {
                "error": "Could not extract text from PDF"
            }
        
        # Prepare prompt for Gemini
        prompt = f"""Analyze the following resume against the job description and return ONLY valid JSON (no markdown, no explanation).

Resume:
{resume_text}

Job Description:
{jd}

Return exactly this JSON structure:
{{
    "overall_score": <int 0-100>,
    "skill_score": <int 0-100>,
    "gap_analysis": [
        {{"skill": "<skill name>", "in_resume": <bool>, "required": <bool>}},
        ...
    ],
    "suggestions": [
        {{"original": "<original resume text>", "rewrites": ["<rewrite 1>", "<rewrite 2>", "<rewrite 3>"]}},
        ...
    ]
}}

Analyze thoroughly and provide actionable suggestions."""
        
        # Call Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Strip markdown fences
        response_text = strip_markdown_fences(response_text)
        
        # Parse JSON response
        result = json.loads(response_text)
        
        return result
        
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse Gemini response: {str(e)}"}
    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
