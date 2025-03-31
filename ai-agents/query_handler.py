from uagents import Agent, Context, Model
import os
from dotenv import load_dotenv
import google.generativeai as genai

import pandas as pd
from io import StringIO

# Load environment variables
load_dotenv()

# Initialize agent
agent = Agent(
    name="gemini_query_handler",
    seed=os.getenv("AGENT_SEED"),
    port=8000,
    endpoint=["http://localhost:8000/submit"],
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Message models (same structure for compatibility)
class AnalysisRequest(Model):
    question: str
    csv_data: str

class AnalysisResponse(Model):
    answer: str

def analyze_with_gemini(question: str, csv_data: str) -> str:
    try:
        # Initialize model
        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        
        # Process CSV data
        df = pd.read_csv(StringIO(csv_data))
        
        # Create structured prompt
        prompt = f"""**Finance Data Analysis - Complete Transaction Review**

**Complete Transaction Dataset (All {len(df)} Records):**
<FULL_DATA>
{df.to_string()}
</FULL_DATA>

**User Question:**
"{question}"

**Analysis Requirements:**
1. PROCESS ALL RECORDS - Never skip or sample data
2. First verify question can be answered from these exact columns: 
   {', '.join(df.columns)}
3. For any numbers, show both individual components and totals
4. Always include the transaction count in answers

**Response Format Rules:**
[HEADER] 
Answer: [1-2 sentence summary]
[BREAKDOWN] 
- [Category/Subcategory]: ₹X (Y transactions)
[DETAILS] 
[Optional specific examples if <5 transactions]

**Current Dataset Properties:**
- Total Records: {len(df)} transactions
- Date Range: {df['Date'].min()} to {df['Date'].max()}
- Amount Range: ₹{df['Amount'].min()} to ₹{df['Amount'].max()}
- Categories: {', '.join(sorted(df['Category'].unique()))}
- Payment Methods: {', '.join(sorted(df['Mode'].unique()))}

**Mandatory Verification Steps:**
1. Check all dates are in DD-MM-YYYY format
2. Confirm "Amount" column contains no text/null values
3. Verify "Income/Expense" labels are consistent

**Example Outputs:**
Q: "Total food spending?"
A: "Answer: ₹792 across 4 food transactions
BREAKDOWN:
- Snacks: ₹60 (1)
- Grocery: ₹46 (1)  
- Lunch: ₹650 (1)
- Milk: ₹36 (1)"

Q: "September subscriptions?"
A: "Answer: ₹1,168 in 4 subscriptions
DETAILS:
- 19/09: Netflix ₹199
- 17/09: Mobile ₹19
- 15/09: Tata Sky ₹200
- 12/09: Mobile ₹667"

**Now analyze ALL records and answer:**
"{question}"
"""
        
        # Generate response
        response = model.generate_content(
            prompt,
            
            safety_settings={
                "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
                "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
                "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
                "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
            }
        )
        
        return response.text
        
    except Exception as e:
        return f"Gemini analysis error: {str(e)}"

@agent.on_message(model=AnalysisRequest, replies=AnalysisResponse)
async def handle_analysis(ctx: Context, sender: str, msg: AnalysisRequest):
    ctx.logger.info(f"Received analysis request: {msg.question[:100]}...")  # Log first 100 chars
    
    answer = analyze_with_gemini(msg.question, msg.csv_data)
    
    await ctx.send(sender, AnalysisResponse(answer=answer))
    ctx.logger.info("Analysis completed")

if __name__ == "__main__":
    print(f"Gemini Agent address: {agent.address}")
    print("Ready to receive analysis requests...")
    agent.run()