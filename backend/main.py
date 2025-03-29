from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from bson.errors import InvalidId

# Constants for configuration
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "home"

# Initialize FastAPI app
app = FastAPI()

# MongoDB Client Setup
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
noteDb = client['notes']
notes_collection = noteDb["note"]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow only the frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Pydantic models for request validation
class BoardDataType(BaseModel):
    data: str
    date: str

@app.post("/share")
async def share(board_data: BoardDataType):
    # Insert the board data into the MongoDB collection
    result = notes_collection.insert_one(board_data.dict())  # Use dict() to convert to a dictionary

    # Return the URL with the inserted ID
    return {"Message": f"http://localhost:5173/ns/{str(result.inserted_id)}"}  # Convert inserted_id to string

@app.get("/notesInfo/{id}")
async def notes_info(id: str):
    try:
        # Convert id to ObjectId
        query = {"_id": ObjectId(id)}
    except InvalidId:
        return {"message": "Invalid ID format. Please provide a valid ObjectId."}  # Handle invalid ObjectId format

    try:
        # Perform the query in MongoDB
        res = notes_collection.find_one(query)

    except Exception as e:
        # Catch any other database-related errors and log them
        return {"message": f"Error fetching data: {str(e)}"}

    if res:
        res["_id"] = str(res["_id"])
        return {"id": id, "data": res}  # Return data if found
    else:
        return {"message": "Note not found"}  # Return message if not found

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI server!"}