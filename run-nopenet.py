#!/usr/bin/env python3
import os
import subprocess
import sys
import time
import webbrowser
import signal
import threading

processes = []

def signal_handler(sig, frame):
    print("\nShutting down NopeNet...")
    for process in processes:
        if process.poll() is None:  # If process is still running
            if sys.platform == 'win32':
                subprocess.call(['taskkill', '/F', '/T', '/PID', str(process.pid)])
            else:
                process.terminate()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

# Get the directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))

def run_backend():
    print("Starting backend server...")
    os.chdir(base_dir)
    backend_process = subprocess.Popen(
        [sys.executable, os.path.join("server", "app.py")],
        cwd=base_dir
    )
    processes.append(backend_process)
    return backend_process

def run_frontend():
    print("Starting frontend...")
    os.chdir(base_dir)
    # Go back to using npm run dev which uses the project's package.json
    frontend_cmd = "npm.cmd" if sys.platform == 'win32' else "npm"
    frontend_process = subprocess.Popen(
        [frontend_cmd, "run", "dev"],
        cwd=base_dir
    )
    processes.append(frontend_process)
    return frontend_process

def main():
    print("Starting NopeNet application...")
    
    # Ensure .env.local exists
    env_file = os.path.join(base_dir, ".env.local")
    if not os.path.exists(env_file):
        print("Creating default .env.local file...")
        with open(env_file, 'w') as f:
            f.write("OPENAI_API_KEY=\n")
            f.write("NEXT_PUBLIC_APP_URL=http://localhost:3000\n")
            f.write("NODE_ENV=development\n")
        print("Please update .env.local with your OpenAI API key if needed.")
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=run_backend)
    backend_thread.daemon = True
    backend_thread.start()
    
    # Give the backend a moment to start
    time.sleep(2)
    
    # Start frontend
    frontend_process = run_frontend()
    
    # Open browser after a short delay
    time.sleep(5)
    print("Opening NopeNet in browser...")
    webbrowser.open("http://localhost:3000")
    
    try:
        # Keep the script running until frontend exits
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nShutting down NopeNet...")
    finally:
        signal_handler(None, None)

if __name__ == "__main__":
    main() 