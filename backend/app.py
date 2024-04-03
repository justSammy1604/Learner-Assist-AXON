from flask import Flask,request
from flask_cors import CORS

app=Flask(__name__)
cors=CORS(app)

@app.route('/search')
def searchCourse():
    # 
    return {
        'present':False,
        'courses':[]
    }

@app.route('/createCourse')
def createCourse():
    return {"result":'courseID'}

