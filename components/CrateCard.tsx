import Link from 'next/link'; 
import { Package, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MotionDiv } from './framer/motion';

export type CrateStatus = 'stable' | 'beta' | 'coming-soon';

interface CrateCardProps {
  name: string;
  description: string;
  status: CrateStatus;
  features: string[];
  href: string;
  delay?: number;
  accent?: 'orange' | 'violet';
}

const statusConfig: Record<CrateStatus, { label: string; className: string }> = {
  stable: { label: 'Stable', className: 'crate-badge stable' },
  beta: { label: 'Beta', className: 'crate-badge beta' },
  'coming-soon': { label: 'Coming Soon', className: 'crate-badge coming-soon' },
};

const ACCENT_STYLES = {
  orange: { border: 'rgba(232,71,28,0.25)', bg: 'rgba(232,71,28,0.15)', text: 'var(--cyan)' },
  violet: { border: 'rgba(139,92,246,0.25)', bg: 'rgba(139,92,246,0.15)', text: 'var(--neon)' },
};

export function CrateCard({ name, description, status, features, href, delay = 0, accent = 'orange' }: CrateCardProps) {
  const { label, className } = statusConfig[status];
  const colors = ACCENT_STYLES[accent];
  const isExternal = href.startsWith('http');
  const isDisabled = status === 'coming-soon';

  const inner = (
    <>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 flex items-center justify-center rounded"
            style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
          >
            <Package className="h-4 w-4" style={{ color: colors.text }} />
          </div>
          <span className="font-mono font-semibold">{name}</span>
        </div>
        <span className={className}>{label}</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {features.slice(0, 4).map((feature) => (
          <Badge key={feature} variant="secondary" className="text-xs">
            {feature}
          </Badge>
        ))}
      </div>

      {!isDisabled && (
        <div className="flex items-center gap-1 text-sm text-primary font-medium">
          View on GitHub
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </>
  );

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {isDisabled ? (
        <div className={cn('holo-frame feature-card block h-full opacity-50 cursor-default')}>{inner}</div>
      ) : isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="holo-frame feature-card block h-full">
          {inner}
        </a>
      ) : (
        <Link href={href} className="holo-frame feature-card block h-full">
          {inner}
        </Link>
      )}
    </MotionDiv>
  );
}
