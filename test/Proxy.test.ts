import {setup} from './utils';
import {expect} from "chai";
import {ethers} from "hardhat";



describe('Proxy', () => {

    it("check proxy", async () => {
        const {owner} = await setup();
        
        const implementation = await owner.Proxy.implementation();
        expect(implementation).to.eq(owner.V1.address);
        
        const calldata = owner.V1.interface.encodeFunctionData("inc");
        
        const signer = await ethers.getSigner(owner.address);
        const res = await signer.sendTransaction({
            to: owner.Proxy.address,
            value: 0,
            data: ethers.utils.hexlify(calldata)
        });

        // console.log(res);
        // TODO: how to view through proxy?

    });


});

