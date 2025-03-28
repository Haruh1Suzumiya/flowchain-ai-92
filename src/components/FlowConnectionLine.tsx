
import React from 'react';

interface FlowConnectionLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  animated?: boolean;
  color?: string;
  dashed?: boolean;
  width?: number;
}

const FlowConnectionLine: React.FC<FlowConnectionLineProps> = ({
  start,
  end,
  animated = false,
  color = 'rgba(255, 255, 255, 0.5)',
  dashed = false,
  width = 2
}) => {
  // Calculate Bezier curve control points
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  
  const bezierPath = `M${start.x},${start.y} C${start.x + dx/3},${start.y} ${end.x - dx/3},${end.y} ${end.x},${end.y}`;
  
  // Define animation
  const flowingStyle = animated ? {
    strokeDasharray: '5 5',
    strokeDashoffset: '0',
    animation: 'flowingPath 1s linear infinite'
  } : {};
  
  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <path
        d={bezierPath}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? "5 5" : "none"}
        style={flowingStyle}
        markerEnd={animated ? "" : "url(#arrowhead)"}
      />
      {animated && (
        <path
          d={bezierPath}
          fill="none"
          stroke={color.replace('0.5', '0.8')}
          strokeWidth={width}
          strokeDasharray="3 17"
          style={{
            strokeDashoffset: '0',
            animation: 'flowingPath 1s linear infinite',
            animationDelay: '0.5s'
          }}
        />
      )}
      <style jsx>{`
        @keyframes flowingPath {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </svg>
  );
};

export default FlowConnectionLine;
