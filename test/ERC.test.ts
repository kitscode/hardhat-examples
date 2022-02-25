import {setup} from './utils';
import {expect} from "chai";

describe('165', () => {

    it("check id", async function () {
        const {owner} = await setup();

        const selectors = await owner.TestERC.selectors();
        // console.log("selectors:", selectors);
        
        const selector = await owner.TestERC.calculateSelector();
        const interfaceId = await owner.TestERC.interfaceId();
        expect(selector).to.eq(interfaceId);
    });
    
    it("check supportsInterface", async function () {
        const {owner} = await setup();
        
        const interfaceId = await owner.TestERC.interfaceId();
        expect (await owner.TestERC.supportsInterface(interfaceId)).to.eq(true);
        
        const id = "0x01ffc9a7";
        expect(await owner.TestERC.selector()).to.eq(id);
        expect(await owner.TestERC.SELECTOR165()).to.eq(id);
        
    });
    
});

