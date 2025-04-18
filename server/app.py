from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
import json
from model import get_predictor

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    input_data: str

class PredictionResponse(BaseModel):
    results: List[Dict[str, Any]]
    totalPackets: int
    attacksDetected: int
    processingTime: str

@app.get("/")
async def root():
    return {"message": "NopeNet API is running"}

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # Get the model predictor
        predictor = get_predictor()
        
        # Make predictions
        results = predictor.predict(request.input_data)
        
        # Count non-normal packets as attacks
        attacks_detected = sum(1 for r in results if r['attackType'] != 'normal')
        
        # Calculate processing time (simulated)
        import random
        processing_time = f"{(random.random() * 2 + 0.5):.1f}s"
        
        # Return the response
        return PredictionResponse(
            results=results,
            totalPackets=len(results),
            attacksDetected=attacks_detected,
            processingTime=processing_time
        )
    except Exception as e:
        # Return a more informative error
        error_message = str(e)
        # Get a readable error message
        if "KDD format" in error_message:
            status_code = 400  # Bad Request
        else:
            status_code = 500  # Internal Server Error
            
        raise HTTPException(
            status_code=status_code, 
            detail={
                "error": error_message,
                "format_example": "0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal",
                "columns": [
                    "duration", "protocol_type", "service", "flag", "src_bytes", "dst_bytes",
                    "land", "wrong_fragment", "urgent", "hot", "num_failed_logins", "logged_in",
                    "num_compromised", "root_shell", "su_attempted", "num_root", "num_file_creations",
                    "num_shells", "num_access_files", "num_outbound_cmds", "is_host_login",
                    "is_guest_login", "count", "srv_count", "serror_rate", "srv_serror_rate",
                    "rerror_rate", "srv_rerror_rate", "same_srv_rate", "diff_srv_rate",
                    "srv_diff_host_rate", "dst_host_count", "dst_host_srv_count",
                    "dst_host_same_srv_rate", "dst_host_diff_srv_rate", "dst_host_same_src_port_rate",
                    "dst_host_srv_diff_host_rate", "dst_host_serror_rate", "dst_host_srv_serror_rate",
                    "dst_host_rerror_rate", "dst_host_srv_rerror_rate", "label"
                ]
            }
        )

@app.post("/validate")
async def validate(request: PredictionRequest):
    try:
        # Simple validation of KDD format
        lines = request.input_data.strip().split('\n')
        if not lines:
            raise ValueError("Input data is empty")
        
        for line in lines:
            fields = line.split(',')
            if len(fields) < 41:
                raise ValueError(f"Invalid KDD format: line has {len(fields)} fields, expected at least 41")
        
        return {"valid": True, "message": "Input data is valid"}
    except Exception as e:
        return {"valid": False, "message": str(e)}

@app.get("/sample")
async def get_sample():
    try:
        import os
        import pandas as pd
        # Build absolute path to the CSV file
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        csv_path = os.path.join(base_dir, "Sample_data", "Dont_move_this_scan_file.csv")
        print("CSV path:", csv_path)

        df = pd.read_csv(csv_path, header=None)
        if len(df) >= 100:
            sample_df = df.sample(n=100)
        else:
            sample_df = df
        # Convert each row into a comma-separated string
        sample_lines = sample_df.astype(str).apply(lambda row: ",".join(row.values), axis=1).tolist()
        return {"sample_data": "\n".join(sample_lines)}
    except Exception as e:
        print(f"CSV sampling failed: {e}")
        import random
        # Fallback implementation
        attack_types = ["normal", "neptune", "portsweep", "satan", "pod", "guess_passwd", "buffer_overflow", 
                        "land", "back", "teardrop", "smurf", "nmap"]
        protocols = ["tcp", "udp", "icmp"]
        services = ["http", "private", "domain", "ftp", "smtp", "telnet", "eco_i", "finger", "auth", 
                    "pop_3", "sunrpc", "ssh", "name", "whois", "login", "shell", "imap4", "daytime", "time"]
        flags = ["SF", "S0", "REJ", "RSTO", "RSTOS0", "SH", "RSTR", "S1", "S2", "S3", "OTH"]

        num_lines = random.randint(5, 10)
        sample_data = []

        for _ in range(num_lines):
            attack_weights = [0.6] + [0.4/(len(attack_types)-1)] * (len(attack_types)-1)
            attack_type = random.choices(attack_types, weights=attack_weights, k=1)[0]
            protocol = random.choice(protocols)
            service = random.choice(services)
            flag = random.choice(flags)

            duration = random.randint(0, 2000)
            src_bytes = random.randint(0, 10000)
            dst_bytes = random.randint(0, 10000)
            logged_in = random.randint(0, 1)
            count = random.randint(1, 511)
            srv_count = random.randint(1, 511)

            error_rate = round(random.random(), 2)
            srv_error_rate = round(random.random(), 2)
            same_srv_rate = round(random.random(), 2)
            diff_srv_rate = round(random.random(), 2)

            dst_host_count = random.randint(0, 255)
            dst_host_srv_count = random.randint(0, 255)
            dst_host_same_srv_rate = round(random.random(), 2)
            dst_host_diff_srv_rate = round(random.random(), 2)

            line = (f"{duration},{protocol},{service},{flag},{src_bytes},{dst_bytes},0,0,0,0,0,{logged_in},"
                    f"0,0,0,0,0,0,0,0,0,0,{count},{srv_count},{error_rate},{srv_error_rate},0.00,0.00,"
                    f"{same_srv_rate},{diff_srv_rate},0.00,{dst_host_count},{dst_host_srv_count},"
                    f"{dst_host_same_srv_rate},{dst_host_diff_srv_rate},0.00,0.00,0.00,0.00,0.00,0.00,{attack_type}")
            sample_data.append(line)

        return {"sample_data": "\n".join(sample_data)}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
