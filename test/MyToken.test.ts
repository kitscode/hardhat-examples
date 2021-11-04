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

describe('MyToken', () => {
    
    it("check mint role", async () => {
        const {owner, user1} = await setup();

        const mintAmount = parseEther("1000");
        await owner.MyToken.mint(owner.address, mintAmount);
        expect(await owner.MyToken.balanceOf(owner.address)).to.eq(mintAmount);

        await expect(user1.MyToken.mint(user1.address, mintAmount)).to.be.reverted;
    });


    it("check grant role", async () => {
        const {owner, user1} = await setup();
        const minterRole = await owner.MyToken.MINTER_ROLE();
        console.log("identifier:", minterRole);

        await owner.MyToken.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", user1.address);
    });

});

