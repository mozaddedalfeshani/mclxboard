from fastapi import FastAPI
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

# Connect to MongoDB
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["mc"]
collection = db["Dd"]


@app.get("/")
def home():
    return "WElcome"