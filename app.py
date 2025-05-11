from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)
DATA_FILE = 'leaderboard_data.json'

# Load existing data or initialize empty data
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    else:
        return {
            "voidable_prime": "Name goes here",
            "players": []
        }

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/get_data', methods=['GET'])
def get_data():
    return jsonify(load_data())

@app.route('/add_player', methods=['POST'])
def add_player():
    data = load_data()
    player = request.json
    data['players'].append(player)
    data['players'].sort(key=lambda x: x['rating'], reverse=True)
    save_data(data)
    return jsonify({"success": True})

@app.route('/change_voidable_prime', methods=['POST'])
def change_voidable_prime():
    data = load_data()
    data['voidable_prime'] = request.json['name']
    save_data(data)
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
