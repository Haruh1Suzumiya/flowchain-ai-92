
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface FlowNodeProps {
  type: 'blockchain' | 'defi' | 'ai' | 'default';
  label: string;
  description: string;
  isAnimated: boolean;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const FlowNode: React.FC<FlowNodeProps> = ({
  type,
  label,
  description,
  isAnimated,
  isActive,
  onClick,
  className,
  icon
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Different background colors based on node type
  const getBgColor = () => {
    if (isDark) {
      // Dark theme colors
      if (type === 'blockchain') return 'bg-gradient-to-br from-cyan-900 to-cyan-950';
      if (type === 'defi') return 'bg-gradient-to-br from-emerald-900 to-emerald-950';
      if (type === 'ai') return 'bg-gradient-to-br from-purple-900 to-purple-950';
      return 'bg-gradient-to-br from-blue-900 to-blue-950';
    } else {
      // Light theme colors
      if (type === 'blockchain') return 'bg-gradient-to-br from-cyan-500 to-cyan-600';
      if (type === 'defi') return 'bg-gradient-to-br from-emerald-500 to-emerald-600';
      if (type === 'ai') return 'bg-gradient-to-br from-purple-500 to-purple-600';
      return 'bg-gradient-to-br from-blue-500 to-blue-600';
    }
  };

  // Border color based on node type
  const getBorderColor = () => {
    if (isDark) {
      // Dark theme colors
      if (type === 'blockchain') return 'border-cyan-700';
      if (type === 'defi') return 'border-emerald-700';
      if (type === 'ai') return 'border-purple-700';
      return 'border-blue-700';
    } else {
      // Light theme colors
      if (type === 'blockchain') return 'border-cyan-400';
      if (type === 'defi') return 'border-emerald-400';
      if (type === 'ai') return 'border-purple-400';
      return 'border-blue-400';
    }
  };

  // Get animation class based on node type
  const getAnimationClass = () => {
    if (!isAnimated) return '';
    
    if (type === 'blockchain') return 'blockchain-node node-animation-pulse';
    if (type === 'defi') return 'defi-node node-animation-pulse';
    if (type === 'ai') return 'ai-node node-animation-pulse';
    return 'default-node node-animation-pulse';
  };

  // Active state styling
  const getActiveClass = () => {
    if (!isActive) return '';
    
    if (isDark) {
      if (type === 'blockchain') return 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-900/50';
      if (type === 'defi') return 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-900/50';
      if (type === 'ai') return 'ring-2 ring-purple-400 shadow-lg shadow-purple-900/50';
      return 'ring-2 ring-blue-400 shadow-lg shadow-blue-900/50';
    } else {
      if (type === 'blockchain') return 'ring-2 ring-cyan-300 shadow-lg shadow-cyan-300/50';
      if (type === 'defi') return 'ring-2 ring-emerald-300 shadow-lg shadow-emerald-300/50';
      if (type === 'ai') return 'ring-2 ring-purple-300 shadow-lg shadow-purple-300/50';
      return 'ring-2 ring-blue-300 shadow-lg shadow-blue-300/50';
    }
  };

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border transition-all duration-200 text-white overflow-visible",
        getBgColor(),
        getBorderColor(),
        getActiveClass(),
        getAnimationClass(),
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-2">
        {icon && <div className="text-white">{icon}</div>}
        <div className="font-medium">{label}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>
    </div>
  );
};

export default FlowNode;
