from uagents import Agent, Context, Model
import os
from dotenv import load_dotenv
import pandas as pd
import json
from pathlib import Path
from typing import List, Dict

# Load environment variables
load_dotenv()

# Initialize agent
csv_processor = Agent(
    name="csv_to_jsonl_processor",
    seed=os.getenv("AGENT_SEED"),
    port=8005,
    endpoint=["http://localhost:8005/submit"],
)

# Message models
class CSVProcessRequest(Model):
    input_path: str
    output_path: str
    columns_to_keep: List[str] = None
    rename_columns: Dict[str, str] = None

class CSVProcessResponse(Model):
    success: bool
    message: str
    records_processed: int = 0
    output_file: str = ""

def process_csv_to_jsonl(input_path: str, output_path: str, columns: List[str] = None, rename_map: Dict[str, str] = None) -> Dict:
    """Convert CSV to JSONL by storing each line as a string"""
    try:
        # Read CSV
        with open(input_path, 'r', encoding='utf-8') as csv_file:
            lines = csv_file.readlines()
        
        # If columns are specified, we need to process with pandas to filter columns
        if columns or rename_map:
            df = pd.read_csv(input_path)
            
            # Column selection
            if columns:
                df = df[columns]
                
            # Column renaming
            if rename_map:
                df = df.rename(columns=rename_map)
            
            # Convert back to CSV lines
            lines = [df.columns.to_list()] + df.values.tolist()
            lines = [','.join(map(str, line)) for line in lines]
        
        # Ensure output directory exists
        output_dir = os.path.dirname(output_path)
        if output_dir:
            Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Write JSONL (each line as a string in JSON format)
        with open(output_path, 'w', encoding='utf-8') as f:
            for line in lines:
                # Create a JSON object with the line as a string
                json.dump({"line": line.strip()}, f)
                f.write('\n')
        
        return {
            "success": True,
            "records": len(lines),
            "output_file": os.path.abspath(output_path)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@csv_processor.on_message(model=CSVProcessRequest, replies=CSVProcessResponse)
async def handle_csv_conversion(ctx: Context, sender: str, msg: CSVProcessRequest):
    ctx.logger.info(f"Received CSV processing request for {msg.input_path}")
    
    # Process the file
    result = process_csv_to_jsonl(
        input_path=msg.input_path,
        output_path=msg.output_path,
        columns=msg.columns_to_keep,
        rename_map=msg.rename_columns
    )
    
    # Send response
    response = CSVProcessResponse(
        success=result["success"],
        message="File processed successfully" if result["success"] else f"Error: {result['error']}",
        records_processed=result.get("records", 0),
        output_file=result.get("output_file", "")
    )
    
    await ctx.send(sender, response)
    
    if result["success"]:
        ctx.logger.info(f"Processed {result['records']} records to {result['output_file']}")
    else:
        ctx.logger.error(f"Processing failed: {result['error']}")

if __name__ == "__main__":
    # Example usage (in production, these would come from agent messages)
    EXAMPLE_INPUT = "data/Daily_Household_Transactions.csv"
    EXAMPLE_OUTPUT = "data/output.jsonl"
    
    # Create sample CSV if it doesn't exist
    if not os.path.exists(EXAMPLE_INPUT):
        sample_data = """Date,Category,Amount
2023-01-01,Food,1500
2023-01-02,Transport,500
2023-01-03,Entertainment,2000"""
        with open(EXAMPLE_INPUT, 'w') as f:
            f.write(sample_data)
    
    print(f"\n🔷 CSV Processor Agent address: {csv_processor.address}")
    print("🟢 Agent ready to process CSV files")
    print(f"\nTry this example command:")
    print(f"curl -X POST -H 'Content-Type: application/json' -d '")
    print(f'{{"input_path": "{EXAMPLE_INPUT}", "output_path": "{EXAMPLE_OUTPUT}"}}')
    print(f"' http://localhost:8005/submit")
    
    # Demonstrate processing
    print("\n📄 Sample CSV to JSONL Conversion:")
    test_result = process_csv_to_jsonl(
        input_path=EXAMPLE_INPUT,
        output_path=EXAMPLE_OUTPUT
    )
    
    if test_result["success"]:
        print(f"Successfully created {test_result['output_file']}")
        print("First few lines:")
        with open(test_result["output_file"], 'r') as f:
            for i, line in enumerate(f):
                if i < 3:  # Show first 3 lines
                    print(line.strip())
                else:
                    break
    else:
        print(f"Error: {test_result['error']}")
    
    csv_processor.run()