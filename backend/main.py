# from fastapi import FastAPI, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pathlib import Path
# import os

# app = FastAPI()

# # Configure CORS (adjust for your frontend URL)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust if needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Relative path to your downloads folder
# UPLOAD_DIR = Path("downloads")

# # Create directory if it doesn't exist
# UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# @app.post("/upload")
# async def upload_files(files: list[UploadFile] = File(...)):
#     try:
#         saved_files = []

#         for file in files:
#             if not file.filename:
#                 raise HTTPException(400, detail="No filename provided")

#             file_path = UPLOAD_DIR / file.filename

#             with open(file_path, "wb") as buffer:
#                 while chunk := await file.read(1024 * 1024):  # 1MB chunks
#                     buffer.write(chunk)

#             saved_files.append({
#                 "filename": file.filename,
#                 "saved_path": str(file_path)
#             })

#         return {"status": "success", "files": saved_files}

#     except Exception as e:
#         raise HTTPException(500, detail=f"Upload failed: {str(e)}")

# @app.get("/")
# def health_check():
#     return {"status": "Backend is running"}
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os
from run import execute_curl_command
import subprocess
import json

app = FastAPI()

# Configure CORS (adjust for your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
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


@app.get("/send_prompt")
def do_something():
    print("The error is prevalent")


@app.post('/send_prompt')
async def send_prompt(data: dict):
    try:
        prompt = data.get('query')
        user = data.get('user', 'default_user')  # Provide default user if not provided
        
        if not prompt:
            raise HTTPException(status_code=400, detail='Prompt is required')
            
        print(f"Processing prompt from user {user}: {prompt}")
        
        # Execute the curl command to the Pathway service
        [response_data, result] = execute_curl_command(user, prompt)
        
        # Check for errors in the result
        if isinstance(response_data, dict) and "error" in response_data:
            raise HTTPException(status_code=500, detail=response_data["error"])
            
        return {"response": response_data}

    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        print(f"Error in send_prompt: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# import subprocess
# import json

# def execute_curl_command(user, prompt):
#     """
#     Executes a curl command with a POST request, sending a JSON payload.

#     Args:
#     - user (str): The user identifier.
#     - prompt (str): The prompt/query to send.

#     Returns:
#     - list: A list containing the JSON response and the result from subprocess.
#     """
#     # Create the JSON payload
#     payload = json.dumps({"query": prompt, "user": user})
    
#     # Prepare the curl command
#     curl_command = [
#         'curl', '-X', 'POST', 'http://localhost:8003/send_prompt',
#         '-H', 'Content-Type: application/json', '-d', payload
#     ]
    
#     try:
#         # Execute the curl command using subprocess
#         result = subprocess.run(curl_command, capture_output=True, text=True, check=True)
        
#         # Get the response text
#         response_text = result.stdout.strip().strip('"')
        
#         # Parse the response text into a JSON object
#         response_data = json.loads(response_text)
        
#         # Return the parsed response data and the subprocess result for debugging
#         return [response_data, result]
    
#     except subprocess.CalledProcessError as e:
#         # Handle errors from subprocess (e.g., curl failures)
#         print(f"Error executing curl: {e}")
#         return {"error": f"Command failed with exit code {e.returncode}", "output": e.output}
    
#     except json.JSONDecodeError as e:
#         # Handle errors in case the response is not valid JSON
#         print(f"Error parsing JSON: {e}")
#         return {"error": "Failed to decode JSON response"}
    
#     except Exception as e:
#         # Catch any other unexpected exceptions
#         print(f"An unexpected error occurred: {e}")
#         return {"error": str(e)}

