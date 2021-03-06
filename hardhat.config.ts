import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '@typechain/hardhat';
import {HardhatUserConfig} from 'hardhat/types';
import "solidity-coverage";
import '@openzeppelin/hardhat-upgrades';

const secret = require("./secret.json");

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
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100000
                    }
                }
            }
        ]
    },
    namedAccounts: {
        owner: 0,
        user1: 1,
        user2: 2,
        user10: 10
    },
    networks: {
        bsc_test: {
            url: secret.url_bsc_testnet,
            accounts: {
                mnemonic: secret.mnemonic,
                count: 5
            },
            timeout: 120000
        },
        hardhat: {
            forking: {
                url: secret.forking_kovan,
                blockNumber: 30432230,
                enabled: true
            }
        }
    },
    verify: {
        etherscan: {
            apiKey: secret.apiKey
        }
    }
}
export default config;
