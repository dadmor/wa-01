interface KeywordBadgeListProps {
    keywords: string[];
    title?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    outline?: boolean;
    className?: string;
    onKeywordClick?: (keyword: string) => void;
  }
  
  export function KeywordBadgeList({ 
    keywords, 
    title = "Słowa kluczowe",
    variant = 'primary',
    size = 'sm',
    outline = true,
    className = "",
    onKeywordClick
  }: KeywordBadgeListProps) {
    if (!keywords || keywords.length === 0) {
      return null;
    }
  
    const badgeClasses = [
      `badge-${variant}`,
      outline && 'badge-outline',
      `badge-${size}`,
      onKeywordClick && 'cursor-pointer hover:opacity-80'
    ].filter(Boolean).join(' ');
  
    return (
      <div className={`space-y-3 ${className}`}>
        {title && <h3 className="text-sm font-medium">{title}</h3>}
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div 
              key={index} 
              className={`badge ${badgeClasses}`}
              onClick={onKeywordClick ? () => onKeywordClick(keyword) : undefined}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    );
  }