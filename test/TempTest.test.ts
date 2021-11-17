import {ethers, deployments, getNamedAccounts} from 'hardhat';
import {expect} from './utils/chai-setup';
import {setupUser} from './utils';
import {TempTest} from "../typechain";
import {parseEther} from "ethers/lib/utils";


const setup = deployments.createFixture(async () => {
    await deployments.fixture();
    const contracts = {
        TempTest: await ethers.getContract<TempTest>('TempTest')
    };
    const {owner} = await getNamedAccounts();
    return {
        ...contracts, owner: await setupUser(owner, contracts)
    };
});

describe('TempTest', () => {

    it("check 365 day's second", async function () {
        const {owner} = await setup();
        expect(await owner.TempTest.getYearSecond()).to.eq(31536000);
    });

    it("check random number", async function () {
        const {owner} = await setup();
        console.log("random number:", (await owner.TempTest.randomNum(parseEther("100"), parseEther("500"))).toString());
        expect(await owner.TempTest.randomNum(0, 100)).to.lt(100);
    });

    it("check multi big number", async function () {
        const {owner} = await setup();
        console.log("big number:", (await owner.TempTest.multiBigNumber()).toString());
    });
});

