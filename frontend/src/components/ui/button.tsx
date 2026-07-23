import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-desert-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-desert-500 text-white hover:bg-desert-600 shadow-lg shadow-desert-500/25 hover:shadow-glow-sm active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-desert-500/60 text-desert-700 hover:bg-desert-50 hover:border-desert-500",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-desert-50 hover:text-desert-700",
        link: "text-desert-600 underline-offset-4 hover:underline",
        gold:
          "bg-gradient-to-r from-desert-600 via-desert-500 to-amber-400 text-white hover:from-desert-700 hover:via-desert-600 hover:to-amber-500 shadow-lg shadow-desert-500/30 hover:shadow-glow active:scale-[0.98] bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow,transform]",
        dark: "bg-dark text-white hover:bg-dark/90 shadow-lg",
        glass:
          "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:shadow-glow-sm",
        luxury:
          "bg-dark text-white border border-desert-500/30 hover:border-desert-500/60 hover:shadow-glow-sm",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-base font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        <span className="relative flex items-center">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
