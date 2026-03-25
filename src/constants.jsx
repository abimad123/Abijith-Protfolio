import { FaDatabase, FaServer, FaNetworkWired, FaSitemap, FaAws } from 'react-icons/fa';
import { SiFigma, SiReact, SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPhp, SiMysql, SiFirebase, SiMongodb, SiGithub, SiDocker, SiVercel, SiPostman, SiFramer } from 'react-icons/si';
import { MdAnimation, MdWeb, MdApi } from 'react-icons/md';
import { TbComponents } from 'react-icons/tb';

export const PROJECTS = [
  {
    id: 'kirpa',
    title: 'Kirpa Home Solutions',
    description:
      'A full-scale product catalog for hardware and appliances. Features real-time inventory management, admin dashboard, and automated enquiry systems.',
    tags: ['React', 'Firebase', 'Tailwind', 'Node.js'],
    github: 'https://github.com/abimad123/KirpaRep.git',
    live: 'https://kripahomesolutions.vercel.app/',
    image: '/projects/kripa.webp',
    caseStudy:
      'Solved disorganized listings by implementing a hierarchical search and filter system, increasing enquiry rates by 40%.'
  },
  {
    id: 'vaultx',
    title: 'VaultX - Secure Vault',
    description:
      'Digital Document Vault with military-grade encryption, JWT authentication, and Cloudinary integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/abimad123/Digital-Document-Vault.git',
    live: 'https://vaultx.abijith.me/',
    image: '/projects/vaultx.webp',
    caseStudy:
      'Implemented a comprehensive, immutable audit log of every action for security auditing and compliance.'
  },
  {
    id: 'evoting',
    title: 'Secure E-Voting System',
    description:
      'Robust web-based voting application with comprehensive KYC verification and real-time election management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Framer Motion'],
    github: 'https://github.com/abimad123/E-Voting-System.git',
    live: 'https://evoting.abijith.me/login',
    image: '/projects/evoting.webp',
    caseStudy:
      'Engineered secure file storage for IDs using MongoDB GridFS, enforcing strict one-vote-per-person policies.'
  }
];

export const SKILLS = [
  {
    title: 'Core CS Fundamentals',
    icon: 'fa-brain',
    skills: [
      { name: 'Data Structures & Algorithms', icon: FaDatabase },
      { name: 'Operating Systems', icon: FaServer },
      { name: 'DBMS', icon: FaDatabase },
      { name: 'Computer Networks', icon: FaNetworkWired },
      { name: 'System Design', icon: FaSitemap }
    ]
  },
  {
    title: 'UI/UX & Product Design',
    icon: 'fa-palette',
    skills: [
      { name: 'Figma', icon: SiFigma },
      { name: 'Wireframing', icon: MdWeb },
      { name: 'Design Systems', icon: TbComponents },
      { name: 'Micro-interactions', icon: MdAnimation },
      { name: 'Lottie Animation', icon: MdAnimation }
    ]
  },
  {
    title: 'Frontend Development',
    icon: 'fa-code',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer }
    ]
  },
  {
    title: 'Backend & Databases',
    icon: 'fa-server',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'PHP', icon: SiPhp },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'RESTful APIs', icon: MdApi },
      { name: 'MongoDB', icon: SiMongodb }
    ]
  },
  {
    title: 'Tools & Workflow',
    icon: 'fa-screwdriver-wrench',
    skills: [
      { name: 'Git/GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'Vercel', icon: SiVercel },
      { name: 'AWS', icon: FaAws },
      { name: 'Postman', icon: SiPostman }
    ]
  }
];

export const CERTIFICATIONS = [
  {
    id: 'aws-cloud-solutions',
    title: 'AWS Cloud Solutions',
    issuer: 'AWS',
    date: '2026',
    skills: ['Cloud Computing', 'AWS', 'Architecture'],
    link: '#',
    image: '/certificates/AWS-Cloud-Solutions-certificate.png'
  },
  {
    id: 'dev-backend-node',
    title: 'Developing Back End Apps with Node',
    issuer: 'IBM',
    date: '2026',
    skills: ['Node.js', 'Backend', 'API'],
    link: '#',
    image: '/certificates/Developing-Back-End-Apps-with-Node-certificate.png'
  },
  {
    id: 'full-stack-mern',
    title: 'Full Stack Development with MERN',
    issuer: 'Professional Certification',
    date: '2025',
    skills: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: '#',
    image: '/certificates/Full-Stack-Development-with-MERN-certificate.png'
  },
  {
    id: 'git-github',
    title: 'Getting Started with Git and GitHub',
    issuer: 'Professional Certification',
    date: '2025',
    skills: ['Git', 'GitHub', 'Version Control'],
    link: '#',
    image: '/certificates/Getting-Started-with-Git-and-GitHub-certificate.png'
  },
  {
    id: 'ibm-js-backend',
    title: 'IBM JavaScript Backend',
    issuer: 'IBM',
    date: '2025',
    skills: ['JavaScript', 'Backend', 'Node.js'],
    link: '#',
    image: '/certificates/IBM-JavaScript-Backend-certificate.png'
  },
  {
    id: 'java-prog',
    title: 'Java Programming',
    issuer: 'Professional Certification',
    date: '2025',
    skills: ['Java', 'OOP', 'Algorithms'],
    link: '#',
    image: '/certificates/Java-Programming-certificate.jpg'
  },
  {
    id: 'ms-ux-design',
    title: 'Microsoft UX Design',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['UX Design', 'Figma', 'Prototyping'],
    link: '#',
    image: '/certificates/Microsoft-UX-Design-certificate.png'
  },
  {
    id: 'app-sec-devops',
    title: 'Application Security for Developers and DevOps',
    issuer: 'Professional Certification',
    date: '2025',
    skills: ['Security', 'DevOps', 'AppSec'],
    link: '#',
    image: '/certificates/Application-Security-for-Developers-and-DevOps-certificate.png'
  }
];

export const PROFILE_DETAILS = `
Abijith C G is a UI/UX Designer and Full Stack Web Developer.
Education: Bachelor of Technology in Computer Science Engineering from Lovely Professional University.
Key Projects: Kirpa Home Solutions (React/Firebase), Smart Portfolio Management (PHP/MySQL), My Amazspace.
Skills: UI/UX (Figma), Frontend (React, Tailwind), Backend (Node, PHP, MySQL).
Certifications: Meta Front End Developer, UX Career (LinkedIn), Java Programming.
Work Style: User-centered design, clean code, leadership, and collaboration.
`;
