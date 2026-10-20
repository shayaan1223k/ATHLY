import React from 'react';
import { Info } from 'lucide-react';

/**
 * DemoBadge
 * Displays an understated notice indicating whether a section is displaying
 * curated baseline protocol data (local simulation) or live telemetry.
 */
export const DemoBadge = ({ text = "Curated Protocol Sample", isLive = false }) => {
  if (isLive) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF2DC] border border-[#C5D99A] text-[#171916] text-[10px] font-mono uppercase tracking-wider font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[#171916] animate-pulse" />
        <span>Live Telemetry</span>
      </span>
    );
  }

  return (
    <span 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#4B4F48] text-[10px] font-mono uppercase tracking-wider font-medium"
      title="This view displays curated demonstration metrics while backend cloud persistence is offline."
    >
      <Info className="w-3 h-3 text-[#9B8F7D]" />
      <span>{text}</span>
    </span>
  );
};
