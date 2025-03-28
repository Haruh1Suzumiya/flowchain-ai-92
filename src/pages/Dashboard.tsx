
import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import FlowWorkspace from '@/components/FlowWorkspace';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Dashboard = () => {
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
          <Tabs defaultValue="flowchart" className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-flow-card/40">
                <TabsTrigger value="flowchart" className="data-[state=active]:bg-flow-node-blockchain data-[state=active]:text-white">
                  Flowchart
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-flow-node-ai data-[state=active]:text-white">
                  Analytics
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
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-flow-card/40 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Node Properties</CardTitle>
                        <CardDescription className="text-gray-400">Configure selected node</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="text-gray-300">Select a node to view and edit its properties</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className="bg-flow-card/40 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Available Nodes</CardTitle>
                        <CardDescription className="text-gray-400">Drag & drop to canvas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="p-2 bg-flow-card/60 rounded cursor-move flex items-center">
                            <div className="w-6 h-6 rounded-full bg-flow-node-blockchain/30 flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-node-blockchain">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                <path d="M12 8v8"></path>
                              </svg>
                            </div>
                            <span className="text-sm">Blockchain Node</span>
                          </div>
                          
                          <div className="p-2 bg-flow-card/60 rounded cursor-move flex items-center">
                            <div className="w-6 h-6 rounded-full bg-flow-node-ai/30 flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-node-ai">
                                <path d="M12 2a4 4 0 0 1 4 4"></path>
                                <path d="M10 9a6 6 0 0 0-6 6"></path>
                              </svg>
                            </div>
                            <span className="text-sm">AI Agent Node</span>
                          </div>
                          
                          <div className="p-2 bg-flow-card/60 rounded cursor-move flex items-center">
                            <div className="w-6 h-6 rounded-full bg-flow-accent/30 flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-accent">
                                <path d="M12 5v14"></path>
                                <path d="M18 13a3 3 0 1 0 0-2"></path>
                              </svg>
                            </div>
                            <span className="text-sm">Process Node</span>
                          </div>
                        </div>
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
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="h-full overflow-auto mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-flow-card/40 border-gray-700">
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription className="text-gray-400">Network throughput and response times</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      Analytics chart placeholder
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-flow-card/40 border-gray-700">
                  <CardHeader>
                    <CardTitle>Resource Usage</CardTitle>
                    <CardDescription className="text-gray-400">CPU, memory, and network utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      Resource usage chart placeholder
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="h-full overflow-auto mt-0">
              <Card className="bg-flow-card/40 border-gray-700">
                <CardHeader>
                  <CardTitle>Workflow Settings</CardTitle>
                  <CardDescription className="text-gray-400">Configure your workflow properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">General Settings</h3>
                      <p className="text-sm text-gray-400">Configure your workflow's general settings</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Blockchain Connection</h3>
                      <p className="text-sm text-gray-400">Set up connection to blockchain networks</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">AI Agent Configuration</h3>
                      <p className="text-sm text-gray-400">Configure AI agent properties and capabilities</p>
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
