
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Your account has been created successfully"
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-flow-bg p-4">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-flow-node-ai animate-float opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 rounded-full bg-flow-node-blockchain animate-float opacity-20" style={{animationDelay: '1s'}}></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M200,150 Q350,50 500,150 T800,100" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.2)" 
            strokeWidth="2"
            className="flowing-path"
          />
          <path 
            d="M100,350 Q250,450 400,350 T700,450" 
            fill="none" 
            stroke="rgba(6, 182, 212, 0.2)" 
            strokeWidth="2"
            className="flowing-path"
            style={{animationDelay: '2s'}}
          />
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-flow-card bg-opacity-90 border-gray-700 backdrop-blur-sm text-white">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="22" x2="2" y1="12" y2="12"></line>
                  <polyline points="5.45 5.11 2 12 5.45 18.89"></polyline>
                  <polyline points="18.55 5.11 22 12 18.55 18.89"></polyline>
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-gray-400 text-center">Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-flow-bg text-white border-gray-600 focus:border-flow-node-ai"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-flow-bg text-white border-gray-600 focus:border-flow-node-ai"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-flow-bg text-white border-gray-600 focus:border-flow-node-ai"
                  />
                  <p className="text-xs text-gray-400">Password must be at least 8 characters</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="data-[state=checked]:bg-flow-node-ai data-[state=checked]:border-flow-node-ai"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-flow-node-ai to-flow-node-blockchain hover:opacity-90"
                  disabled={isLoading || !acceptTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : 'Sign Up'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-gray-400 text-center">
              Already have an account? 
              <Button variant="link" onClick={() => navigate('/login')} className="pl-1 text-flow-node-ai">
                Login
              </Button>
            </div>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full border-gray-700 text-gray-300 hover:bg-flow-bg">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
