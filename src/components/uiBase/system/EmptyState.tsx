interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    className?: string;
  }
  
  export function EmptyState({ 
    icon, 
    title, 
    description, 
    className = "" 
  }: EmptyStateProps) {
    const defaultIcon = (
      <div className="mx-auto h-12 w-12 text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
        </svg>
      </div>
    );
  
    return (
      <div className={`flex min-h-[400px] items-center justify-center ${className}`}>
        <div className="text-center space-y-3">
          {icon || defaultIcon}
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>
      </div>
    );
  }