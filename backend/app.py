import os
from flask import Flask, jsonify
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/chat/<string:name>", methods=["GET"])
def chat_get(name: str):
    return jsonify({"data": "Hello World", "method": "GET", "name": name})


@app.route("/chat/<string:name>", methods=["POST"])
def chat_post(name: str):
    return jsonify({"data": "Hello World", "method": "POST", "name": name})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
