"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer rounded-full";

    const variants = {
      primary:
        "bg-[#0052CC] text-white hover:bg-[#0A0A0F] hover:shadow-lg",
      ghost:
        "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10",
      outline:
        "bg-transparent text-[#0052CC] border border-[#0052CC] hover:bg-[#0052CC] hover:text-white",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-7 py-3 text-sm",
      lg: "px-10 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
