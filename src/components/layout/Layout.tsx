import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const handleWalletConnect = () => {
    console.log('Wallet connection requested');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onWalletConnect={handleWalletConnect} />
      <Sidebar />
      
      <div className="lg:pl-64">
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};