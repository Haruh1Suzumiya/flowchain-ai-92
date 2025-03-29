
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from 'next-themes';

const DAppsPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('DeFi');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="col-span-1 h-full overflow-hidden rounded-lg border border-input flex flex-col bg-background dark:bg-card shadow-sm">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-medium">Available dApps</h3>
        <div className="mt-3">
          <Input
            placeholder="Search dApps..."
            className="border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-800"
          />
        </div>
        <div className="mt-3 flex space-x-2 overflow-x-auto py-1">
          {['DeFi', 'NFT', 'DAO', 'Infra'].map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background dark:bg-gray-800 text-foreground dark:text-gray-200 border-gray-300 dark:border-gray-700'
              }
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {[
            { name: 'Uniswap', description: 'DEX Protocol', icon: '🦄' },
            { name: 'Aave', description: 'Lending Protocol', icon: '👻' },
            { name: 'Curve', description: 'Stable Swaps', icon: '🔄' },
            { name: 'Compound', description: 'Lending Markets', icon: '💰' },
            { name: 'MakerDAO', description: 'DAI Stablecoin', icon: '🏛️' },
            { name: 'Balancer', description: 'Liquidity Pools', icon: '⚖️' },
            { name: '1inch', description: 'DEX Aggregator', icon: '🦄' },
            { name: 'Synthetix', description: 'Synthetic Assets', icon: '💎' },
            { name: 'dYdX', description: 'Derivatives', icon: '📈' },
            { name: 'Yearn', description: 'Yield Farming', icon: '🧙‍♂️' },
          ].map((app, index) => (
            <div
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted 
                ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => {}}
            >
              <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-lg">
                {app.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground dark:text-white">{app.name}</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DAppsPanel;
