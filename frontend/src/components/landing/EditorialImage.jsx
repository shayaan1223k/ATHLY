import React, { useState } from 'react';
import { Camera, ImageOff } from 'lucide-react';

/**
 * EditorialImage
 * Art-directed, high-performance image component with:
 * - Deterministic aspect ratio preservation
 * - Lazy loading below the fold (eager for hero)
 * - Graceful fallback to warm architectural stone placeholder on network/CORS error
 * - Subtle fade-in on load
 */
export const EditorialImage = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  imageClassName = '',
  priority = false,
  caption = null,
  overlay = null,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={`relative overflow-hidden bg-[#EBE7DC] ${aspectRatio} ${className}`}>
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imageClassName}`}
          />
          {overlay}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EBE7DC] border border-[#D9D5CB] text-[#4B4F48]">
          <Camera className="w-8 h-8 text-[#9B8F7D] mb-2 stroke-[1.25]" />
          <span className="text-xs uppercase tracking-wider font-medium text-[#171916]">
            ATHLY Architectural Visual
          </span>
          <p className="text-[11px] text-[#4B4F48] mt-1 max-w-xs line-clamp-2">
            {alt}
          </p>
        </div>
      )}

      {caption && (
        <figcaption className="text-[11px] text-[#4B4F48] mt-2 font-sans tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
