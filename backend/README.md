# Flask Backend for IoT Study Space

## Setup

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration.

5. **Run the Flask server**:
   ```bash
   python app.py
   ```
   Or:
   ```bash
   flask run
   ```

The server will run on `http://localhost:5000`

## API Endpoints

- `GET /` - Home endpoint
- `GET /health` - Health check
- `GET /api/libraries` - Get all libraries
- `POST /api/libraries` - Create a new library

## Development

To run in development mode with auto-reload:
```bash
export FLASK_ENV=development
flask run
```

