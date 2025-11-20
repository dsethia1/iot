Minimal Flask backend for iot-studyspace

This small server provides two areas of functionality:

- /favorites: GET/POST to list and add favorites, DELETE /favorites/<id> to remove
- /sensors: POST to ingest sensor readings (batch)

Requirements

- Python 3.10+ (3.11 recommended)

Setup (Windows cmd.exe)

```cmd
cd server
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
set FLASK_APP=app.py
set FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

Or run directly:

```cmd
cd server
python app.py
```

API examples

List favorites:

```cmd
curl http://localhost:5000/favorites
```

Add a favorite:

```cmd
curl -X POST http://localhost:5000/favorites -H "Content-Type: application/json" -d "{\"id\":\"lib-123\", \"title\":\"My Lib\", \"meta\": {\"notes\":\"test\"}}"
```

Ingest sensors:

```cmd
curl -X POST http://localhost:5000/sensors -H "Content-Type: application/json" -d "[{\"deviceId\":\"dev1\", \"ts\": 123456, \"value\": 42}]"
```
