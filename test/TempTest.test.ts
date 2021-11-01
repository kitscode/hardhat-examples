import {ethers, deployments, getNamedAccounts} from 'hardhat';
import {expect} from './utils/chai-setup';
import {setupUser} from './utils';
import {TempTest} from "../typechain";


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
        expect(await owner.TempTest.randomNum(0, 100)).to.gt(0).lt(100);
    });
});

