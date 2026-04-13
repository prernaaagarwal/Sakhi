# Sakhi — AI Voice Agent for Hotel Operations

**Reimagining hotel customer service using AI — from repetitive calls to intelligent workflows**

Sakhi is an AI-powered voice agent designed to handle high-volume guest interactions across hotel operations — including support, reservations, and front office services.

It is built to operate in real-world environments with:
- noisy inputs  
- operational constraints  
- and human-in-the-loop workflows  

---

## 🧠 Problem

Hotel staff spend a significant portion of time handling repetitive calls:

- “Can I get extra towels?”  
- “What’s the WiFi password?”  
- “Is early check-in available?”  

This creates:
- operational inefficiency  
- delayed guest response times  
- reduced focus on high-value guest interactions  

---

## 🎯 Goal

Design an AI system that:
- Automates repetitive guest interactions  
- Integrates with existing hotel workflows (PMS, ticketing)  
- Maintains service quality with human fallback  
- Works reliably in real-world hotel environments  

---

## ⚙️ Approach

Sakhi is designed as a **workflow-integrated AI system**, not just a chatbot.

### Core Flow:
Guest Call → Intent Detection → Action Execution → Confirmation → (Optional) Human Escalation  

---

## 🏗️ System Design

### Core Capabilities

### 1. Support Automation
- Handles guest FAQs (WiFi, amenities, timings)  
- Creates tickets for housekeeping/maintenance  

### 2. Reservations
- Checks availability via PMS (e.g., AxisRooms, Oracle)  
- Handles bookings and modifications  

### 3. Front Office Requests
- Late checkout  
- Wake-up calls  
- Service requests  

---

## 🔑 Key Product Decisions

### 1. AI + Human Hybrid Model
Full automation is unreliable in edge cases  

→ Designed seamless human handoff for complex scenarios  

---

### 2. Workflow Integration over Standalone AI
AI tools often fail when disconnected from systems  

→ Integrated with PMS + ticketing systems for real actionability  

---

### 3. Context Preservation in Escalation
Users hate repeating themselves  

→ Passed conversation context to human agents during transfer  

---

### 4. Designed for Indian Hotel Context
- Diverse accents  
- Noisy environments  
- Operational variability  

→ Optimized for real-world usage, not ideal conditions  

---

## ⚖️ Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| Voice-first interface | Higher complexity vs chat |
| Automation | Risk of incorrect execution |
| System integrations | Dependency on external tools |

---

## 🧪 Failure Modes

- Speech recognition errors in noisy environments  
- Ambiguous guest requests  
- Edge cases in booking logic  
- Integration failures with PMS systems  

System designed to:
→ fallback gracefully to human agents  

---

## 🏨 Pilot Deployment (Bangalore)

Sakhi was piloted across:

- Bloom Hotels  
- Ginger Hotels  
- Lemon Tree Hotels  

---

## 🚀 Adoption Strategy (Critical)

AI adoption is not just a tech problem — it’s a people problem.

### Champion Network Model

- Identified “AI Champions” within hotel staff  
- Enabled them as:
  - first-line support  
  - feedback collectors  
  - adoption drivers  

### Why this mattered:
- Reduced resistance to AI  
- Improved trust in the system  
- Created real-time feedback loops  

---

## 📊 What I Learned

- AI reliability depends more on system design than model quality  
- Human fallback is essential for trust  
- Adoption requires internal champions, not just training  
- AI products succeed when embedded into workflows  

---

## 🔮 Future Improvements

- Better voice accuracy in noisy conditions  
- Multi-language support  
- Smarter escalation logic  
- Deeper PMS integrations  
- Analytics for call handling and performance  

---

## 🧭 Why This Matters

Most AI voice bots are demos.

Sakhi is designed as a **production-ready system** that:

- integrates with real workflows  
- handles real users  
- and adapts to real constraints  

---

## 👋 About Me

I build AI systems that work in real-world environments —  
bridging product strategy, AI capability, and operational execution.

This project reflects my focus on:
→ Product–AI Fit  
→ system design under constraints  
→ and AI adoption in real organizations  # Here are your Instructions
