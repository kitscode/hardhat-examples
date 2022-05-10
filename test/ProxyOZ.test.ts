import {setup} from './utils';
import {expect} from "chai";

describe('ProxyOZ', () => {

    it("check proxy", async () => {

        const {owner} = await setup();
        expect(await owner.LogicContractUUPS.index()).to.eq(0);
        expect(await owner.LogicContractUUPS_Proxy.index()).to.eq(10);
    });

});

