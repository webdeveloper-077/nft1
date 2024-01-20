"use client"

import Web3Provider from './web3-provider'


const Providers = ({children}) => {
  return (
    <Web3Provider>{children}</Web3Provider>
  )
}

export default Providers