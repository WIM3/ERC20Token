
import { ethers, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const erc20token = await deploy("ERC20Token", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 10,
  });

  console.log("ERC20Token deployed at: ", erc20token.address);

  const erc20tokenDeployed = await ethers.getContractAt(
    "ERC20Token",
    erc20token.address
  );
  await delay(5000);
  await run("verify:verify", {
    address: erc20tokenDeployed.address,
    constructorArguments: [],
    contract: "contracts/ERC20Token.sol:ERC20Token",
  });
  
};
deploy.tags = ["ERC20Token"];
export default deploy;