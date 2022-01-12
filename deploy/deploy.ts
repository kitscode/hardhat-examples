import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy} = deployments;
    const {owner} = await getNamedAccounts();

    console.log('chainId:', getChainId());

    await deploy('TempTest', {
        from: owner,
        args: [],
        log: true,
    });

    await deploy('MyToken', {
        from: owner,
        args: [owner],
        log: true
    });

    await deploy('Create', {
        from: owner,
        args: [],
        log: true
    });
};
export default func;
func.tags = ['TempTest'];
