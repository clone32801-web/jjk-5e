import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { getGDocLink } from '../utils/gdocLinks';

export default function GDocButton({
  type,
  targetKey,
  url: directUrl,
  label = 'GDoc',
  title = 'Mở mục này trong tài liệu Google Doc gốc (JJK 5e V.6)',
  size = 'sm', // 'xs', 'sm', 'md', 'icon'
  variant = 'chip', // 'chip', 'button', 'ghost', 'subtle'
  className = '',
  showExternalIcon = true
}) {
  const href = directUrl || getGDocLink(type, targetKey);

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2',
    icon: 'p-1.5 text-xs'
  }[size] || 'px-2.5 py-1 text-xs gap-1.5';

  const variantClasses = {
    chip: 'bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-400/60 shadow-sm',
    button: 'bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-md hover:shadow-sky-500/25',
    ghost: 'text-sky-400 hover:text-sky-200 hover:bg-sky-950/30 border border-transparent hover:border-sky-500/20',
    subtle: 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
  }[variant] || 'bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 hover:text-white border border-sky-500/30';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={title}
      className={`inline-flex items-center justify-center font-mono font-medium rounded-lg transition-all duration-200 cursor-pointer select-none shrink-0 group ${sizeClasses} ${variantClasses} ${className}`}
    >
      <FileText className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
      {size !== 'icon' && (
        <span className="truncate">{label}</span>
      )}
      {showExternalIcon && size !== 'icon' && (
        <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
      )}
    </a>
  );
}
