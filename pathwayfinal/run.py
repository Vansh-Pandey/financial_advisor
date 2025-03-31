import subprocess
import json

# Create the JSON payload for curl
payload = json.dumps({"query": "I have 500 dollars in my account , should I buy a coffee", "user": "user123"})

# Execute the curl command using subprocess
curl_command = [
    'curl', '-X', 'POST', 'http://localhost:8003/send_prompt',
    '-H', 'Content-Type: application/json',
    '-d', payload
    ]

result = subprocess.run(curl_command, capture_output=True, text=True)
response_text = result.stdout.strip().strip('"')

print(response_text)
