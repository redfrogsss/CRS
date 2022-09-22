from operator import truediv
import os   # for os.getenv()
from datetime import datetime
import pymysql.cursors
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

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

def isDuplicatedUserEmail(email: str):
    
    if not email:
        return False
    
    connection = getConnection()
    
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT email FROM `user` WHERE email = %s"
            cursor.execute(sql,(email))
            result = cursor.fetchone()
            if result is None:
                return False
            else:
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
def get_message(id: str):
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
def post_message():
    now = datetime.now()
    
    chat_id = request.args.get("chat_id")
    content = request.args.get("content")
    type = request.args.get("type")
    user_id = request.args.get("user_id")
    created_at = now.strftime("%Y-%m-%d %H:%M:%S")
    
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
            sql = "INSERT INTO `message` (chat_id, user_id, type, content, created_at) VALUE (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (chat_id, user_id, type, content, created_at,))
            
            connection.commit()
            return jsonify({"result": "success"})
        
        
@app.route("/chat/<string:id>", methods=["GET"])
def get_chat(id: str):
    if not id:
        return jsonify({"error": "Data 'id' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from `chat` WHERE `id` = %s"
            cursor.execute(sql, (id,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"error" : "No data fetched."})
            return jsonify(result)
        
@app.route("/chat/", methods=["POST"])
def post_chat():
    user_a_id = request.args.get("user_a_id")
    user_b_id = request.args.get("user_b_id")
    
    if not user_a_id:
        return jsonify({"error": "Data 'user_a_id' is empty. "})
    if not user_b_id:
        return jsonify({"error": "Data 'user_b_id' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `chat` (user_a_id, user_b_id) VALUE (%s, %s)"
            cursor.execute(sql, (user_a_id, user_b_id,))
            
            connection.commit()
            return jsonify({"result": "success"})
        
@app.route("/chatPreview/<string:chat_id>", methods=["GET"])
def get_chat_preview(chat_id: str):
    if not chat_id:
        return jsonify({"error": "Data 'chat_id' is empty."})
    
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT `chat`.user_a_id, `chat`.user_b_id, `message`.content, `message`.created_at FROM `chat` LEFT JOIN `message` ON `message`.chat_id = `chat`.id  WHERE `chat`.id = %s ORDER BY `message`.created_at DESC LIMIT 1"
            cursor.execute(sql, (chat_id,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"error": "No data fetched."})
            return jsonify(result)
            
@app.route("/chatMessages/<string:chat_id>", methods=["GET"])
def getChatMessages(chat_id: str):
    if not chat_id:
        return jsonify({"error": "Data `chat_id` is empty. "})
    
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `message` WHERE chat_id = %s"
            cursor.execute(sql, (chat_id))
            
@app.route("/register", methods=["POST", "GET"])
def register():
    email = request.values.get("email")
    username = request.values.get("username")
    password = request.values.get("password")
    
    if not email:
        return jsonify({"error" : "Data 'email' is empty."})
    if not username:
        return jsonify({"error" : "Data 'username' is empty."})
    if not password:
        return jsonify({"error" : "Data 'password' is empty."})
    if isDuplicatedUserEmail(email) == True:
        return jsonify({"error" : "Data 'email' is already exist in database."})

    connection = getConnection()
    
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `user` (username, email, password) VALUE (%s, %s, %s)"
            cursor.execute(sql, (username, email, password))
            
            connection.commit()
            
            return jsonify({"result" : "success"})
        
@app.route("/login", methods=["POST"])
def login():
    email = request.values.get("email")
    password = request.values.get("password")
    
    if not email:
        return jsonify({"error" : "Data 'email' is empty."})
    if not password:
        return jsonify({"error" : "Data 'password' is empty."})
    
    connection = getConnection()
    
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `user` WHERE email = %s AND password = %s"
            cursor.execute(sql, (email, password))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"result" : "failed"})
            else:
                return jsonify({"result" : "success"})

if __name__ == '__main__':
    app.run(port=3001, debug=True, host="0.0.0.0")
