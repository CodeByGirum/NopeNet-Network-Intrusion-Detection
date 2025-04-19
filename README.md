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

## Quick Start (One-Click Installation)

We've created one-click installers to make the setup process as simple as possible:

### Windows:
1. Download the repository
2. Right-click on `install-nopenet.bat` and select "Run as administrator"
3. Follow the on-screen instructions

### Linux/macOS:
1. Download the repository
2. Make the installer executable: `chmod +x install-nopenet.sh`
3. Run the installer: `./install-nopenet.sh`
4. Follow the on-screen instructions

The installers will automatically:
- Check prerequisites
- Set up required environment
- Create a desktop shortcut
- Start the application

## Installation Options

### Option 1: Docker Installation (Recommended)

Docker provides the easiest way to install and run NopeNet with a single command, handling all dependencies automatically.

**Prerequisites:**
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Quick Start:**
1. Clone the repository
2. Set up your OpenAI API key in `.env.local`
3. Run `docker-compose up -d`

For detailed Docker installation instructions, see [DOCKER_INSTALL.md](DOCKER_INSTALL.md)

### Option 2: Manual Installation

1. Open your terminal (Command Prompt, PowerShell, or Terminal on macOS/Linux).
   Make sure you have Git installed. If not, install it from [https://git-scm.com](https://git-scm.com).

2. Clone the NopeNet repository from GitHub using the following command:

   ```
   git clone https://github.com/CodeByGirum/NopeNet-Network-Intrusion-Detection
   cd NopeNet-Network-Intrusion-Detection
   ```

3. Install frontend dependencies:

   ```
   npm install
   ```

4. Install backend dependencies:

   ```
   pip install -r server/requirements.txt
   ```

5. **Get your OpenAI API key** (needed for the chat assistant to work):\
   Go to: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

6. **Create a ****************************************************************************************************************************************************************************************************************************************************************************************************************************************************`.env.local`**************************************************************************************************************************************************************************************************************************************************************************************************************************************************** file in the project folder** (in the root, next to `package.json`) and add this line:

   ```
   OPENAI_API_KEY=your-api-key-here
   ```

   Replace `your-api-key-here` with your actual OpenAI API key.\
   You must do this before running the app or the chat assistant will not work.

7. Run the app:

   ```
   npm run dev
   ```

8. Go to your browser and paste:

   ```
   http://localhost:3000
   ```



### 🎉 **You're all set!**

---

## Desktop Shortcuts

NopeNet includes scripts to create desktop shortcuts for easy starting:

### Windows
Run `create-desktop-shortcut.bat` to create a desktop icon automatically.

### Linux and macOS
Follow the instructions in [DOCKER_INSTALL.md](DOCKER_INSTALL.md) to set up desktop shortcuts.

---

## Installation Verification

To verify your installation is working correctly, use the [INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md) file included in this repository.

---

# *Optional (To start components separately)*

Start the frontend:

```
npm run start:client
```

Open another terminal and start the backend:

```
npm run start:server
```

The application will be available at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

---

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

