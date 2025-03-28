
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col bg-flow-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="mb-8 relative w-24 h-24 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain opacity-40"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain opacity-70"></div>
            <div className="absolute inset-6 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="22" x2="2" y1="12" y2="12"></line>
                <polyline points="5.45 5.11 2 12 5.45 18.89"></polyline>
                <polyline points="18.55 5.11 22 12 18.55 18.89"></polyline>
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            FlowChain AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Seamlessly integrate blockchain technology with AI agents through intuitive flowcharts
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 z-10"
        >
          <Button 
            onClick={handleNavigateToLogin}
            className="bg-flow-node-blockchain hover:bg-opacity-80 text-white py-2 px-6 rounded-md transition"
          >
            Login
          </Button>
          <Button 
            onClick={handleNavigateToSignup}
            className="bg-flow-node-ai hover:bg-opacity-80 text-white py-2 px-6 rounded-md transition"
          >
            Sign Up
          </Button>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-flow-node-ai animate-float opacity-20"></div>
          <div className="absolute top-3/4 left-1/2 w-24 h-24 rounded-full bg-flow-node-blockchain animate-float opacity-20" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-48 h-48 rounded-full bg-flow-accent animate-float opacity-10" style={{animationDelay: '2s'}}></div>
          
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M100,250 Q150,100 300,150 T500,250 T700,200" 
              fill="none" 
              stroke="rgba(139, 92, 246, 0.2)" 
              strokeWidth="2"
              className="flowing-path"
            />
            <path 
              d="M200,450 Q250,300 400,350 T600,250 T800,350" 
              fill="none" 
              stroke="rgba(6, 182, 212, 0.2)" 
              strokeWidth="2"
              className="flowing-path"
              style={{animationDelay: '2s'}}
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-flow-card bg-opacity-30 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10 text-center text-white"
          >
            Key Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-flow-card bg-opacity-50 border border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-flow-node-blockchain bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-node-blockchain">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="m8.5 14 7-4"></path>
                  <path d="m8.5 10 7 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Blockchain Integration</h3>
              <p className="text-gray-300">Connect and visualize multiple blockchains through an intuitive flowchart interface.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-flow-card bg-opacity-50 border border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-flow-node-ai bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-node-ai">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-.76 3.54-1.89 4.48A4 4 0 0 1 12 14a4 4 0 0 1-2.11-3.52C8.76 9.54 8 7.95 8 6a4 4 0 0 1 4-4Z"></path>
                  <path d="M10 9a6 6 0 0 0-6 6c0 1.86.5 3.48 1.38 4.82a22.5 22.5 0 0 0 5.31 5.18c.4.28.8.51 1.19.69a1.9 1.9 0 0 0 2.24 0c.39-.18.79-.41 1.19-.69a22.5 22.5 0 0 0 5.31-5.18A10.43 10.43 0 0 0 22 15a6 6 0 0 0-6-6"></path>
                  <path d="M12 8a2 2 0 0 1 0 4 2 2 0 0 1 0-4Z"></path>
                  <path d="M13 14h-2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Agents</h3>
              <p className="text-gray-300">Deploy intelligent agents that automate complex blockchain operations and workflows.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-flow-card bg-opacity-50 border border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-flow-accent bg-opacity-20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-flow-accent">
                  <path d="M12 5v14"></path>
                  <path d="M18 13a3 3 0 1 0 0-2"></path>
                  <path d="M6 13a3 3 0 1 1 0-2"></path>
                  <path d="M15 3a3 3 0 1 1-3 3"></path>
                  <path d="M9 18a3 3 0 1 0 3 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Visual Flow Building</h3>
              <p className="text-gray-300">Create and customize complex workflows without writing a single line of code.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
