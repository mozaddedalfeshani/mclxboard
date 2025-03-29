from fastapi import FastAPI
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId  # Import ObjectId

# Constants for configuration
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "home"

# Initialize FastAPI app
app = FastAPI()

# MongoDB Client Setup
client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
notes_collection = db["notes"]

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
    fullData: str
    date: str

class idType(BaseModel):
    id:str

@app.post("/share")
async def share(board_data: BoardDataType):
    # Insert board data into MongoDB collection
    result = await notes_collection.insert_one(board_data.dict())
    return {"Message": f"http://localhost:5173/ns/{result.inserted_id}"}



@app.get("/notesInfo/{id}")
async def notes_info(id: str):
    # Query to find the document by _id
    query = {"_id": ObjectId(id)}
    print(query)
    # Perform the query
    res = await notes_collection.find_one(query)
    print(res)

    if res:
        return {"id": id, "data": res}  # Return data if found
    else:
        return {"message": "Note not found"}  # Return message if not found



@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI server!"}
