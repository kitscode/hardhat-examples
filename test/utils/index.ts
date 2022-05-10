import {deployments, ethers, getNamedAccounts, network, upgrades} from "hardhat";
import {Contract} from 'ethers';
import {
    Create, FeedRegistryConsumer,
    MyToken, Proxy,
    ReceiveEther,
    SendEther,
    TempTest,
    TestERC, TestGovernor,
    TimelockController,
    TokenVote, V1, V2, Seller, GovernorComp, LogicContract, LogicContractUUPS
} from "../../typechain";

export async function setupUser<T extends { [contractName: string]: Contract }>(
    address: string,
    contracts: T
): Promise<{ address: string } & T> {
    const user: any = {address};
    for (const key of Object.keys(contracts)) {
        user[key] = contracts[key].connect(await ethers.getSigner(address));
    }
    return user as { address: string } & T;
}

export const setup = deployments.createFixture(async () => {
    await deployments.fixture();

    const contracts = {
        Create: await ethers.getContract<Create>('Create'),
        MyToken: await ethers.getContract<MyToken>('MyToken'),
        TempTest: await ethers.getContract<TempTest>('TempTest'),
        TestERC: await ethers.getContract<TestERC>('TestERC'),
        ReceiveEther: await ethers.getContract<ReceiveEther>('ReceiveEther'),
        SendEther: await ethers.getContract<SendEther>('SendEther'),
        TokenVote: await ethers.getContract<TokenVote>('TokenVote'),
        TimelockController: await ethers.getContract<TimelockController>('TimelockController'),
        TestGovernor: await ethers.getContract<TestGovernor>('TestGovernor'),
        GovernorComp: await ethers.getContract<GovernorComp>('GovernorComp'),
        Proxy: await ethers.getContract<Proxy>('Proxy'),
        V1: await ethers.getContract<V1>('V1'),
        V2: await ethers.getContract<V2>('V2'),
        FeedRegistryConsumer: await ethers.getContract<FeedRegistryConsumer>('FeedRegistryConsumer'),
        Seller: await ethers.getContract<Seller>('Seller'),
        LogicContractUUPS: await ethers.getContract<LogicContractUUPS>('LogicContractUUPS'),
        LogicContractUUPS_Proxy: await ethers.getContract<LogicContractUUPS>('LogicContractUUPS_Proxy'),
    };
    const {owner, user1, user2} = await getNamedAccounts();
    return {
        ...contracts,
        owner: await setupUser(owner, contracts),
        user1: await setupUser(user1, contracts),
        user2: await setupUser(user2, contracts)
    };
});

export const mineBlocks = async (blockNumber: number) => {
    while (blockNumber > 0) {
        blockNumber--;
        await network.provider.send("evm_mine");
    }
}

export const forwardTime = async (seconds: number) => {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
}
