import {setup} from './utils';
import {TokenBig} from "../typechain";
import {parseEther} from 'ethers/lib/utils';
import {expect} from "chai";


describe('TokenBig', () => {

    it("check transfer", async () => {
        const {owner, user1, TokenBig} = await setup();

        const amount = parseEther("1000");
        await owner.TokenBig.transfer(user1.address, amount);
        expect(await TokenBig.balanceOf(user1.address)).to.eq(amount);
    });

});

