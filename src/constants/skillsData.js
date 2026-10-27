// High-resolution PNG image URLs for technologies
export const ICON_URLS = {
  // Frontend
  tailwindcss: 'https://img.icons8.com/color/48/tailwind_css.png',
  javascript: 'https://img.icons8.com/color/48/javascript--v1.png',
  typescript: 'https://img.icons8.com/color/48/typescript.png',
  html: 'https://img.icons8.com/color/48/html-5--v1.png',
  css: 'https://img.icons8.com/color/48/css3.png',
  react: 'https://img.icons8.com/color/48/react-native.png',
  nextjs: 'https://img.icons8.com/color/48/nextjs.png',
  vuejs: 'https://img.icons8.com/color/48/vue-js.png',
  vite: 'https://img.icons8.com/color/48/vite.png',
  flutter: 'https://img.icons8.com/color/48/flutter.png',

  // Backend & Runtime
  nodejs: 'https://img.icons8.com/color/48/nodejs.png',
  expressjs: 'https://img.icons8.com/fluent/48/express-js.png',
  php: 'https://www.php.net/images/logos/new-php-logo.png',
  laravel: 'https://download.logo.wine/logo/Laravel/Laravel-Logo.wine.png',
  python: 'https://img.icons8.com/color/48/python--v1.png',
  java: 'https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png',
  cpp: 'https://img.icons8.com/color/48/c-plus-plus-logo.png',
  golang: 'https://img.icons8.com/color/48/golang.png',

  // Database & Backend Services
  prisma: 'https://img.icons8.com/color/48/prisma-orm.png',
  supabase: 'https://img.icons8.com/color/48/supabase.png',
  firebase: 'https://img.icons8.com/color/48/firebase.png',
  mongodb: 'https://img.icons8.com/color/48/mongodb.png',
  mysql: 'https://img.icons8.com/color/48/mysql-logo.png',
  postgresql: 'https://img.icons8.com/color/48/postgreesql.png',
  redis: 'https://img.icons8.com/color/48/redis.png',
  graphql: 'https://img.icons8.com/color/48/graphql.png',

  // DevOps & Tools
  git: 'https://img.icons8.com/color/48/git.png',
  github: 'https://img.icons8.com/glyph-neue/48/ffffff/github.png',
  docker: 'https://img.icons8.com/color/48/docker.png',
  linux: 'https://img.icons8.com/color/48/linux--v1.png',
  figma: 'https://img.icons8.com/color/48/figma--v1.png',
}

// Normalized lookup mapping variations to icon keys
export const NAME_MAP = {
  // Tailwind
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  'tailwind css': 'tailwindcss',

  // JavaScript
  javascript: 'javascript',
  js: 'javascript',
  'vanilla js': 'javascript',

  // TypeScript
  typescript: 'typescript',
  ts: 'typescript',

  // HTML
  html: 'html',
  html5: 'html',

  // CSS
  css: 'css',
  css3: 'css',

  // Prisma
  prisma: 'prisma',
  'prisma orm': 'prisma',

  // Node
  node: 'nodejs',
  nodejs: 'nodejs',
  'node js': 'nodejs',
  'node.js': 'nodejs',

  // Express
  express: 'expressjs',
  expressjs: 'expressjs',
  'express js': 'expressjs',
  'express.js': 'expressjs',

  // React
  react: 'react',
  reactjs: 'react',
  'react js': 'react',
  'react.js': 'react',
  'react native': 'react',

  // Git & GitHub
  git: 'git',
  github: 'github',

  // PHP & Laravel
  php: 'php',
  laravel: 'laravel',

  // Python
  python: 'python',
  py: 'python',

  // Next / Vue / Vite
  next: 'nextjs',
  nextjs: 'nextjs',
  'next js': 'nextjs',
  'next.js': 'nextjs',
  vue: 'vuejs',
  vuejs: 'vuejs',
  'vue js': 'vuejs',
  'vue.js': 'vuejs',
  vite: 'vite',

  // Database
  docker: 'docker',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mysql: 'mysql',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  redis: 'redis',
  supabase: 'supabase',
  firebase: 'firebase',

  // Other languages & tools
  figma: 'figma',
  graphql: 'graphql',
  'c++': 'cpp',
  cpp: 'cpp',
  java: 'java',
  golang: 'golang',
  go: 'golang',
  flutter: 'flutter',
  linux: 'linux',
}

// List of preset skills for dropdown choices
export const PRESET_SKILLS = [
  'Tailwind CSS',
  'Javascript',
  'TypeScript',
  'HTML',
  'CSS',
  'Prisma',
  'Node JS',
  'Express JS',
  'React JS',
  'Next JS',
  'Vue JS',
  'Git',
  'GitHub',
  'PHP',
  'Laravel',
  'Python',
  'Docker',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Supabase',
  'Firebase',
  'Figma',
  'GraphQL',
  'Vite',
  'C++',
  'Java',
  'Go',
  'Flutter',
  'Linux',
]

// Normalizes name for matching
export function normalizeSkillName(name) {
  if (!name) return ''
  return String(name).trim().toLowerCase()
}
