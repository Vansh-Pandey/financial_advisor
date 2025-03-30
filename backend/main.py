from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os

app = FastAPI()

# Configure CORS (adjust for your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001/"],  # Your Vite frontend
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Relative path to your downloads folder
UPLOAD_DIR = Path("downloads")

# Create directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    try:
        saved_files = []

        for file in files:
            if not file.filename:
                raise HTTPException(400, detail="No filename provided")

            file_path = UPLOAD_DIR / file.filename

            with open(file_path, "wb") as buffer:
                while chunk := await file.read(1024 * 1024):  # 1MB chunks
                    buffer.write(chunk)

            saved_files.append({
                "filename": file.filename,
                "saved_path": str(file_path)
            })

        return {"status": "success", "files": saved_files}

    except Exception as e:
        raise HTTPException(500, detail=f"Upload failed: {str(e)}")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}