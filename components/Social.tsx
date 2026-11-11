/** Instagram camera logo (inherits the colour of the surrounding text) */
export function LinkedInLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Round Instagram icon link, used in the headers */
export function LinkedInIcon({ href }: { href: string }) {
  return (
    <a className="soc" href={href} target="_blank" rel="noopener noreferrer" aria-label="Mirsal on Instagram" title="Instagram">
      <LinkedInLogo />
    </a>
  );
}
