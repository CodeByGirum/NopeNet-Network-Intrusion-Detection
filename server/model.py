import joblib
import numpy as np
import os
import pandas as pd
from typing import List, Dict, Any, Union

# Path to the model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'model', 'XGB_Model_With_Encoder.joblib')

class ModelPredictor:
    def __init__(self):
        self.model = None
        self.encoder = None
        self.load_model()
    
    def load_model(self):
        """Load the XGBoost model and encoder from the joblib file"""
        try:
            # Create model directory if it doesn't exist
            os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
            
            # Copy the model file if it doesn't exist
            if not os.path.exists(MODEL_PATH):
                import shutil
                upload_path = '/home/ubuntu/upload/XGB_Model_With_Encoder.joblib'
                shutil.copy(upload_path, MODEL_PATH)
            
            # Load the model
            model_data = joblib.load(MODEL_PATH)
            
            # Assuming the joblib file contains a dictionary with 'model' and 'encoder' keys
            if isinstance(model_data, dict):
                self.model = model_data.get('model')
                self.encoder = model_data.get('encoder')
            else:
                # If it's not a dictionary, assume it's just the model
                self.model = model_data
                self.encoder = None
            
            # If encoder is still None, try to load it from a separate file
            if self.encoder is None:
                encoder_path = os.path.join(os.path.dirname(MODEL_PATH), "label_encoder.joblib")
                if os.path.exists(encoder_path):
                    self.encoder = joblib.load(encoder_path)
                    print(f"Label encoder loaded from {encoder_path}")
            
            print(f"Model loaded successfully from {MODEL_PATH}")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise
    
    def preprocess_input(self, input_data: str) -> pd.DataFrame:
        """
        Preprocess the input data from KDD format to model input format
        
        Args:
            input_data: String containing KDD-formatted data (comma-separated values)
            
        Returns:
            DataFrame of preprocessed feature vectors ready for model prediction
        """
        # Split the input data into lines
        lines = input_data.strip().split('\n')
        
        # Define column names for KDD data
        # These are standard KDD Cup 1999 feature names
        column_names = [
            'duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
            'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in',
            'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations',
            'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login',
            'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
            'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
            'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
            'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
            'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate',
            'dst_host_rerror_rate', 'dst_host_srv_rerror_rate', 'label'
        ]
        
        # Parse the data into a list of lists
        data_rows = []
        for line in lines:
            features = line.split(',')
            
            # Ensure we have the right number of features
            if len(features) >= 41:  # At least 41 features (may include label)
                # If there are more than 41 features, the last one is the label
                if len(features) > 41:
                    features = features[:41]
                
                # Convert numeric features to appropriate types
                processed_features = []
                for i, feature in enumerate(features):
                    # Categorical features in KDD are typically at indices 1, 2, 3
                    if i in [1, 2, 3]:
                        processed_features.append(feature)
                    else:
                        # Convert numeric features to float
                        try:
                            processed_features.append(float(feature))
                        except ValueError:
                            # If conversion fails, keep as string
                            processed_features.append(feature)
                
                data_rows.append(processed_features)
        
        # Create a DataFrame with the appropriate column names
        df = pd.DataFrame(data_rows, columns=column_names[:len(data_rows[0])])
        
        # Handle categorical features
        # For simplicity, we'll use one-hot encoding for categorical features
        categorical_features = ['protocol_type', 'service', 'flag']
        
        # Create dummy variables for categorical features
        for feature in categorical_features:
            if feature in df.columns:
                # Get dummies and keep the original column
                dummies = pd.get_dummies(df[feature], prefix=feature, drop_first=False)
                df = pd.concat([df, dummies], axis=1)
        
        return df
    
    def predict(self, input_data: str) -> List[Dict[str, Any]]:
        """
        Make predictions using the loaded model
        
        Args:
            input_data: String containing KDD-formatted data
            
        Returns:
            List of dictionaries containing prediction results
        """
        try:
            # Validate input format first
            lines = input_data.strip().split('\n')
            if not lines:
                raise ValueError("Input data is empty")
            
            for i, line in enumerate(lines):
                fields = line.split(',')
                if len(fields) < 41:
                    raise ValueError(f"Line {i+1} has invalid KDD format: found {len(fields)} fields, expected 41.")
                
                # Check for required categorical features
                if fields[1].strip() == "":
                    raise ValueError(f"Line {i+1} has empty 'protocol_type' (field 2). Expected values: tcp, udp, icmp")
                if fields[2].strip() == "":
                    raise ValueError(f"Line {i+1} has empty 'service' (field 3). Expected values: http, ftp, smtp, etc.")
                if fields[3].strip() == "":
                    raise ValueError(f"Line {i+1} has empty 'flag' (field 4). Expected values: SF, S0, REJ, etc.")
            
            # Preprocess the input data
            df = self.preprocess_input(input_data)
            
            # Make predictions
            if self.model:
                # Since we don't know the exact model structure, we'll use a fallback approach
                # First try with the DataFrame as is
                try:
                    # Get raw predictions
                    raw_predictions = self.model.predict(df)
                    probabilities = self.model.predict_proba(df)
                except Exception as e1:
                    print(f"First prediction attempt failed: {e1}")
                    
                    # If that fails, try with just the numeric columns
                    try:
                        numeric_df = df.select_dtypes(include=['number'])
                        raw_predictions = self.model.predict(numeric_df)
                        probabilities = self.model.predict_proba(numeric_df)
                    except Exception as e2:
                        print(f"Second prediction attempt failed: {e2}")
                        # Instead of using simulated predictions, raise a clear error
                        raise ValueError(f"Model prediction failed. Please ensure your data is in the correct KDD format. Error details: {e2}")
                
                # Map attack types to categories
                attack_mapping = {
                    'normal': 'normal',
                    'neptune': 'DOS', 'smurf': 'DOS', 'pod': 'DOS', 'teardrop': 'DOS', 'land': 'DOS', 'back': 'DOS',
                    'portsweep': 'Probe', 'ipsweep': 'Probe', 'satan': 'Probe', 'nmap': 'Probe',
                    'guess_passwd': 'R2L', 'ftp_write': 'R2L', 'imap': 'R2L', 'phf': 'R2L', 'multihop': 'R2L', 
                    'warezmaster': 'R2L', 'warezclient': 'R2L', 'spy': 'R2L',
                    'buffer_overflow': 'U2R', 'rootkit': 'U2R', 'loadmodule': 'U2R', 'perl': 'U2R'
                }
                
                # Process results
                results = []
                for i, (pred, probs) in enumerate(zip(raw_predictions, probabilities)):
                    # Get the predicted class and its probability
                    if self.encoder is not None:
                        predicted_class = self.encoder.inverse_transform([pred])[0]
                    else:
                        predicted_class = str(pred)
                    confidence = float(max(probs)) if hasattr(probs, '__iter__') else 0.95
                    
                    # Map to attack category
                    attack_type = attack_mapping.get(predicted_class, 'unknown')
                    if attack_type == 'unknown':
                        # Try to determine category based on naming patterns
                        if any(dos_pattern in predicted_class for dos_pattern in ['dos', 'flood', 'ddos']):
                            attack_type = 'DOS'
                        elif any(probe_pattern in predicted_class for probe_pattern in ['scan', 'probe']):
                            attack_type = 'Probe'
                        elif any(r2l_pattern in predicted_class for r2l_pattern in ['r2l', 'remote']):
                            attack_type = 'R2L'
                        elif any(u2r_pattern in predicted_class for u2r_pattern in ['u2r', 'root', 'privilege']):
                            attack_type = 'U2R'
                        else:
                            # Default to DOS for unknown attacks
                            attack_type = 'DOS'
                    
                    # Extract protocol and flag from the original data
                    original_features = input_data.strip().split('\n')[i].split(',')
                    protocol = original_features[1] if len(original_features) > 1 else 'unknown'
                    flag = original_features[3] if len(original_features) > 3 else 'unknown'
                    
                    # Create timestamp
                    from datetime import datetime
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    
                    # Add to results
                    results.append({
                        'timestamp': timestamp,
                        'protocol': protocol,
                        'flag': flag,
                        'attackType': attack_type,
                        'rawPrediction': predicted_class,
                        'confidence': confidence
                    })
                
                return results
            else:
                raise ValueError("Model not loaded")
        except Exception as e:
            print(f"Error making prediction: {e}")
            # Instead of returning simulated results, propagate the error
            raise ValueError(f"Error processing your input data: {str(e)}")

# Singleton instance
predictor = None

def get_predictor():
    """Get or create the model predictor singleton"""
    global predictor
    if predictor is None:
        predictor = ModelPredictor()
    return predictor
