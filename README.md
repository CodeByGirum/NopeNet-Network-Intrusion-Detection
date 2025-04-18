![Nopenet1](https://github.com/user-attachments/assets/00cbd777-7008-48ce-b9e0-e306b9b73822)


# NopeNet - Network Intrusion Detection System

NopeNet is a sophisticated yet user-friendly network security platform that detects intrusions with 99.8% average accuracy. By analyzing network traffic patterns, it spots and flags potential threats before they become problems. Highly accurate, and remarkably easy to use.

## Features


- **Attack Classification**: Identify and categorize different types of network attacks
- **Interactive Dashboard**: Visualize network traffic and detected threats
- **Test using real attacks**: Generate and test with randomized sampled network traffic attacks
- **Security Recommendations**: Receive detailed security recommendations based on scan results
- **NopeNet AI Chat Assistant**: Engage with our intelligent chat interface that understands your network context, answers security questions, and helps investigate potential threats in real-time
- **Results Visualization**: View detailed analysis results and visualizations

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Icon library

## Future Improvements

- Integration with real-time network monitoring tools
- Continuous model retraining with new attack patterns
- Ensemble methods for higher accuracy
- Anomaly detection for zero-day attack identification
- Expanded visualization options for security analysts

## Architecture

NopeNet consists of two main components:

- **Frontend**: Next.js application with React components and Tailwind CSS
- **Backend**: Python FastAPI server with machine learning models for traffic analysis

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nopenet
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   pip install -r server/requirements.txt
   ```

4. Build the frontend:
   ```
   npm run build
   ```

## Usage

### Start both frontend and backend with one command

```
npm run dev
```

This runs both the Next.js frontend and Python backend concurrently.

### Or start components separately

Start the frontend:
```
npm run start:client
```

Start the backend:
```
npm run start:server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

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

The system uses an XGBoost classifier trained on the KDD Cup 1999 dataset to detect and classify network attacks into categories:
- Normal traffic
- DOS (Denial of Service)
- Probe (Surveillance/scanning)
- R2L (Unauthorized access from remote machine)
- U2R (Unauthorized access to root privileges)

## Resources

- **Resources Directory**: Contains important assets and configurations
- **NopeNet Resources Page**: Explore different types of network attacks from the KDD dataset and learn about intrusion detection techniques.
- **Articles & Research**: Provides educational content and insights into network security.

## License

[MIT License](LICENSE)
