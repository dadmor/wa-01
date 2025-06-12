// src/components/uiBase/Info.tsx
interface InfoTextProps {
  title: string;
  subtitle: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  reverse?: boolean;
  className?: string;
}

export function InfoText({
  title,
  subtitle,
  size = "md",
  align = "left",
  reverse = false,
  className = "",
}: InfoTextProps) {
  const sizeClasses = {
    sm: {
      title: "text-lg font-semibold",
      subtitle: "text-sm text-muted-foreground",
      spacing: "space-y-2",
    },
    md: {
      title: "text-3xl font-semibold",
      subtitle: "text-base text-muted-foreground",
      spacing: "space-y-3",
    },
    lg: {
      title: "text-4xl font-bold lg:text-5xl",
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
      className={`flex flex-col ${sizeClasses[size].spacing} ${
        alignClasses[align]
      } ${reverse ? "flex-col-reverse" : ""} ${className}`}
    >
      <h1 className={`scroll-m-20 tracking-tight ${sizeClasses[size].title}`}>
        {title}
      </h1>
      <p className={sizeClasses[size].subtitle}>{subtitle}</p>
    </div>
  );
}
