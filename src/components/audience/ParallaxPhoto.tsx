"use client";

import Image from "next/image";

/** Audience hero photo. Fades up with the hero text; no parallax or zoom. */
export function ParallaxPhoto({ src, alt, position }: { src: string; alt: string; position: string }) {
  return (
    <div className="relative aspect-[5/4] animate-rise overflow-hidden rounded-panel bg-surface-3 shadow-photo [animation-delay:80ms]">
      <div className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}
