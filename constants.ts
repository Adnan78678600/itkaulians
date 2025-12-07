import { Friend, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Friends', active: true },
  { id: 'devs', label: 'Developers' },
  { id: 'designers', label: 'Designers' },
  { id: 'gamers', label: 'Gamers' },
  { id: 'creators', label: 'Content Creators' },
];

export const FRIENDS_DATA: Friend[] = [
  {
    id: '1',
    name: 'Adnan',
    username: '_syed___adnan_',
    bio: 'Full-stack wizard. Reacts to everything. I build scalable applications with a focus on performance and accessibility.',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    role: 'Developer',
    stats: { views: '12.5k', likes: '4.2k' },
    location: 'Itkauli',
    skills: ['React', 'Node.js', 'GraphQL', 'AWS'],
    projects: 42
  },
  {
    id: '2',
    name: 'Shadman',
    username: 'mir_shadmaan_haidar',
    bio: 'Dreaming in 3D. Shader enthusiast. Creating immersive web experiences using WebGL and GLSL.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    role: '3D Artist',
    stats: { views: '8.9k', likes: '2.1k' },
    location: 'Itkauli',
    skills: ['Three.js', 'WebGL', 'Blender', 'GLSL'],
    projects: 18
  },
  {
    id: '3',
    name: 'Kaif',
    username: 'kaifsiddiqui8378',
    bio: 'UX Researcher. Finding the truth in data. Passionate about user-centric design patterns.',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    role: 'UX Research',
    stats: { views: '15.2k', likes: '9.8k' },
    location: 'Itkauli',
    skills: ['Figma', 'User Testing', 'Data Analysis', 'Psychology'],
    projects: 35
  },
  {
    id: '4',
    name: 'Azlan',
    username: '_azlansiddiqui_',
    bio: 'Cybersecurity & penetration testing. Keeping the digital world safe, one patch at a time.',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    role: 'Security',
    stats: { views: '22k', likes: '11k' },
    location: 'Itkauli',
    skills: ['Python', 'Network Security', 'Linux', 'Cryptography'],
    projects: 56
  },
  {
    id: '5',
    name: 'Kashif',
    username: '_kashif_',
    bio: 'Just a regular cybersecurity engineer. I see the code behind the world.',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    role: 'Engineer',
    stats: { views: '45.1k', likes: '32k' },
    location: 'Itkauli',
    skills: ['Hacking', 'Python', 'Bash', 'Social Engineering'],
    projects: 104
  },
  {
    id: '6',
    name: 'Amir',
    username: 'amir__siddiqui19',
    bio: 'Hunting bugs and monsters for coin. Specialized in legacy code refactoring.',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    role: 'Freelancer',
    stats: { views: '33.4k', likes: '15.6k' },
    location: 'Itkauli',
    skills: ['C++', 'Rust', 'Swordsmanship', 'Alchemy'],
    projects: 88
  },
  {
    id: '7',
    name: 'Nabeel',
    username: 'nabeel__x44',
    bio: 'Genius, billionaire, playboy, coder. Building the future of AI and robotics.',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    role: 'CTO',
    stats: { views: '102k', likes: '89k' },
    location: 'Itkauli',
    skills: ['AI', 'Robotics', 'Quantum Computing', 'React'],
    projects: 200
  },
  {
    id: '8',
    name: 'Saif',
    username: 'mohdsaif0852',
    bio: 'Rewriting reality with CSS variables. Front-end magic with a touch of chaos.',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    role: 'Frontend',
    stats: { views: '18.2k', likes: '6.4k' },
    location: 'Itkauli',
    skills: ['CSS', 'Animation', 'React', 'Magic'],
    projects: 12
  },
  {
    id: '9',
    name: 'Zaid',
    username: 'zaidsiddiqui_',
    bio: 'Designing systems that scale to millions. Microservices aficionado. Cloud native by default.',
    imageUrl: 'https://picsum.photos/400/400?random=9',
    role: 'Architect',
    stats: { views: '55.2k', likes: '41k' },
    location: 'Itkauli',
    skills: ['Kubernetes', 'Docker', 'Go', 'System Design'],
    projects: 76
  },
  {
    id: '10',
    name: 'Ansar',
    username: '_ansarsiddiqui_',
    bio: 'Crafting intuitive interfaces that delight users. Pixel perfectionist with a love for minimalist typography.',
    imageUrl: 'https://picsum.photos/400/400?random=10',
    role: 'Product Design',
    stats: { views: '28.4k', likes: '14.2k' },
    location: 'Itkauli',
    skills: ['Figma', 'Prototyping', 'Sketch', 'Motion'],
    projects: 45
  },
  {
    id: '11',
    name: 'Aarish',
    username: 'aari.sh6596',
    bio: 'Automating the boring stuff. CI/CD pipelines are my art form. Infrastructure as Code advocate.',
    imageUrl: 'https://picsum.photos/400/400?random=11',
    role: 'DevOps',
    stats: { views: '39.1k', likes: '18.5k' },
    location: 'Itkauli',
    skills: ['Terraform', 'Jenkins', 'AWS', 'Ansible'],
    projects: 63
  },
  {
    id: '12',
    name: 'Asran',
    username: 'md.asran_',
    bio: 'Building seamless mobile experiences for iOS and Android. Performance obsession.',
    imageUrl: 'https://picsum.photos/400/400?random=12',
    role: 'Mobile Dev',
    stats: { views: '19.8k', likes: '8.7k' },
    location: 'Itkauli',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    projects: 29
  },
];