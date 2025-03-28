
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

// List of Ethereum dApps categorized
const dAppsList = {
  defi: [
    { name: 'Uniswap', description: 'DEX Protocol', icon: '🦄' },
    { name: 'Aave', description: 'Lending Protocol', icon: '🔄' },
    { name: 'Curve', description: 'Stable Swaps', icon: '↩️' },
    { name: 'Compound', description: 'Lending Markets', icon: '💰' },
    { name: 'MakerDAO', description: 'DAI Stablecoin', icon: '🏦' },
    { name: 'Balancer', description: 'Liquidity Pools', icon: '⚖️' },
    { name: '1inch', description: 'DEX Aggregator', icon: '🧩' },
    { name: 'Synthetix', description: 'Synthetic Assets', icon: '🔄' },
    { name: 'dYdX', description: 'Derivatives', icon: '📈' },
    { name: 'Yearn', description: 'Yield Farming', icon: '🌾' }
  ],
  nft: [
    { name: 'OpenSea', description: 'NFT Marketplace', icon: '🌊' },
    { name: 'Rarible', description: 'NFT Creation', icon: '🎨' },
    { name: 'Foundation', description: 'Curated NFTs', icon: '🖼️' },
    { name: 'SuperRare', description: 'Digital Art', icon: '🏆' },
    { name: 'Zora', description: 'NFT Protocol', icon: '💎' },
    { name: 'Manifold', description: 'Creator Tools', icon: '🛠️' }
  ],
  dao: [
    { name: 'Snapshot', description: 'Governance Voting', icon: '🗳️' },
    { name: 'Aragon', description: 'DAO Platform', icon: '🏛️' },
    { name: 'DAOhaus', description: 'Moloch DAOs', icon: '🏠' },
    { name: 'Colony', description: 'DAO Framework', icon: '🐜' },
    { name: 'Gnosis Safe', description: 'Multi-sig Wallet', icon: '🔐' }
  ],
  infra: [
    { name: 'The Graph', description: 'Data Indexing', icon: '📊' },
    { name: 'Chainlink', description: 'Oracles', icon: '⛓️' },
    { name: 'Infura', description: 'Node Provider', icon: '🖥️' },
    { name: 'Alchemy', description: 'Blockchain API', icon: '🧪' },
    { name: 'IPFS', description: 'Decentralized Storage', icon: '📁' },
    { name: 'Lens Protocol', description: 'Social Graph', icon: '👁️' },
    { name: 'ENS', description: 'Ethereum Names', icon: '📛' }
  ]
};

const DAppsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggingDApp, setDraggingDApp] = useState<{ name: string; description: string; icon: string } | null>(null);
  
  // Filter dApps based on search term
  const filterDApps = (dApps: typeof dAppsList.defi) => {
    if (!searchTerm) return dApps;
    return dApps.filter(dApp => 
      dApp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dApp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDragStart = (dApp: typeof dAppsList.defi[0]) => {
    setDraggingDApp(dApp);
  };

  const handleDragEnd = () => {
    setDraggingDApp(null);
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-flow-card/40 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Available dApps</CardTitle>
            <CardDescription className="text-gray-400">Drag & drop to canvas</CardDescription>
            
            <div className="mt-2 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search dApps..."
                className="w-full pl-8 py-2 bg-flow-card/60 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-flow-node-blockchain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100vh-300px)]">
            <Tabs defaultValue="defi">
              <TabsList className="bg-flow-card/60 w-full mb-2">
                <TabsTrigger value="defi" className="text-xs">DeFi</TabsTrigger>
                <TabsTrigger value="nft" className="text-xs">NFT</TabsTrigger>
                <TabsTrigger value="dao" className="text-xs">DAO</TabsTrigger>
                <TabsTrigger value="infra" className="text-xs">Infra</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(100vh-350px)]">
                {Object.entries(dAppsList).map(([category, dApps]) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="space-y-2">
                      {filterDApps(dApps).map((dApp, index) => (
                        <motion.div
                          key={index}
                          className="p-2 bg-flow-card/60 rounded cursor-move flex items-center hover:bg-flow-card/80 transition-colors"
                          draggable
                          onDragStart={() => handleDragStart(dApp)}
                          onDragEnd={handleDragEnd}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-flow-node-blockchain/30 flex items-center justify-center mr-2 text-lg">
                            {dApp.icon}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium">{dApp.name}</div>
                            <div className="text-xs text-gray-400">{dApp.description}</div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {filterDApps(dApps).length === 0 && (
                        <div className="p-4 text-center text-gray-400 text-sm">
                          No dApps found matching your search
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-flow-card/40 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Workflow Info</CardTitle>
            <CardDescription className="text-gray-400">Current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-flow-success">Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nodes:</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Connections:</span>
                <span>3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DAppsPanel;
