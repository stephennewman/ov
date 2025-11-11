'use client';

interface OutcomeViewLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function OutcomeViewLogo({ size = 'md', showText = true }: OutcomeViewLogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-sm' },
    md: { icon: 28, text: 'text-lg' },
    lg: { icon: 36, text: 'text-2xl' },
  };

  const iconSize = sizes[size].icon;
  const textClass = sizes[size].text;

  return (
    <div className="flex items-center gap-2">
      {/* App Icon - Square with soft edges, circle bottom-left, triangle top-right (cursor style) */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background square with rounded corners */}
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="16"
          className="fill-cyan-600 dark:fill-cyan-500"
        />
        
        {/* Circle in bottom-left corner */}
        <circle
          cx="30"
          cy="70"
          r="12"
          className="fill-white dark:fill-zinc-900"
        />
        
        {/* Triangle in top-right corner (cursor-like) */}
        <path
          d="M70 20 L88 38 L70 50 Z"
          className="fill-white dark:fill-zinc-900"
        />
      </svg>

      {/* Logo Text */}
      {showText && (
        <span className={`font-semibold tracking-tight ${textClass} bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent`}>
          outcomeview
        </span>
      )}
    </div>
  );
}

