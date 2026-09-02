import { cloneElement } from 'react';

// High quality vector tech stack icons

export function TechIcon({ name, size = 20, className = "" }) {
  const icons = {
    HTML5: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 3L5.7 18.5L12 20.3L18.3 18.5L19.5 3H4.5Z" fill="#E34F26" />
        <path d="M12 18.8L17 17.4L18 5.5H12V18.8Z" fill="#EF652A" />
        <path d="M12 9.5H8.8L8.6 7.2H12V5H6.2L6.8 11.7H12V9.5ZM12 14.5L12 16.7L8.9 15.9L8.7 13.5H6.5L6.9 18.1L12 19.5V14.5Z" fill="#FFFFFF" />
        <path d="M12 9.5V11.7H14.8L14.5 14.5L12 15.2V17.4L16.8 16.1L17.4 9.5H12ZM12 5V7.2H17.6L17.8 5H12Z" fill="#ECECEC" />
      </svg>
    ),
    CSS3: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 3L5.7 18.5L12 20.3L18.3 18.5L19.5 3H4.5Z" fill="#1572B6" />
        <path d="M12 18.8L17 17.4L18 5.5H12V18.8Z" fill="#33A9DC" />
        <path d="M12 9.5H7.1L6.9 7.2H12V5H4.7L5.3 11.7H12V9.5ZM12 14.5L12 16.7L8.9 15.9L8.7 13.5H6.5L6.9 18.1L12 19.5V14.5Z" fill="#FFFFFF" />
        <path d="M12 9.5V11.7H14.8L14.5 14.5L12 15.2V17.4L16.8 16.1L17.4 9.5H12ZM12 5V7.2H17.6L17.8 5H12Z" fill="#ECECEC" />
      </svg>
    ),
    JavaScript: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M13.2 17.6C13.2 19.2 14.1 20 15.6 20C17 20 17.8 19.2 17.8 18.1C17.8 15.2 13.5 15.4 13.5 12.3C13.5 10.5 14.9 9.2 17.2 9.2C18.8 9.2 20 10 20.4 11.2L18.5 12.3C18.2 11.6 17.7 11.2 17.1 11.2C16.3 11.2 15.7 11.7 15.7 12.4C15.7 15.2 20 14.9 20 18C20 20 18.3 21.6 15.6 21.6C13.4 21.6 11.8 20.3 11.2 18.8L13.2 17.6ZM6 17.8C6 19.4 6.8 20 8 20C9.1 20 9.8 19.4 9.8 17.6V9.4H12.1V17.6C12.1 20.5 10.3 21.6 8 21.6C5.7 21.6 3.8 20.2 3.8 17.8L6 17.8Z" fill="#000000" />
      </svg>
    ),
    "React.js": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    ),
    "Next.js": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000000" stroke="#333333" strokeWidth="1" />
        <path d="M14.8 16.5L9.2 8H7.5V16H9.2V10.5L14.2 17.7C14.4 17.3 14.6 16.9 14.8 16.5Z" fill="#FFFFFF" />
        <rect x="15" y="8" width="1.7" height="8" fill="#FFFFFF" />
      </svg>
    ),
    "Tailwind CSS": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
      </svg>
    ),
    "Node.js": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#5FA04E" />
        <path d="M12 2L12 12L20.5 7L12 2Z" fill="#68A063" />
        <path d="M12 12L3.5 17L12 22L12 12Z" fill="#417E38" />
      </svg>
    ),
    "Express.js": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#18181b" />
        <text x="12" y="16" fill="#ffffff" fontFamily="sans-serif" fontSize="11" fontWeight="bold" textAnchor="middle">EX</text>
      </svg>
    ),
    PHP: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4" />
        <text x="12" y="15" fill="#ffffff" fontFamily="sans-serif" fontSize="9" fontWeight="bold" textAnchor="middle">php</text>
      </svg>
    ),
    Laravel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M5 4L19 7V17L12 21L5 17V4Z" fill="#FF2D20" />
        <path d="M12 8L19 11.5V17L12 21V8Z" fill="#E62215" />
      </svg>
    ),
    MySQL: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 6.5 3 11C3 15.5 7 19 12 19C17 19 21 15.5 21 11C21 6.5 17 3 12 3Z" fill="#00758F" />
        <path d="M12 6C15 6 18 8 18 11C18 14 15 16 12 16C9 16 6 14 6 11C6 8 9 6 12 6Z" fill="#F29111" />
      </svg>
    ),
    PostgreSQL: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#336791" />
        <text x="12" y="16" fill="#ffffff" fontFamily="sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">PG</text>
      </svg>
    ),
    Supabase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.5 21.5L19 12H12.5L13.5 2.5L6 12H12.5L11.5 21.5Z" fill="#3ECF8E" />
      </svg>
    ),
    Git: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.7 10.9L13.1 2.3C12.7 1.9 12 1.9 11.6 2.3L2.3 11.6C1.9 12 1.9 12.7 2.3 13.1L10.9 21.7C11.3 22.1 12 22.1 12.4 21.7L21.7 12.4C22.1 12 22.1 11.3 21.7 10.9ZM14 15.5C13.5 15.8 12.8 15.8 12.4 15.4L10.4 13.4V16.8C10.7 17.1 10.7 17.6 10.4 18C10.1 18.4 9.5 18.5 9.1 18.2C8.7 17.9 8.6 17.3 8.9 16.9C9.1 16.6 9.4 16.5 9.7 16.5V11.2C9.4 11 9.1 10.8 8.9 10.5C8.5 10 8.6 9.3 9.1 8.9C9.6 8.5 10.3 8.6 10.7 9.1C10.9 9.4 11 9.8 11 10.2L12.9 12.1L14.7 10.3C14.5 9.9 14.6 9.5 14.8 9.2C15.2 8.7 15.9 8.6 16.4 9C16.9 9.4 17 10.1 16.6 10.6C16.3 11 15.8 11.1 15.4 10.9L13.6 12.7L15.3 14.4C15.8 14.7 15.8 15.2 14 15.5Z" fill="#F05032" />
      </svg>
    ),
    GitHub: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    "VS Code": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.41-3.33a.997.997 0 0 0-1.28.07l-1.07.96a.994.994 0 0 0 0 1.47l3.7 3.7-3.7 3.7a.994.994 0 0 0 0 1.47l1.07.96c.38.34.96.37 1.28.07l4.41-3.33 9.46 8.63c.49.45 1.18.57 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.31V3.69a1.5 1.5 0 0 0-.85-1.103z" fill="#007ACC" />
      </svg>
    ),
    Figma: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z" fill="#0ACF83" />
        <path d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z" fill="#A259FF" />
        <path d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z" fill="#F24E1E" />
        <path d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z" fill="#FF7262" />
        <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
      </svg>
    ),
    Vercel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
        <path d="M24 22.5D12 1.5 0 22.5H24Z" fill="#ffffff" />
      </svg>
    ),
  };

  const icon = icons[name] || (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );

  return className ? cloneElement(icon, { className }) : icon;
}
