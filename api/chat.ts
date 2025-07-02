import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

// Portfolio knowledge base
const portfolioKnowledge = {
  personal: {
    name: "Aadarsh Kumar",
    title: "AI/ML Engineer & Full-Stack Developer",
    bio: "Passionate about building intelligent applications that solve real-world problems. Specialized in AI/ML, GenAI, and modern web development with expertise in LLMs, agentic AI, and full-stack development.",
    focus: "GenAI applications, LLM integration, multi-agent systems, and modern web development",
    experience: "3+ years in AI/ML and web development"
  },
  projects: [
    {
      title: "IntelliWrite Pro",
      description: "Custom AI writing assistant leveraging multiple LLMs for technical documentation, blog posts, and creative content with advanced context awareness.",
      tech: ["React", "TypeScript", "OpenAI GPT-4", "LangChain", "FastAPI", "PostgreSQL"],
      achievements: "40% improvement in content quality metrics, custom prompt engineering and fine-tuning",
      category: "AI/ML"
    },
    {
      title: "DataViz Studio", 
      description: "Interactive business intelligence platform with machine learning-powered insights, automated anomaly detection, and customizable visualization components.",
      tech: ["React", "D3.js", "Python", "Scikit-learn", "FastAPI", "Redis", "Docker"],
      achievements: "25% faster data processing, real-time data streaming, ML-powered trend analysis",
      category: "Full-Stack"
    },
    {
      title: "DocuSmart AI",
      description: "Intelligent document processing system using computer vision and NLP for automated data extraction, classification, and workflow integration.",
      tech: ["Python", "OpenCV", "Transformers", "spaCy", "React", "MongoDB", "AWS S3"],
      achievements: "92% accuracy in data extraction, 70% reduction in manual processing time",
      category: "AI/ML"
    },
    {
      title: "AgentFlow Framework",
      description: "Multi-agent coordination system for complex task automation featuring specialized AI agents for research, analysis, and content creation.",
      tech: ["Python", "LangChain", "AutoGen", "React", "WebSocket", "Docker", "Kubernetes"],
      achievements: "60% efficiency improvement, automated research synthesis, code review processes",
      category: "AI/ML"
    },
    {
      title: "CollabSpace Hub",
      description: "Modern team collaboration platform with real-time editing, integrated communication, project tracking, and AI-enhanced productivity features.",
      tech: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB", "Redis", "Cloudflare"],
      achievements: "1000+ concurrent users, 99.9% uptime, AI-powered meeting summaries",
      category: "Full-Stack"
    }
  ],
  skills: {
    "AI/ML": ["GenAI", "LLMs", "Agentic AI", "LangChain", "AutoGen", "Transformers", "Prompt Engineering", "NLP", "PyTorch", "TensorFlow"],
    "Frontend": ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "React Router"],
    "Backend": ["Node.js", "Express", "Python", "FastAPI", "Flask"],
    "Tools": ["Git", "GitHub Actions", "Docker", "Vite", "Postman", "Firebase", "Supabase"],
    "Data": ["Pandas", "NumPy", "Matplotlib", "Pinecone", "FAISS", "Chroma"]
  },
  expertise: {
    primary: "Generative AI, Large Language Models, and Multi-Agent Systems",
    specialties: [
      "LLM integration (GPT, Claude, Gemini)",
      "Prompt engineering and fine-tuning", 
      "Multi-agent orchestration with AutoGen",
      "LangChain for complex AI workflows",
      "RAG systems and vector databases",
      "Modern React applications with TypeScript"
    ]
  }
};

function createPersonalizedSystemPrompt(): string {
  return `You are Aadarsh Kumar's AI assistant on his portfolio website. You are knowledgeable, friendly, and professional.

ABOUT AADARSH:
• Name: ${portfolioKnowledge.personal.name}
• Title: ${portfolioKnowledge.personal.title}
• Background: ${portfolioKnowledge.personal.bio}
• Focus: ${portfolioKnowledge.personal.focus}
• Experience: ${portfolioKnowledge.personal.experience}

KEY EXPERTISE:
• Primary: ${portfolioKnowledge.expertise.primary}
• Specialties: ${portfolioKnowledge.expertise.specialties.join(', ')}

MAJOR PROJECTS (with specific achievements):
${portfolioKnowledge.projects.map(p => 
  `• ${p.title}: ${p.description}
    Technologies: ${p.tech.join(', ')}
    Key Achievements: ${p.achievements}
    Category: ${p.category}`
).join('\n\n')}

TECHNICAL SKILLS BY CATEGORY:
• AI/ML: ${portfolioKnowledge.skills["AI/ML"].join(', ')}
• Frontend: ${portfolioKnowledge.skills.Frontend.join(', ')}
• Backend: ${portfolioKnowledge.skills.Backend.join(', ')}
• Tools & Infrastructure: ${portfolioKnowledge.skills.Tools.join(', ')}
• Data & Vector DBs: ${portfolioKnowledge.skills.Data.join(', ')}

COMMON QUESTIONS TO HANDLE:
1. "Tell me about Aadarsh's projects" → Highlight 2-3 key projects with achievements
2. "What technologies does he use?" → Focus on AI/ML stack and web development tools
3. "What's his experience with AI/ML?" → Emphasize GenAI, LLMs, multi-agent systems
4. "Show me his achievements" → Mention specific metrics (92% accuracy, 70% reduction, etc.)
5. "How can I work with Aadarsh?" → Suggest exploring the contact form or portfolio
6. "What makes him unique?" → Focus on AI/ML + Full-stack combination
7. "What's his background?" → Professional experience and technical expertise

RESPONSE GUIDELINES:
1. Be conversational but professional - represent Aadarsh well
2. Provide specific details, metrics, and achievements when relevant
3. When discussing projects, mention both technical aspects and business impact
4. Encourage exploration of the portfolio and getting in touch
5. Stay focused on Aadarsh's professional capabilities
6. If unsure about specifics not in the knowledge base, acknowledge limitations gracefully
7. Keep responses concise but informative (2-4 sentences typically)

Remember: You represent Aadarsh professionally. Showcase his expertise in AI/ML and web development while being helpful and engaging.`;
}

function makeChatChain() {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_GENAI_API_KEY environment variable is not set');
  }

  return new ChatGoogleGenerativeAI({
    apiKey: apiKey,
    model: 'gemini-2.0-flash',
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log environment variable availability (without exposing the actual key)
    console.log('GOOGLE_GENAI_API_KEY available:', !!process.env.GOOGLE_GENAI_API_KEY);
    
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages missing or not an array' });
    }

    const chatChain = makeChatChain();
    
    // Use personalized system prompt with Aadarsh's portfolio knowledge
    const systemPrompt = createPersonalizedSystemPrompt();
    
    const chatMessages = [
      new SystemMessage(systemPrompt),
      ...messages.map((m: { content: string }) => new HumanMessage(m.content)),
    ];

    const response = await chatChain.invoke(chatMessages);
    
    let text = '';
    if (typeof response.text === 'string') text = response.text;
    else if (typeof response.content === 'string') text = response.content;
    else if (Array.isArray(response.content) && response.content.length > 0) {
      if (typeof response.content[0] === 'string') text = response.content[0];
      // fallback: stringify unknown structure
      else text = JSON.stringify(response.content[0]);
    } else {
      text = JSON.stringify(response);
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error('Chatbot error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
}
