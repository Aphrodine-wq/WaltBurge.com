import { SkillNode } from './types';

// Helper function to convert spherical coordinates to Cartesian
const sphericalToCartesian = (radius: number, theta: number, phi: number): [number, number, number] => {
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
};

// Distribute skills across a sphere surface, grouped by category
export const skillNodes: SkillNode[] = [
  // AI/ML Cluster (Top hemisphere, cyan accent)
  {
    id: 'llm-integration',
    name: 'LLM Integration',
    category: 'AI/ML',
    proficiency: 95,
    position: sphericalToCartesian(5, 0, 0.3),
    connections: ['rag-architecture', 'prompt-engineering', 'ai-agents']
  },
  {
    id: 'rag-architecture',
    name: 'RAG Architecture',
    category: 'AI/ML',
    proficiency: 90,
    position: sphericalToCartesian(5, 0.5, 0.4),
    connections: ['llm-integration', 'prompt-engineering']
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'AI/ML',
    proficiency: 98,
    position: sphericalToCartesian(5, 1, 0.3),
    connections: ['llm-integration', 'rag-architecture', 'ai-agents']
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    category: 'AI/ML',
    proficiency: 88,
    position: sphericalToCartesian(5, 1.5, 0.5),
    connections: ['llm-integration', 'prompt-engineering']
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'AI/ML',
    proficiency: 82,
    position: sphericalToCartesian(5, -0.5, 0.4),
    connections: ['tensorflow-pytorch']
  },
  {
    id: 'tensorflow-pytorch',
    name: 'TensorFlow / PyTorch',
    category: 'AI/ML',
    proficiency: 80,
    position: sphericalToCartesian(5, -1, 0.5),
    connections: ['computer-vision']
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    category: 'AI/ML',
    proficiency: 95,
    position: sphericalToCartesian(5, 0.3, 0.2),
    connections: ['anthropic-api', 'llm-integration']
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    category: 'AI/ML',
    proficiency: 95,
    position: sphericalToCartesian(5, -0.3, 0.2),
    connections: ['openai-api', 'llm-integration']
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'AI/ML',
    proficiency: 88,
    position: sphericalToCartesian(5, 0.8, 0.6),
    connections: ['rag-architecture']
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'AI/ML',
    proficiency: 85,
    position: sphericalToCartesian(5, -0.8, 0.6),
    connections: ['rag-architecture']
  },

  // Systems Engineering Cluster (Left hemisphere, purple accent)
  {
    id: 'cpp-c',
    name: 'C++ / C',
    category: 'Systems',
    proficiency: 98,
    position: sphericalToCartesian(5, -2.5, 1.57),
    connections: ['assembly', 'compiler-design', 'memory-mgmt']
  },
  {
    id: 'assembly',
    name: 'Assembly',
    category: 'Systems',
    proficiency: 90,
    position: sphericalToCartesian(5, -2.2, 1.4),
    connections: ['cpp-c', 'compiler-design']
  },
  {
    id: 'compiler-design',
    name: 'Compiler Design',
    category: 'Systems',
    proficiency: 92,
    position: sphericalToCartesian(5, -2.8, 1.4),
    connections: ['cpp-c', 'assembly', 'memory-mgmt']
  },
  {
    id: 'memory-mgmt',
    name: 'Memory Management',
    category: 'Systems',
    proficiency: 95,
    position: sphericalToCartesian(5, -2.5, 1.7),
    connections: ['cpp-c', 'compiler-design']
  },
  {
    id: 'llvm',
    name: 'LLVM',
    category: 'Systems',
    proficiency: 88,
    position: sphericalToCartesian(5, -2.2, 1.7),
    connections: ['compiler-design']
  },
  {
    id: 'kernel',
    name: 'Kernel Development',
    category: 'Systems',
    proficiency: 85,
    position: sphericalToCartesian(5, -2.8, 1.7),
    connections: ['cpp-c', 'memory-mgmt']
  },

  // Web & Cloud Cluster (Right hemisphere, green accent)
  {
    id: 'react-nextjs',
    name: 'React / Next.js',
    category: 'Web',
    proficiency: 90,
    position: sphericalToCartesian(5, 2.5, 1.57),
    connections: ['typescript', 'vercel']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Web',
    proficiency: 92,
    position: sphericalToCartesian(5, 2.2, 1.4),
    connections: ['react-nextjs', 'nodejs']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Web',
    proficiency: 88,
    position: sphericalToCartesian(5, 2.8, 1.4),
    connections: ['typescript', 'aws-cloud']
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud',
    category: 'Web',
    proficiency: 85,
    position: sphericalToCartesian(5, 2.5, 1.7),
    connections: ['nodejs', 'vercel']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Web',
    proficiency: 92,
    position: sphericalToCartesian(5, 2.2, 1.7),
    connections: ['react-nextjs', 'aws-cloud']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Web',
    proficiency: 87,
    position: sphericalToCartesian(5, 2.8, 1.7),
    connections: ['nodejs']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Web',
    proficiency: 95,
    position: sphericalToCartesian(5, 2.4, 1.3),
    connections: ['react-nextjs']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Web',
    proficiency: 95,
    position: sphericalToCartesian(5, 2.6, 1.3),
    connections: ['vercel']
  },

  // Game Dev Cluster (Bottom hemisphere, pink/red accent)
  {
    id: 'godot',
    name: 'Godot Engine',
    category: 'Game Dev',
    proficiency: 88,
    position: sphericalToCartesian(5, 0, 2.8),
    connections: ['unreal', 'metal-hlsl']
  },
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    category: 'Game Dev',
    proficiency: 82,
    position: sphericalToCartesian(5, 0.6, 2.7),
    connections: ['godot', 'metal-hlsl']
  },
  {
    id: 'metal-hlsl',
    name: 'Metal / HLSL',
    category: 'Game Dev',
    proficiency: 85,
    position: sphericalToCartesian(5, -0.6, 2.7),
    connections: ['godot', 'unreal', 'swift-ios']
  },
  {
    id: 'swift-ios',
    name: 'Swift / iOS',
    category: 'Game Dev',
    proficiency: 90,
    position: sphericalToCartesian(5, 0, 2.5),
    connections: ['metal-hlsl']
  },
  {
    id: 'unity',
    name: 'Unity',
    category: 'Game Dev',
    proficiency: 80,
    position: sphericalToCartesian(5, 0.8, 2.9),
    connections: ['godot', 'unreal']
  },
  {
    id: 'webgl',
    name: 'WebGL / Three.js',
    category: 'Game Dev',
    proficiency: 88,
    position: sphericalToCartesian(5, -0.8, 2.9),
    connections: ['metal-hlsl']
  },

  // Tools Cluster (Middle band, scattered)
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools',
    proficiency: 95,
    position: sphericalToCartesian(5, 1.8, 1.57),
    connections: ['github', 'cursor']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'Tools',
    proficiency: 92,
    position: sphericalToCartesian(5, 1.5, 1.45),
    connections: ['vscode']
  },
  {
    id: 'visual-studio',
    name: 'Visual Studio',
    category: 'Tools',
    proficiency: 88,
    position: sphericalToCartesian(5, -1.8, 1.57),
    connections: ['cpp-c']
  },
  {
    id: 'xcode',
    name: 'Xcode',
    category: 'Tools',
    proficiency: 87,
    position: sphericalToCartesian(5, -1.5, 1.7),
    connections: ['swift-ios']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Tools',
    proficiency: 85,
    position: sphericalToCartesian(5, 1.2, 1.8),
    connections: ['aws-cloud', 'nodejs']
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    proficiency: 98,
    position: sphericalToCartesian(5, -1.2, 1.8),
    connections: ['github']
  },
];

// Category metadata for filtering
export const categoryMetadata = {
  'AI/ML': {
    color: '#22d3ee', // cyan
    count: skillNodes.filter(s => s.category === 'AI/ML').length
  },
  'Systems': {
    color: '#c084fc', // purple
    count: skillNodes.filter(s => s.category === 'Systems').length
  },
  'Web': {
    color: '#4ade80', // green
    count: skillNodes.filter(s => s.category === 'Web').length
  },
  'Game Dev': {
    color: '#ec4899', // pink
    count: skillNodes.filter(s => s.category === 'Game Dev').length
  },
  'Tools': {
    color: '#9ca3af', // gray
    count: skillNodes.filter(s => s.category === 'Tools').length
  }
};
