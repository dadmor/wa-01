interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    text?: string;
  }
  
  export function LoadingSpinner({ 
    size = 'lg', 
    className = "", 
    text 
  }: LoadingSpinnerProps) {
    const sizeClass = {
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg'
    }[size];
  
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <span className={`loading loading-spinner ${sizeClass}`}></span>
          {text && (
            <span className="text-sm text-muted-foreground">{text}</span>
          )}
        </div>
      </div>
    );
  }