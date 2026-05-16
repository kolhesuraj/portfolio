import { cn } from "@/lib/utils";

// Small reusable button
interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function IconButton({
  onClick,
  children,
  ariaLabel,
  className = "",
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition",
        className,
      )}>
      {children}
    </button>
  );
}
