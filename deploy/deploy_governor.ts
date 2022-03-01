import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy} = deployments;
    const {owner} = await getNamedAccounts();

    const TokenVote = await deploy('TokenVote', {
        from: owner,
        args: [],
        log: true,
    });

    let minDelay = 60 * 10;
    let users = [owner];
    const TimelockController = await deploy('TimelockController', {
        from: owner,
        args: [minDelay, users, users],
        log: true,
    });

    await deploy('TestGovernor', {
        from: owner,
        args: [TokenVote.address, TimelockController.address],
        log: true,
    });

};
export default func;
// func.tags = [''];
