from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.responses import FileResponse, JSONResponse
import pymongo
import json
from bson import json_util
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://kashyapsoni3010:kashyapsoni3010@cluster0.ba1iivd.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.admitwise
db_cards = client.admitwise_cards
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# create FastAPI server
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
# CORS - remove it later in prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "null"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)


@app.get("/")
def root():
    return "root page"

# route to serve students list page
@app.get("/students/")
def student_list_page():
    html_file_path = Path("./views/student_list/index.html")
    return FileResponse(html_file_path)

# returns data for the given course
# to be completed
@app.get("/students/list/{course}")
def student_list_page(course):
    collection = db.cards
    document = collection.find({"course": "ms_cse"})
    data = []   
    for doc in document:
        formatted_doc = {
            "id": doc["id"],
            "name": doc["name"],
            "date": doc["date"],
            "email": doc["email"],
            "status": doc["status"],
            "course": doc["course"]
        }
        data.append(formatted_doc)
    print(data)
    serialized_data = json.dumps(data)
    return JSONResponse(content=data)


@app.get("/student/data/{id}")
def student_all_data(id):
    collection = db.data
    id = int(id)
    document = collection.find_one({"id": id})
    # document = list(document)
    # print(document)
    document.pop("_id", None)
    serialized_data = json.dumps(document)
    return JSONResponse(content=serialized_data)

@app.get("/add")
def add_data():
    data = '''{
        "id": 72152521,
        "name": "Jasleen Kaur",
        "date": "11/02/2023",
        "email": "jasleen_kar@gmail.com",
        "status": "Not Viewed",
        "course": "ms_cse"
    }'''
    json_data = json.loads(data)
    collection = db.cards
    result = collection.insert_one(json_data)


from uvicorn.config import LOGGING_CONFIG

LOGGING_CONFIG["loggers"]["uvicorn.access"]["level"] = "WARNING"
LOGGING_CONFIG["loggers"]["uvicorn.error"]["level"] = "ERROR"
if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using UVicorn
    uvicorn.run(app, host="127.0.0.1", port=3010)