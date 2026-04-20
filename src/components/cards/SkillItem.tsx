/**
 * 🎴 SkillItem Component - Card
 * Card singola skill con progress bar
 * ✅ Migrato a next/image per ottimizzazione automatica
 * ✅ TypeScript con interfacce tipizzate
 * 
 * @module components/cards/SkillItem
 */

import Image, { StaticImageData } from 'next/image';
import './SkillItem.css';

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/** Dimensioni disponibili per SkillItem */
type SkillItemSize = 'small' | 'medium' | 'large';

/** Props per ProgressBar component */
interface ProgressBarProps {
  /** Valore percentuale (0-100) */
  value?: number;
  /** Mostra label con percentuale */
  showLabel?: boolean;
}

/** Props per SkillItem component */
interface SkillItemProps {
  /** Nome della skill */
  name: string;
  /** Livello di competenza (0-100) */
  level?: number;
  /** Icona della skill (path o StaticImageData) */
  icon?: string | StaticImageData;
  /** Alias per icon (per compatibilità con skillsData) */
  img?: string | StaticImageData;
  /** Categoria della skill */
  category?: string;
  /** Mostra la progress bar */
  showProgress?: boolean;
  /** Dimensione del componente */
  size?: SkillItemSize;
}

// ============================================
// 📦 CONSTANTS
// ============================================

const SIZE_CLASSES: Record<SkillItemSize, string> = {
  small: 'skill-item-small',
  medium: 'skill-item-medium',
  large: 'skill-item-large',
};

// ============================================
// 🎨 SUBCOMPONENTS
// ============================================

/**
 * ProgressBar Component - Barra di progresso della skill
 */
const ProgressBar = ({ value = 0, showLabel = true }: ProgressBarProps): JSX.Element => {
  return (
    <div className="skill-progress-container">
      <div 
        className="skill-progress-bar" 
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {showLabel && <span className="skill-percent">{value}%</span>}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

// ============================================
// 🎨 MAIN COMPONENT
// ============================================

/**
 * SkillItem Component - Card singola skill
 */
const SkillItem = ({ 
  name, 
  level = 0, 
  icon, 
  img,  // Alias per icon (per compatibilità con skillsData)
  category,
  showProgress = true,
  size = 'medium' 
}: SkillItemProps): JSX.Element => {
  const iconSrc = icon || img;

  return (
    <div className={`skill-item ${SIZE_CLASSES[size]}`}>
      {iconSrc && (
        <div className="skill-icon">
          <Image 
            src={iconSrc} 
            alt={`${name} icon`} 
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        {category && <span className="skill-category">{category}</span>}
        {showProgress && <ProgressBar value={level} />}
      </div>
    </div>
  );
};

SkillItem.displayName = 'SkillItem';

export default SkillItem;
export { SkillItem, ProgressBar };
export type { SkillItemProps, ProgressBarProps, SkillItemSize };
