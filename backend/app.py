import json
from flask import Flask, request
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
cors = CORS(app)


@app.route("/search")
def searchCourse():
    query = request.args.get("query")
    # The user enters the course that he/she want to learn about
    # Checks if the course is present .
    # If present then return the course data/stuff
    # Else ask the user if they want to add a new course

    return {
        "present": True,
        "courses": [
            {"name": "English", "code": "5323he"},
            {"name": "Science", "code": "eury3wye"},
        ],
    }


@app.route("/createCourse")
def createCourse():
    file = request.files['file']
    # fileType
    # if file is txt read directly else parse properly

    return {"result": "courseID"}


@app.route("/courseData", methods=["GET"])
def courseData():
    Course = {"name": "string", "topics": ["topic1", "topic2"], "code": "string"}
    Course["code"] = request.args.get("code")

    return json.dumps(Course)


if __name__ == "__main__":
    app.run(debug=True)
