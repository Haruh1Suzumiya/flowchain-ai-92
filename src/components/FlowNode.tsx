
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export type NodeType = 'blockchain' | 'ai' | 'default' | 'defi';

interface FlowNodeProps {
  type: NodeType;
  icon: React.ReactNode;
  label: string;
  description?: string;
  isAnimated?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({
  type,
  icon,
  label,
  description,
  isAnimated = false,
  isActive = false,
  onClick,
  className
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const nodeColorClass = {
    blockchain: `bg-flow-node-blockchain text-white border-flow-node-blockchain/30`,
    ai: `bg-flow-node-ai text-white border-flow-node-ai/30`,
    defi: `bg-emerald-500 text-white border-emerald-500/30`,
    default: `bg-flow-node-default text-white border-flow-node-default/30`
  };
  
  const animationClass = isAnimated ? `node-animation-pulse ${type}-node` : '';
  const activeClass = isActive ? 'ring-2 ring-white ring-opacity-50' : '';
  
  return (
    <div 
      className={cn(
        'relative p-4 rounded-lg bg-opacity-20 border cursor-pointer transition-all duration-300 hover:bg-opacity-30 flex flex-col items-center text-center',
        nodeColorClass[type],
        animationClass,
        activeClass,
        className,
        isAnimated && 'animate-node-pulse'
      )}
      onClick={onClick}
    >
      <div className="mb-2">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{label}</h3>
      {description && <p className="text-xs opacity-80">{description}</p>}
    </div>
  );
};

export default FlowNode;
