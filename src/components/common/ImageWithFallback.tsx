import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Fashion product',
  className = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`bg-[#EFECE6] flex flex-col items-center justify-center text-[#8C8275] p-4 text-center ${className}`}>
        <ImageOff className="w-8 h-8 mb-2 opacity-60" />
        <span className="text-xs font-medium uppercase tracking-wider">
          {fallbackText || alt || 'StyleSync Item'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFECE6] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse flex items-center justify-center">
          <span className="text-xs text-[#A89F91]">Loading...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
