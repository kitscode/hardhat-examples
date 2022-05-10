import {DeployFunction} from 'hardhat-deploy/types';
import {ethers, upgrades} from "hardhat";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {save} = deployments;

    console.log("live:", network.live);

    const LogicContractUUPS = await ethers.getContractFactory("LogicContractUUPS");
    const LogicContractUUPS_Proxy = await upgrades.deployProxy(LogicContractUUPS, [10], {kind: "uups"});
    console.log("proxy:", LogicContractUUPS_Proxy.address);

    const implementation = await upgrades.erc1967.getImplementationAddress(LogicContractUUPS_Proxy.address);
    console.log("implementation:", implementation);

    const artifact = await deployments.getExtendedArtifact("LogicContractUUPS");
    let proxyDeployments = {
        address: LogicContractUUPS_Proxy.address,
        ...artifact
    };
    let implDeployments = {
        address: implementation,
        ...artifact
    };
    await save("LogicContractUUPS_Proxy", proxyDeployments);
    await save("LogicContractUUPS", implDeployments);

};
export default func;
func.tags = ['ProxyOZ'];
