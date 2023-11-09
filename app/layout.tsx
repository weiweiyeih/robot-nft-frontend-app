import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThirdwebProvider } from "./components/ThirdwebProvider";
import { ThemeProvider } from "./components/theme-provider"
import { Sepolia } from '@thirdweb-dev/chains';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Robot NFT',
  description: 'Updatable NFT metadata Dapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max-w-screen-xl flex flex-col mx-auto py-5 px-8">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThirdwebProvider
            activeChain={Sepolia}
            clientId={process.env.THIRDWEB_CLIENT_ID}>
            {children}
            <Toaster />
          </ThirdwebProvider>
        </ThemeProvider>
      </body>

    </html>
  )
}
