from collections import Counter
import chromadb
from flask import Flask, request,jsonify
from flask_cors import CORS
# from modules.chromadb import similarity_topics
import spacy
import numpy as np
from chromadb.utils import embedding_functions
from gramformer import Gramformer

from modules.summarizer import summarizer
from modules.grammer import convert_to_question

from transformers import pipeline

pipe = pipeline("text2text-generation", model="HamadML/grammer_correction")


app = Flask(__name__)
cors = CORS(app)

client = chromadb.PersistentClient(path="public/vector")
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L12-v2")

nounsCollection = client.get_or_create_collection(name="nouns",embedding_function=sentence_transformer_ef,metadata={'hnsw:space':'cosine'})
MCQsCollection = client.get_or_create_collection(name="MCQ",embedding_function=sentence_transformer_ef,metadata={'hnsw:space':'cosine'})
CourseCollection = client.get_or_create_collection(name="CourseCollection",embedding_function=sentence_transformer_ef,metadata={'hnsw:space':'cosine'})
nlp = spacy.load("en_core_web_sm")


if __name__ == "__main__":
    app.run(debug=True)


@app.route("/search")
def searchCourse():
    query = request.args.get("query")
    print(query)
    results = CourseCollection.query(
        query_texts=[query],
        n_results=8,
        include=["documents", "distances", "metadatas"],
    )

    dist = np.average(results["distances"])  
    return jsonify({
        "present": 1 if dist>0.3 else 0,
        "courses":[
        {
            "code": obj["code"],
            "name": obj["name"],
           
        
        }
        for obj in results["metadatas"][0]
    ],
    }) 
    
    
@app.route("/CreateMCQ")
def CreateMCQ():
    query = request.args.get("query")
    results = MCQsCollection.query(
        query_texts=[query],
        n_results=3,
        include=["documents", "distances", "metadatas"],
    )

    dist = np.average(results["distances"])  
    q=[{
                "question": x['question'],
                "options": x['options'].split(","),
                "correct": x['correct']} for x in results['metadata']]
    return jsonify({
        "questions": [
            {
                "question": "What is React?",
                "options": ["Library", "Framework", "Language", "Application"],
                "correct": 0
            },
            {
                "question": "What is Vue.js?",
                "options": ["Library", "Framework", "Language", "Database"],
                "correct": 1
            },
            {
                "question": "What is Angular?",
                "options": ["Library", "Framework", "Language", "Server"],
                "correct": 1
            },
            {
                "question": "What is JavaScript?",
                "options": ["Library", "Framework", "Language", "IDE"],
                "correct": 2
            },
            {
                "question": "What is MongoDB?",
                "options": ["Library", "Framework", "Language", "Database"],
                "correct": 3
            }
        ]
    })


@app.route("/SearchMcq")
def SearchMcq():
    query = request.args.get("query")
    results = MCQsCollection.query(
        query_texts=[query],
        n_results=3,
        include=["documents", "distances", "metadatas"],
    )

    dist = np.average(results["distances"])  
    return jsonify({
        "present": 1 if dist>0.3 else 0,
        "course":[
        {
            "question": obj["question"],
            "summary": obj["summary"],
            "options": obj["options"].split(','),
            "correct": obj["correct"],
        }
        for obj in results["metadatas"][0]
    ],
    })


@app.route("/createCourse",methods=["POST"])
def createCourse():
    content=""
    file = request.files["file"]
    if file.filename.endswith('.txt'):
        file_contents = file.read().decode('unicode_escape')
        content=file_contents
    
    
    new_content=pipe(content)
    doc = nlp(new_content)


    word_counts = Counter()
    for token in doc:
        if token.pos_.startswith("N") and token.is_alpha:
            word = token.text.lower()
            word_counts[word] += 1

        top_nouns = word_counts.most_common(5)

    sentences = [sent.text for sent in doc.sents]
    sentence_similarities = []

    top_nouns = [token.text for token in doc if token.pos_ == "NOUN"][:5]

    for sentence in sentences:
        sentence_doc = nlp(sentence)
        similarities = [sentence_doc.similarity(nlp(noun)) for noun in top_nouns]
        max_similarity = max(similarities)
        sentence_similarities.append((sentence, max_similarity))
    sentence_similarities.sort(key=lambda x: x[1], reverse=True)
    resp=[]

    for sentence in sentences:
        resp.extend(convert_to_question(sentence))

  
    
   


    CourseCollection.add(
    documents=[summarizer(q) for q in top_nouns],
    metadatas=[ {
            "code": noun,
            "name": noun,
        } for noun in top_nouns],
    ids=top_nouns
    )  
    MCQsCollection.add(
    documents=[summarizer(q["question"]) for q in resp],
    metadatas=resp,
    ids=[q["question"] for q in resp]
    )  

    return {"result": "courseID"}


@app.route("/courseData", methods=["GET"])
def courseData():
    Course = {
        "name": "Operating Systems",
        "topics": ["registers", "busses"],
        "code": "OSX034",
    }
    Course["code"] = request.args.get("code")

    return jsonify(Course)


