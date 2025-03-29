class FinanceAgent:
    def __init__(self):
        self.budget_rules = {
            "essential": 0.5,
            "savings": 0.2,
            "discretionary": 0.3
        }
    
    def ask(self, question: str, context: list):
        # Simple mock implementation - replace with actual FetchAI integration
        total = sum(t["amount"] for t in context)
        
        if "afford" in question.lower():
            amount = float(''.join(c for c in question if c.isdigit() or c == '.'))
            return f"Based on your recent spending (${total:.2f}), {'yes' if amount < total*0.1 else 'no'}."
        
        elif "biggest expense" in question.lower():
            if not context:
                return "No transactions found"
            biggest = max(context, key=lambda x: x["amount"])
            return f"Your biggest expense was ${biggest['amount']:.2f} on {biggest['description']}."
        
        return f"I analyzed your ${total:.2f} in transactions. Please be more specific with your question."