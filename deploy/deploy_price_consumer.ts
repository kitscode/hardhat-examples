import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    
    const {deploy} = deployments;
    const {owner} = await getNamedAccounts();

    await deploy('FeedRegistryConsumer', {
        from: owner,
        args: ["0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0"], // kovan
        log: true,
    });
    
};
export default func;
func.tags = ['FeedRegistryConsumer'];
