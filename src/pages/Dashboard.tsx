
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from '@/components/sidebar/Sidebar';
import FlowWorkspace from '@/components/FlowWorkspace';
import DAppsPanel from '@/components/DAppsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('flowchart');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-flow-bg text-white">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">AI-Blockchain Flowchart</h1>
            <p className="text-sm text-gray-400">Design and visualize your workflow</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full h-8 w-8"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <div className="w-8 h-8 rounded-full bg-flow-node-ai flex items-center justify-center">
              <span className="text-xs font-bold">3</span>
            </div>
            <Separator orientation="vertical" className="h-8 bg-gray-700" />
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-hidden p-6">
          <Tabs defaultValue="flowchart" className="h-full flex flex-col" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-flow-card/40">
                <TabsTrigger value="flowchart" className="data-[state=active]:bg-flow-node-blockchain data-[state=active]:text-white">
                  Flowchart
                </TabsTrigger>
                <TabsTrigger value="ai-agents" className="data-[state=active]:bg-flow-node-ai data-[state=active]:text-white">
                  AI Agents
                </TabsTrigger>
                <TabsTrigger value="blockchain" className="data-[state=active]:bg-flow-node-blockchain data-[state=active]:text-white">
                  Blockchain
                </TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Templates
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  History
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-gray-400">
                Last saved: 5 mins ago
              </div>
            </div>
            
            <TabsContent value="flowchart" className="flex-1 overflow-hidden mt-0">
              <div className="grid grid-cols-4 gap-4 h-full">
                <div className="col-span-3 bg-flow-card/20 rounded-lg border border-gray-700 overflow-hidden">
                  <FlowWorkspace />
                </div>
                
                <DAppsPanel />
              </div>
            </TabsContent>
            
            <TabsContent value="ai-agents" className="h-full overflow-auto mt-0">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-flow-card/40 border-gray-700">
                  <CardHeader>
                    <CardTitle>AI Agents</CardTitle>
                    <CardDescription className="text-gray-400">Manage and configure AI agents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Natural Language Processor", description: "Process and understand text input" },
                          { name: "Data Analyzer", description: "Analyze blockchain data patterns" },
                          { name: "Smart Contract Generator", description: "Generate smart contract code" },
                          { name: "Transaction Validator", description: "Validate transaction integrity" }
                        ].map((agent, index) => (
                          <Card key={index} className="bg-flow-card/60 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center">
                                <svg className="mr-2 h-5 w-5 text-flow-node-ai" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-.76 3.54-1.89 4.48A4 4 0 0 1 12 14a4 4 0 0 1-2.11-3.52C8.76 9.54 8 7.95 8 6a4 4 0 0 1 4-4Z"></path>
                                  <path d="M10 9a6 6 0 0 0-6 6c0 1.86.5 3.48 1.38 4.82a22.5 22.5 0 0 0 5.31 5.18c.4.28.8.51 1.19.69a1.9 1.9 0 0 0 2.24 0c.39-.18.79-.41 1.19-.69a22.5 22.5 0 0 0 5.31-5.18A10.43 10.43 0 0 0 22 15a6 6 0 0 0-6-6"></path>
                                </svg>
                                {agent.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-400">{agent.description}</p>
                              <div className="mt-4">
                                <Button variant="outline" size="sm" className="bg-flow-card/40 border-gray-700 text-white">
                                  Configure
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="blockchain" className="h-full overflow-auto mt-0">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-flow-card/40 border-gray-700">
                  <CardHeader>
                    <CardTitle>Blockchain Networks</CardTitle>
                    <CardDescription className="text-gray-400">Manage blockchain connections and assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { name: "Ethereum", icon: "🔷", status: "Connected" },
                          { name: "Polygon", icon: "🟣", status: "Connected" },
                          { name: "Arbitrum", icon: "🔵", status: "Not Connected" },
                          { name: "Optimism", icon: "🔴", status: "Not Connected" },
                          { name: "Solana", icon: "🟡", status: "Not Connected" },
                          { name: "Avalanche", icon: "🔺", status: "Not Connected" }
                        ].map((network, index) => (
                          <Card key={index} className="bg-flow-card/60 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center">
                                <span className="mr-2">{network.icon}</span>
                                {network.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className={`text-sm ${network.status === "Connected" ? "text-green-500" : "text-gray-400"}`}>
                                  {network.status}
                                </span>
                                <Button variant="outline" size="sm" className="bg-flow-card/40 border-gray-700 text-white">
                                  {network.status === "Connected" ? "Disconnect" : "Connect"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="h-full overflow-auto mt-0">
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-flow-card/40 border-gray-700">
                  <CardHeader>
                    <CardTitle>Workflow Templates</CardTitle>
                    <CardDescription className="text-gray-400">Pre-built workflows for common scenarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Token Swap", description: "Connect to DEX and swap tokens automatically" },
                          { name: "NFT Minting", description: "Generate and mint NFTs with metadata" },
                          { name: "DAO Voting", description: "Create and process DAO governance votes" },
                          { name: "DeFi Yield Farming", description: "Automate yield farming across protocols" }
                        ].map((template, index) => (
                          <Card key={index} className="bg-flow-card/60 border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{template.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-400">{template.description}</p>
                              <div className="mt-4">
                                <Button className="bg-flow-node-blockchain text-white hover:bg-flow-node-blockchain/90 mr-2" size="sm">
                                  Use Template
                                </Button>
                                <Button variant="outline" size="sm" className="bg-flow-card/40 border-gray-700 text-white">
                                  Preview
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="h-full overflow-auto mt-0">
              <Card className="bg-flow-card/40 border-gray-700">
                <CardHeader>
                  <CardTitle>Workflow History</CardTitle>
                  <CardDescription className="text-gray-400">Recent workflow executions and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Token Swap Workflow", date: "2023-06-15 14:30", status: "Completed", result: "Success" },
                      { name: "NFT Generation", date: "2023-06-14 09:45", status: "Completed", result: "Success" },
                      { name: "Data Analysis", date: "2023-06-13 16:20", status: "Completed", result: "Warning" },
                      { name: "Smart Contract Deployment", date: "2023-06-12 11:10", status: "Failed", result: "Error" }
                    ].map((history, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-flow-card/60 rounded-md border border-gray-700">
                        <div>
                          <h3 className="font-medium">{history.name}</h3>
                          <p className="text-sm text-gray-400">{history.date}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded text-xs mr-2 ${
                            history.result === "Success" ? "bg-green-900/30 text-green-500" :
                            history.result === "Warning" ? "bg-yellow-900/30 text-yellow-500" :
                            "bg-red-900/30 text-red-500"
                          }`}>
                            {history.result}
                          </span>
                          <Button variant="outline" size="sm" className="bg-flow-card/40 border-gray-700 text-white">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="h-full overflow-auto mt-0">
              <Card className="bg-flow-card/40 border-gray-700">
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription className="text-gray-400">Configure your workflow settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Theme</h3>
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant={theme === 'light' ? "default" : "outline"} 
                          className={theme === 'light' ? "bg-flow-node-blockchain text-white" : "bg-flow-card/40 border-gray-700 text-white"}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="mr-2 h-4 w-4" />
                          Light Mode
                        </Button>
                        <Button 
                          variant={theme === 'dark' ? "default" : "outline"} 
                          className={theme === 'dark' ? "bg-flow-node-blockchain text-white" : "bg-flow-card/40 border-gray-700 text-white"}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="mr-2 h-4 w-4" />
                          Dark Mode
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="font-medium mb-2">Wallet Connection</h3>
                      <Button className="bg-flow-node-blockchain text-white hover:bg-flow-node-blockchain/90">
                        Connect Wallet
                      </Button>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="font-medium mb-2">AI Agent Configuration</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Enable AI suggestions</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Real-time analysis</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Share anonymous data to improve AI</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="font-medium mb-2">Network Settings</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Auto-detect network</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Testnet mode</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
