from operator import truediv
from PIL import Image
import os   # for os.getenv()
import io
from os import environ
from datetime import datetime
import pymysql.cursors
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder="../frontend/build/static/", template_folder="../frontend/build/")
# app = Flask(__name__)
# cors = CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}})
app.config['CORS_HEADERS'] = 'Content-Type'

# @app.after_request
# def add_cors_headers(response):
#     white = ['http://192.168.0.37:3000']
#     r = request.referrer[:-1]
#     if r in white:
#         # response.headers.add('Access-Control-Allow-Origin', r)
#         response.headers.add('Access-Control-Allow-Credentials', 'true')
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#         response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
#         response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
#         response.headers.add('Access-Control-Allow-Headers', 'Authorization')
#         response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
#     return response

def getConnection():
    # Connect to the database
    #  return pymysql.connect(host='db',
     return pymysql.connect(host='localhost',
                            user='crs',
                            password='Eqkm6EBx9xeP',
                            database='crs',
                            cursorclass=pymysql.cursors.DictCursor)

def isValidType(type: str):
    if not (type == "text" or type == "image" or type == "recommend"):
        return False
    return True


def isDuplicatedUserEmail(email: str):

    if not email:
        return False

    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT email FROM `user` WHERE email = %s"
            cursor.execute(sql, (email))
            result = cursor.fetchone()
            if result is None:
                return False
            else:
                return True

def isDuplicatedUserName(name: str):

    if not name:
        return False

    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT email FROM `user` WHERE username = %s"
            cursor.execute(sql, (name))
            result = cursor.fetchone()
            if result is None:
                return False
            else:
                return True

# Serve static build file from react
@app.route("/")
def index():
    return render_template("index.html")

@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("../frontend/build/" + path):
        return send_from_directory('../frontend/build/', path)
    else:
        return send_from_directory('../frontend/build/', 'index.html')

@app.route("/img/<path:path>")
def serve_img(path):
    return send_from_directory("../frontend/build/img/", path)

@app.route("/images/<path:path>")
def serve_movie_poster(path):
    return send_from_directory("./images/", path)

# fetch message from id
@app.route("/api/message/<string:id>", methods=["GET"])
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
                return jsonify({"error": "No data fetched."})
            return jsonify(result)


# create message
@app.route("/api/message/", methods=["POST"])
def post_message():
    now = datetime.now()

    chat_id = request.args.get("chat_id")
    content = request.args.get("content")
    type = request.args.get("type")
    user_id = request.args.get("user_id")
    created_at = now.strftime("%Y-%m-%d %H:%M:%S")

    if not content:
        print("Data 'content' is empty.")
        return jsonify({"error": "Data 'content' is empty. "})
    if not type:
        print("Data 'type' is empty.")
        return jsonify({"error": "Data 'type' is empty. "})
    if not isValidType(type):
        print("Data 'type' is invalid.")
        return jsonify({"error": "Data 'type' is not valid."})
    if not user_id:
        print("Data 'user_id' is empty.")
        return jsonify({"error": "Data 'user_id' is empty."})
    if not chat_id:
        print("Data 'chat_id' is empty.")
        return jsonify({"error": "Data 'chat_id' is empty."})

    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `message` (chat_id, user_id, type, content, created_at) VALUE (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (chat_id, user_id, type, content, created_at,))

            connection.commit()
            return jsonify({"result": "success"})


@app.route("/api/chatPreview", methods=["GET"])
def get_chat_preview():
    user_id = request.args.get("user_id")
    if not user_id:
        print("Data 'user_id' is empty.")

    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            # sql = "SELECT C.id AS chat_id, U2.username AS username, M.content AS content FROM `chat` AS C LEFT JOIN `user` AS U1 ON U1.id = C.user_a_id LEFT JOIN `user` AS U2 ON U2.id = C.user_b_id LEFT JOIN `message` AS M ON M.chat_id = C.`id` AND M.id = (SELECT MAX(id) FROM message AS M WHERE M.chat_id = C.`id`) ORDER BY M.created_at DESC; "
            sql = "SELECT C.id AS chat_id, U2.username AS username, M.content AS content FROM `chat` AS C LEFT JOIN `user` AS U1 ON U1.id = C.user_a_id LEFT JOIN `user` AS U2 ON U2.id = C.user_b_id LEFT JOIN `message` AS M ON M.chat_id = C.`id` AND M.id = (SELECT MAX(id) FROM message AS M WHERE M.chat_id = C.`id`) WHERE C.user_a_id = %s OR C.user_b_id = %s ORDER BY M.created_at DESC; "
            cursor.execute(sql, [user_id, user_id])

            result = []

            for row in cursor:
                result.append(row)
            return jsonify(result)


@app.route("/api/chat/<string:id>", methods=["GET"])
def get_chat(id: str):
    if not id:
        return jsonify({"error": "Data 'id' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT C.*, U1.username AS user_a_name, U2.username AS user_b_name from `chat` AS C LEFT JOIN `user` AS U1 ON C.user_a_id = U1.id LEFT JOIN `user` AS U2 ON user_b_id = U2.id WHERE C.`id` = %s"
            cursor.execute(sql, (id,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"error": "No data fetched."})
            return jsonify(result)


@app.route("/api/chat/", methods=["POST"])
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

            chat_id = cursor.lastrowid

            return jsonify({"result": "success", "chat_id": chat_id})


@app.route("/api/chatMessages/<string:chat_id>", methods=["GET"])
def getChatMessages(chat_id: str):
    if not chat_id:
        return jsonify({"error": "Data `chat_id` is empty. "})

    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `message` WHERE chat_id = %s ORDER BY created_at ASC"
            cursor.execute(sql, (chat_id))

            result = []

            for row in cursor:
                result.append(row)
            return jsonify(result)


@app.route("/api/register", methods=["POST", "GET"])
def register():
    email = request.values.get("email")
    username = request.values.get("username")
    password = request.values.get("password")

    if not email:
        return jsonify({"error": "Data 'email' is empty."})
    if not username:
        return jsonify({"error": "Data 'username' is empty."})
    if not password:
        return jsonify({"error": "Data 'password' is empty."})
    if isDuplicatedUserEmail(email) == True:
        return jsonify({"error": "Data 'email' is already exist in database."})
    if isDuplicatedUserName(username) == True:
        return jsonify({"error": "Data 'username' is already exist in database."})

    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `user` (username, email, password) VALUE (%s, %s, %s)"
            cursor.execute(sql, (username, email, password))

            connection.commit()

            sql = "SELECT id FROM `user` WHERE username = %s AND email = %s"
            cursor.execute(sql, (username, email))
            selectResult = cursor.fetchone()

            return jsonify({"result": "success", "user_id": selectResult["id"]})

@app.route("/api/login", methods=["POST"])
def login():
    email = request.values.get("email")
    password = request.values.get("password")

    if not email:
        return jsonify({"error": "Data 'email' is empty."})
    if not password:
        return jsonify({"error": "Data 'password' is empty."})

    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `user` WHERE email = %s AND password = %s"
            cursor.execute(sql, (email, password))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"result": "failed"})
            else:
                return jsonify({"result": "success", "username": result["username"], "user_id": result["id"]})

@app.route("/api/input_queue", methods=["POST"])
def postInputQueue():
    chat_id = request.values.get("chat_id")
    message = request.values.get("message")
    user_id = request.values.get("user_id")
    language = request.values.get("language")

    if not chat_id:
        return jsonify({"error": "Data 'chat_id' is missing."})
    if not message:
        return jsonify({"error": "Data 'message' is missing."})
    if not user_id:
        return jsonify({"error": "Data 'user_id' is missing."})
    if not language:
        language = "ZH"
    
    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `input_queue` (chat_id, message, user_id, language) VALUE (%s, %s, %s, %s)"
            cursor.execute(sql, (chat_id, message, user_id, language))

            connection.commit()

            return jsonify({"result": "success"})

        
@app.route("/api/input_queue", methods=["GET"])
def getInputQueue():
    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `input_queue` WHERE done = 0 ORDER BY id DESC LIMIT 1;"
            cursor.execute(sql)
            selectResult = cursor.fetchone()
            
            if selectResult is None:
                return jsonify({"result": "None"})
            else:
                return jsonify({"result": selectResult})


@app.route("/api/input_queue", methods=["PUT"])
def putInputQueue():
    connection = getConnection()

    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `input_queue` WHERE done = 0 ORDER BY id DESC LIMIT 1;"
            cursor.execute(sql)
            selectResult = cursor.fetchone()
            
            if selectResult is None:
                return jsonify({"result": "None"})

            target_id = selectResult["id"]

            sql = "UPDATE `input_queue` SET `done` = '1' WHERE `input_queue`.`id` = %s"
            cursor.execute(sql, (target_id))

            connection.commit()

            return jsonify({"result": "success"})
        

@app.route("/api/extractWord", methods=["GET"])
def getExtractWord():
    token = request.values.get("token")
    if not token:
        return jsonify({"error": "Data 'token' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from `extractWord` WHERE `token` = %s ORDER BY `id` DESC LIMIT 1"
            cursor.execute(sql, (token,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"result": "None"})
            return jsonify({"result": result})

@app.route("/api/extractWord", methods=["POST"])
def postExtractWord():
    
    token = request.args.get("token")
    word = request.args.get("word")
    
    if not token:
        return jsonify({"error": "Data 'token' is empty. "})
    if not word:
        word = ""
    
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `extractWord` (word, token) VALUE (%s, %s)"
            cursor.execute(sql, (word, token,))

            connection.commit()
            return jsonify({"result": "success"})


@app.route("/api/extractEntity", methods=["GET"])
def getExtractEntity():
    token = request.args.get("token")
    
    if not token:
        return jsonify({"error": "Data 'token' is empty. "})
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from `extractEntity` WHERE `token` = %s ORDER BY `id` DESC LIMIT 1"
            cursor.execute(sql, (token,))
            result = cursor.fetchone()
            if result is None:
                return jsonify({"result": "None"})
            return jsonify({"result": result})

@app.route("/api/extractEntity", methods=["POST"])
def postExtractEntity():
    token = request.args.get("token")
    word = request.args.get("word")
    
    if not token:
        return jsonify({"error": "Data 'token' is empty. "})
    if not word:
        word = ""
    
    print(f"postExtractEntity: {token} : {word}")
    
    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO `extractEntity` (word, token) VALUE (%s, %s)"
            cursor.execute(sql, (word, token,))

            connection.commit()
            return jsonify({"result": "success"})
        
@app.route("/api/username", methods=["POST"])
def postUser():
    print("post user")
    user_id = request.args.get("user_id")
    new_username = request.args.get("new_username")
    
    if not user_id:
        return jsonify({"error": "Data 'user_id' is empty. "})
    if not new_username or len(new_username) == 0:
        return jsonify({"error": "Data 'new_username' is empty. "})

    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "UPDATE `user` SET `username` = %s WHERE `id` = %s"
            cursor.execute(sql, (new_username, user_id))

            connection.commit()
            return jsonify({"result": "success"})
        
@app.route("/api/password", methods=["POST"])
def postPassword():
    user_id = request.args.get("user_id")
    password = request.args.get("password")
    
    if not user_id:
        return jsonify({"error": "Data 'user_id' is empty. "})
    if not password or len(password) == 0:
        return jsonify({"error": "Data 'password' is empty. "})

    connection = getConnection()
    with connection:
        with connection.cursor() as cursor:
            sql = "UPDATE `user` SET `password` = %s WHERE `user`.`id` = %s"
            cursor.execute(sql, (password, user_id))

            connection.commit()
            return jsonify({"result": "success"})

# Create a POST route with a function to receive and store the image
@app.route('/api/movie_poster', methods=['POST'])
def store_image():
    try:
        now = datetime.now()
        hostname = request.host_url
        
        chat_id = request.args.get("chat_id")
        user_id = request.args.get("user_id")
        
        type = "image"
        created_at = now.strftime("%Y-%m-%d %H:%M:%S")
        
        # Get the image data from the request
        image = request.data
        
        filename = chat_id + "_" + now.strftime("%Y-%m-%d_%H%M%S")

        # Define the location to save the image
        if request.content_type == "image/png":
            filename += '.png'
            ext = "PNG"
        else:
            filename += '.jpeg'
            ext = "JPEG"
        
        # filename = request.files['image'].filename
        path = os.path.join(os.getcwd(), 'images', filename)

        # Save the image to the specified location
        img = Image.open(io.BytesIO(image))
        img.save(path, ext)
        print("Saved Image : " + path)
        
        content = hostname + "images/" + filename
        
        if not content:
            print("Data 'content' is empty.")
            return jsonify({"error": "Data 'content' is empty. "})
        if not type:
            print("Data 'type' is empty.")
            return jsonify({"error": "Data 'type' is empty. "})
        if not isValidType(type):
            print("Data 'type' is invalid.")
            return jsonify({"error": "Data 'type' is not valid."})
        if not user_id:
            print("Data 'user_id' is empty.")
            return jsonify({"error": "Data 'user_id' is empty."})
        if not chat_id:
            print("Data 'chat_id' is empty.")
            return jsonify({"error": "Data 'chat_id' is empty."})


        connection = getConnection()
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO `message` (chat_id, user_id, type, content, created_at) VALUE (%s, %s, %s, %s, %s)"
                cursor.execute(sql, (chat_id, user_id, type, content, created_at,))

                connection.commit()
                return jsonify({"result": "success"})
            
    except Exception as e:
        # Return a failure response
        print(str(e))
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/context', methods=['GET'])
def get_context():
    try:
        chat_id = request.values.get("chat_id")
        model = request.values.get("model")
        stage = request.values.get("stage")
        
        if not chat_id:
            return jsonify({"error": "Data 'chat_id' is empty. "})
        if not model:
            return jsonify({"error": "Data 'model' is empty. "})
        if not stage:
            return jsonify({"error": "Data 'stage' is empty. "})
        
        connection = getConnection()
        with connection:
            with connection.cursor() as cursor:
                # Get the last record if there are multiple records
                sql = "SELECT * from `context` WHERE `chat_id` = %s AND `model` = %s AND `stage` = %s ORDER BY `id` DESC LIMIT 1"
                cursor.execute(sql, (chat_id, model, stage))
                result = cursor.fetchone()
                if result is None:
                    return jsonify({"result": "None"})
                return jsonify({"result": result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/context', methods=['POST'])
def post_context():
    # return(jsonify(request.form))
    try:
        chat_id = request.form.get("chat_id")
        model = request.form.get("model")
        stage = request.form.get("stage")
        context_tokens = request.form.get("context_tokens")
        context_entities = request.form.get("context_entities")
        context_words = request.form.get("context_words")
        context_items = request.form.get("context_items")
        user_profile = request.form.get("user_profile")
        interaction_history = request.form.get("interaction_history")
        
        if not chat_id:
            return jsonify({"error": "Data 'chat_id' is empty. "})
        if not model:
            return jsonify({"error": "Data 'model' is empty. "})
        if not stage:
            return jsonify({"error": "Data 'stage' is empty. "})
        if not context_tokens:
            return jsonify({"error": "Data 'context_token' is empty. "})
        if not context_entities:
            return jsonify({"error": "Data 'context_entities' is empty. "})
        if not context_words:
            return jsonify({"error": "Data 'context_words' is empty. "})
        if not context_items:
            return jsonify({"error": "Data 'context_items' is empty. "})
        if not user_profile:
            return jsonify({"error": "Data 'user_profile' is empty. "})
        if not interaction_history:
            return jsonify({"error": "Data 'interaction_history' is empty. "})
        
        connection = getConnection()
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO `context` (chat_id, model, stage, context_tokens, context_entities, context_words, context_items, user_profile, interaction_history) VALUE (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (chat_id, model, stage, context_tokens, context_entities, context_words, context_items, user_profile, interaction_history,))

                connection.commit()
                return jsonify({"result": "success"})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

@app.route('/api/context', methods=['PUT'])
def put_context():
    try:
        chat_id = request.form.get("chat_id")
        model = request.form.get("model")
        stage = request.form.get("stage")
        context_tokens = request.form.get("context_tokens")
        context_entities = request.form.get("context_entities")
        context_words = request.form.get("context_words")
        context_items = request.form.get("context_items")
        user_profile = request.form.get("user_profile")
        interaction_history = request.form.get("interaction_history")
        
        if not chat_id:
            return jsonify({"error": "Data 'chat_id' is empty. "})
        if not model:
            return jsonify({"error": "Data 'model' is empty. "})
        if not stage:
            return jsonify({"error": "Data 'stage' is empty. "})
        if not context_tokens:
            return jsonify({"error": "Data 'context_token' is empty. "})
        if not context_entities:
            return jsonify({"error": "Data 'context_entities' is empty. "})
        if not context_words:
            return jsonify({"error": "Data 'context_words' is empty. "})
        if not context_items:
            return jsonify({"error": "Data 'context_items' is empty. "})
        if not user_profile:
            return jsonify({"error": "Data 'user_profile' is empty. "})
        if not interaction_history:
            return jsonify({"error": "Data 'interaction_history' is empty. "})
        
        connection = getConnection()
        
        with connection:
            with connection.cursor() as cursor:
                sql = "UPDATE `context` SET context_tokens = %s, context_entities = %s, context_words = %s, context_items = %s, user_profile = %s, interaction_history = %s WHERE `chat_id` = %s AND `model` = %s AND `stage` = %s"
                cursor.execute(sql, (context_tokens, context_entities, context_words, context_items, user_profile, interaction_history, chat_id, model, stage,))

                connection.commit()
                return jsonify({"result": "success"})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3001, debug=True, host="0.0.0.0")
