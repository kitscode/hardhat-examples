import {setup} from './utils';
import {expect} from "chai";
import {ethers} from "hardhat";
import {parseEther} from "ethers/lib/utils";


const GAS_LIMIT = ethers.utils.hexlify(30000);

describe('Seller', () => {

    it("check send", async () => {
        const {owner, user1} = await setup();

        // const signerOwner = await ethers.getSigner(owner.address);
        // await signerOwner.getGasPrice().then(async (gasPrice) => {
        //
        //     const tx = {
        //         from: owner.address,
        //         to: owner.Seller.address,
        //         value: parseEther("1"),
        //         data: "0x01",
        //         nonce: await signerOwner.getTransactionCount(),
        //         gasLimit: GAS_LIMIT,
        //         gasPrice: gasPrice,
        //     };
        //
        //     // let res = await signerOwner.sendTransaction(tx);
        //     // console.log("res:", res);
        // })

    //     await owner.MyToken.transfer(owner.Seller.address, parseEther("10000"));
    //     console.log("Seller balance:", (await owner.MyToken.balanceOf(owner.Seller.address)).toString())
    //
    //         const signer = await ethers.getSigner(user1.address);
    //         await signer.getGasPrice().then(async (gasPrice) => {
    //
    //             const tx = {
    //                 from: user1.address,
    //                 to: owner.Seller.address,
    //                 value: parseEther("1"),
    //                 nonce: await signer.getTransactionCount(),
    //                 gasLimit: GAS_LIMIT,
    //                 gasPrice: gasPrice,
    //             };
    //
    //             let res = await signer.sendTransaction(tx);
    //             console.log("res:", res);
    //         })
    //
    //     console.log("balance:", (await owner.MyToken.balanceOf(user1.address)).toString());
    });

});

