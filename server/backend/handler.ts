import type { Request, Response, NextFunction } from 'express';
import { makeChatChain } from '../chains/googleGenAIChain';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import fs from 'fs';
import path from 'path';

function extractText(response: any): string {
  if (typeof response.text === 'string') return response.text;
  if (typeof response.content === 'string') return response.content;
  // If content is an array (Gemini sometimes returns this)
  if (Array.isArray(response.content) && response.content.length > 0) {
    if (typeof response.content[0] === 'string') return response.content[0];
    if (response.content[0]?.text) return response.content[0].text;
    if (response.content[0]?.parts && response.content[0].parts[0]?.text) return response.content[0].parts[0].text;
  }
  // Fallback: stringify
  return JSON.stringify(response);
}

// Helper: Read JSON file from public dir
function readPublicJson(filename: string) {
  const filePath = path.join(__dirname, '../../public', filename);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.error('Failed to read', filename, e);
    return null;
  }
}

// Helper to load JSON data
function loadJson(file: string) {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../../public', file), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load', file, e);
    return null;
  }
}

// Helper: Get about text (hardcoded or from a file)
function getAboutText() {
  return `I'm Aadarsh, building at the edge of GenAI — crafting intelligent, production-ready apps with LLMs, agentic workflows, and modern web tech. From React and TypeScript to LangChain and AutoGen, I turn cutting-edge ideas into scalable, user-first products.\nGraduating from VNIT Nagpur (2026), interned at Genpact, and delivered freelance AI/web projects. Reach out for collaboration!`;
}

// Helper to detect query intent
function detectIntent(message: string) {
  const lower = message.toLowerCase();
  // Match a wide range of project-related queries
  if (
    lower.includes('project') ||
    lower.includes('latest projects') ||
    lower.includes('portfolio') ||
    lower.includes('your latest projects') ||
    lower.includes('recent projects') ||
    lower.includes('show me your projects') ||
    lower.includes('work you have done')
  ) return 'projects';
  if (lower.includes('skill')) return 'skills';
  if (lower.includes('about') || lower.includes('yourself') || lower.includes('who are you')) return 'about';
  if (lower.includes('testimonial') || lower.includes('client')) return 'testimonials';
  return null;
}

// Helper: Build RAG context
function buildRagContext({ about, projects, skills, testimonials }: any) {
  let context = '';
  if (about) context += `ABOUT ME:\n${about}\n`;
  if (projects) context += `PROJECTS:\n${projects.map((p: any) => `- ${p.title}: ${p.description}`).join('\n')}\n`;
  if (skills) context += `SKILLS:\n${skills.map((cat: any) => `${cat.category}: ${cat.skills.map((s: any) => s.name).join(', ')}`).join(' | ')}\n`;
  if (testimonials) context += `TESTIMONIALS:\n${testimonials.map((t: any) => `${t.name} (${t.title}): \"${t.quote}\"`).join('\n')}\n`;
  return context;
}

// Helper to build context
function buildContext(intent: string) {
  if (intent === 'projects') {
    const projects = loadJson('projects.json');
    if (!projects) return '';
    return `SYSTEM: You are Aadarsh's AI Assistant. When asked about projects, ONLY use the following list. Do NOT mention yourself, LLMs, or any AI model projects. Do NOT say you are an AI or language model. Just present the following as Aadarsh's projects.\n\nAadarsh's Projects:\n` + projects.map((p: any) => `- ${p.title}: ${p.description}`).join('\n') + '\n\nIf the user asks for more details, you may elaborate using only the information above.';
  }

  if (intent === 'skills') {
    const skills = loadJson('skills.json');
    if (!skills) return '';
    return 'Here are my main skills:\n' + skills.flatMap((cat: any) => cat.skills.map((s: any) => `- ${s.name}: ${s.fact}`)).join('\n');
  }
  if (intent === 'about') {
    return `About me: I'm building at the edge of GenAI — crafting intelligent, production-ready apps with LLMs, agentic workflows, and modern web tech. From React and TypeScript to LangChain and AutoGen, I turn cutting-edge ideas into scalable, user-first products.`;
  }
  if (intent === 'testimonials') {
    const testimonials = loadJson('testimonials.json');
    if (!testimonials) return '';
    return 'Here are some testimonials from my clients:\n' + testimonials.map((t: any) => `- ${t.name} (${t.title}): "${t.quote}"`).join('\n');
  }
  return '';
}

async function handler(req: Request, res: Response, next?: NextFunction) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    console.error('Bad request: missing or invalid message', req.body);
    return res.status(400).json({ error: 'Message required' });
  }
  try {
    console.log('Received message:', message);
    const intent = detectIntent(message);
    if (intent === 'projects') {
      // Directly return project info, bypassing LLM
      const projects = loadJson('projects.json');
      if (!projects) return res.status(500).json({ reply: 'Sorry, could not load project data.' });
      const reply = 'Here are my latest projects:\n' + projects.map((p: any) => `- ${p.title}: ${p.description}`).join('\n');
      return res.status(200).json({ reply });
    }

    const chain = makeChatChain();
    const context = buildContext(intent || '');
    let response;
    if (context) {
      // Send system prompt as a SystemMessage, then user message
      response = await chain.call([
        new SystemMessage(context),
        new HumanMessage(message)
      ]);
    } else {
      response = await chain.call([new HumanMessage(message)]);
    }
    console.log('AI response:', response);
    const reply = extractText(response);
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err);
    if (err instanceof Error && err.stack) {
      console.error('Stack trace:', err.stack);
    }
    res.status(500).json({ error: 'Chatbot error', details: String(err) });
  }
}

// Also export as middleware for Express
export const chatHandler = (req: Request, res: Response, next?: NextFunction) => {
  handler(req, res, next);
};
