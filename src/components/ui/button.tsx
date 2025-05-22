import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8",
  {
    variants: {
      variant: {
        default: "bg-white text-[#1e40af] hover:bg-gray-100 border border-[#1e40af] border-opacity-20",
        brand: "bg-white text-[#1e40af] hover:bg-gray-100 border border-[#1e40af] border-opacity-20",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-[#1e40af] bg-transparent text-[#1e40af] hover:bg-[#1e40af] hover:text-white",
        secondary:
          "bg-[#1e40af] text-white hover:bg-[#1e3a8a]",
        ghost: "text-[#1e40af] hover:bg-[#1e40af] hover:text-white",
        link: "text-[#1e40af] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
