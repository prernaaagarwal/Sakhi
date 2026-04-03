# VERSION 2: Post-Call Email Summaries - Implementation Plan

## Overview
After a customer completes a call with the Vapi booking agent, the system will automatically:
1. Extract booking details from the conversation transcript using AI
2. Email a summary to the customer
3. BCC the email to `agarwalprerna19@gmail.com`

## Status
**BLOCKED** - Waiting for Gmail SMTP credentials from the user

## Required Credentials
- **Gmail Address**: (To be provided by user)
- **Gmail App Password**: (To be provided by user)
  - How to get: Gmail Settings → Security → 2-Step Verification → App Passwords

## Implementation Steps

### Step 1: Install Required Dependencies
```bash
# No new dependencies needed - Python's smtplib is built-in
# httpx is already installed for API calls
```

### Step 2: Update Backend Environment Variables
Add to `/app/backend/.env`:
```
GMAIL_USER=<user_email>
GMAIL_APP_PASSWORD=<app_password>
```

### Step 3: Create Webhook Endpoint
Create endpoint in `/app/backend/server.py`:
- Route: `POST /api/vapi-webhook`
- Listen for `end-of-call-report` events from Vapi
- Extract transcript from webhook payload

### Step 4: AI Extraction Logic
- Use Emergent LLM Key (OpenAI) to extract structured data from transcript
- Fields to extract:
  - Customer name
  - Customer email
  - Check-in date
  - Check-out date
  - Number of guests
  - Room type preference
  - Special requests
  - Booking status (confirmed/pending/failed)

### Step 5: Email Sending Function
- Use Python's `smtplib` and `email.mime` modules
- Gmail SMTP settings:
  - Host: `smtp.gmail.com`
  - Port: `587` (TLS)
- Email template with booking summary
- BCC to `agarwalprerna19@gmail.com`

### Step 6: Configure Vapi Webhook
- Log into Vapi dashboard
- Navigate to assistant settings
- Add webhook URL: `https://sakhi-help.preview.emergentagent.com/api/vapi-webhook`
- Enable `end-of-call-report` event

### Step 7: Testing
- Make a test booking call via the Vapi widget
- Verify webhook receives the call data
- Verify AI extraction works correctly
- Verify email is sent to customer and BCC
- Test error handling for missing data

## File Changes Required

### `/app/backend/server.py`
- Add new endpoint: `POST /api/vapi-webhook`
- Add email sending function
- Add AI extraction function
- Add proper error handling and logging

### `/app/backend/.env`
- Add Gmail credentials (once provided by user)

## Integration Requirements

### Emergent LLM Key
- Already available in the environment
- Will be used for AI extraction via OpenAI API
- Need to call `integration_playbook_expert_v2` for proper implementation

### Vapi Webhook Configuration
- Need to provide webhook URL to user for Vapi dashboard setup
- URL format: `https://sakhi-help.preview.emergentagent.com/api/vapi-webhook`

## Testing Checklist
- [ ] Webhook endpoint receives Vapi events
- [ ] Transcript is correctly extracted from payload
- [ ] AI extraction returns structured booking data
- [ ] Email is successfully sent to customer
- [ ] BCC is received at agarwalprerna19@gmail.com
- [ ] Error handling works for invalid data
- [ ] Email template looks professional
- [ ] System handles missing customer email gracefully

## Next Actions (When User Provides Credentials)
1. Call `integration_playbook_expert_v2` for OpenAI integration with Emergent LLM key
2. Implement webhook endpoint
3. Implement AI extraction function
4. Implement email sending function
5. Test end-to-end flow
6. Provide Vapi webhook configuration instructions to user

## Notes
- The Vapi widget already has `public-key` and `assistant-id` configured in `/app/frontend/public/vapi-widget.html`
- Need to ensure webhook endpoint is accessible from Vapi servers (it should be via the external URL)
- Consider adding email template customization in future versions
