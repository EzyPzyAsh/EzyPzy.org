from flask import Flask, request, jsonify
import os
import threading
import time

app = Flask(__name__)

# --- Configuration ---
UPLOAD_DIR = "/var/www/ezypzy.org/html/file-get/uploads"
MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024  # 2 GB
MARKER_FILE = os.path.join(UPLOAD_DIR, ".upload_done")

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Persistent flag check (survive restarts)
upload_done = os.path.exists(MARKER_FILE)

# --- Helper function to shutdown server after response ---
def exit_after_response():
    time.sleep(0.5)  # small delay to let response finish
    os._exit(0)

# --- Upload route ---
@app.route("/upload", methods=["POST"])
def upload():
    global upload_done

    # Check if already uploaded
    if upload_done:
        return jsonify({"message": "Upload already done"}), 403

    # Get the uploaded file
    f = request.files.get("file")
    if not f:
        return jsonify({"message": "No file provided"}), 400

    # Check file size
    f.seek(0, os.SEEK_END)
    size = f.tell()
    f.seek(0)
    if size > MAX_FILE_SIZE:
        return jsonify({"message": "File too large"}), 413

    # Save file
    filepath = os.path.join(UPLOAD_DIR, f.filename)
    f.save(filepath)

    # Mark as done (persistent)
    open(MARKER_FILE, "w").close()
    upload_done = True

    # Shutdown server after response
    threading.Thread(target=exit_after_response).start()

    return jsonify({"message": "Upload successful", "filename": f.filename})

# --- Optional test route ---
@app.route("/")
def index():
    return "Uploader running! Use /upload to POST a file."

# --- Run the app ---
if __name__ == "__main__":
    # For development/testing
    app.run(host="0.0.0.0", port=5000)
    # For production, run with gunicorn:
    # gunicorn -w 1 -b 0.0.0.0:5000 app:app

