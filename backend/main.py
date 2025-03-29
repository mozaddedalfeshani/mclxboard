from fastapi import FastAPI, HTTPException
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
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific origins in production for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# MongoDB Client Setup
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
noteDb = client['notes']
notes_collection = noteDb["note"]

# Pydantic models for request validation
class BoardDataType(BaseModel):
    data: str
    date: str

@app.post("/share")
async def share(board_data: BoardDataType):
    # Insert the board data into the MongoDB collection
    result = notes_collection.insert_one(board_data.model_dump())  # Use dict() to convert to a dictionary

    # Return the URL with the inserted ID
    return f"{str(result.inserted_id)}"  # Convert inserted_id to string

@app.get("/notesInfo/{id}")
async def notes_info(id: str):
    try:
        # Convert id to ObjectId
        query = {"_id": ObjectId(id)}
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ID format. Please provide a valid ObjectId.")

    try:
        # Perform the query in MongoDB
        res = notes_collection.find_one(query)

    except Exception as e:
        # Catch any other database-related errors and log them
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

    if res:
        return {"data": res.get("data")}  # Return only the "data" field
    else:
        raise HTTPException(status_code=404, detail="Note not found")

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI server!"}