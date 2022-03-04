import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();

    await deploy('Proxy', {
        from: owner,
        args: [],
        log: true,
    });

    const V1 = await deploy('V1', {
        from: owner,
        args: [],
        log: true,
    });

    await deploy('V2', {
        from: owner,
        args: [],
        log: true,
    });

    await execute("Proxy", {from: owner}, "setImplementation", V1.address);

    await deploy('V3', {
        from: owner,
        proxy: true
    });
    
};
export default func;
func.tags = ['Proxy'];
