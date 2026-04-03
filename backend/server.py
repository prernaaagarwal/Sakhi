from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class CallbackRequest(BaseModel):
    phoneNumber: str

class CallbackResponse(BaseModel):
    success: bool
    message: str
    callId: str = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Retell AI Callback Endpoint
@api_router.post("/retell-callback", response_model=CallbackResponse)
async def request_retell_callback(request: CallbackRequest):
    try:
        phone_number = request.phoneNumber.strip()
        
        # Validate phone number
        if not phone_number:
            raise HTTPException(status_code=400, detail="Phone number is required")
        
        # Validate E.164 format
        import re
        e164_regex = r'^\+[1-9]\d{1,14}$'
        if not re.match(e164_regex, phone_number):
            raise HTTPException(
                status_code=400, 
                detail="Phone number must be in E.164 format (e.g., +919876543210)"
            )
        
        # Get Retell AI credentials from environment
        retell_api_key = os.getenv('RETELL_API_KEY', 'key_c307c68839cf3854ee34f5222b42')
        retell_agent_id = os.getenv('RETELL_AGENT_ID', 'agent_35f36bd462761d36e1a04512cd')
        retell_from_number = os.getenv('RETELL_FROM_NUMBER', '+918071387149')
        
        logger.info(f"📞 Initiating callback to {phone_number}...")
        
        # Call Retell AI API
        async with httpx.AsyncClient() as http_client:
            retell_response = await http_client.post(
                'https://api.retellai.com/v2/create-phone-call',
                headers={
                    'Authorization': f'Bearer {retell_api_key}',
                    'Content-Type': 'application/json'
                },
                json={
                    'from_number': retell_from_number,
                    'to_number': phone_number,
                    'agent_id': retell_agent_id
                },
                timeout=30.0
            )
        
        retell_data = retell_response.json()
        
        if retell_response.status_code != 200:
            logger.error(f"❌ Retell AI API error: {retell_data}")
            raise HTTPException(
                status_code=retell_response.status_code,
                detail=retell_data.get('message', 'Failed to initiate callback')
            )
        
        logger.info(f"✅ Callback initiated successfully: {retell_data.get('call_id')}")
        
        return CallbackResponse(
            success=True,
            message="Callback request received successfully. You will receive a call within 2 minutes.",
            callId=retell_data.get('call_id')
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Server error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Health check for Retell
@api_router.get("/retell-health")
async def retell_health():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "config": {
            "fromNumber": os.getenv('RETELL_FROM_NUMBER', '+918071387149'),
            "agentId": os.getenv('RETELL_AGENT_ID', 'agent_35f36bd462761d36e1a04512cd')
        }
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()