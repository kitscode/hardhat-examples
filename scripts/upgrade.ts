import {deployments, ethers, upgrades} from 'hardhat';

async function main() {

    const {deploy, execute, save, get} = deployments;

    const proxy = await get('LogicContractUUPS_Proxy');

    const LogicContractUUPS = await ethers.getContractFactory('LogicContractUUPS');
    const impl = await upgrades.upgradeProxy(proxy, LogicContractUUPS);
    const implementation = await upgrades.erc1967.getImplementationAddress(impl.address);

    const artifact = await deployments.getExtendedArtifact("LogicContractUUPS");
    let proxyDeployments = {
        address: implementation,
        ...artifact
    };
    await save("LogicContractUUPS_V2", proxyDeployments);
    
    console.log("impl:", impl)

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
