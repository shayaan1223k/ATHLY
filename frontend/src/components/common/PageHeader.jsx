import React from 'react';
import { EditorialImage } from '../landing/EditorialImage';

/**
 * PageHeader
 * Shared luxury-wellness editorial page header.
 * Provides:
 * - Numbered/category section label in subtle uppercase sans
 * - Expressive serif headline (Fraunces / Playfair Display)
 * - Restrained supporting description in muted graphite
 * - Optional cinematic photography banner
 * - Right-aligned telemetry badge or quick actions
 */
export const PageHeader = ({
  category,
  title,
  subtitle,
  badge = null,
  actions = null,
  imageSrc = null,
  imageAlt = '',
  imageAspectRatio = 'aspect-[21/9]',
}) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Editorial Title & Actions Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D9D5CB]">
        <div>
          {category && (
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171916]" />
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#4B4F48]">
                {category}
              </span>
            </div>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171916] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#4B4F48] mt-1.5 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {badge}
          {actions}
        </div>
      </div>

      {/* Optional Cinematic Photography Banner */}
      {imageSrc && (
        <div className="rounded-lg overflow-hidden border border-[#D9D5CB] shadow-sm">
          <EditorialImage
            src={imageSrc}
            alt={imageAlt || title}
            aspectRatio={imageAspectRatio}
            priority={false}
            imageClassName="filter grayscale-[12%] contrast-[103%]"
          />
        </div>
      )}
    </div>
  );
};
