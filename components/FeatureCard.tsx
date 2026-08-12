import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  accent?: 'orange' | 'violet';
}

const ACCENT_STYLES = {
  orange: { border: 'rgba(232,71,28,0.3)', bg: 'rgba(232,71,28,0.1)', text: 'var(--cyan)' },
  violet: { border: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.1)', text: 'var(--neon)' },
};

export function FeatureCard({ icon: Icon, title, description, delay = 0, accent = 'orange' }: FeatureCardProps) {
  const colors = ACCENT_STYLES[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="holo-frame feature-card group"
      style={{ '--feature-accent': colors.text } as React.CSSProperties}
    >
      <div className="h-10 w-10 flex items-center justify-center mb-4 rounded"
        style={{ border: `1px solid ${colors.border}`, background: colors.bg }}>
        <Icon className="h-5 w-5 text-[var(--feature-accent)]" />
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-2 text-foreground group-hover:text-[var(--feature-accent)] transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
