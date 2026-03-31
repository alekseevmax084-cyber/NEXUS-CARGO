import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "chrome" | "gold";
}

export default function Badge({ children, className, variant = "blue" }: BadgeProps) {
  const variants = {
    blue: "bg-[#0052CC]/10 text-[#0052CC] border-[#0052CC]/20",
    chrome: "bg-[#8C9BAB]/10 text-[#8C9BAB] border-[#8C9BAB]/20",
    gold: "bg-[#B8960C]/10 text-[#B8960C] border-[#B8960C]/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        "font-[family-name:var(--font-montserrat)] tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
