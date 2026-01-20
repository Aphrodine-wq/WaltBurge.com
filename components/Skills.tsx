import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';
import {
  Cpu, Globe, Database, Bot, Terminal, Code2, Cloud, Github,
  Link, Zap, Brain, Box, Wind, MousePointer2, Sparkles, Monitor,
  FileCode, Layers, Rocket, MessageSquare, Table, Sigma, FileSearch,
  Palette, Network, Image as ImageIcon, Key, AppWindow, Command,
  Smartphone, ScanFace, Activity, Server, Layout, Lock, Search, X, Filter, Gamepad
} from 'lucide-react';

interface Skill {
  name: string;
  level?: number;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  description: string;
  type: 'bar' | 'tags';
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Artificial Intelligence',
    icon: <Bot size={18} className="text-brand-accent" />,
    description: "Generative models, RAG pipelines, and automated reasoning.",
    type: 'bar',
    skills: [
      { name: 'LLM Integration', level: 95 },
      { name: 'RAG Architecture', level: 90 },
      { name: 'Prompt Engineering', level: 98 },
      { name: 'AI Agents (CrewAI/AutoGPT)', level: 92 },
      { name: 'Function Calling', level: 88 },
      { name: 'Vector Embeddings', level: 85 },
      { name: 'Fine-Tuning', level: 85 },
      { name: 'Computer Vision', level: 82 },
      { name: 'TensorFlow / PyTorch', level: 80 },
    ]
  },
  {
    name: 'AI & Data Tools',
    icon: <Database size={18} className="text-brand-accent" />,
    description: "Integrations with leading AI models and data frameworks.",
    type: 'tags',
    skills: [
      { name: 'OpenAI API' },
      { name: 'Anthropic API' },
      { name: 'Google Gemini' },
      { name: 'Pinecone' },
      { name: 'ChromaDB' },
      { name: 'LlamaIndex' },
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Weights & Biases' },
      { name: 'Midjourney' },
      { name: 'Stable Diffusion' },
      { name: 'LM Studio' },
      { name: 'Ollama' },
      { name: 'Hugging Face' },
      { name: 'Groq API' },
      { name: 'OpenAI API' },
      { name: 'Anthropic API' },
      { name: 'Google Gemini' },
      { name: 'Pinecone' },
      { name: 'ChromaDB' },
      { name: 'LlamaIndex' },
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Weights & Biases' },
      { name: 'Midjourney' },
      { name: 'Stable Diffusion' },
      { name: 'Stable Audio' },
      { name: 'Whisper' },
      { name: 'LM Studio' },
      { name: 'Ollama' },
      { name: 'Hugging Face' },
      { name: 'Groq API' },
      { name: 'LangChain' },
      { name: 'CrewAI' }
    ]
  },
  {
    name: 'Integrated Environments',
    icon: <Code2 size={18} className="text-brand-accent" />,
    description: "Proficiency across modern and custom-built IDEs.",
    type: 'tags',
    skills: [
      { name: 'VS Code' },
      { name: 'Visual Studio' },
      { name: 'Trae AI' },
      { name: 'Cursor' },
      { name: 'Windsurf' },
      { name: 'Xcode' },
      { name: 'Android Studio' },
      { name: 'Vim' },
      { name: 'Sublime Text' },
      { name: 'Blackbox' },
      { name: 'Grump IDE' },
      { name: 'Intellij IDEA' },
      { name: 'Verdent' },
      { name: 'AntiGravity' }
    ]
  },
  {
    name: 'Systems Engineering',
    icon: <Cpu size={18} className="text-brand-accent" />,
    description: "Low-level optimization, compiler design, and kernel logic.",
    type: 'bar',
    skills: [
      { name: 'C++ / C', level: 98 },
      { name: 'Assembly', level: 90 },
      { name: 'Compiler Design', level: 92 },
      { name: 'Memory Mgmt', level: 95 },
    ]
  },
  {
    name: 'Full Stack Web & Cloud',
    icon: <Globe size={18} className="text-brand-accent" />,
    description: "Scalable distributed systems and reactive user interfaces.",
    type: 'bar',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'Vercel Hosting', level: 92 },
      { name: 'Github', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'AWS Cloud', level: 85 },
    ]
  },
  {
    name: 'Game & Mobile',
    icon: <Terminal size={18} className="text-brand-accent" />,
    description: "High-performance rendering and native application development.",
    type: 'bar',
    skills: [
      { name: 'Godot Engine', level: 88 },
      { name: 'Swift / iOS', level: 90 },
      { name: 'Unreal Engine 5', level: 82 },
      { name: 'Metal / HLSL', level: 85 },
    ]
  }
];

// Lucide imports handled at top


const VercelIcon = () => (
  <svg width="12" height="12" viewBox="0 0 1155 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M577.344 0L1154.69 1000H0L577.344 0Z" /></svg>
);
const GodotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm-4 4h2v2H7zm8 0h2v2h-2zm-4 4h2v2h-2z" /></svg>
);
const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.9 6.04 6.04 0 0 0-6.5-2.9 6.06 6.06 0 0 0-4.98 2.18 5.98 5.98 0 0 0-4 2.9 6.04 6.04 0 0 0 .75 7.1 5.98 5.98 0 0 0 .5 4.9 6.04 6.04 0 0 0 6.5 2.9 5.98 5.98 0 0 0 5-2.18 5.98 5.98 0 0 0 4-2.9 6.05 6.05 0 0 0-.76-7.1zM9.08 19.34a4.48 4.48 0 0 1-2.88-1l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a1.54 1.54 0 0 0 .72.19 1.52 1.52 0 0 0 1.34-.82l.02.01a4.5 4.5 0 0 1-3.69 10.75 4.54 4.54 0 0 1-2.84-1zm-5.26-5.18a4.55 4.55 0 0 1-.37-2.97l.14.08 4.78 2.76a.8.8 0 0 0 .8 0l5.83-3.37v2.33a1.51 1.51 0 0 0 .62 1.26 1.52 1.52 0 0 0 1.52.05l-.02.03a4.5 4.5 0 0 1-7.86 3.52 4.48 4.48 0 0 1-5.44-3.7zM4.18 7.43a4.49 4.49 0 0 1 3.24-3.77l.05.14 2.02 4.73a.8.8 0 0 0 .7.48l6.73-.01-2.02 2.34a1.53 1.53 0 0 0-.11 1.49 1.52 1.52 0 0 0 1.23.97l.01-.03a4.5 4.5 0 0 1-2.32 7.82 4.53 4.53 0 0 1-9.53-14.16zm14.87 1.94l-.13-.08-4.79-2.76a.8.8 0 0 0-.8 0L7.5 9.9V7.57a1.52 1.52 0 0 0-.62-1.26 1.52 1.52 0 0 0-1.52-.05l.02-.03a4.5 4.5 0 0 1 7.85-3.51 4.47 4.47 0 0 1 5.44 3.7 4.53 4.53 0 0 1 .37 2.97zM9.26 15.02a.8.8 0 0 0-.4.68v6.74l-2.02-1.17a1.54 1.54 0 0 0-.72-.19 1.52 1.52 0 0 0-1.34.82l-.02-.01a4.5 4.5 0 0 1 3.69-10.75 4.54 4.54 0 0 1 2.85 1l-2.04 2.88zm-.94-6.01l6.73.01 2.02-2.34a1.53 1.53 0 0 0 .1-1.49 1.52 1.52 0 0 0-1.23-.97l-.01.03a4.5 4.5 0 0 1 2.32 7.82 4.53 4.53 0 0 1-9.53 14.16l-3.29-3.79a4.49 4.49 0 0 1-3.24 3.77l-.05-.14 2.02-4.73a.8.8 0 0 0-.7-.48z" /></svg>
);
const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M23.15 2.587l-9.5 8.187 8.15 6.587c.75.563 1.2 1.15 1.2 2.15V2.587zM12.2 12.25L2.3 21.087C2 21.387 1.7 21.387 1.4 21.287L.3 20.487c-.2-.2-.3-.5-.2-.8l4.4-11.4L.2 4.287c-.1-.3 0-.6.2-.8L1.4 2.687c.3-.2.6-.1.9.2l9.9 9.363zM18.4 22.787L5.7 12.687l12.8-10.4c.6-.4 1.3-.1 1.3.8v18.7c0 .9-.7 1.3-1.4 1z" /></svg>
);
const VisualStudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.6 1.2c-.3-.1-.6 0-.8.2L.5 10.3c-.2.2-.2.5 0 .7l.5.5c.3.3.3.7 0 .9L.3 13.2c-.2.2-.2.5 0 .7l10.5 9c.2.2.6.2.8.1l11.7-8.8c.4-.3.4-1 0-1.3l-5-3.7 5.2-3.8c.4-.3.4-1 0-1.3L11.6 1.2zM2.8 11.1l7.6-6.6v15l-7.6-6.6 2.7-2.6-3.8-3.7 1.1 4.5zM12.7 5.7l8.7 6.3-8.7 6.4V5.7z" /></svg>
);
const AnthropicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C12 2 12 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 7.58172 18 12 18C16.4183 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2ZM12 4C15.3137 4 18 6.68629 18 10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10C6 6.68629 8.68629 4 12 4ZM10.5 7V13H13.5V7H10.5Z" /></svg>
);
const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12,2L9.5,9.5L2,12L9.5,14.5L12,22L14.5,14.5L22,12L14.5,9.5L12,2Z" /></svg>
);
const HuggingFaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="12" cy="12" r="10" /><path d="M8 9H10V11H8V9ZM14 9H16V11H14V9ZM8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
);
const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 0c-2.3 0-4.3.4-4.7 2.1l-.1.8h3.3v1h-4.8C4.3 3.9 3 5 3 7.3v1.8h3v-1.1c0-.9.7-1.7 1.7-1.7h5.1c1.1 0 1.9.9 1.9 1.9v2.6h-2.9c-2.3 0-4.3 1.1-4.3 3.4v2.7c0 2.2 1.3 3.3 3.5 3.3h1.8v-2.3c0-1.6 1.3-2.9 2.9-2.9h2.9v-2.8c0-2.3-2-2.2-4.2-2.2h-2.2v-1h2.2c2.2 0 4.2.1 4.2-2.2V4.5C21 2.2 19 0 16.7 0H12zm-3.6 1.4c.5 0 .9.4.9.9 0 .5-.4.9-.9.9-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9zm7.3 18.5c-.5 0-.9.4-.9.9 0 .5.4.9.9.9.5 0 .9-.4.9-.9 0-.5-.4-.9-.9-.9z" /></svg>
);
const LangChainIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IntellijIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M0 0v24h24V0H0zm4.2 19.8l5.9-4.8-1.9-4.3L2 13v5.6l2.2 1.2zm6.7-7l2-5.6-2.9-3.4H3.8l7.1 9zm9.5 7l-5.4-8.6L12.9 8l-2.7 7.6 1.9 4.3 8.3-.1z" /></svg>
);
const AndroidStudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16.6 6c.3-.8.7-1.5 1.1-2.1l-1.6-1c-.5.6-1 1.4-1.3 2.2-.1.2-.2.5-.2.7h2zM7.4 6c0-.3-.1-.5-.2-.7-.3-.8-.8-1.5-1.3-2.2l-1.6 1c.5.6.9 1.3 1.1 2.1h2zM17.5 18H6.5v2h11v-2zm-12.7 0c-.2-1.8-.3-3.7-.3-5.6 0-3.5 2.1-6.5 5.1-7.9l.6 1.1c-2.5 1.2-4.2 3.8-4.2 6.8 0 1.6.1 3.2.3 4.8l-1.5.8zm14.4 0l-1.5-.8c.2-1.6.3-3.2.3-4.8 0-3-1.8-5.6-4.2-6.8l.6-1.1c3 1.4 5.1 4.5 5.1 7.9 0 1.9-.1 3.8-.3 5.6zM6.5 21v1h11v-1H6.5z" /></svg>
);
const XcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12.9 10.9L16.4 6H14L11.5 9.5L9 6H6.6L10.1 10.9L6 16.5H8.5L11.6 12.3L14.7 16.5H17.2L12.9 10.9Z" /><path d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM4 4V20H20V4H4Z" fillOpacity="0.3" /></svg>
);
const OllamaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17 2H19V4H17V2ZM17 5H19V7H17V5ZM17 8H19V10H17V8ZM7 11H9V13H7V11ZM7 14H9V16H7V14ZM11 11H13V13H11V11ZM11 14H13V16H11V14ZM15 11H17V13H15V11ZM15 14H17V16H15V14ZM3 11H5V16H3V11ZM21 11H23V16H21V11ZM3 17H23V19H3V17ZM5 8H7V10H5V8Z" /></svg>
);
const AWSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.665 14.823c.334.331.62.637.62 1.103 0 .493-.357 1.01-1.071 1.01-.58 0-.967-.34-1.325-.718-1.503-1.616-4.043-2.39-6.386-2.39-4.223 0-6.958 2.53-7.502 3.102-.308.318-.62.593-.974.593-.526 0-1.031-.416-1.031-1.017 0-.498.349-.895.666-1.22 1.042-1.077 4.14-4.382 8.875-4.382 3.206 0 5.922 1.55 8.128 3.919zm-1.898-3.921c1.235-.536 1.956-1.527 1.956-2.616 0-1.874-1.638-3.096-4.01-3.096-1.884 0-3.329.803-4.04 1.464l.972 1.419c.563-.515 1.494-1.096 2.859-1.096 1.408 0 2.228.611 2.228 1.458 0 .546-.358 1.017-1.127 1.348l-1.309.557c-2.37.996-3.151 2.24-3.151 3.59 0 1.543 1.256 2.56 3.194 2.56 1.564 0 2.592-.536 3.15-1.296h.054v1.071h1.993v-3.794c0-.622-.054-1.157-.225-1.565l-2.544 1.084zm-1.35 2.198c-.375.525-1.018.847-1.81.847-1.06 0-1.638-.525-1.638-1.264 0-.675.407-1.232 1.597-1.747l1.851-.793v2.957z" /></svg>
);
const UnrealIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 7v10M8 10l4 4 4-4" /></svg>
);
const SwiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21.2 5.5c-1.3-.4-3.6-.5-5.3.3-3.1 1.4-4.8 4.2-4.8 4.2.1-2.1 1-3.9 1.9-5C13.9 3.9 15 3.1 15 3.1S12 3.4 10 5.4c-2 2-3.1 4.7-3.1 4.7s-.2-2.1.8-4.3C8.4 4.5 9.4 3 9.4 3S6.1 4.4 4.5 7.9c-1.2 2.6-1.2 5.2-1.2 5.2s.9-1.9 2.6-3.1c1.3-.9 2.4-1.3 2.4-1.3s-2.1 2.2-2.2 5.3c0 2.9 2.1 5.4 5.3 6.9 3.5 1.7 8.3 1.5 9.4 1.3 0 0-2.3-.9-3.8-2.6-.9-1-1.3-2.1-1.3-2.1s2.2 1.4 5.3.8c1.6-.3 2.6-1.1 2.6-1.1s-1.4 1.2-3.8.9c-1.7-.2-2.6-1.1-2.6-1.1s2.1 1 5 .2c.9-.2 1.4-.5 1.4-.5s-.8-.5-2.4-.6z" /></svg>
);
const ReactIcon = () => (
  <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><circle cx="0" cy="0" r="2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5" /><ellipse rx="10" ry="4.5" transform="rotate(60)" /><ellipse rx="10" ry="4.5" transform="rotate(120)" /></g></svg>
);
const TSIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM17.376 17.55c.706.77 1.576 1.166 2.58 1.166 1.485 0 2.37-.87 2.37-2.19v-.06c0-1.5-.96-2.1-2.55-2.73l-.84-.33c-1.02-.42-1.38-.81-1.38-1.56v-.06c0-.81.69-1.38 1.74-1.38 1.05 0 1.74.54 2.01 1.44l1.62-.69c-.54-1.53-1.89-2.34-3.63-2.34-1.95 0-3.33 1.2-3.33 2.91v.06c0 1.53.96 2.1 2.58 2.76l.81.33c1.08.45 1.38.87 1.38 1.62v.06c0 .99-.81 1.59-1.89 1.59-1.23 0-2.07-.63-2.37-1.68l-1.65.69c.045.02.585 1.106 2.535 2.006zM8.7 12.63l1.8 1.05v-5.43h2.4v9.6h-2.4v-2.79l-1.89-1.08v3.87h-2.4v-9.6h2.49v4.38z" /></svg>
);
const CppIcon = () => (
  <div className="font-mono font-bold text-[8px] leading-none border border-current rounded px-0.5">C++</div>
);
const CIcon = () => (
  <div className="font-mono font-bold text-[8px] leading-none border border-current rounded px-0.5">C</div>
);
const PyTorchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 0L1.7 6v12L12 24l10.3-6V6L12 0zm0 2.3l8.3 4.8v9.6L12 21.5 3.7 16.7V7.1L12 2.3zM12 7l-5 3v6l5 3 5-3v-6l-5-3z" /></svg>
);
const TensorflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.64 2.4l-9.1 2.42 1.58 2.34 7.6-1.55-.4 4.54-6.44-2.2-.6 2.6 6.78 3.54-1.06 6.84 2.22 1.32 2.9-7.56 3.1 7.18 2.3-1.04-1.42-7.56 3.2-1.28.28-2.58-3.9 1.02.8-4.72-7.88 1.76.54-5.05z" /></svg>
);

const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  const size = 14;

  // Unified Strict Monochrome / Accent Logic
  const accentClass = "text-brand-accent";
  const baseClass = "text-brand-secondary group-hover/skill:text-brand-accent transition-colors";

  // AI & Data Tools
  if (n.includes('openai')) return <Bot size={size} className={baseClass} />;
  if (n.includes('anthropic')) return <Bot size={size} className={baseClass} />;
  if (n.includes('gemini')) return <Sparkles size={size} className={baseClass} />;
  if (n.includes('pinecone')) return <Database size={size} className={baseClass} />;
  if (n.includes('chroma')) return <Database size={size} className={baseClass} />;
  if (n.includes('llama')) return <FileSearch size={size} className={baseClass} />;
  if (n.includes('pandas')) return <Table size={size} className={baseClass} />;
  if (n.includes('numpy')) return <Sigma size={size} className={baseClass} />;
  if (n.includes('weights')) return <Activity size={size} className={baseClass} />;
  if (n.includes('midjourney')) return <Palette size={size} className={baseClass} />;
  if (n.includes('stable')) return <ImageIcon size={size} className={baseClass} />;
  if (n.includes('lm studio')) return <Monitor size={size} className={baseClass} />;
  if (n.includes('ollama')) return <Bot size={size} className={baseClass} />;
  if (n.includes('hugging')) return <Bot size={size} className={baseClass} />;
  if (n.includes('groq')) return <Zap size={size} className={baseClass} />;
  if (n.includes('langchain')) return <Link size={size} className={baseClass} />;
  if (n.includes('tensorflow')) return <Brain size={size} className={baseClass} />;
  if (n.includes('pytorch')) return <Brain size={size} className={baseClass} />;
  if (n.includes('computer vision')) return <ScanFace size={size} className={baseClass} />;
  if (n.includes('reinforcement')) return <Brain size={size} className={baseClass} />;

  // IDEs
  if (n.includes('vs code')) return <FileCode size={size} className={baseClass} />;
  if (n.includes('visual studio')) return <FileCode size={size} className={baseClass} />;
  if (n.includes('xcode')) return <AppWindow size={size} className={baseClass} />;
  if (n.includes('android')) return <Smartphone size={size} className={baseClass} />;
  if (n.includes('vim')) return <Terminal size={size} className={baseClass} />;
  if (n.includes('sublime')) return <FileCode size={size} className={baseClass} />;
  if (n.includes('trae')) return <Sparkles size={size} className={baseClass} />;
  if (n.includes('cursor')) return <MousePointer2 size={size} className={baseClass} />;
  if (n.includes('windsurf')) return <Wind size={size} className={baseClass} />;
  if (n.includes('blackbox')) return <Box size={size} className={baseClass} />;
  if (n.includes('grump')) return <Terminal size={size} className={baseClass} />;
  if (n.includes('intellij')) return <Code2 size={size} className={baseClass} />;
  if (n.includes('verdent')) return <Layers size={size} className={baseClass} />;
  if (n.includes('antigravity')) return <Rocket size={size} className={baseClass} />;

  // Web & Systems
  if (n.includes('react')) return <Code2 size={size} className={baseClass} />;
  if (n.includes('next.js')) return <Globe size={size} className={baseClass} />;
  if (n.includes('typescript')) return <FileCode size={size} className={baseClass} />;
  if (n.includes('aws')) return <Cloud size={size} className={baseClass} />;
  if (n.includes('vercel')) return <Zap size={size} className={baseClass} />;
  if (n.includes('github')) return <Github size={size} className={baseClass} />;
  if (n.includes('c++')) return <Cpu size={size} className={baseClass} />;
  if (n === 'c') return <Cpu size={size} className={baseClass} />;
  if (n.includes('c ')) return <Cpu size={size} className={baseClass} />;
  if (n.includes('assembly')) return <Cpu size={size} className={baseClass} />;
  if (n.includes('compiler')) return <Server size={size} className={baseClass} />;
  if (n.includes('memory')) return <Server size={size} className={baseClass} />;

  // Game & Mobile
  if (n.includes('godot')) return <Gamepad size={size} className={baseClass} />;
  if (n.includes('unreal')) return <Gamepad size={size} className={baseClass} />;
  if (n.includes('swift')) return <Smartphone size={size} className={baseClass} />;
  if (n.includes('metal')) return <Layout size={size} className={baseClass} />;
  if (n.includes('hlsl')) return <Code2 size={size} className={baseClass} />;

  // Fallback
  if (n.includes('bot') || n.includes('agent')) return <Bot size={size} className={baseClass} />;
  if (n.includes('db') || n.includes('data')) return <Database size={size} className={baseClass} />;
  if (n.includes('prompt')) return <MessageSquare size={size} className={baseClass} />;
  if (n.includes('fine-tuning')) return <Zap size={size} className={baseClass} />;

  return <Code2 size={size} className={baseClass} />;
};

export const Skills: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter categories based on search query and selected category
  const filteredCategories = useMemo(() => {
    let filtered = skillCategories;

    if (selectedCategory) {
      filtered = filtered.filter(cat => cat.name === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered
        .map(cat => ({
          ...cat,
          skills: cat.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(cat => cat.skills.length > 0);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section ref={sectionRef} id={SectionId.SKILLS} className="py-20 md:py-32 px-4 md:px-6 bg-brand-surface relative overflow-hidden transition-colors duration-300">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-black/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-brand-primary">
            Technical Proficiency
          </h2>
          <div className="w-20 h-1 bg-brand-accent/50 rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-brand-dark/50 border border-brand-primary/10 rounded-xl text-brand-primary placeholder:text-brand-secondary/50 focus:outline-none focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/20 transition-all"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary/50 hover:text-brand-accent transition-colors"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${selectedCategory === null
                ? 'bg-brand-accent text-brand-base shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-brand-dark/50 border border-brand-primary/10 text-brand-secondary hover:border-brand-accent/30 hover:text-brand-primary'
                }`}
            >
              All Skills
            </motion.button>
            {skillCategories.map((cat) => (
              <motion.button
                key={cat.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${selectedCategory === cat.name
                  ? 'bg-brand-accent text-brand-base shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'bg-brand-dark/50 border border-brand-primary/10 text-brand-secondary hover:border-brand-accent/30 hover:text-brand-primary'
                  }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategory) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-brand-secondary/70 font-mono"
            >
              Found {filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skills
              {selectedCategory && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </motion.p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  borderColor: 'rgba(34, 211, 238, 0.3)',
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1, type: 'spring', stiffness: 400 }
                }}
                className="p-6 md:p-8 rounded-2xl bg-brand-dark/50 border border-brand-primary/5 transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] active:shadow-[0_0_40px_rgba(34,211,238,0.15)] group/card relative overflow-hidden cursor-pointer"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/5 group-hover/card:border-brand-accent/50 group-hover/card:text-brand-accent transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-primary group-hover/card:text-brand-accent transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-brand-secondary mt-1 max-w-xs font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {cat.type === 'bar' ? (
                  <div className="space-y-6 mt-auto">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: (idx * 0.1) + (sIdx * 0.05),
                          duration: 0.4,
                          type: 'spring',
                          stiffness: 100
                        }}
                        whileHover={{ x: 5 }}
                        className="group/skill"
                      >
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getSkillIcon(skill.name) && (
                              <motion.span
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className="text-brand-primary/80 group-hover/skill:scale-110 transition-transform"
                              >
                                {getSkillIcon(skill.name)}
                              </motion.span>
                            )}
                            <span className="text-xs font-mono text-brand-secondary/70 uppercase tracking-wider group-hover/skill:text-brand-primary transition-colors select-none">{skill.name}</span>
                          </div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{ delay: (idx * 0.1) + (sIdx * 0.05) + 0.3 }}
                            className="text-xs font-mono text-brand-secondary group-hover/skill:text-brand-accent transition-colors tabular-nums"
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        {/* Segmented Bar with Animation */}
                        <div className="flex gap-1 h-2 group-hover/skill:h-2.5 transition-all">
                          {[...Array(10)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={isVisible && (i * 10) < (skill.level || 0) ? {
                                scaleX: 1,
                                opacity: 1
                              } : {
                                scaleX: 1,
                                opacity: 0.15
                              }}
                              transition={{
                                delay: (idx * 0.05) + (sIdx * 0.03) + (i * 0.02),
                                duration: 0.4,
                                type: 'spring',
                                stiffness: 200
                              }}
                              whileHover={{
                                scaleY: 1.3,
                                transition: { duration: 0.2 }
                              }}
                              className={`flex-1 rounded-sm origin-left ${isVisible && (i * 10) < (skill.level || 0)
                                ? 'bg-brand-accent shadow-[0_0_8px_rgba(91,146,121,0.4)]'
                                : 'bg-brand-secondary/10'
                                }`}
                            ></motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5 mt-auto content-start">
                    {cat.skills.map((skill, sIdx) => {
                      const icon = getSkillIcon(skill.name);
                      return (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: (idx * 0.05) + (sIdx * 0.02),
                            duration: 0.3,
                            type: 'spring',
                            stiffness: 200
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{
                            scale: 0.95,
                            transition: { duration: 0.1 }
                          }}
                          onHoverStart={() => setHoveredSkill(skill.name)}
                          onHoverEnd={() => setHoveredSkill(null)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-black border border-brand-primary/10 text-xs font-mono font-bold text-brand-secondary hover:text-brand-primary hover:border-brand-accent/50 hover:bg-brand-accent/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] active:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer select-none`}
                        >
                          {icon && <span className="opacity-80 scale-90 transition-transform group-hover:scale-100">{icon}</span>}
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 md:py-24"
          >
            <FileSearch size={48} className="mx-auto mb-4 text-brand-secondary/30" />
            <h3 className="text-xl font-bold text-brand-secondary mb-2">No skills found</h3>
            <p className="text-brand-secondary/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="px-6 py-3 bg-brand-accent text-brand-base rounded-lg font-mono font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
});