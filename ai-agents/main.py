 
from uagents import Bureau
# from query_handler import agent
from finance_agent import user
from enhancer_prompt import enchance_prompt
 
if __name__ == "__main__":
    bureau = Bureau(endpoint="http://127.0.0.1:8002/submit", port=8002)
    print(f"Adding RAG agent to Bureau: {user.address}")
    bureau.add(user)
    print(f"Adding enhance_prompt agent to Bureau: {enchance_prompt.address}")
    bureau.add(enchance_prompt)
    bureau.run()
 