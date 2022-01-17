import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from "ethers/lib/utils";


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

    await deploy('TokenBig', {
        from: owner,
        args: [parseEther("10000")],
        log: true
    });
};
export default func;
func.tags = ['TempTest'];
