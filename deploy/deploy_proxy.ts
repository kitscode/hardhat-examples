import {DeployFunction} from 'hardhat-deploy/types';
import {ethers, upgrades} from "hardhat";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {save} = deployments;

    const contractFactory = await ethers.getContractFactory("ContractUUPS");
    const ContractUUPS = await upgrades.deployProxy(contractFactory, [10], {kind: "uups"});
    console.log("proxy:", ContractUUPS.address);

    const implementation = await upgrades.erc1967.getImplementationAddress(ContractUUPS.address);
    console.log("implementation:", implementation);

    const artifact = await deployments.getExtendedArtifact("ContractUUPS");
    let proxyDeployments = {
        address: ContractUUPS.address,
        ...artifact
    };
    let implDeployments = {
        address: implementation,
        ...artifact
    };
    await save("ContractUUPS", proxyDeployments);
    await save("ContractUUPS_Impl", implDeployments);

};
export default func;
func.tags = ['ProxyOZ'];
