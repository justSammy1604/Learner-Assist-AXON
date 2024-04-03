from flask import Flask, request
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
cors = CORS(app)


@app.route("/search")
def searchCourse():
    sleep(5)
    return {
        "present": True,
        "courses": [
            {"name": "English", "code": "5323he"},
            {"name": "Science", "code": "eury3wye"},
        ],
    }


@app.route("/createCourse")
def createCourse():
    return {"result": "courseID"}


if __name__ == "__main__":
    app.run(debug=True)
