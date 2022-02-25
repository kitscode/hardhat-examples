import {TempTest} from "../typechain";
import {parseEther} from "ethers/lib/utils";
import {expect} from "chai";
import {setup} from './utils';

describe('TempTest', () => {

    it("check 365 day's second", async function () {
        const {owner} = await setup();
        expect(await owner.TempTest.getYearSecond()).to.eq(31536000);
    });

    it("check random number", async function () {
        const {owner} = await setup();
        // console.log("random number:", (await owner.TempTest.randomNum(parseEther("100"), parseEther("500"))).toString());
        expect(await owner.TempTest.randomNum(0, 100)).to.lt(100);
    });

    it("check multi big number", async function () {
        const {owner} = await setup();
        // console.log("big number:", (await owner.TempTest.multiBigNumber()).toString());

        let a: number = 1;
        let b: string = '2';
        // console.log("ts test:", a + b);
    });


    it("check concat", async function () {
        const {owner} = await setup();

        let r = await owner.TempTest.concatString("hello, here is: ", "jack");
        expect(r[0]).to.eq("hello, here is: jack");
        expect(r[1]).to.eq("hello, here is: jack");
    });

    it("check address", async function () {
        const {owner, MyToken} = await setup();

        await owner.TempTest.setToken(MyToken.address);
        let res = await owner.TempTest.getToken();
        // console.log("address result:", res);
    });

    it("check amount", async function () {
        const {owner} = await setup();
        await owner.TempTest.amountDivide();
    });

    it("test type", async function () {
        const {owner} = await setup();
        const res = await owner.TempTest.testType();
        // console.log("type bytecode: ", res);
        // console.log("length: ", res.substring(0, 64))
    });

    it("test max", async function () {
        const {owner} = await setup();
        let r = await owner.TempTest.testUintMax();
        // console.log("max0:", r[0]);
        // console.log("max1:", r[1]);
    });
});

