from uagents import Agent, Context, Model
import google.generativeai as genai
import os
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Initialize the agent
enchance_prompt = Agent(
    name="query_handler",
    seed=os.getenv("ENHANCER_AGENT_SEED"),
    port=8004,
    endpoint=["http://localhost:8004/submit"],
)

# Configure Gemini AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro-latest')

# Message models (must match finance_agent.py)
class AnalysisRequest(Model):
    question: str
    csv_data: str

class AnalysisResponse(Model):
    answer: str

def enhance_prompt(original_question: str) -> str:
    """"""
    enhancement_prompt = f"""
    The following is a user question about financial data analysis. 
    Please enhance it to be more precise and suitable for analysis of transaction data.
    Keep the core intent but make it more analytical and specific.
    Add any relevant context about typical financial analysis if helpful.
    
    Original question: {original_question}
    And from all the prompts you give, give me the prompt by combining all the important things from all the prompts
    I want a single prompt of 4-5 lines or less
    Enhanced version:
    """
    
    try:
        response = model.generate_content(enhancement_prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error enhancing prompt: {e}")
        return original_question

@enchance_prompt.on_message(model=AnalysisRequest)
async def handle_query(ctx: Context, sender: str, msg: AnalysisRequest):
    ctx.logger.info(f"Received query from {sender}")
    
    # Enhance the question
    enhanced_question = enhance_prompt(msg.question)
    # ctx.logger.info(f"Enhanced question: {enhanced_question}")
    
    # Send back the enhanced question
    await ctx.send(sender, AnalysisResponse(answer=enhanced_question))

if __name__ == "__main__":
    print(f"Query Handler address: {enchance_prompt.address}")
    enchance_prompt.run()