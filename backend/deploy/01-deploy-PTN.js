
const {ethers, network} = require("hardhat");

module.exports = async ({deployments, getNamedAccounts}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();

  log("Deploying....");
  arguments = [];
  const ptn= await deploy("PTN", {
    from: deployer,
    args: arguments,
    logs: true,
    waitConfirmations: network.config.blockConfirmations || 1
  })

  log("Deployed!");

  log(ptn.address);

}