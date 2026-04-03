// Mock data for Sakhi Help website

export const features = [
  {
    id: 1,
    title: "Voice-First Interface",
    description: "Natural conversation flow with WebRTC-powered real-time voice interaction. Your guests speak, Aura listens and responds instantly.",
    accent: "accent-orange",
    icon: "Mic"
  },
  {
    id: 2,
    title: "Intelligent Knowledge Base",
    description: "Upload FAQs, policies, and hotel information. Sakhi Help understands context and retrieves accurate answers from your knowledge base.",
    accent: "accent-purple",
    icon: "Brain"
  },
  {
    id: 3,
    title: "Smart Escalation",
    description: "Automatic satisfaction check after each response. Unhappy guests can instantly request a callback from your team.",
    accent: "accent-blue",
    icon: "ArrowUpRight"
  },
  {
    id: 4,
    title: "Seamless Handoff",
    description: "When callback is requested, our telephony agent calls the guest with full conversation context - no repetition needed.",
    accent: "accent-pink",
    icon: "Phone"
  },
  {
    id: 5,
    title: "Multilingual Support",
    description: "Communicate in English and Hindi with regional accent support. Break language barriers and serve diverse guests.",
    accent: "accent-green",
    icon: "Languages"
  },
  {
    id: 6,
    title: "Admin Dashboard",
    description: "Easy-to-use portal for hotel managers. Upload content, configure agent behavior, and view conversation analytics.",
    accent: "accent-grey",
    icon: "LayoutDashboard"
  }
];

export const howItWorksSteps = [
  {
    id: 1,
    screen: "2.2",
    title: "Voice Agent Active",
    description: "Guest clicks 'Talk to us' and starts a natural voice conversation. Sakhi Help greets them and listens to their question.",
    example: '"Hi! How can I help you today?" - Guest: "Do you allow pets?"',
    visualElement: "microphone"
  },
  {
    id: 2,
    screen: "2.3",
    title: "Satisfaction Check",
    description: "After providing an answer from your hotel's FAQ, Aura asks: 'Did that answer your question?'",
    example: "Guest responds Yes or No",
    visualElement: "check-buttons"
  },
  {
    id: 3,
    screen: "2.4",
    title: "Callback Offer",
    description: "If the guest is not satisfied, Sakhi offers: 'Would you like to request a callback from our team?'",
    example: "Guest chooses 'Request a Callback' or 'Ask something else'",
    visualElement: "callback-options"
  },
  {
    id: 4,
    screen: "2.5",
    title: "Capture Number",
    description: "Guest enters their 10-digit mobile number. This triggers the outbound telephony AI agent.",
    example: "Phone number submitted via voice or text input",
    visualElement: "phone-input"
  },
  {
    id: 5,
    screen: "2.6",
    title: "Confirmation",
    description: "'Thank you. You will receive a call from us within 2 minutes.' The telephony agent calls with full conversation context.",
    example: "Flow complete - human agent receives context",
    visualElement: "success-check"
  }
];

export const valuePropositions = [
  {
    id: 1,
    title: "Accessibility for All",
    description: "Serve guests uncomfortable with text interfaces - perfect for older adults and low tech-savvy users who prefer speaking over typing.",
    benefit: "Expand your reach to all demographics",
    stat: "60% of older adults prefer voice over text"
  },
  {
    id: 2,
    title: "Language Inclusivity",
    description: "Break down language barriers with multilingual voice support. Start with English and Hindi, expand to regional languages.",
    benefit: "Serve diverse guests in their native language",
    stat: "Supports 2+ languages with accent recognition"
  },
  {
    id: 3,
    title: "Disability Access",
    description: "Critical accessibility for guests with visual impairments, motor disabilities, or cognitive challenges. Voice removes barriers.",
    benefit: "ADA/inclusive design compliance",
    stat: "Essential for 15% of global population"
  }
];

export const targetHotels = [
  {
    id: 1,
    name: "Bloom Hotels",
    category: "Mid-range Business",
    useCase: "Handle check-in queries, amenity questions, and local recommendations 24/7"
  },
  {
    id: 2,
    name: "Lemon Tree Hotels",
    category: "Budget-Friendly",
    useCase: "Reduce front desk load with automated FAQ responses for common questions"
  },
  {
    id: 3,
    name: "Ginger Hotels",
    category: "Smart Economy",
    useCase: "Provide instant support in multiple languages for diverse traveler base"
  }
];

export const stats = [
  {
    id: 1,
    number: "<1.5s",
    label: "Response Time"
  },
  {
    id: 2,
    number: "24/7",
    label: "Availability"
  },
  {
    id: 3,
    number: "85%",
    label: "Query Resolution"
  },
  {
    id: 4,
    number: "2 min",
    label: "Callback Time"
  }
];
