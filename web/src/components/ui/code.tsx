import React from "react"
import { cn } from "@/lib/utils"

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          "rounded-md font-mono text-sm bg-black/5 p-2 overflow-auto",
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
    )
  }
)

Code.displayName = "Code"

export { Code }