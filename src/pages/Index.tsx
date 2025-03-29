
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight, Zap, Database, Code, CheckCircle, TerminalSquare, LineChart, Wallet } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-xl bg-flow-card/40 border border-gray-700/50 backdrop-blur-sm hover:bg-flow-card/60 transition-all duration-300 hover:shadow-lg"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-flow-node-blockchain/30 to-flow-node-ai/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white/90">{title}</h3>
      <p className="text-gray-300/80">{description}</p>
    </motion.div>
  );
};

const flowingPathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { duration: 2, ease: "easeInOut" },
      opacity: { duration: 0.5 }
    }
  }
};

const FlowingPath = () => {
  return (
    <svg className="absolute w-full h-full top-0 left-0 opacity-20 pointer-events-none" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <motion.path 
        d="M100,300 Q200,100 400,200 T700,300 T900,200" 
        fill="none" 
        stroke="url(#gradientBlue)" 
        strokeWidth="6"
        initial="hidden"
        animate="visible"
        variants={flowingPathVariants}
      />
      <motion.path 
        d="M150,700 Q250,500 450,600 T750,500 T950,600" 
        fill="none" 
        stroke="url(#gradientPurple)" 
        strokeWidth="6"
        initial="hidden"
        animate="visible"
        variants={flowingPathVariants}
      />
      <defs>
        <linearGradient id="gradientBlue" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.7)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
        </linearGradient>
        <linearGradient id="gradientPurple" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.7)" />
          <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const controlsHero = useAnimation();
  const controlsFeatures = useAnimation();
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isHeroInView) {
      controlsHero.start("visible");
    }
  }, [isHeroInView, controlsHero]);
  
  useEffect(() => {
    if (isFeaturesInView) {
      controlsFeatures.start("visible");
    }
  }, [isFeaturesInView, controlsFeatures]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleViewDemo = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-flow-bg text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="w-full backdrop-blur-sm bg-flow-card/20 border-b border-gray-700/50 z-10 fixed top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">FlowChain AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#workflows" className="text-gray-300 hover:text-white transition-colors">Workflows</a>
            <a href="#integrations" className="text-gray-300 hover:text-white transition-colors">Integrations</a>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button 
              className="bg-flow-node-blockchain hover:bg-flow-node-blockchain/90 text-white"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              className="text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" ref={heroRef}>
        <FlowingPath />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-flow-node-blockchain via-white to-flow-node-ai">
                  Connect AI & Blockchain 
                </span>
                <br />
                <span>With Visual Workflows</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Build, visualize, and deploy complex AI-blockchain integrations without writing code. 
                Connect DeFi protocols, automate trades, and leverage AI in a few clicks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-flow-node-blockchain hover:bg-flow-node-blockchain/90 text-white px-8 py-6 rounded-xl text-lg font-medium"
                  onClick={handleGetStarted}
                >
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg font-medium"
                  onClick={handleViewDemo}
                >
                  Try Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-flow-node-blockchain to-flow-node-ai rounded-lg opacity-50 blur-sm"></div>
              <div className="overflow-hidden rounded-lg border border-gray-700/50 relative">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1950&q=80" 
                  alt="FlowChain AI Dashboard" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-flow-bg via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful Features for DeFi & Web3
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Build, visualize, and deploy blockchain workflows with an intuitive visual interface
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wallet className="h-7 w-7 text-flow-node-blockchain" />}
              title="Cross-chain Operations"
              description="Seamlessly connect multiple blockchains and execute cross-chain transactions in a single workflow."
            />
            <FeatureCard 
              icon={<Zap className="h-7 w-7 text-flow-node-ai" />}
              title="AI-Powered Automation"
              description="Leverage machine learning to predict optimal execution times and automate complex trading strategies."
            />
            <FeatureCard 
              icon={<Database className="h-7 w-7 text-emerald-500" />}
              title="DeFi Protocol Integration"
              description="Connect to popular DeFi protocols like Aave, Uniswap, and Curve with pre-built templates."
            />
            <FeatureCard 
              icon={<Code className="h-7 w-7 text-cyan-400" />}
              title="No-Code Interface"
              description="Build complex blockchain workflows without writing a single line of code."
            />
            <FeatureCard 
              icon={<LineChart className="h-7 w-7 text-amber-400" />}
              title="Real-time Analytics"
              description="Monitor performance with detailed analytics and visualizations for your running workflows."
            />
            <FeatureCard 
              icon={<TerminalSquare className="h-7 w-7 text-rose-400" />}
              title="Smart Contract Templates"
              description="Deploy custom smart contracts with pre-built templates for common use cases."
            />
          </div>
        </div>
      </section>
      
      {/* Workflow Templates Section */}
      <section id="workflows" className="py-20 bg-flow-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready-to-Use Workflow Templates
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started quickly with pre-built templates for common blockchain operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Flash Loan Arbitrage",
                description: "Automatically execute flash loan arbitrage opportunities across DEXes when profitable price differences are detected.",
                steps: ["Aave Flash Loan", "Multi-DEX Swaps", "Repay Loan + Profit"]
              },
              {
                title: "Automated Yield Farming",
                description: "Optimize yields by automatically moving assets between protocols based on real-time APY comparisons.",
                steps: ["Protocol APY Analysis", "Smart Contract Interaction", "Gas-optimized Execution"]
              },
              {
                title: "NFT Trading Bot",
                description: "Monitor NFT marketplaces for undervalued assets and execute purchases based on AI-powered price prediction.",
                steps: ["Market Data Collection", "AI Price Analysis", "Automated Bidding"]
              },
              {
                title: "Cross-chain Bridge",
                description: "Move assets seamlessly between blockchain networks with automated validation and gas optimization.",
                steps: ["Multi-chain Connection", "Asset Wrapping", "Bridging Execution"]
              }
            ].map((template, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="p-6 rounded-xl bg-flow-card/40 border border-gray-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-white/90">{template.title}</h3>
                <p className="text-gray-300/80 mb-4">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  {template.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-flow-node-blockchain mr-2" />
                      <span className="text-gray-300/90 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 text-white hover:bg-white/10"
                  onClick={handleViewDemo}
                >
                  Use Template
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flow-node-ai opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-flow-node-blockchain opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-flow-card/40 to-flow-card/60 p-10 sm:p-16 rounded-2xl border border-gray-700/50 backdrop-blur-md"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Blockchain Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get started with FlowChain AI today and join thousands of developers building the future of Web3.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-flow-node-blockchain hover:bg-flow-node-blockchain/90 text-white px-8 py-6 rounded-xl text-lg font-medium"
                onClick={handleGetStarted}
              >
                Create Free Account
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg font-medium"
                onClick={handleViewDemo}
              >
                Explore Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-flow-card/40 border-t border-gray-700/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-white">FlowChain AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building the future of blockchain automation with visual workflows.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 FlowChain AI. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
