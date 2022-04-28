import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, get} = deployments;
    const {owner} = await getNamedAccounts();

    const MyToken = await get("MyToken");

    await deploy('SendEther', {
        from: owner,
        args: [],
        log: true
    });

    await deploy('Seller', {
        from: owner,
        args: [MyToken.address],
        log: true
    });
    
};
export default func;
func.tags = ['Send'];
