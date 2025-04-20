![Nopenet1](https://github.com/user-attachments/assets/00cbd777-7008-48ce-b9e0-e306b9b73822)

# **NopeNet** 

## Network Intrusion Detection System

Most cybersecurity tools are too complicated and can't keep up with modern attacks. People often don't understand what's going on or what to do when a threat happens. NopeNet fixes this with a simple and clear dashboard, and an AI assistant that explains things in plain language. It uses machine learning to catch new threats and reaches over 99% average accuracy.

---

## Features

- **Attack Classification**: Identify and categorize different types of network attacks
- **Interactive Dashboard**: Visualize network traffic and detected threats
- **Test using real attacks**: Generate and test with randomized sampled network traffic attacks
- **Security Recommendations**: Receive detailed security recommendations based on scan results
- **NopeNet AI Chat Assistant**: Engage with our intelligent chat interface that understands your network context, answers security questions, and helps investigate potential threats in real-time
- **Results Visualization**: View detailed analysis results and visualizations
- **NopeNet Resources Page:** Explore different types of network attacks from the KDD dataset and learn about intrusion detection techniques.
- **Articles & Research:** Provides academic papers used to build this project.

---

## Technologies Used

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **OpenAI API** (optional for basic detection, required for the chat feature)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/CodeByGirum/NopeNet-Network-Intrusion-Detection
   cd NopeNet-Network-Intrusion-Detection
   ```

2. Install dependencies:
   ```
   npm install
   pip install -r server/requirements.txt
   ```

3. Set up your OpenAI API key (optional for basic features, required for chat):
   Create a `.env.local` file in the root directory with:
   ```
   OPENAI_API_KEY=your-api-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   ```

## Running the Application

### Option 1: Quick Start (Recommended)
Run the application using our simple Python script that handles everything:
```
python run-nopenet.py
```

### Option 2: Manual Start
1. Start the backend:
   ```
   python server/app.py
   ```

2. In another terminal, start the frontend:
   ```
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:3000

## API Endpoints

- `GET /`: API status check
- `POST /predict`: Submit network traffic data for analysis
- `POST /validate`: Validate KDD format of input data
- `GET /sample`: Retrieve a sample of network traffic data generated from a large collection of previously gathered real network attack packets.

## Input Data Format

NopeNet processes network traffic data formatted according to the [KDD Cup 1999](https://www.kdd.org/kdd-cup/view/kdd-cup-1999/Tasks) standard, which includes 41 features for each network packet. Example format:

```
0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal
```

## Model

The system uses an XGBoost classifier trained on the [KDD Cup 1999 dataset](https://www.kdd.org/kdd-cup/view/kdd-cup-1999/Tasks) to detect and classify network attacks into categories:

- Normal traffic
- DOS (Denial of Service)
- Probe (Surveillance/scanning)
- R2L (Unauthorized access from remote machine)
- U2R (Unauthorized access to root privileges)

## Future Improvements

- Integration with real-time network monitoring tools
- Continuous model retraining with new attack patterns
- Ensemble methods for higher accuracy
- Anomaly detection for zero-day attack identification
- Expanded visualization options for security analysts

## License

[MIT License](LICENSE)

