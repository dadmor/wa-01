// src/components/uiBase/Info.tsx
interface InfoTextProps {
  title: string;
  subtitle: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  className?: string;
}

export function InfoText({
  title,
  subtitle,
  size = "md",
  align = "left",
  className = "",
}: InfoTextProps) {
  const sizeClasses = {
    sm: {
      title: "scroll-m-20 text-lg font-semibold tracking-tight",
      subtitle: "text-sm text-muted-foreground",
      spacing: "space-y-2",
    },
    md: {
      title: "scroll-m-20 text-3xl font-semibold tracking-tight",
      subtitle: "text-base text-muted-foreground",
      spacing: "space-y-3",
    },
    lg: {
      title: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      subtitle: "text-xl text-muted-foreground",
      spacing: "space-y-4",
    },
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={`${sizeClasses[size].spacing} ${alignClasses[align]} ${className}`}
    >
      <h1 className={sizeClasses[size].title}>{title}</h1>
      <p className={sizeClasses[size].subtitle}>{subtitle}</p>
    </div>
  );
}
