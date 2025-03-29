import lancedb
import pathway as pw
import pandas as pd
from datetime import datetime

class VectorPipeline:
    def __init__(self, input_path):
        self.input_path = input_path
        
        # Define schema for your CSV data
        self.schema = pw.schema_from_types(
            transaction_id=int,
            date=datetime,
            amount=float,
            description=str,
            category=str
        )
        
    def process_csv(self):
        # Read CSV using Pathway
        data = pw.io.csv.read(
            self.input_path,
            schema=self.schema,
            mode="streaming"
        )
        
        # Add embedding column (example using description)
        data += data.select(
            vector=pw.apply(self.generate_embedding, pw.this.description)
        )
        
        return data
    
    @staticmethod
    def generate_embedding(text: str) -> list[float]:
        """
        Generate embeddings using your preferred model
        Example using a simple TF-IDF approach (replace with actual embedding model)
        """
        from sklearn.feature_extraction.text import TfidfVectorizer
        vectorizer = TfidfVectorizer()
        return vectorizer.fit_transform([text]).toarray()[0].tolist()
    
    def to_vector_db(self, data):
        """
        Store processed data to vector database
        """
        # Example using LanceDB (install via: pip install lancedb)
        db = lancedb.connect("./vector_db")
        table = db.create_table(
            "transactions",
            data=[
                {
                    "vector": row.vector,
                    "text": row.description,
                    "metadata": {
                        "amount": row.amount,
                        "date": row.date,
                        "category": row.category
                    }
                }
                for row in data
            ]
        )
        return table