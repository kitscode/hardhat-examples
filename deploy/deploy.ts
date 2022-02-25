import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from "ethers/lib/utils";
import {ethers} from "hardhat";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy} = deployments;
    const {owner} = await getNamedAccounts();

    const config: any = network.config;
    let isForking = config.forking.enabled;
    if (isForking) {
        //const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // dai - eth
        const tokenAddress = "0x673Da443da2f6aE7c5c660A9F0D3DD24d1643D36"; // rainbow - bsc
        const token = await ethers.getContractAt("ERC20", tokenAddress);
        const balance = await token.balanceOf("0x00345EF3d49c570eF89d67666ef3380cC5DF843d");
        console.log("balance: ", balance.toString());
    }
    
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

    await deploy('TestERC', {
        from: owner,
        args: [],
        log: true
    });
};
export default func;
// func.tags = [''];
