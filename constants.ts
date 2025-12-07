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
    stats: { views: '0', likes: '190' },
    location: 'Itkauli',
    skills: ['React', 'Node.js', 'GraphQL', 'AWS'],
    projects: 124
  },
  {
    id: '2',
    name: 'Shadman',
    username: 'mir_shadmaan_haidar',
    bio: 'Dreaming in 3D. Shader enthusiast. Creating immersive web experiences using WebGL and GLSL.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    role: '3D Artist',
    stats: { views: '35', likes: '358' },
    location: 'Itkauli',
    skills: ['Three.js', 'WebGL', 'Blender', 'GLSL'],
    projects: 137
  },
  {
    id: '3',
    name: 'Kaif',
    username: 'kaifsiddiqui8378',
    bio: 'UX Researcher. Finding the truth in data. Passionate about user-centric design patterns.',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    role: 'UX Research',
    stats: { views: '18', likes: '302' },
    location: 'Itkauli',
    skills: ['Figma', 'User Testing', 'Data Analysis', 'Psychology'],
    projects: 219
  },
  {
    id: '4',
    name: 'Azlan',
    username: '_azlansiddiqui_',
    bio: 'Cybersecurity & penetration testing. Keeping the digital world safe, one patch at a time.',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    role: 'Security',
    stats: { views: '2', likes: '320' },
    location: 'Itkauli',
    skills: ['Python', 'Network Security', 'Linux', 'Cryptography'],
    projects: 72
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
    stats: { views: '62', likes: '420' },
    location: 'Itkauli',
    skills: ['C++', 'Rust', 'Swordsmanship', 'Alchemy'],
    projects: 545
  },
  {
    id: '7',
    name: 'Nabeel',
    username: 'nabeel__x44',
    bio: 'Genius, billionaire, playboy, coder. Building the future of AI and robotics.',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    role: 'CTO',
    stats: { views: '6', likes: '499' },
    location: 'Itkauli',
    skills: ['AI', 'Robotics', 'Quantum Computing', 'React'],
    projects: 141
  },
  {
    id: '8',
    name: 'Saif',
    username: 'mohdsaif0852',
    bio: 'Rewriting reality with CSS variables. Front-end magic with a touch of chaos.',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    role: 'Frontend',
    stats: { views: '47', likes: '393' },
    location: 'Itkauli',
    skills: ['CSS', 'Animation', 'React', 'Magic'],
    projects: 421
  },
  {
    id: '9',
    name: 'Zaid',
    username: 'zaidsiddiqui__',
    bio: 'Designing systems that scale to millions. Microservices aficionado. Cloud native by default.',
    imageUrl: 'https://picsum.photos/400/400?random=9',
    role: 'Architect',
    stats: { views: '91', likes: '1019' },
    location: 'Itkauli',
    skills: ['Kubernetes', 'Docker', 'Go', 'System Design'],
    projects: 133
  },
  {
    id: '10',
    name: 'Ansar',
    username: '_ansarsiddiqui_',
    bio: 'Crafting intuitive interfaces that delight users. Pixel perfectionist with a love for minimalist typography.',
    imageUrl: 'https://picsum.photos/400/400?random=10',
    role: 'Product Design',
    stats: { views: '20', likes: '123' },
    location: 'Itkauli',
    skills: ['Figma', 'Prototyping', 'Sketch', 'Motion'],
    projects: 103
  },
  {
    id: '11',
    name: 'Aarish',
    username: 'aari.sh6596',
    bio: 'Automating the boring stuff. CI/CD pipelines are my art form. Infrastructure as Code advocate.',
    imageUrl: 'https://picsum.photos/400/400?random=11',
    role: 'DevOps',
    stats: { views: '16', likes: '175' },
    location: 'Itkauli',
    skills: ['Terraform', 'Jenkins', 'AWS', 'Ansible'],
    projects: 130
  },
  {
    id: '12',
    name: 'Asran',
    username: 'md.asran_',
    bio: 'Building seamless mobile experiences for iOS and Android. Performance obsession.',
    imageUrl: 'https://picsum.photos/400/400?random=12',
    role: 'Mobile Dev',
    stats: { views: '9', likes: '170' },
    location: 'Itkauli',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    projects: 330
  },
];