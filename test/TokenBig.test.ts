import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {setupUser} from './utils';
import {MyToken, TokenBig} from "../typechain";
import {parseEther} from 'ethers/lib/utils';
import {expect} from './utils/chai-setup';

const setup = deployments.createFixture(async () => {
    await deployments.fixture();
    const contracts = {
        TokenBig: await ethers.getContract<TokenBig>('TokenBig')
    };
    const {owner, user1} = await getNamedAccounts();
    return {
        ...contracts, owner: await setupUser(owner, contracts), user1: await setupUser(user1, contracts)
    };
});

describe('TokenBig', () => {

    it("check transfer", async () => {
        const {owner, user1, TokenBig} = await setup();

        const amount = parseEther("1000");
        await owner.TokenBig.transfer(user1.address, amount);
        expect(await TokenBig.balanceOf(user1.address)).to.eq(amount);
    });

});

