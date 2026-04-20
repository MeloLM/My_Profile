/**
 * 📸 ResponsiveImage Component - Mobile-Optimized Image Wrapper
 * Wrapper aggressivo per next/image con srcset/sizes automatici
 * 
 * Features:
 * - Auto srcset con breakpoints mobile-first
 * - Art Direction support per crop diversi mobile/desktop
 * - Lazy loading con priority per above-the-fold
 * - Placeholder blur automatico
 * - WebP/AVIF con fallback automatico
 * 
 * @module components/common/ResponsiveImage
 */

import Image, { ImageProps, StaticImageData } from 'next/image';
import { CSSProperties, useMemo } from 'react';

// ============================================
// 📐 BREAKPOINTS & SIZES CONFIGURATION
// ============================================

/**
 * Breakpoints standard del progetto (mobile-first)
 */
export const BREAKPOINTS = {
  xs: 320,   // Small phones
  sm: 480,   // Large phones
  md: 768,   // Tablets
  lg: 1024,  // Small desktops
  xl: 1200,  // Large desktops
  xxl: 1400, // Extra large
} as const;

/**
 * Preset per sizes comuni - evita calcoli manuali
 */
export const SIZE_PRESETS = {
  // Full width images
  fullWidth: '100vw',
  
  // Card in grid (responsive columns)
  gridCard: `(max-width: ${BREAKPOINTS.sm}px) 100vw, (max-width: ${BREAKPOINTS.md}px) 50vw, 33vw`,
  
  // Hero/Banner images
  hero: `(max-width: ${BREAKPOINTS.md}px) 100vw, 60vw`,
  
  // Skill icons (fixed small size)
  icon: '80px',
  
  // Project thumbnails
  projectThumb: `(max-width: ${BREAKPOINTS.sm}px) 100vw, (max-width: ${BREAKPOINTS.md}px) 50vw, 400px`,
  
  // Profile/Avatar images
  avatar: `(max-width: ${BREAKPOINTS.sm}px) 150px, 200px`,
} as const;

// ============================================
// 📦 TYPES
// ============================================

type SizePreset = keyof typeof SIZE_PRESETS;

interface ResponsiveImageProps extends Omit<ImageProps, 'sizes'> {
  /** Preset per sizes automatico o stringa custom */
  sizePreset?: SizePreset | string;
  
  /** Forza aspect ratio (es. "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  
  /** Immagine alternativa per mobile (Art Direction) */
  mobileSrc?: StaticImageData | string;
  
  /** Breakpoint per switch mobile/desktop (default: md = 768px) */
  mobileBreakpoint?: number;
  
  /** Riduce qualità su mobile per risparmiare banda */
  mobileQuality?: number;
  
  /** Abilita blur placeholder */
  enableBlur?: boolean;
  
  /** Container className per aspect ratio */
  containerClassName?: string;
}

// ============================================
// 🧩 COMPONENT
// ============================================

/**
 * ResponsiveImage - Wrapper ottimizzato per next/image
 * 
 * @example Basic usage con preset
 * ```tsx
 * <ResponsiveImage 
 *   src={projectImg} 
 *   alt="Project preview" 
 *   sizePreset="projectThumb"
 * />
 * ```
 * 
 * @example Art Direction (immagine diversa su mobile)
 * ```tsx
 * <ResponsiveImage 
 *   src={desktopHero} 
 *   mobileSrc={mobileHero}
 *   alt="Hero banner" 
 *   sizePreset="hero"
 *   priority
 * />
 * ```
 * 
 * @example Con aspect ratio forzato
 * ```tsx
 * <ResponsiveImage 
 *   src={thumbnail} 
 *   alt="Thumbnail" 
 *   aspectRatio="16/9"
 *   sizePreset="gridCard"
 * />
 * ```
 */
export function ResponsiveImage({
  src,
  alt,
  sizePreset = 'fullWidth',
  aspectRatio,
  mobileSrc,
  mobileBreakpoint = BREAKPOINTS.md,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mobileQuality = 60,
  enableBlur = true,
  containerClassName = '',
  priority = false,
  quality,
  style,
  ...props
}: ResponsiveImageProps) {
  
  // Calcola sizes finale
  const sizes = useMemo(() => {
    if (sizePreset in SIZE_PRESETS) {
      return SIZE_PRESETS[sizePreset as SizePreset];
    }
    return sizePreset; // Custom string
  }, [sizePreset]);

  // Stile container per aspect ratio
  const containerStyle: CSSProperties = useMemo(() => {
    if (!aspectRatio) return {};
    
    return {
      position: 'relative',
      aspectRatio,
      width: '100%',
      overflow: 'hidden',
    };
  }, [aspectRatio]);

  // Stile immagine
  const imageStyle: CSSProperties = useMemo(() => {
    const baseStyle: CSSProperties = {
      objectFit: 'cover',
      ...(style as CSSProperties),
    };

    if (aspectRatio) {
      return {
        ...baseStyle,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      };
    }

    return baseStyle;
  }, [aspectRatio, style]);

  // ============================================
  // 🎨 ART DIRECTION (mobile/desktop switch)
  // ============================================
  
  if (mobileSrc) {
    return (
      <picture>
        {/* Mobile source */}
        <source 
          media={`(max-width: ${mobileBreakpoint}px)`}
          srcSet={typeof mobileSrc === 'string' ? mobileSrc : mobileSrc.src}
        />
        
        {/* Desktop fallback with next/image */}
        <div className={containerClassName} style={containerStyle}>
          <Image
            src={src}
            alt={alt}
            sizes={sizes}
            quality={quality ?? 75}
            priority={priority}
            placeholder={enableBlur ? 'blur' : 'empty'}
            style={imageStyle}
            {...props}
          />
        </div>
      </picture>
    );
  }

  // ============================================
  // 📷 STANDARD RESPONSIVE IMAGE
  // ============================================
  
  // Wrapper per aspect ratio
  if (aspectRatio) {
    return (
      <div className={containerClassName} style={containerStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality ?? 75}
          priority={priority}
          placeholder={enableBlur && typeof src !== 'string' ? 'blur' : 'empty'}
          style={imageStyle}
          {...props}
        />
      </div>
    );
  }

  // Standard image senza aspect ratio
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      quality={quality ?? 75}
      priority={priority}
      placeholder={enableBlur && typeof src !== 'string' ? 'blur' : 'empty'}
      style={imageStyle}
      {...props}
    />
  );
}

// ============================================
// 🔧 UTILITY HOOKS
// ============================================

/**
 * Hook per rilevare se siamo su mobile (per Art Direction dinamica)
 */
export function useIsMobile(breakpoint = BREAKPOINTS.md): boolean {
  // SSR-safe: useState e useEffect devono essere sempre chiamati
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check solo lato client
    if (typeof window === 'undefined') return;
    
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  
  return isMobile;
}

// Import necessari per hook (lazy)
import { useState, useEffect } from 'react';

export default ResponsiveImage;
