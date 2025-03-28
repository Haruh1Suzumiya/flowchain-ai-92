
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowNode from './FlowNode';
import FlowConnectionLine from './FlowConnectionLine';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Wallet, CheckCircle2, PlayCircle } from 'lucide-react';

const FlowWorkspace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [workspaceMode, setWorkspaceMode] = useState<'manual' | 'ai'>('manual');
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [naturalLanguagePrompt, setNaturalLanguagePrompt] = useState('');
  const [isFlowGenerating, setIsFlowGenerating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
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

  // Sample AI-generated nodes (used when in AI mode)
  const aiGeneratedNodes = [
    {
      id: 'ai-gen-1',
      type: 'blockchain' as const,
      label: 'Ethereum',
      description: 'Contract Deploy',
      position: { x: 150, y: 150 },
      isAnimated: false,
      connections: ['ai-gen-2']
    },
    {
      id: 'ai-gen-2',
      type: 'ai' as const,
      label: 'Language Parser',
      description: 'Parse & Analyze',
      position: { x: 350, y: 250 },
      isAnimated: false,
      connections: ['ai-gen-3']
    },
    {
      id: 'ai-gen-3',
      type: 'ai' as const,
      label: 'Data Validator',
      description: 'Validate Data',
      position: { x: 550, y: 150 },
      isAnimated: false,
      connections: ['ai-gen-4']
    },
    {
      id: 'ai-gen-4',
      type: 'blockchain' as const,
      label: 'Arbitrum',
      description: 'Transaction Execution',
      position: { x: 750, y: 250 },
      isAnimated: false,
      connections: ['ai-gen-5']
    },
    {
      id: 'ai-gen-5',
      type: 'default' as const,
      label: 'Result Handler',
      description: 'Format Results',
      position: { x: 950, y: 150 },
      isAnimated: false,
      connections: []
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setActiveNodeId(nodeId);
    toast({
      title: "Node Selected",
      description: `Selected ${nodes.find(n => n.id === nodeId)?.label} node`,
    });
  };

  const runSimulation = () => {
    setShowSignatureDialog(true);
  };

  const handleConnectWallet = () => {
    setShowWalletDialog(false);
    toast({
      title: "Wallet Connected",
      description: "Wallet has been connected successfully",
    });
  };

  const handleSkipWallet = () => {
    setShowWalletDialog(false);
    toast({
      title: "Wallet Connection Skipped",
      description: "You can connect your wallet later in Settings",
    });
  };

  const handleSignTransaction = () => {
    setShowSignatureDialog(false);
    setIsProcessing(true);
    
    // Reset all animations
    setNodes(prev => prev.map(node => ({
      ...node,
      isAnimated: false
    })));
    
    // Animate each node in sequence
    const currentNodes = workspaceMode === 'ai' && isFlowGenerating ? aiGeneratedNodes : nodes;
    
    const animateSequence = async () => {
      for (let i = 0; i < currentNodes.length; i++) {
        const nodeId = currentNodes[i].id;
        
        setNodes(prev => prev.map(node => 
          node.id === nodeId ? { ...node, isAnimated: true } : node
        ));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Success message
      toast({
        title: "Process Complete",
        description: "All nodes have successfully processed data",
      });
      
      setIsProcessing(false);
    };
    
    animateSequence();
  };

  const handleCancelTransaction = () => {
    setShowSignatureDialog(false);
    toast({
      title: "Transaction Cancelled",
      description: "The transaction signing was cancelled",
    });
  };

  const toggleWorkspaceMode = () => {
    if (workspaceMode === 'manual') {
      setShowWalletDialog(true);
      setWorkspaceMode('ai');
      setIsFlowGenerating(false);
    } else {
      setWorkspaceMode('manual');
      setIsFlowGenerating(false);
      setIsValidated(false);
    }
  };

  const generateAIFlow = () => {
    if (!naturalLanguagePrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description of the workflow you want to create",
      });
      return;
    }

    setIsFlowGenerating(true);
    setIsValidated(false);
    
    // Simulate AI flow generation with a delay
    setTimeout(() => {
      // Replace current nodes with AI generated nodes
      setNodes(aiGeneratedNodes);
      
      toast({
        title: "Flow Generated",
        description: "The AI has generated a workflow based on your description",
      });
    }, 2000);
  };

  const validateFlow = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsValidated(true);
      
      toast({
        title: "Validation Successful",
        description: "The workflow has been validated and is ready to execute",
      });
    }, 1500);
  };

  return (
    <div className="h-full relative flex flex-col" ref={containerRef}>
      <div className="absolute top-4 right-4 z-10 flex space-x-3 items-center">
        <div className="flex items-center space-x-2 bg-flow-card/40 p-2 rounded-md mr-2">
          <span className="text-sm text-white">Manual</span>
          <Switch 
            checked={workspaceMode === 'ai'}
            onCheckedChange={toggleWorkspaceMode}
          />
          <span className="text-sm text-white">AI</span>
        </div>
        
        {workspaceMode === 'manual' && (
          <Button 
            variant="outline" 
            className="bg-flow-card border-gray-700 text-white hover:bg-flow-card/90"
            onClick={() => {
              toast({
                title: "Node Added",
                description: "Added a new node to the workspace"
              });
            }}
          >
            Add Node
          </Button>
        )}
        
        <Button 
          onClick={validateFlow}
          disabled={isProcessing || (workspaceMode === 'ai' && !isFlowGenerating)}
          className="bg-flow-node-blockchain text-white hover:bg-flow-node-blockchain/90"
        >
          {isProcessing ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validating...
            </div>
          ) : (
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Validate
            </div>
          )}
        </Button>
        
        <Button 
          onClick={runSimulation}
          disabled={isProcessing || !isValidated}
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
          ) : (
            <div className="flex items-center">
              <PlayCircle className="mr-2 h-4 w-4" />
              Execute
            </div>
          )}
        </Button>
      </div>
      
      {/* AI Mode Prompt Input */}
      {workspaceMode === 'ai' && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <div className="bg-flow-card/40 p-4 rounded-md border border-gray-700">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-white">Enter your workflow description:</label>
              <div className="flex space-x-2">
                <Textarea 
                  placeholder="Describe what you want the AI to create... (e.g., Create a workflow that connects Ethereum to Uniswap for token swaps, validates the transaction, and sends results to IPFS)"
                  value={naturalLanguagePrompt}
                  onChange={(e) => setNaturalLanguagePrompt(e.target.value)}
                  className="bg-flow-bg text-white border-gray-700 focus-visible:ring-flow-node-ai"
                  rows={2}
                />
                <Button 
                  onClick={generateAIFlow}
                  className="bg-flow-node-ai text-white hover:bg-flow-node-ai/90 whitespace-nowrap self-end"
                >
                  Generate Flow
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
      <div className="relative h-full w-full mt-28">
        {nodes.map(node => (
          <motion.div
            key={node.id}
            initial={isFlowGenerating ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
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

      {/* Wallet Connection Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="bg-flow-card text-white border-flow-node-blockchain/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Connect Wallet</DialogTitle>
            <DialogDescription className="text-gray-400">
              Connect your wallet to create and execute workflows
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <div className="flex justify-center">
              <Wallet size={48} className="text-flow-node-blockchain mb-4" />
            </div>
            <Button 
              onClick={handleConnectWallet} 
              className="bg-flow-node-blockchain hover:bg-flow-node-blockchain/90"
            >
              Connect Wallet
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkipWallet} 
              className="border-gray-700 hover:bg-flow-card/90"
            >
              Skip for Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signature Request Dialog */}
      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent className="bg-flow-card text-white border-flow-node-blockchain/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Signature Request</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please sign this message to authorize the execution
            </DialogDescription>
          </DialogHeader>
          <div className="bg-flow-bg/50 p-4 rounded-md border border-gray-700 mt-4">
            <p className="text-sm font-mono break-all">
              Message: I authorize the execution of this workflow on {new Date().toISOString()}
            </p>
          </div>
          <div className="flex space-x-4 pt-4">
            <Button 
              onClick={handleSignTransaction} 
              className="bg-flow-node-blockchain hover:bg-flow-node-blockchain/90 flex-1"
            >
              Sign
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelTransaction} 
              className="border-gray-700 hover:bg-flow-card/90 flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlowWorkspace;
