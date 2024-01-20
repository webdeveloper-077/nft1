require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MANTLE_TESTNET_RPC_URL = process.env.MANTLE_TESTNET_RPC_URL;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17"
      }
    ]
  },

  defaultNetwork: "hardhat",
  networks: {
    goerli:{
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
      //gasPrice: 000000000000000001
    },

    "mantle-testnet": {
      url: MANTLE_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5001,
      blockConfirmations: 1
    },

    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 1,
    }
  },

  namedAccounts: {
    deployer: {
      default: 0,
      "mantle-testnet": 0,
      goerli: 0
    },
  },
};
