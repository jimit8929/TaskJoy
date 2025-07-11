// src/components/ui/sonner.tsx
import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

// pull in the type only
import type { ToasterProps } from "sonner"

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme()
  return (
    <SonnerToaster
      {...props}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  )
}
