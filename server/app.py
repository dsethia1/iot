from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import db

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify(status='ok')

@app.route('/favorites', methods=['GET', 'POST'])
def favorites():
    if request.method == 'GET':
        conn = db.get_conn()
        cur = conn.cursor()
        cur.execute('SELECT id, title, meta FROM favorites')
        rows = cur.fetchall()
        result = []
        for r in rows:
            meta = None
            try:
                meta = json.loads(r['meta']) if r['meta'] else None
            except Exception:
                meta = r['meta']
            result.append({'id': r['id'], 'title': r['title'], 'meta': meta})
        conn.close()
        return jsonify(result)

    # POST -> upsert
    payload = request.get_json() or {}
    if 'id' not in payload:
        return jsonify({'error': 'missing id'}), 400

    id_ = payload['id']
    title = payload.get('title')
    meta = json.dumps(payload.get('meta') or {})

    conn = db.get_conn()
    cur = conn.cursor()
    cur.execute('INSERT OR REPLACE INTO favorites (id, title, meta) VALUES (?, ?, ?)', (id_, title, meta))
    conn.commit()
    conn.close()
    return jsonify({'ok': True}), 201

@app.route('/favorites/<id_>', methods=['DELETE'])
def delete_favorite(id_):
    conn = db.get_conn()
    cur = conn.cursor()
    cur.execute('DELETE FROM favorites WHERE id = ?', (id_,))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})

@app.route('/sensors', methods=['POST'])
def sensors():
    payload = request.get_json() or {}
    # support either a list posted directly or { "readings": [...] }
    readings = []
    if isinstance(payload, list):
        readings = payload
    else:
        readings = payload.get('readings', [])

    conn = db.get_conn()
    cur = conn.cursor()
    count = 0
    for r in readings:
        device = r.get('device_id') or r.get('deviceId') or 'unknown'
        ts = r.get('ts') or r.get('timestamp')
        cur.execute('INSERT INTO sensors (device_id, ts, payload) VALUES (?, ?, ?)', (device, ts, json.dumps(r)))
        count += 1
    conn.commit()
    conn.close()
    return jsonify({'ingested': count})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
