
import React, { useState, useEffect, useRef } from 'react';
import FlowNode from './FlowNode';
import FlowConnectionLine from './FlowConnectionLine';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FlowWorkspace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const { toast } = useToast();

  const [nodes, setNodes] = useState([
    {
      id: 'blockchain-1',
      type: 'blockchain' as const,
      label: 'Ethereum',
      description: 'Smart Contract',
      position: { x: 150, y: 100 },
      isAnimated: false,
      connections: ['ai-process-1']
    },
    {
      id: 'ai-process-1',
      type: 'ai' as const,
      label: 'AI Processor',
      description: 'Data Analysis',
      position: { x: 400, y: 200 },
      isAnimated: false,
      connections: ['blockchain-2']
    },
    {
      id: 'blockchain-2',
      type: 'blockchain' as const,
      label: 'Polygon',
      description: 'Transaction Pool',
      position: { x: 650, y: 100 },
      isAnimated: false,
      connections: ['output-node']
    },
    {
      id: 'output-node',
      type: 'default' as const,
      label: 'Output',
      description: 'Result',
      position: { x: 900, y: 200 },
      isAnimated: false,
      connections: []
    }
  ]);

  const handleNodeClick = (nodeId: string) => {
    setActiveNodeId(nodeId);
    toast({
      title: "Node Selected",
      description: `Selected ${nodes.find(n => n.id === nodeId)?.label} node`,
    });
  };

  const runSimulation = () => {
    setIsProcessing(true);
    
    // Reset all animations
    setNodes(prev => prev.map(node => ({
      ...node,
      isAnimated: false
    })));
    
    // Animate each node in sequence
    const animateSequence = async () => {
      // First node
      setNodes(prev => prev.map(node => 
        node.id === 'blockchain-1' ? { ...node, isAnimated: true } : node
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Second node
      setNodes(prev => prev.map(node => 
        node.id === 'ai-process-1' ? { ...node, isAnimated: true } : node
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Third node
      setNodes(prev => prev.map(node => 
        node.id === 'blockchain-2' ? { ...node, isAnimated: true } : node
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Output node
      setNodes(prev => prev.map(node => 
        node.id === 'output-node' ? { ...node, isAnimated: true } : node
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast({
        title: "Process Complete",
        description: "All nodes have successfully processed data",
      });
      
      setIsProcessing(false);
    };
    
    animateSequence();
  };

  return (
    <div className="h-full relative flex flex-col" ref={containerRef}>
      <div className="absolute top-4 right-4 z-10 flex space-x-3">
        <Button 
          variant="outline" 
          className="bg-flow-card border-gray-700 text-white hover:bg-flow-card/90"
          onClick={() => {
            toast({
              title: "New Node Added",
              description: "Added a new AI node to the workspace"
            });
          }}
        >
          Add Node
        </Button>
        <Button 
          onClick={runSimulation}
          disabled={isProcessing}
          className="bg-flow-node-ai text-white hover:bg-flow-node-ai/90"
        >
          {isProcessing ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : "Run Simulation"}
        </Button>
      </div>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-flow-bg">
        <div className="w-full h-full" 
             style={{
               backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)',
               backgroundSize: '30px 30px',
               backgroundPosition: '-15px -15px',
             }}
        ></div>
      </div>
      
      {/* Connections between nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map(node => 
          node.connections.map(targetId => {
            const targetNode = nodes.find(n => n.id === targetId);
            if (targetNode) {
              return (
                <FlowConnectionLine 
                  key={`${node.id}-${targetId}`}
                  start={node.position}
                  end={targetNode.position}
                  animated={isProcessing}
                  color={
                    node.type === 'blockchain' ? 'rgba(6, 182, 212, 0.5)' : 
                    node.type === 'ai' ? 'rgba(139, 92, 246, 0.5)' : 
                    'rgba(59, 130, 246, 0.5)'
                  }
                />
              );
            }
            return null;
          })
        )}
      </div>
      
      {/* Nodes */}
      <div className="relative h-full w-full">
        {nodes.map(node => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute"
            style={{ 
              left: node.position.x, 
              top: node.position.y, 
              transform: 'translate(-50%, -50%)',
              zIndex: node.id === activeNodeId ? 10 : 1
            }}
          >
            <FlowNode
              type={node.type}
              label={node.label}
              description={node.description}
              isAnimated={node.isAnimated}
              isActive={node.id === activeNodeId}
              onClick={() => handleNodeClick(node.id)}
              className="min-w-[120px]"
              icon={
                node.type === 'blockchain' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                ) : node.type === 'ai' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4c0 1.95-.76 3.54-1.89 4.48A4 4 0 0 1 12 14a4 4 0 0 1-2.11-3.52C8.76 9.54 8 7.95 8 6a4 4 0 0 1 4-4Z"></path>
                    <path d="M10 9a6 6 0 0 0-6 6c0 1.86.5 3.48 1.38 4.82a22.5 22.5 0 0 0 5.31 5.18c.4.28.8.51 1.19.69a1.9 1.9 0 0 0 2.24 0c.39-.18.79-.41 1.19-.69a22.5 22.5 0 0 0 5.31-5.18A10.43 10.43 0 0 0 22 15a6 6 0 0 0-6-6"></path>
                    <path d="M12 8a2 2 0 0 1 0 4 2 2 0 0 1 0-4Z"></path>
                    <path d="M13 14h-2"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"></path>
                    <path d="M18 13a3 3 0 1 0 0-2"></path>
                    <path d="M6 13a3 3 0 1 1 0-2"></path>
                    <path d="M15 3a3 3 0 1 1-3 3"></path>
                    <path d="M9 18a3 3 0 1 0 3 3"></path>
                  </svg>
                )
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlowWorkspace;
