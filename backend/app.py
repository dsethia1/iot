from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React Native app

# Example route
@app.route('/')
def home():
    return jsonify({
        'message': 'Flask backend is running!',
        'status': 'success'
    })

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'iot-studyspace-backend'
    })

# Example API endpoint
@app.route('/api/libraries', methods=['GET'])
def get_libraries():
    # Example data - replace with your database logic
    libraries = [
        {
            'id': 1,
            'name': 'Perry-Castañeda Library',
            'availableSeats': 252,
            'totalSeats': 445,
            'distance': '2.3 mi'
        },
        {
            'id': 2,
            'name': 'Central Library',
            'availableSeats': 180,
            'totalSeats': 320,
            'distance': '1.8 mi'
        }
    ]
    return jsonify({
        'success': True,
        'data': libraries
    })

# Example POST endpoint
@app.route('/api/libraries', methods=['POST'])
def create_library():
    data = request.get_json()
    # Add your logic here to save to database
    return jsonify({
        'success': True,
        'message': 'Library created successfully',
        'data': data
    }), 201

if __name__ == '__main__':
    # Run on all interfaces, port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)

