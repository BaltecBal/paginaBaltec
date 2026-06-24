// Category icons — small, professional line-art SVGs.
// Each icon is 48x48 viewBox and uses currentColor (so navy-800 by default,
// accent on hover, or any other class). They live in /src/components/CategoryIcon.tsx
// rather than the data file because they are presentation, not data.

import type { ReactElement } from 'react';

interface IconProps {
  className?: string;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const BornerasIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* Block base */}
    <rect x="8" y="14" width="32" height="20" rx="1" {...stroke} />
    {/* Terminal posts */}
    <circle cx="14" cy="20" r="1.5" {...stroke} />
    <circle cx="14" cy="28" r="1.5" {...stroke} />
    <circle cx="24" cy="20" r="1.5" {...stroke} />
    <circle cx="24" cy="28" r="1.5" {...stroke} />
    <circle cx="34" cy="20" r="1.5" {...stroke} />
    <circle cx="34" cy="28" r="1.5" {...stroke} />
    {/* Wires */}
    <line x1="14" y1="6" x2="14" y2="18" {...stroke} />
    <line x1="14" y1="30" x2="14" y2="42" {...stroke} />
    <line x1="34" y1="6" x2="34" y2="18" {...stroke} />
    <line x1="34" y1="30" x2="34" y2="42" {...stroke} />
  </svg>
);

export const CajasIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* Box body */}
    <rect x="6" y="14" width="36" height="24" rx="1.5" {...stroke} />
    {/* Lid line */}
    <line x1="6" y1="22" x2="42" y2="22" {...stroke} />
    {/* Conduit entries */}
    <rect x="14" y="9" width="3" height="5" {...stroke} />
    <rect x="31" y="9" width="3" height="5" {...stroke} />
    {/* Screw */}
    <circle cx="12" cy="30" r="0.8" fill="currentColor" />
    <circle cx="36" cy="30" r="0.8" fill="currentColor" />
  </svg>
);

export const CapacitoresIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* Cylinder body */}
    <rect x="16" y="10" width="16" height="28" rx="1" {...stroke} />
    {/* Top stripe */}
    <line x1="16" y1="16" x2="32" y2="16" {...stroke} />
    {/* Leads */}
    <line x1="20" y1="10" x2="20" y2="6" {...stroke} />
    <line x1="28" y1="10" x2="28" y2="6" {...stroke} />
    {/* Polarity marker */}
    <line x1="18" y1="22" x2="22" y2="22" {...stroke} />
    <line x1="20" y1="20" x2="20" y2="24" {...stroke} />
    {/* + mark */}
    <line x1="26" y1="22" x2="30" y2="22" {...stroke} />
  </svg>
);

export const ImpulsoresIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* Center hub */}
    <circle cx="24" cy="24" r="3" {...stroke} />
    <circle cx="24" cy="24" r="1" fill="currentColor" />
    {/* 6 curved blades */}
    {[0, 60, 120, 180, 240, 300].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 24 + 3 * Math.cos(rad);
      const y1 = 24 + 3 * Math.sin(rad);
      const x2 = 24 + 16 * Math.cos(rad - 0.3);
      const y2 = 24 + 16 * Math.sin(rad - 0.3);
      const xm = 24 + 14 * Math.cos(rad - 0.5);
      const ym = 24 + 14 * Math.sin(rad - 0.5);
      return <path key={deg} d={`M${x1} ${y1} Q${xm} ${ym} ${x2} ${y2}`} {...stroke} />;
    })}
  </svg>
);

export const TurbinasIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* Outer ring */}
    <circle cx="24" cy="24" r="16" {...stroke} />
    {/* Inner hub */}
    <circle cx="24" cy="24" r="3" {...stroke} />
    <circle cx="24" cy="24" r="1" fill="currentColor" />
    {/* 8 radial blades */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 24 + 3 * Math.cos(rad);
      const y1 = 24 + 3 * Math.sin(rad);
      const x2 = 24 + 14 * Math.cos(rad);
      const y2 = 24 + 14 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />;
    })}
    {/* Center shaft */}
    <line x1="24" y1="38" x2="24" y2="44" {...stroke} />
  </svg>
);

export const VentiladoresIcon = ({ className }: IconProps): ReactElement => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    {/* 5 curved fan blades (asymmetric like a real fan) */}
    {[0, 72, 144, 216, 288].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 24 + 4 * Math.cos(rad);
      const cy = 24 + 4 * Math.sin(rad);
      const tip = 24 + 16 * Math.cos(rad);
      const tipY = 24 + 16 * Math.sin(rad);
      const ctl = 24 + 10 * Math.cos(rad + 1.0);
      const ctlY = 24 + 10 * Math.sin(rad + 1.0);
      return (
        <path
          key={deg}
          d={`M${cx} ${cy} Q${ctl} ${ctlY} ${tip} ${tipY}`}
          {...stroke}
        />
      );
    })}
    {/* Center hub */}
    <circle cx="24" cy="24" r="2.5" {...stroke} />
    <circle cx="24" cy="24" r="0.8" fill="currentColor" />
  </svg>
);

export const CategoryIcon = ({
  categoryId,
  className,
}: {
  categoryId: string;
  className?: string;
}): ReactElement => {
  switch (categoryId) {
    case 'borneras':
      return <BornerasIcon className={className} />;
    case 'cajas':
      return <CajasIcon className={className} />;
    case 'capacitores':
      return <CapacitoresIcon className={className} />;
    case 'impulsores':
      return <ImpulsoresIcon className={className} />;
    case 'turbinas':
      return <TurbinasIcon className={className} />;
    case 'ventiladores':
      return <VentiladoresIcon className={className} />;
    default:
      return <CajasIcon className={className} />;
  }
};