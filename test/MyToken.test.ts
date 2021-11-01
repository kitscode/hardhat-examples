import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {setupUser} from './utils';
import {MyToken} from "../typechain";
import {parseEther} from 'ethers/lib/utils';
import {expect} from './utils/chai-setup';

const setup = deployments.createFixture(async () => {
    await deployments.fixture();
    const contracts = {
        MyToken: await ethers.getContract<MyToken>('MyToken')
    };
    const {owner, user1} = await getNamedAccounts();
    return {
        ...contracts, owner: await setupUser(owner, contracts), user1: await setupUser(user1, contracts)
    };
});

describe('TempTest', () => {

    it("check role identifier", async () => {
        const {owner} = await setup();
        console.log("identifier:", await owner.MyToken.MINTER_ROLE());
    });

    it("check mint role", async () => {
        const {owner, user1} = await setup();

        const mintAmount = parseEther("1000");
        await owner.MyToken.mint(owner.address, mintAmount);
        expect(await owner.MyToken.balanceOf(owner.address)).to.eq(mintAmount);

    });

});

