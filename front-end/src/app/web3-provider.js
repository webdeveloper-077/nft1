"use client";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const chains = [sepolia]
const projectId = "2790926731e750e785299f0ac70cc1bb"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function Web3Provider({children}) {
    return (
      <>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
    )
  }
