type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" strokeLinecap="square" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 8.5l3.25 3.25L13 5" strokeLinecap="square" />
    </svg>
  );
}
