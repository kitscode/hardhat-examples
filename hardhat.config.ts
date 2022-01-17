import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '@typechain/hardhat';
import {HardhatUserConfig} from 'hardhat/types';
import "solidity-coverage";
import '@openzeppelin/hardhat-upgrades';


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.4"
            },
            {
                version: "0.6.6"
            }
        ]
    },
    namedAccounts: {
        owner: 0,
        user1: 1,
    }
}
export default config;
