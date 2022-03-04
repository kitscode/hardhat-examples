import {DeployFunction} from 'hardhat-deploy/types';
import {ZERO_ADDRESS} from "../utils/constants";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, read, execute} = deployments;
    const {owner} = await getNamedAccounts();

    const TokenVote = await deploy('TokenVote', {
        from: owner,
        args: [],
        log: true,
    });

    const TimelockController = await deploy('TimelockController', {
        from: owner,
        args: [60, [owner], [ZERO_ADDRESS]],
        log: true,
    });

    const TestGovernor = await deploy('TestGovernor', {
        from: owner,
        args: [TokenVote.address, TimelockController.address],
        log: true,
    });

    const PROPOSER_ROLE = await read("TimelockController", "PROPOSER_ROLE");
    await execute("TimelockController", {from: owner}, "grantRole", PROPOSER_ROLE, TestGovernor.address);

};
export default func;
func.tags = ['Governor'];
