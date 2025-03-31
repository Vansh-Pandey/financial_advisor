from uagents import Agent, Context, Model
# from uagents.setup import fund_agent_if_low
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize agent
user = Agent(
    name="finance_agent",
    seed=os.getenv("USER_SEED"),
    port=8001,
    endpoint=["http://localhost:8001/submit"],
)

# fund_agent_if_low(user.wallet.address())

# Message models
class AnalysisRequest(Model):
    question: str
    csv_data: str

class AnalysisResponse(Model):
    answer: str

def read_csv(file_path):
    try:
        df = pd.read_csv(file_path)
        return df.to_csv(index=False)
    except Exception as e:
        return f"Error reading CSV: {str(e)}"

@user.on_event("startup")
async def setup_analysis(ctx: Context):
    # Read CSV file
    csv_content = read_csv("/Users/devbhaskar/Desktop/DEV DOCUMENTS/ml-dl/frosthack/ai-agents/dummy.csv")
    
    if "Error" in csv_content:
        ctx.logger.error(csv_content)
        return
    
    # Get user question
    question = input("Enter your financial question: ")
     
    ctx.logger.info("Sending data for analysis...")
    
    # Send to query handler (update this address with your query handler's actual address)
    PROMPT_ENHANCER = "agent1qwduds5fywwqa5mmjkvug6nxm74w6xplprl68gmsypk6en0rkyhkw59r9dr"  # UPDATE THIS
    
    await ctx.send(
        PROMPT_ENHANCER,
        AnalysisRequest(question=question, csv_data=csv_content)
    )

@user.on_message(model=AnalysisResponse)
async def handle_response(ctx: Context, sender: str, msg: AnalysisResponse):
    ctx.logger.info(f"Received enhanced question:\n{msg.answer}")
    
    # Here you would typically send the enhanced question to another agent for actual analysis
    # For now we'll just print it
    # print("\nEnhanced question ready for analysis:")
    # print(msg.answer)

if __name__ == "__main__":
    print("Finance Agent address:", user.address)
    user.run()