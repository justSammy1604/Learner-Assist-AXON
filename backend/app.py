from collections import Counter
import chromadb
from flask import Flask, request,jsonify
from flask_cors import CORS
# from modules.chromadb import similarity_topics
import spacy
import numpy as np
from chromadb.utils import embedding_functions

from modules.grammer import convert_to_question



app = Flask(__name__)
cors = CORS(app)

if __name__ == "__main__":
    topics = [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Computer Science",
        "Medicine",
        "Art History",
        "Computer Science & Information Technology",
        "Law",
        "Statistics",
    ]
    client = chromadb.PersistentClient(path="public/vector")
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L12-v2")

    MCQsCollection = client.get_or_create_collection(name="MCQ",embedding_function=sentence_transformer_ef,metadata={'hnsw:space':'cosine'})
    CourseCollection = client.get_or_create_collection(name="CourseCollection",embedding_function=sentence_transformer_ef,metadata={'hnsw:space':'cosine'})
#     MCQsCollection.add(
#     documents=["This is a document"],
#     metadatas=[{"question": "my_source","summary":"this is a asummary","options":"Apple,Pear,PineApple,Peach","correct":0}],
#     ids=["id1"]
# )
#     CourseCollection.add(
#         documents=["Operating Systems", "Modern Networks", "Graphics", "Image Processing", "Data Structures", "Algorithms"],
#         metadatas=[
#             {"code": "OS1","name":"operating systems","summary":"Operating systems are software that manage computer hardware and software resources and provide services for computer programs."},
#             {"code": "MN1","name":"modern networks","summary":"Modern networks refer to computer networks that use advanced technologies such as cloud computing, virtualization, and software-defined networking."},
#             {"code": "GR1","name":"graphics","summary":"Graphics refer to visual images or designs on some surface, such as a wall, canvas, screen, paper, or stone."},
#             {"code": "IP1","name":"image processing","summary":"Image processing is a method to perform some operations on an image to get an enhanced image or to extract some useful information from it."},
#             {"code": "DS1","name":"data structures","summary":"Data structures are a way of organizing and storing data so that it can be used efficiently."},
#             {"code": "AL1","name":"algorithms","summary":"Algorithms are a set of instructions or rules that are followed to solve a problem."}
#         ],
#         ids=["OS1", "MN1", "GR1", "IP1", "DS1", "AL1"]
#     )
#     CourseCollection.add(
#     documents=["Physics", "Chemistry", "Biology", "Computer Science", "Medical Sciences", "Medicine", "Religion", "Art History", "Music", "Computer Science & Information Technology", "Entrepreneurship", "Law", "Legal Theory", "Civil Law", "Criminal Law", "International Law"],
#     metadatas=[
#         {"code": "PHY1","name":"physics","summary":"Physics is the study of matter, energy, and the fundamental forces of nature."},
#         {"code": "CH1","name":"chemistry","summary":"Chemistry is the study of the composition, structure, properties, and reactions of matter."},
#         {"code": "BIO1","name":"biology","summary":"Biology is the study of living organisms, including their structure, function, growth, origin, evolution, and distribution."},
#         {"code": "CS1","name":"computer science","summary":"Computer science is the study of computers and computational systems. It includes the design and analysis of algorithms, programming languages, and hardware systems."},
#         {"code": "MS1","name":"medical sciences","summary":"Medical sciences are the scientific study of the human body and its diseases and disorders."},
#         {"code": "MED1","name":"medicine","summary":"Medicine is the science and practice of the diagnosis, treatment, and prevention of disease."},
#         {"code": "REL1","name":"religion","summary":"Religion is a cultural system of designated behaviors and practices, morals, beliefs, worldviews, texts, sanctified places, prophecies, ethics, or organizations."},
#         {"code": "AH1","name":"art history","summary":"Art history is the study of objects of art in their historical development and stylistic contexts."},
#         {"code": "MUS1","name":"music","summary":"Music is an art form and cultural activity whose medium is sound organized in time."},
#         {"code": "CSIT1","name":"computer science & information technology","summary":"Computer science and information technology are fields that deal with computing technology and the use of computers to process, store, and transmit information."},
#         {"code": "ENTR1","name":"entrepreneurship","summary":"Entrepreneurship is the process of designing, launching, and running a new business."},
#         {"code": "LAW1","name":"law","summary":"Law is a system of rules created and enforced through social or governmental institutions to regulate behavior."},
#         {"code": "LT1","name":"legal theory","summary":"Legal theory is the study and interpretation of the principles and concepts that underlie the legal system."},
#         {"code": "CL1","name":"civil law","summary":"Civil law is a legal system originating in continental Europe and adopted in much of the world."},
#         {"code": "CRL1","name":"criminal law","summary":"Criminal law is the body of law that relates to crime."},
#         {"code": "IL1","name":"international law","summary":"International law is the set of rules generally regarded and accepted as binding in relations between states and nations."}
#     ],
#     ids=["PHY1", "CH1", "BIO1", "CS1", "MS1", "MED1", "REL1", "AH1", "MUS1", "CSIT1", "ENTR1", "LAW1", "LT1", "CL1", "CRL1", "IL1"]
# )

    nlp = spacy.load("en_core_web_sm")
    app.run(debug=True)


@app.route("/search")
def searchCourse():
    query = request.args.get("query")
    results = CourseCollection.query(
        query_texts=[query],
        n_results=12,
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

    

    content = "This means that as you zoom into a fractal, you'll see smaller copies of the overall shape, repeating infinitely. Fractals are not limited to simple shapes like squares or circles; they can have intricate and infinitely detailed patterns.One of the most famous fractals is the Mandelbrot set, discovered by mathematician Benoit Mandelbrot in the 1970s. The Mandelbrot set is generated by iterating a simple mathematical formula and determining whether the resulting sequence remains bounded or tends to infinity. Points within the Mandelbrot set are colored black, while points outside the set are colored based on how quickly they diverge to infinity.Fractals have applications in various fields, including mathematics, physics, computer science, and art. In mathematics, fractals provide insights into chaos theory, dynamical systems, and nonlinear dynamics. In physics, fractals are used to model irregular shapes in nature, such as coastlines, clouds, and mountains.Fractal geometry also has practical applications in computer graphics, where it is used to generate realistic-looking terrain, textures, and natural phenomena in video games and visual effects.Additionally, fractals inspire artists and designers with their intricate and mesmerizing patterns, leading to the creation of stunning artworks and architectural designs.The number e is defined as the limit of the expression (1 + 1/n)^n as n approaches infinity. This constant, approximately equal to 2.71828, is a fundamental mathematical constant in calculus and analysis. It appears naturally in many mathematical contexts, including exponential growth and decay, compound interest calculations, probability theory, and the study of continuous change. Its significance stems from its role as the base of the natural logarithm function, ln(x), where e^x represents exponential growth or decay at a rate proportional to the value of x. The number e is also transcendental, meaning it is not the root of any non-zero polynomial equation with rational coefficients."
    doc = nlp(content)
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

    # print("Top 5 Most Similar Sentences are given below:")
    # for sentence, similarity in sentence_similarities[:5]:
    #     print(f"{sentence} (Similarity: {similarity:.2f})")

    for sentence in sentences:
        question = convert_to_question(sentence)
        if question:
            print(f"Converted Question: {question}")
        else:
            del question
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


