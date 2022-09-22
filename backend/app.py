import os   # for os.getenv()
import pymysql.cursors
from flask import Flask, jsonify, request
app = Flask(__name__)

def getConnection():
    # Connect to the database
    return pymysql.connect(host='127.0.0.1',
                             user='crs',
                             password='Eqkm6EBx9xeP',
                             database='crs',
                             cursorclass=pymysql.cursors.DictCursor)


def isValidType(type: str):
    if not (type == "text" or type == "image"):
        return False
    return True

# Start of Sample Code


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/sample/<string:name>", methods=["GET"])
def chat_get(name: str):
    return jsonify({"data": "Hello World", "method": "GET", "name": name})


@app.route("/sample/<string:name>", methods=["POST"])
def chat_post(name: str):
    return jsonify({"data": "Hello World", "method": "POST", "name": name})


@app.route("/sample/submit", methods=["POST"])
def chat_form_submit():
    data = request.args.get("data")
    return jsonify({"data": data, "method": "POST"})
# End of Sample Code


# fetch message from id
@app.route("/message/<string:id>", methods=["GET"])
def get_chat(id: str):
    if not id:
        return jsonify({"error": "Data 'id' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from `message` WHERE `id` = %s"
            cursor.execute(sql, (id,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"error" : "No data fetched."})
            return jsonify(result)


# create message
@app.route("/message/", methods=["POST"])
def post_chat():
    chat_id = request.args.get("chat_id")
    content = request.args.get("content")
    type = request.args.get("type")
    user_id = request.args.get("user_id")
    
    if not content:
        return jsonify({"error": "Data 'content' is empty. "})
    if not type:
        return jsonify({"error": "Data 'type' is empty. "})
    if not isValidType(type):
        return jsonify({"error": "Data 'type' is not valid."})
    if not user_id:
        return jsonify({"error": "Data 'user_id' is empty."})
    if not chat_id:
        return jsonify({"error": "Data 'chat_id' is empty."})
    
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `message` (chat_id, user_id, type, content) VALUE (%s, %s, %s, %s)"
            cursor.execute(sql, (chat_id, user_id, type, content,))
            
            connection.commit()
            return jsonify({"result": "success"})
    # return jsonify({
    #     "content": content,
    #     "type": type,
    #     "chat_id": chat_id
    # })


if __name__ == '__main__':
    app.run(port=3001, debug=True, host="0.0.0.0")
