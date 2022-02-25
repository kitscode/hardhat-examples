import {MyToken} from "../typechain";
import {parseEther} from 'ethers/lib/utils';
import {setup} from './utils';
import {expect} from "chai";

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
        await owner.MyToken.grantRole(minterRole, user1.address);
    });

});

