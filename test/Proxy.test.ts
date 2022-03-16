import {setup} from './utils';
import {expect} from "chai";
import {ethers} from "hardhat";
import {V1} from "../typechain";


describe('Proxy', () => {

    it("check proxy", async () => {
        const {owner} = await setup();

        const implementation = await owner.Proxy.implementation();
        expect(implementation).to.eq(owner.V1.address);

        const calldata = owner.V1.interface.encodeFunctionData("inc");

        const v1Proxy = await ethers.getContractAt<V1>("V1", owner.Proxy.address);
        expect(await v1Proxy.x()).to.eq(0);
        expect(await v1Proxy.implementation()).to.eq(implementation);
        
        const signer = await ethers.getSigner(owner.address);
        await signer.sendTransaction({
            to: owner.Proxy.address,
            value: 0,
            data: ethers.utils.hexlify(calldata)
        });
        expect(await v1Proxy.x()).to.eq(1);
        
    });


});

