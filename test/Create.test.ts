import {setup} from './utils';
import {Create} from "../typechain";

describe('Create', () => {

    it("check createDSalted", async function () {
        const {owner} = await setup();
        await owner.Create.createDSalted("0x58a168e0ad6FB41Bee9e89E9d1762fEf50D6637C", 1);
    });

    it("check createNew", async function () {
        const {owner} = await setup();
        await owner.Create.createNew(1);
    });
});

