from flask import Flask, request
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
cors = CORS(app)


@app.route("/search")
def searchCourse():
    #The user enters the course that he/she want to learn about
    #Checks if the course is present . 
        # If present then return the course data/stuff
        #Else ask the user if they want to add a new course
    
    return {
        "present": True,
        "courses": [
            {"name": "English", "code": "5323he"},
            {"name": "Science", "code": "eury3wye"},
        ],
    }

@app.route('/createCourse')
def createCourse():
    #The user selects the "Create Course" option
    #The system asks the new course name
    #User enters the new course name 
    return {"result":'courseID'}



if __name__ == "__main__":
    app.run(debug=True)
