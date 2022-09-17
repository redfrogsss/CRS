import os   # for os.getenv()
from flask import Flask, jsonify, request
app = Flask(__name__)

# Start of Sample Code
@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/chat/<string:name>", methods=["GET"])
def chat_get(name: str):
    return jsonify({"data": "Hello World", "method": "GET", "name": name})


@app.route("/chat/<string:name>", methods=["POST"])
def chat_post(name: str):
    return jsonify({"data": "Hello World", "method": "POST", "name": name})


@app.route("/chat/submit", methods=["POST"])
def chat_form_submit():
    data = request.args.get("data")
    return jsonify({"data": data, "method": "POST"})
# End of Sample Code

if __name__ == '__main__':
    app.run(port=5000, debug=True)
