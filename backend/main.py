from fastapi import FastAPI
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware

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

class ValueType(BaseModel):
    name: str
    age: int
    email: str
    isAlive: bool

class BoardDataType(BaseModel):
    fullData: str
    date: str

@app.post("/addDataMongo")
async def add_data_mongo(values: ValueType):
    # Insert data into MongoDB collection
    result = await users_collection.insert_one(values.dict())  # Use dict() for MongoDB compatibility
    return {"message": "Data inserted!", "id": str(result.inserted_id)}

@app.post("/share")
async def share(board_data: BoardDataType):
    # Insert board data into MongoDB collection
    result = await notes_collection.insert_one(board_data.dict())
    return {"Message": f"murad.com/{result.inserted_id}"}



@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI server!"}
