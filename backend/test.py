import requests
import time

result = "None"

while result == "None":
    response = requests.get("http://192.168.0.30:3001/input_queue")
    data = response.json()
    result = data['result']
    time.sleep(1)


message = str(data['result']['message'])
chat_id = str(data['result']['chat_id'])

print("message: " + message)
print("chat_id: " + chat_id)
