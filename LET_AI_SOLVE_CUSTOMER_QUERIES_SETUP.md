# Complete Setup Guide: "LET AI SOLVE CUSTOMER QUERIES" Feature
## For Google AI Studio Recreation

---

## Overview
This feature allows customers to request an AI callback. When they submit their phone number, the system triggers Retell AI to call them within 2 minutes with an AI agent.

---

## Architecture

```
User Input (Phone Number) 
    ↓
Frontend React Modal (Validation)
    ↓
POST /api/retell-callback
    ↓
Backend FastAPI Validation
    ↓
Retell AI API Call
    ↓
AI Phone Call to Customer
```

---

## 1. FRONTEND COMPONENT

### CallbackModal.js (React Component)

**Purpose**: Collect phone number and send to backend

**Key Features**:
- Phone number input with E.164 format validation
- Loading state during API call
- Success confirmation with auto-close
- Error handling with user-friendly messages

**Validation Logic**:
```javascript
// E.164 Format: +[country code][number]
// Examples: +919876543210, +14155552671

const validatePhoneNumber = (phone) => {
  phone = phone.trim().replace(/[^\d+]/g, '');
  
  // Add + if missing
  if (!phone.startsWith('+')) {
    if (/^\d+$/.test(phone)) {
      phone = '+' + phone;
    }
  }
  
  // Validate length (10-16 chars including +)
  if (phone.length < 10 || phone.length > 16) {
    return { valid: false, error: 'Invalid phone number length' };
  }
  
  // Validate format: + followed by digits only
  if (!/^\+\d+$/.test(phone)) {
    return { valid: false, error: 'Only digits allowed after +' };
  }
  
  return { valid: true, phone: phone };
};
```

**API Call**:
```javascript
const response = await axios.post(`${BACKEND_URL}/api/retell-callback`, {
  phoneNumber: validatedPhone
});
```

---

## 2. BACKEND API ENDPOINT

### FastAPI Route: POST /api/retell-callback

**File**: `/app/backend/server.py`

**Request Model**:
```python
class CallbackRequest(BaseModel):
    phoneNumber: str  # E.164 format required
```

**Response Model**:
```python
class CallbackResponse(BaseModel):
    success: bool
    message: str
    callId: str = None  # Retell call ID for tracking
```

**Complete Endpoint Code**:
```python
@api_router.post("/retell-callback", response_model=CallbackResponse)
async def request_retell_callback(request: CallbackRequest):
    try:
        phone_number = request.phoneNumber.strip()
        
        # 1. Validate phone number exists
        if not phone_number:
            raise HTTPException(status_code=400, detail="Phone number is required")
        
        # 2. Validate E.164 format
        import re
        e164_regex = r'^\+[1-9]\d{1,14}$'
        if not re.match(e164_regex, phone_number):
            raise HTTPException(
                status_code=400, 
                detail="Phone number must be in E.164 format (e.g., +919876543210)"
            )
        
        # 3. Get Retell AI credentials from environment
        retell_api_key = os.getenv('RETELL_API_KEY')
        retell_agent_id = os.getenv('RETELL_AGENT_ID')
        retell_from_number = os.getenv('RETELL_FROM_NUMBER')
        
        logger.info(f"📞 Initiating callback to {phone_number}...")
        
        # 4. Call Retell AI API
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
        
        # 5. Handle Retell API response
        if retell_response.status_code != 200:
            logger.error(f"❌ Retell AI API error: {retell_data}")
            raise HTTPException(
                status_code=retell_response.status_code,
                detail=retell_data.get('message', 'Failed to initiate callback')
            )
        
        logger.info(f"✅ Callback initiated: {retell_data.get('call_id')}")
        
        return CallbackResponse(
            success=True,
            message="Callback request received. You'll get a call within 2 minutes.",
            callId=retell_data.get('call_id')
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Server error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
```

---

## 3. RETELL AI INTEGRATION

### Required Environment Variables

Add to `/app/backend/.env`:

```bash
RETELL_API_KEY=key_c307c68839cf3854ee34f5222b42
RETELL_AGENT_ID=agent_35f36bd462761d36e1a04512cd
RETELL_FROM_NUMBER=+918071387149
```

### Retell AI API Documentation

**Endpoint**: `POST https://api.retellai.com/v2/create-phone-call`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "from_number": "+918071387149",
  "to_number": "+919876543210",
  "agent_id": "agent_35f36bd462761d36e1a04512cd"
}
```

**Success Response** (200):
```json
{
  "call_id": "call_abc123xyz",
  "status": "initiated",
  "to_number": "+919876543210",
  "agent_id": "agent_35f36bd462761d36e1a04512cd"
}
```

**Error Response** (400/500):
```json
{
  "error": "Invalid phone number",
  "message": "Phone number must be in E.164 format"
}
```

---

## 4. GOOGLE AI STUDIO RECREATION

### Option A: Create Agent in Retell AI Dashboard

1. **Go to**: https://app.retellai.com/
2. **Create New Agent**:
   - Name: "Hotel Customer Support Agent"
   - Voice: Choose preferred voice
   - Language: English, Hindi
   - Response time: Fast

3. **Configure Agent Prompt**:
```
You are a helpful AI assistant for a hotel booking system.

Your role:
- Greet the customer warmly
- Ask how you can help them today
- Listen to their queries about hotel bookings, room availability, amenities, pricing, etc.
- Provide helpful, accurate information
- Be polite, professional, and friendly
- If you don't know something, admit it and offer to connect them with a human agent

Remember:
- Keep responses concise and clear
- Confirm important details like dates and room types
- End calls gracefully

Example conversation:
Customer: "Hi, I need to book a room"
You: "Hello! I'd be happy to help you book a room. What dates are you looking to stay with us?"
```

4. **Get Agent ID**:
   - Copy the agent_id from dashboard
   - Add to backend .env file

### Option B: Use Retell AI API to Create Agent

```python
import httpx

async def create_retell_agent():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            'https://api.retellai.com/v2/create-agent',
            headers={
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            },
            json={
                'agent_name': 'Hotel Support Agent',
                'voice_id': 'elevenlabs-voice-id',
                'language': 'en',
                'response_type': 'conversational',
                'prompt': 'Your agent prompt here...',
                'first_message': 'Hello! How can I help you today?'
            }
        )
        return response.json()
```

---

## 5. COMPLETE FLOW DIAGRAM

```
Step 1: User Clicks "LET AI SOLVE CUSTOMER QUERIES"
    ↓
Step 2: Modal Opens with Phone Input Form
    ↓
Step 3: User Enters Phone (+919876543210)
    ↓
Step 4: Frontend Validates Format
    ↓
Step 5: POST /api/retell-callback
    ↓
Step 6: Backend Validates E.164 Format
    ↓
Step 7: Backend Calls Retell AI API
    ↓
Step 8: Retell AI Returns call_id
    ↓
Step 9: Backend Returns Success to Frontend
    ↓
Step 10: Modal Shows Success Message
    ↓
Step 11: Retell AI Calls Customer (Within 2 min)
    ↓
Step 12: AI Agent Converses with Customer
    ↓
Step 13: Call Ends (Manual or Auto)
```

---

## 6. DEPENDENCIES REQUIRED

### Python (Backend)
```bash
pip install fastapi==0.110.1
pip install httpx>=0.24.0
pip install python-dotenv>=1.0.1
pip install pydantic>=2.6.4
```

### JavaScript (Frontend)
```bash
npm install axios
npm install react
npm install lucide-react  # For icons
```

---

## 7. TESTING

### Test API Locally

```bash
# Test endpoint
curl -X POST http://localhost:8001/api/retell-callback \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+919876543210"}'

# Expected Response
{
  "success": true,
  "message": "Callback request received. You'll get a call within 2 minutes.",
  "callId": "call_abc123"
}
```

### Test Phone Number Validation

Valid formats:
- ✅ +919876543210 (India)
- ✅ +14155552671 (US)
- ✅ +442071234567 (UK)

Invalid formats:
- ❌ 9876543210 (missing +)
- ❌ +91 98765 43210 (has spaces)
- ❌ +91-9876543210 (has dash)

---

## 8. ERROR HANDLING

### Common Errors and Solutions

**Error**: "Phone number must be in E.164 format"
- **Solution**: Ensure number starts with + and country code
- **Example**: +919876543210

**Error**: "Failed to initiate callback"
- **Solution**: Check Retell API key is valid
- **Solution**: Verify agent_id exists in Retell dashboard

**Error**: "Invalid from_number"
- **Solution**: Verify RETELL_FROM_NUMBER in .env
- **Solution**: Ensure number is verified in Retell dashboard

**Error**: "Rate limit exceeded"
- **Solution**: Add delay between requests
- **Solution**: Upgrade Retell plan if needed

---

## 9. SECURITY CONSIDERATIONS

1. **Rate Limiting**: Add rate limits to prevent abuse
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@limiter.limit("5/minute")
@api_router.post("/retell-callback")
async def request_retell_callback(request: CallbackRequest):
    # ... existing code
```

2. **Phone Number Sanitization**: Already implemented
3. **API Key Protection**: Store in .env, never commit
4. **Input Validation**: E.164 format check implemented

---

## 10. GOOGLE AI STUDIO ALTERNATIVE

If you want to use Google AI Studio instead of Retell:

**Not Recommended Because**:
- Google AI Studio doesn't support phone calls natively
- You'd need to integrate with Twilio/Vonage for calling
- More complex setup required
- Retell AI is purpose-built for voice calls

**If You Still Want Google AI Studio**:
1. Create agent in AI Studio
2. Use Twilio for phone calling
3. Stream audio to/from Google AI
4. Handle call state management
5. Significantly more code required

---

## 11. COMPLETE FILE LOCATIONS

- **Frontend Modal**: `/app/frontend/src/components/CallbackModal.js`
- **Frontend CSS**: `/app/frontend/src/components/CallbackModal.css`
- **Backend API**: `/app/backend/server.py`
- **Environment**: `/app/backend/.env`
- **Hero Integration**: `/app/frontend/src/components/Hero.js`

---

## 12. MONITORING & LOGGING

```python
# Backend logs callback requests
logger.info(f"📞 Callback requested: {phone_number}")
logger.info(f"✅ Call initiated: {call_id}")
logger.error(f"❌ Retell error: {error_message}")
```

View logs:
```bash
tail -f /var/log/supervisor/backend.out.log
```

---

## SUMMARY

This feature uses:
- **Frontend**: React modal with phone input validation
- **Backend**: FastAPI endpoint with E.164 validation
- **External API**: Retell AI for AI-powered phone calls
- **Flow**: User submits phone → Backend validates → Retell AI calls → AI converses

**Key Files**: CallbackModal.js, server.py, .env
**Key Integrations**: Retell AI API
**Time to Call**: Within 2 minutes

---

This is the complete setup. Everything is already integrated and working in your application!
