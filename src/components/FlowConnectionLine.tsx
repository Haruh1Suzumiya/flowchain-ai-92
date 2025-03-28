
import React from 'react';

interface FlowConnectionLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  animated?: boolean;
  color?: string;
  dashed?: boolean;
}

const FlowConnectionLine: React.FC<FlowConnectionLineProps> = ({
  start,
  end,
  animated = false,
  color = 'rgba(255, 255, 255, 0.5)',
  dashed = false
}) => {
  // Calculate Bezier curve control points
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  
  const bezierPath = `M${start.x},${start.y} C${start.x + dx/3},${start.y} ${end.x - dx/3},${end.y} ${end.x},${end.y}`;
  
  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
      <path
        d={bezierPath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "5 5" : "none"}
        className={animated ? "flowing-path" : ""}
      />
    </svg>
  );
};

export default FlowConnectionLine;
