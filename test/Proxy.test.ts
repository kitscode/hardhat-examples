import {setup} from './utils';
import {expect} from "chai";

describe('ProxyOZ', () => {

    it("check proxy", async () => {

        const {owner} = await setup();
        expect(await owner.ContractUUPS.index()).to.eq(10);
    });

});

