from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os

app = FastAPI()

# Configure CORS (adjust for your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite frontend
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Absolute path to your downloads folder
UPLOAD_DIR = Path(r"C:\Users\Vansh\Desktop\finance_tracker\backend\downloads")

# Create directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Validate file has a name
        if not file.filename:
            raise HTTPException(400, detail="No filename provided")
        
        # Create complete file path
        file_path = UPLOAD_DIR / file.filename
        
        # Save file in chunks (memory efficient)
        with open(file_path, "wb") as buffer:
            while chunk := await file.read(1024 * 1024):  # 1MB chunks
                buffer.write(chunk)
        
        return {
            "status": "success",
            "saved_path": str(file_path),
            "filename": file.filename
        }
        
    except Exception as e:
        raise HTTPException(500, detail=f"Upload failed: {str(e)}")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}  