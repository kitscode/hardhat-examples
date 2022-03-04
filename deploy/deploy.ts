import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from "ethers/lib/utils";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy} = deployments;
    const {owner} = await getNamedAccounts();
    
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

    await deploy('TestERC', {
        from: owner,
        args: [],
        log: true
    });

    await deploy('ReceiveEther', {
        from: owner,
        args: [],
        log: true
    });

    await deploy('SendEther', {
        from: owner,
        args: [],
        log: true
    });
    
};
export default func;
func.tags = ['Tests'];
