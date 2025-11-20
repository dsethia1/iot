import sqlite3
import json
import os

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, 'data.db')

def get_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    cur = conn.cursor()
    # favorites: id from client (string), title, meta as JSON
    cur.execute('''
    CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        title TEXT,
        meta TEXT
    )
    ''')

    # sensors: simple ingestion table
    cur.execute('''
    CREATE TABLE IF NOT EXISTS sensors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT,
        ts INTEGER,
        payload TEXT
    )
    ''')

    conn.commit()
    conn.close()

# initialize DB on import
init_db()
