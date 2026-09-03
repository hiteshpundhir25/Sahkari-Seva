import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showText?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onChange,
  showText = false
}) => {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.round(rating);

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starValue)}
            className={`transition-colors ${
              interactive 
                ? 'cursor-pointer hover:scale-110 focus:outline-none' 
                : 'cursor-default'
            }`}
          >
            <Star
              className={`${sizes[size]} ${
                isFilled 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'fill-slate-100 dark:fill-slate-800 text-slate-300 dark:text-slate-700'
              }`}
            />
          </button>
        );
      })}

      {showText && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
