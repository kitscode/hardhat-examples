import {deployments, ethers, getNamedAccounts} from "hardhat";
import {Contract} from 'ethers';
import {Create, MyToken, ReceiveEther, SendEther, TempTest, TestERC, TokenBig} from "../../typechain";

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
        TokenBig: await ethers.getContract<TokenBig>('TokenBig'),
        TestERC: await ethers.getContract<TestERC>('TestERC'),
        ReceiveEther: await ethers.getContract<ReceiveEther>('ReceiveEther'),
        SendEther: await ethers.getContract<SendEther>('SendEther'),
    };
    const {owner, user1} = await getNamedAccounts();
    return {
        ...contracts,
        owner: await setupUser(owner, contracts),
        user1: await setupUser(user1, contracts)
    };
});
