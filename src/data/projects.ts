export type ProjectStage = 'idea' | 'research' | 'prototype' | 'active' | 'established';
export type ProjectCategory = 'cybersecurity' | 'ai' | 'developer-tools' | 'hardware' | 'philosophy' | 'nonprofit' | 'identity';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string | null;
  domain: string | null;
  category: ProjectCategory;
  stage: ProjectStage;
  tech: string[];
  founders: string[];
}

export const stages: ProjectStage[] = ['idea', 'research', 'prototype', 'active', 'established'];

export const stageLabels: Record<ProjectStage, string> = {
  idea: 'Idea',
  research: 'Research',
  prototype: 'Prototype',
  active: 'Active',
  established: 'Established',
};

export const categoryLabels: Record<ProjectCategory, string> = {
  cybersecurity: 'Cybersecurity',
  ai: 'AI',
  'developer-tools': 'Dev Tools',
  hardware: 'Hardware',
  philosophy: 'Philosophy',
  nonprofit: 'Nonprofit',
  identity: 'Identity',
};

export const projects: Project[] = [
  {
    id: 'atro',
    name: 'Atro',
    tagline: 'Cybersecurity for small business.',
    description: 'All-in-one cybersecurity platform combining modular security tools with curated expert services. Built for small teams without dedicated security staff.',
    url: 'https://atro.com',
    domain: 'atro.com',
    category: 'cybersecurity',
    stage: 'active',
    tech: ['Next.js', 'Nuxt', 'Phoenix'],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'clawptimus',
    name: 'Clawptimus',
    tagline: 'All the AI. All contained.',
    description: 'Open-source platform for deploying, orchestrating, and governing AI agents with sandboxed execution and policy-based governance. Policy, not hope.',
    url: 'https://clawptim.us',
    domain: 'clawptim.us',
    category: 'ai',
    stage: 'active',
    tech: ['Elixir/OTP', 'React', 'TypeScript'],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'nowbox',
    name: 'Nowbox',
    tagline: 'One command. Any agent. Any host.',
    description: 'CLI tool to instantly launch AI coding agents in ephemeral cloud sandboxes. Pick any host, any agent, any interface. Thin, portable, no vendor lock-in.',
    url: 'https://nowbox.lol',
    domain: 'nowbox.lol',
    category: 'developer-tools',
    stage: 'prototype',
    tech: ['Go', 'SvelteKit'],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'pyre',
    name: 'Pyre',
    tagline: 'Next-gen outdoor cooking.',
    description: 'Luxury outdoor cooking system with AeroCore insulated chamber, AI-guided cooking, and nine interchangeable cooking modules. Engineered like a performance car.',
    url: 'https://pryegrills.com',
    domain: 'pryegrills.com',
    category: 'hardware',
    stage: 'prototype',
    tech: ['Hardware', 'AI', 'Next.js'],
    founders: ['Kasey Batterman', 'Kevin Johnson'],
  },
  {
    id: 'gpdg',
    name: 'GPDG',
    tagline: 'Good People Doing Good.',
    description: 'A statement of principles. Balance what we gain with what we give. Long-term thinking, trust, and the willingness to sacrifice for something bigger.',
    url: 'https://gpdg.us',
    domain: 'gpdg.us',
    category: 'philosophy',
    stage: 'established',
    tech: [],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'tcf',
    name: 'The Cyber Foundation',
    tagline: 'Protecting what matters.',
    description: 'Cybersecurity organization building tools for contact management, hiring, and community engagement in the security space.',
    url: 'https://thecyberfoundation.org',
    domain: 'thecyberfoundation.org',
    category: 'nonprofit',
    stage: 'active',
    tech: ['React', 'Supabase'],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'epsilon',
    name: 'Epsilon Protocol',
    tagline: 'Gain cannot be bought. Only earned.',
    description: 'A decentralized meritocratic order. Five disciplines, seven tiers. Mobile application, philosophy graph, and knowledge synthesis system.',
    url: null,
    domain: null,
    category: 'philosophy',
    stage: 'research',
    tech: ['React Native', 'Next.js', 'Anthropic'],
    founders: ['Kasey Batterman'],
  },
  {
    id: 'enclave',
    name: 'Enclave',
    tagline: 'Proof you are real.',
    description: 'Hardware authentication platform paired with a cryptographic proof-of-human protocol. Ed25519-based identity verification without centralized trust.',
    url: null,
    domain: null,
    category: 'identity',
    stage: 'research',
    tech: ['Hardware', 'Cryptography', 'TypeScript'],
    founders: ['Kasey Batterman'],
  },
];
