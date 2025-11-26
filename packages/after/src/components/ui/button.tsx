import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-[Arial] font-normal leading-[1.5] cursor-pointer border transition-all disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-[var(--color-primary-500)] border-[var(--color-primary-600)] hover:enabled:bg-[var(--color-primary-600)]",
        secondary:
          "bg-[var(--color-secondary-50)] text-[var(--color-gray-600)] border-[var(--color-secondary-200)] hover:enabled:bg-[var(--color-secondary-100)]",
        danger:
          "bg-[var(--color-danger-500)] text-white border-[var(--color-danger-600)] hover:enabled:bg-[var(--color-danger-600)]",
        success:
          "bg-[var(--color-success-500)] text-white border-[var(--color-success-600)] hover:enabled:bg-[var(--color-success-600)]",
        outline:
          "border bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "px-3 py-1.5 text-[length:var(--font-size-btn-sm)] has-[>svg]:px-2.5",
        md: "px-5 py-2.5 text-[length:var(--font-size-btn-md)]",
        lg: "px-6 py-3 [length:var(--font-size-btn-lg)] has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function ShadcnButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { ShadcnButton, buttonVariants };
