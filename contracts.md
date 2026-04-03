# Aura AI Website - Implementation Contracts

## Current Implementation Status: FRONTEND ONLY (Mock Data)

### ✅ Completed - Frontend with Mock Data

#### Pages/Sections Built:
1. **Header** - Fixed navigation with smooth scroll, golden logo, mobile responsive
2. **Hero Section** - Golden gradient background, value proposition, CTA buttons, stats display
3. **Features Section** - 6 feature cards with accent colors (voice-first, knowledge base, escalation, handoff, multilingual, dashboard)
4. **How It Works** - 5-step flow visualization showing screens 2.2-2.6 from the user's flow diagram
5. **Value Proposition** - 3 cards explaining accessibility, language inclusivity, and disability access
6. **CTA Section** - Contact form for trial signup (currently using mock submission)
7. **Footer** - Complete footer with links, contact info, and legal

#### Mock Data Location:
- **File**: `/app/frontend/src/data/mock.js`
- **Contains**:
  - `features` - 6 feature cards data
  - `howItWorksSteps` - 5-step flow data
  - `valuePropositions` - 3 value prop cards
  - `targetHotels` - Hotel categories data
  - `stats` - Performance statistics

#### Design System:
- **Primary Color**: Golden (#D4AF37)
- **Background**: Warm cream (#FFF9F2)
- **Accent Colors**: Purple, Blue, Orange, Pink, Green, Grey (for voice cards)
- **Typography**: System fonts with SF Mono for accents
- **Components**: Custom voice cards, pill buttons, glass effects
- **Responsive**: Mobile-first design with breakpoints at 768px and 1280px

### 🔄 Next Steps - Backend Integration (When Approved)

#### API Endpoints to Build:

1. **POST /api/leads**
   - Purpose: Handle CTA form submissions
   - Request Body:
     ```json
     {
       "hotelName": "string",
       "email": "string",
       "phone": "string"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "We'll contact you within 24 hours",
       "leadId": "uuid"
     }
     ```

2. **GET /api/stats** (Optional)
   - Purpose: Fetch real-time stats for hero section
   - Response:
     ```json
     {
       "responseTime": "<1.5s",
       "availability": "24/7",
       "queryResolution": "85%",
       "callbackTime": "2min"
     }
     ```

#### Database Models:

**Lead Model** (MongoDB):
```javascript
{
  _id: ObjectId,
  hotelName: String,
  email: String,
  phone: String,
  createdAt: Date,
  status: String (enum: ['new', 'contacted', 'converted']),
  source: String (default: 'website')
}
```

#### Frontend Changes for Backend Integration:

1. **CTA Component** (`/app/frontend/src/components/CTA.js`):
   - Remove mock submission
   - Add actual API call to `POST /api/leads`
   - Add error handling and loading states
   - Remove setTimeout mock

2. **Environment Variables**:
   - Already configured: `REACT_APP_BACKEND_URL` in `/app/frontend/.env`

#### Mock Data to Remove:
- CTA form submission logic in `/app/frontend/src/components/CTA.js` (lines with `console.log` and `setTimeout`)

#### Email Integration (Optional Enhancement):
- Send email notification to admin when new lead is submitted
- Send confirmation email to the user
- Would require email service integration (SendGrid, AWS SES, etc.)

### 📋 Testing Checklist (Pre-Backend):
- [x] All sections render correctly
- [x] Smooth scroll navigation works
- [x] Mobile responsive layout
- [x] CTA form validation works
- [x] Design follows golden theme
- [x] Typography is readable
- [x] Buttons have proper hover states
- [x] Color contrast is accessible

### 🚀 Production Considerations:
1. Form validation on backend
2. Rate limiting for form submissions
3. Email verification
4. Analytics tracking
5. SEO optimization (meta tags, structured data)
6. Performance optimization (image loading, code splitting)

---

**Note**: This is currently a fully functional frontend-only website with mock data. All user interactions work in the browser, but no data is persisted. Backend integration will add data persistence and email notifications.
