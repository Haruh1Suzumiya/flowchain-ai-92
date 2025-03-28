
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowNode from './FlowNode';
import FlowConnectionLine from './FlowConnectionLine';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CheckCircle2, PlayCircle, Plus, Edit, Trash2, DollarSign, Settings, AlertTriangle } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";

// Types for our flow nodes
interface NodePosition {
  x: number;
  y: number;
}

interface NodeData {
  id: string;
  type: 'blockchain' | 'defi' | 'ai' | 'default';
  label: string;
  description: string;
  position: NodePosition;
  isAnimated: boolean;
  connections: string[];
  protocol?: string;
  action?: string;
  token?: string;
}

// Flash Loan arbitrage flow example
const flashLoanArbitrageNodes: NodeData[] = [
  {
    id: 'aave-flash-loan',
    type: 'defi',
    label: 'Aave V3',
    description: 'Flash Loan USDC',
    position: { x: 150, y: 100 },
    isAnimated: false,
    connections: ['uniswap-v2'],
    protocol: 'Aave V3',
    action: 'Flash Loan',
    token: 'USDC'
  },
  {
    id: 'uniswap-v2',
    type: 'defi',
    label: 'Uniswap V2',
    description: 'Swap USDC/wETH',
    position: { x: 400, y: 200 },
    isAnimated: false,
    connections: ['uniswap-v3'],
    protocol: 'Uniswap V2',
    action: 'Swap',
    token: 'USDC -> wETH'
  },
  {
    id: 'uniswap-v3',
    type: 'defi',
    label: 'Uniswap V3',
    description: 'Swap wETH/DAI',
    position: { x: 650, y: 100 },
    isAnimated: false,
    connections: ['curve-fi'],
    protocol: 'Uniswap V3',
    action: 'Swap',
    token: 'wETH -> DAI'
  },
  {
    id: 'curve-fi',
    type: 'defi',
    label: 'Curve Finance',
    description: 'Swap DAI/USDC',
    position: { x: 900, y: 200 },
    isAnimated: false,
    connections: ['aave-repay'],
    protocol: 'Curve Finance',
    action: 'Swap',
    token: 'DAI -> USDC'
  },
  {
    id: 'aave-repay',
    type: 'defi',
    label: 'Aave V3',
    description: 'Repay USDC + Fee',
    position: { x: 1150, y: 100 },
    isAnimated: false,
    connections: ['profit-analysis'],
    protocol: 'Aave V3',
    action: 'Repay',
    token: 'USDC'
  },
  {
    id: 'profit-analysis',
    type: 'ai',
    label: 'Profit Analysis',
    description: 'Calculate Arbitrage Profit',
    position: { x: 1400, y: 200 },
    isAnimated: false,
    connections: [],
    protocol: 'AI Analytics',
    action: 'Calculate',
    token: 'USDC'
  }
];

// Default sample nodes
const defaultNodes: NodeData[] = [
  {
    id: 'blockchain-1',
    type: 'blockchain',
    label: 'Ethereum',
    description: 'Smart Contract',
    position: { x: 150, y: 100 },
    isAnimated: false,
    connections: ['ai-process-1']
  },
  {
    id: 'ai-process-1',
    type: 'ai',
    label: 'AI Processor',
    description: 'Data Analysis',
    position: { x: 400, y: 200 },
    isAnimated: false,
    connections: ['blockchain-2']
  },
  {
    id: 'blockchain-2',
    type: 'blockchain',
    label: 'Polygon',
    description: 'Transaction Pool',
    position: { x: 650, y: 100 },
    isAnimated: false,
    connections: ['output-node']
  },
  {
    id: 'output-node',
    type: 'default',
    label: 'Output',
    description: 'Result',
    position: { x: 900, y: 200 },
    isAnimated: false,
    connections: []
  }
];

// Node templates for adding new nodes
const nodeTemplates: {[key: string]: Omit<NodeData, 'id' | 'position' | 'connections'>} = {
  ethereum: {
    type: 'blockchain',
    label: 'Ethereum',
    description: 'Smart Contract',
    isAnimated: false
  },
  polygon: {
    type: 'blockchain',
    label: 'Polygon',
    description: 'Layer 2 Network',
    isAnimated: false
  },
  aave: {
    type: 'defi',
    label: 'Aave V3',
    description: 'Lending Protocol',
    isAnimated: false,
    protocol: 'Aave V3',
    action: 'Flash Loan'
  },
  uniswap: {
    type: 'defi',
    label: 'Uniswap V3',
    description: 'DEX Protocol',
    isAnimated: false,
    protocol: 'Uniswap V3',
    action: 'Swap'
  },
  curve: {
    type: 'defi',
    label: 'Curve Finance',
    description: 'Stablecoin DEX',
    isAnimated: false,
    protocol: 'Curve Finance',
    action: 'Swap'
  },
  ai: {
    type: 'ai',
    label: 'AI Processor',
    description: 'Data Analysis',
    isAnimated: false
  },
  output: {
    type: 'default',
    label: 'Output',
    description: 'Result',
    isAnimated: false
  }
};

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
  const [nodes, setNodes] = useState<NodeData[]>(defaultNodes);
  const [draggedNodeTemplate, setDraggedNodeTemplate] = useState<string | null>(null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<NodeData | null>(null);
  const [tempConnection, setTempConnection] = useState<{source: string, target: NodePosition} | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [showNodeDetailPanel, setShowNodeDetailPanel] = useState(false);
  const { toast } = useToast();

  // Load flash loan example if needed
  useEffect(() => {
    // Use flash loan example by default for better user experience
    setNodes(flashLoanArbitrageNodes);
  }, []);

  const handleNodeClick = (nodeId: string) => {
    setActiveNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    
    if (node) {
      setShowNodeDetailPanel(true);
      setEditingNode(node);
      
      toast({
        title: "Node Selected",
        description: `Selected ${node.label} node`,
      });
    }
  };

  // Function to generate a unique ID
  const generateId = (prefix: string) => {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const handleAddNode = (type: string) => {
    if (!containerRef.current) return;
    
    const template = nodeTemplates[type];
    if (!template) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate a position in the viewport
    const newNode: NodeData = {
      ...template,
      id: generateId(type),
      position: {
        x: containerRect.width / 2,
        y: containerRect.height / 2
      },
      connections: []
    };
    
    setNodes(prev => [...prev, newNode]);
    setActiveNodeId(newNode.id);
    setEditingNode(newNode);
    setIsEditingNode(true);
    
    toast({
      title: "Node Added",
      description: `Added a new ${template.label} node`
    });
  };

  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    if (!containerRef.current) return;

    e.stopPropagation();
    setIsDraggingNode(true);
    setActiveNodeId(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate offset between mouse position and node position
    setDragOffset({
      x: e.clientX - (containerRect.left + node.position.x),
      y: e.clientY - (containerRect.top + node.position.y)
    });
    
    // Add event listeners for mouse move and up
    document.addEventListener('mousemove', handleNodeDragMove);
    document.addEventListener('mouseup', handleNodeDragEnd);
  };

  const handleNodeDragMove = useCallback((e: MouseEvent) => {
    if (!isDraggingNode || !activeNodeId || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate new position within container bounds
    const newX = Math.max(50, Math.min(containerRect.width - 50, e.clientX - containerRect.left - dragOffset.x));
    const newY = Math.max(50, Math.min(containerRect.height - 50, e.clientY - containerRect.top - dragOffset.y));
    
    setNodes(prev => prev.map(node => 
      node.id === activeNodeId ? { ...node, position: { x: newX, y: newY } } : node
    ));
  }, [isDraggingNode, activeNodeId, dragOffset]);

  const handleNodeDragEnd = useCallback(() => {
    setIsDraggingNode(false);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleNodeDragMove);
    document.removeEventListener('mouseup', handleNodeDragEnd);
    
    toast({
      title: "Node Moved",
      description: "Node position updated"
    });
  }, [handleNodeDragMove, toast]);

  const startConnectionDrag = (sourceId: string, e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.stopPropagation();
    
    const sourceNode = nodes.find(n => n.id === sourceId);
    if (!sourceNode) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    setTempConnection({
      source: sourceId,
      target: {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      }
    });
    
    document.addEventListener('mousemove', handleConnectionDragMove);
    document.addEventListener('mouseup', handleConnectionDragEnd);
  };

  const handleConnectionDragMove = useCallback((e: MouseEvent) => {
    if (!tempConnection || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    setTempConnection({
      ...tempConnection,
      target: {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      }
    });
  }, [tempConnection]);

  const handleConnectionDragEnd = useCallback((e: MouseEvent) => {
    if (!tempConnection || !containerRef.current) return;
    
    document.removeEventListener('mousemove', handleConnectionDragMove);
    document.removeEventListener('mouseup', handleConnectionDragEnd);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Find if we're over a node
    const targetNode = nodes.find(node => {
      const dx = mouseX - node.position.x;
      const dy = mouseY - node.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 50; // Within 50px radius of node center
    });
    
    if (targetNode && targetNode.id !== tempConnection.source) {
      // Add connection
      setNodes(prev => prev.map(node => 
        node.id === tempConnection.source
          ? { ...node, connections: [...node.connections, targetNode.id] }
          : node
      ));
      
      toast({
        title: "Connection Added",
        description: "Created a new connection between nodes"
      });
    }
    
    setTempConnection(null);
  }, [tempConnection, nodes, toast, handleConnectionDragMove]);

  const runSimulation = () => {
    if (walletConnected) {
      setShowSignatureDialog(true);
    } else {
      setShowWalletDialog(true);
    }
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = `0x${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 6)}`;
    setWalletAddress(mockAddress);
    setWalletConnected(true);
    setShowWalletDialog(false);
    
    toast({
      title: "Wallet Connected",
      description: `Wallet ${mockAddress} has been connected successfully`,
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
    const animateSequence = async () => {
      const nodesList = [...nodes];
      
      // Initialize a queue with the first nodes (those with no incoming connections)
      const startNodes = nodesList.filter(node => 
        !nodesList.some(n => n.connections.includes(node.id))
      );
      
      // If no starting nodes, use the first node as fallback
      const queue = startNodes.length > 0 ? [...startNodes] : [nodesList[0]]; 
      const processed = new Set<string>();
      
      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (processed.has(currentNode.id)) continue;
        processed.add(currentNode.id);
        
        // Animate this node
        setNodes(prev => prev.map(node => 
          node.id === currentNode.id ? { ...node, isAnimated: true } : node
        ));
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Add all connected nodes to the queue
        const connectedNodes = nodesList.filter(node => 
          currentNode.connections.includes(node.id)
        );
        
        queue.push(...connectedNodes);
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

  const updateNodeData = () => {
    if (!editingNode) return;
    
    setNodes(prev => prev.map(node => 
      node.id === editingNode.id ? { ...editingNode } : node
    ));
    
    setIsEditingNode(false);
    setEditingNode(null);
    
    toast({
      title: "Node Updated",
      description: "Node properties have been updated"
    });
  };

  const deleteNode = (nodeId: string) => {
    // First remove any connections to this node
    setNodes(prev => prev.map(node => ({
      ...node,
      connections: node.connections.filter(id => id !== nodeId)
    })));
    
    // Then remove the node itself
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    
    setNodeToDelete(null);
    setShowDeleteConfirm(false);
    setShowNodeDetailPanel(false);
    
    toast({
      title: "Node Deleted",
      description: "Node has been removed from the workflow"
    });
  };

  const confirmDeleteNode = () => {
    setShowDeleteConfirm(true);
    setNodeToDelete(editingNode?.id || null);
  };

  const toggleWorkspaceMode = () => {
    if (workspaceMode === 'manual') {
      if (!walletConnected) {
        setShowWalletDialog(true);
      }
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
        variant: "destructive"
      });
      return;
    }

    setIsFlowGenerating(true);
    setIsValidated(false);
    
    // Simulate AI flow generation with a delay
    setTimeout(() => {
      // Replace current nodes with flash loan example nodes
      setNodes(flashLoanArbitrageNodes);
      
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

  const loadTemplate = (templateName: string) => {
    setSelectedTemplate(null);
    
    if (templateName === 'flashLoan') {
      setNodes(flashLoanArbitrageNodes);
      toast({
        title: "Template Loaded",
        description: "Flash Loan Arbitrage template has been loaded"
      });
    } else if (templateName === 'default') {
      setNodes(defaultNodes);
      toast({
        title: "Template Loaded",
        description: "Basic workflow template has been loaded"
      });
    }
  };

  return (
    <div className="h-full relative flex flex-col" ref={containerRef}>
      <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-3 items-center">
        <div className="flex items-center space-x-2 bg-flow-card/40 p-2 rounded-md">
          <span className="text-sm text-white">Manual</span>
          <Switch 
            checked={workspaceMode === 'ai'}
            onCheckedChange={toggleWorkspaceMode}
          />
          <span className="text-sm text-white">AI</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {workspaceMode === 'manual' && (
            <>
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="bg-flow-card border-gray-700 text-white hover:bg-flow-card/90"
                  onClick={() => setSelectedTemplate('menu')}
                >
                  Templates
                </Button>
                
                {selectedTemplate === 'menu' && (
                  <div className="absolute top-full left-0 mt-1 bg-flow-card border border-gray-700 rounded-md shadow-lg z-50 w-48">
                    <div className="p-1">
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-flow-card/90 rounded"
                        onClick={() => loadTemplate('flashLoan')}
                      >
                        Flash Loan Arbitrage
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-flow-card/90 rounded"
                        onClick={() => loadTemplate('default')}
                      >
                        Basic Workflow
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="bg-flow-card border-gray-700 text-white hover:bg-flow-card/90"
                  onClick={() => setIsAddingNode(!isAddingNode)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Node
                </Button>
                
                {isAddingNode && (
                  <div className="absolute top-full left-0 mt-1 bg-flow-card border border-gray-700 rounded-md shadow-lg z-50 w-48">
                    <div className="p-1">
                      {Object.keys(nodeTemplates).map((type) => (
                        <button
                          key={type}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-flow-card/90 rounded"
                          onClick={() => {
                            handleAddNode(type);
                            setIsAddingNode(false);
                          }}
                        >
                          {nodeTemplates[type].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
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
          
          {walletConnected && (
            <Button 
              variant="outline" 
              className="bg-flow-card border-gray-700 text-white hover:bg-flow-card/90"
              onClick={() => {}}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletAddress}
            </Button>
          )}
        </div>
      </div>
      
      {/* AI Mode Prompt Input */}
      {workspaceMode === 'ai' && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <div className="bg-flow-card/40 p-4 rounded-md border border-gray-700">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-white">Enter your workflow description:</label>
              <div className="flex space-x-2">
                <Textarea 
                  placeholder="Describe what you want the AI to create... (e.g., Create a workflow that connects Ethereum to Aave for flash loans, swaps tokens on Uniswap, and returns profit)"
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
      
      {/* Node Detail Panel */}
      {showNodeDetailPanel && editingNode && (
        <div className="absolute top-16 left-4 z-10 w-80">
          <div className="bg-flow-card/90 p-4 rounded-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Node Details</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={confirmDeleteNode}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => setShowNodeDetailPanel(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="node-label">Label</Label>
                <Input
                  id="node-label"
                  value={editingNode.label}
                  onChange={(e) => setEditingNode({...editingNode, label: e.target.value})}
                  className="bg-flow-bg text-white border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="node-description">Description</Label>
                <Input
                  id="node-description"
                  value={editingNode.description}
                  onChange={(e) => setEditingNode({...editingNode, description: e.target.value})}
                  className="bg-flow-bg text-white border-gray-700"
                />
              </div>
              
              {editingNode.protocol && (
                <div>
                  <Label htmlFor="node-protocol">Protocol</Label>
                  <Input
                    id="node-protocol"
                    value={editingNode.protocol}
                    onChange={(e) => setEditingNode({...editingNode, protocol: e.target.value})}
                    className="bg-flow-bg text-white border-gray-700"
                  />
                </div>
              )}
              
              {editingNode.action && (
                <div>
                  <Label htmlFor="node-action">Action</Label>
                  <Input
                    id="node-action"
                    value={editingNode.action}
                    onChange={(e) => setEditingNode({...editingNode, action: e.target.value})}
                    className="bg-flow-bg text-white border-gray-700"
                  />
                </div>
              )}
              
              {editingNode.token && (
                <div>
                  <Label htmlFor="node-token">Token</Label>
                  <Input
                    id="node-token"
                    value={editingNode.token}
                    onChange={(e) => setEditingNode({...editingNode, token: e.target.value})}
                    className="bg-flow-bg text-white border-gray-700"
                  />
                </div>
              )}
              
              <div className="pt-2">
                <Button 
                  onClick={updateNodeData}
                  className="bg-flow-node-blockchain text-white hover:bg-flow-node-blockchain/90 w-full"
                >
                  Update Node
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
                    node.type === 'defi' ? 'rgba(16, 185, 129, 0.5)' :
                    node.type === 'ai' ? 'rgba(139, 92, 246, 0.5)' : 
                    'rgba(59, 130, 246, 0.5)'
                  }
                />
              );
            }
            return null;
          })
        )}
        
        {/* Temporary connection line when dragging */}
        {tempConnection && (
          <FlowConnectionLine
            start={nodes.find(n => n.id === tempConnection.source)?.position || {x: 0, y: 0}}
            end={tempConnection.target}
            dashed={true}
            color="rgba(255, 255, 255, 0.3)"
          />
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
              zIndex: node.id === activeNodeId ? 10 : 1,
              cursor: 'move'
            }}
            onMouseDown={(e) => handleNodeDragStart(e, node.id)}
          >
            <div 
              className="relative"
              onDoubleClick={() => {
                setEditingNode(node);
                setShowNodeDetailPanel(true);
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
                  ) : node.type === 'defi' ? (
                    <DollarSign className="h-6 w-6" />
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
              
              {/* Connection handle */}
              <div 
                className="absolute right-0 bottom-0 w-5 h-5 bg-flow-card rounded-full border border-gray-700 flex items-center justify-center cursor-pointer z-20 transform translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent node drag
                  startConnectionDrag(node.id, e);
                }}
                title="Drag to connect"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </div>
            </div>
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
              onClick={() => setShowWalletDialog(false)} 
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
              Message: I authorize the execution of this workflow on {new Date().toISOString()} with wallet {walletAddress || "your connected wallet"}
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
              onClick={() => setShowSignatureDialog(false)} 
              className="border-gray-700 hover:bg-flow-card/90 flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-flow-card text-white border-red-500/30 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete Node</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this node? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-2">
            <AlertTriangle className="text-red-500 h-12 w-12" />
          </div>
          <DialogFooter className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteConfirm(false)} 
              className="border-gray-700 hover:bg-flow-card/90 flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => nodeToDelete && deleteNode(nodeToDelete)} 
              className="bg-red-500 hover:bg-red-600 flex-1"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlowWorkspace;
