# Sakhi — AI Voice Agent for Hotel Operations

**Designing AI systems that work in the real world — not just demos**

Sakhi is an AI-powered voice agent built to handle high-volume guest interactions across hotel operations — including support, reservations, and front office services.

Unlike typical AI demos, Sakhi is designed for **production environments**, where systems must operate under:
- noisy inputs  
- real-time constraints  
- operational dependencies  
- and human expectations  

---

## 🧠 The Problem

Hotel operations are heavily burdened by repetitive, high-frequency calls:

- “Can I get extra towels?”  
- “What’s the WiFi password?”  
- “Is early check-in available?”  

This leads to:
- staff overload during peak hours  
- slower guest response times  
- reduced focus on high-value guest experiences  

The core issue is not lack of intelligence —  
it’s **lack of workflow efficiency**.

---

## 🎯 Product Thesis

AI in hospitality should not replace humans.

It should:
→ handle repetitive workflows  
→ augment staff efficiency  
→ preserve high-touch guest experiences  

Sakhi is built as an **AI operations layer**, not just a chatbot.

---

## ⚙️ How Sakhi Works

**Guest Call → Understand → Decide → Act → Confirm → (Escalate if needed)**

### Core Capabilities

### 1. Support Automation
- Handles FAQs (WiFi, amenities, timings)  
- Creates tickets for housekeeping/maintenance  

### 2. Reservations
- Checks availability via PMS (e.g., AxisRooms, Oracle)  
- Processes bookings and modifications  

### 3. Front Office Requests
- Late checkout  
- Wake-up calls  
- Service requests  

---

## 🧩 System Architecture (Simplified)

User Call  
→ Speech-to-Text  
→ Intent Detection (LLM layer)  
→ Decision Engine  
→ Action Layer (PMS / Ticketing Systems)  
→ Response Generation  
→ Text-to-Speech  

Fallback:
→ Human agent with full conversation context  

---

## 🔑 Key Product Decisions

### 1. Human-in-the-Loop by Design
Full automation fails in edge cases  

→ Built seamless escalation with context transfer  
→ Ensured users never repeat themselves  

---

### 2. Workflow Integration > Standalone AI
AI without actionability creates friction  

→ Integrated with PMS + operational systems  
→ Focused on completing tasks, not just answering  

---

### 3. Reliability Over Intelligence
Slightly less “smart” but predictable > highly variable outputs  

→ Structured flows and constraints over open-ended responses  

---

### 4. Built for Real-World Indian Context
- Diverse accents  
- Background noise  
- Operational variability  

→ Designed for robustness, not ideal conditions  

---

## ⚖️ Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| Voice-first interface | Higher complexity vs chat |
| Automation | Risk in edge-case handling |
| System integrations | Dependency on external reliability |

All tradeoffs prioritized **usability and operational reliability**.

---

## 🧪 Failure Modes

- Speech recognition errors in noisy environments  
- Ambiguous guest intent  
- Edge cases in booking logic  
- Integration failures  

System designed to:
→ degrade gracefully  
→ escalate intelligently  

---

## 🏨 Pilot Deployment

Deployed across hotel environments in Bangalore, including:

- Bloom Hotels  
- Ginger Hotels  
- Lemon Tree Hotels  

This introduced real-world constraints:
- staff adoption challenges  
- system reliability expectations  
- operational dependencies  

---

## 👥 Adoption & Change Management

AI adoption is not a technology problem — it’s a behavior problem.

### Approach:
- Built a **Champion Network** within hotel staff  
- Enabled peer-led onboarding and support  
- Created real-time feedback loops with teams  

### Why this worked:
- Increased trust in the system  
- Reduced resistance to AI adoption  
- Accelerated learning cycles  

---

## 📊 Impact & Metrics (Pilot Learnings)

Focus areas:
- Reducing repetitive call load  
- Improving response times  
- Increasing staff efficiency  

### Observations:
- High automation potential in support + front office workflows  
- Human fallback critical for trust  
- Strong ROI in time saved per interaction  

### Metrics tracked / designed:
- % of calls handled by AI  
- Escalation rate  
- Average handling time reduction  
- Staff time saved  

AI success measured by **operational impact**, not just accuracy.

---

## 🎥 Demo

Example flow:
1. Guest requests late checkout  
2. Sakhi checks PMS availability  
3. Confirms eligibility  
4. Updates system  
5. Responds to guest  

👉 Live Demo: https://golden-sakhi-demo.preview.emergentagent.com/

---

## 🔁 What I Would Do Differently

- Invest earlier in evaluation and monitoring systems  
- Improve voice UX for multi-accent robustness  
- Define clearer escalation thresholds  
- Build tighter feedback → iteration loops  

This reflects the transition from **pilot → scalable product**.

---

## 🧭 Product Strategy

**Why Voice?**
- Natural interface for hotel guests  
- Reduces friction vs apps or chat  
- Ideal for high-frequency, low-complexity tasks  

**Why Hotels?**
- High volume of repetitive workflows  
- Clear ROI from automation  
- Structured backend systems  

**Positioning:**
Sakhi is not a chatbot.  
It is an **AI layer for operational workflows in hospitality**.

---

## 📊 What I Learned

- AI reliability is a system design problem  
- Human fallback is essential for trust  
- Adoption requires internal champions, not just training  
- AI products succeed when embedded into workflows  

---

## 🧭 Why This Matters

Most AI voice agents are built as demos.

Sakhi is designed as a **real-world system** that:
- integrates into workflows  
- operates under constraints  
- and evolves with usage  

---

## 👋 About Me

I build AI systems that work beyond prototypes —  
focusing on product decisions, system design, and real-world adoption.

My work sits at the intersection of:
→ Product strategy  
→ AI capability  
→ Operational execution  
