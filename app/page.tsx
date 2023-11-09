"use client"

import { ModeToggle } from './components/ModeToggle'

import { useAddress } from '@thirdweb-dev/react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Home() {
  const address = useAddress();

  return (

    <main className="flex min-h-screen flex-col items-center space-y-3">
      <Header />
      {address ?
        <Dashboard /> :
        <h2 className='p-5 text-2xl md:text-4xl animate-bounce my-auto'>Connect your wallet to proceed! </h2>
      }
      <div className='flex flex-row space-x-2'>
        <Badge variant="outline">
          <Link href="https://sepolia.etherscan.io/address/0xEAd466EB17346BFbfDa8f50527CcE3baebc7B093" target='_blank'>Etherscan ↗</Link>
        </Badge>
        <Badge variant="outline">
          <Link href="https://github.com/weiweiyeih/robot-nft-frontend-app" target='_blank'>Github ↗</Link>
        </Badge>
      </div>
    </main>
  )
}
