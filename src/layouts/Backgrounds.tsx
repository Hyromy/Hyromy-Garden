import { type ReactNode, type CSSProperties } from "react"

type BackgroundProps = {
  children: ReactNode
  type: 
    "solid" |
    "dotted" |
    "square"
  bgColor?: string
  primaryColor?: string
  gridSize?: string
  thickness?: string
  className?: string
}

/**
 * A background component that can display different patterns.
 * 
 * @param children - The content to be displayed on top of the background.
 * @param type - The type of background pattern. Can be "solid", "dotted", or "square". Default is "solid".
 * @param bgColor - The background color. Default is "#09090b".
 * @param primaryColor - The primary color used in the pattern. Default is "#3f3f46".
 * @param gridSize - The size of the grid for the pattern. Default is "32px".
 * @param thickness - The thickness of the lines in the pattern. Default is "1px".
 * @param className - Additional CSS classes to apply to the background container.
 * @returns 
 */
export function Background({ 
  children, 
  type = "solid",
  bgColor = "var(--bg)",
  primaryColor = "var(--surface-hover)",
  gridSize = "32px",
  thickness = "1px",
  className = ""
}: BackgroundProps) { 
  const backgroundImages: Record<BackgroundProps["type"], string> = {
    solid: "",
    dotted: `radial-gradient(${primaryColor} ${thickness}, transparent ${thickness})`,
    square: `linear-gradient(to right, ${primaryColor} ${thickness}, transparent ${thickness}), linear-gradient(to bottom, ${primaryColor} ${thickness}, transparent ${thickness})`,
  }

  const textureStyle: CSSProperties = {
    backgroundColor: bgColor,
    backgroundImage: backgroundImages[type],
    backgroundSize: `${gridSize} ${gridSize}`,
    backgroundPosition: "center",
  }

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 -z-10 pointer-events-none" 
        style={textureStyle}
      />
      {children}
    </section>
  )
}
