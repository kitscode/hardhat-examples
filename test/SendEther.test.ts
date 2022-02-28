import {setup} from "./utils";
import {ethers} from "hardhat";
import {parseEther} from "ethers/lib/utils";
import {expect} from "chai";

describe('SendEther', () => {

    const sendValue = parseEther("1.8");

    it("check transfer to receiver", async () => {
        const {owner, ReceiveEther} = await setup();

        const signer = await ethers.getSigner(owner.address);

        await signer.sendTransaction({
            to: ReceiveEther.address,
            value: sendValue,
            data: ethers.utils.hexlify(1024)
        });

        expect(await ReceiveEther.provider.getBalance(ReceiveEther.address)).to.eq(sendValue);
    });

    it("check sendViaTransfer", async () => {
        const {owner, ReceiveEther} = await setup();

        await owner.SendEther.sendViaTransfer(ReceiveEther.address, {value: sendValue});
        expect(await ReceiveEther.getBalance()).to.eq(sendValue);
    });

    it("check sendViaSend", async () => {
        const {owner, ReceiveEther} = await setup();

        await owner.SendEther.sendViaSend(ReceiveEther.address, {value: sendValue});
        expect(await ReceiveEther.getBalance()).to.eq(sendValue);
    });

    it("check sendViaCall", async () => {
        const {owner, ReceiveEther} = await setup();

        await owner.SendEther.sendViaCall(ReceiveEther.address, {value: sendValue});
        expect(await ReceiveEther.getBalance()).to.eq(sendValue);
    });
});

