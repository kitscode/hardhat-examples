import {setup} from './utils';
import {expect} from "chai";
import {ethers, network} from "hardhat";
import {parseEther} from "ethers/lib/utils";
import {ERC20} from "../typechain";


describe('TestGovernor', () => {

    const transferAmount = parseEther("1000");

    it("check deploy", async () => {
        const {owner} = await setup();

        expect(await owner.TestGovernor.token()).to.eq(owner.TokenVote.address);
        expect(await owner.TestGovernor.timelock()).to.eq(owner.TimelockController.address);
    });


    it("check proposal", async () => {
        const {owner, user1} = await setup();

        const myToken = await ethers.getContractAt<ERC20>("ERC20", owner.MyToken.address);
        const calldata = myToken.interface.encodeFunctionData("transfer", [user1.address, transferAmount])

        const res = await owner.TestGovernor.propose([myToken.address], [0], [calldata], "Proposal #1: Give grant to other");
        const receipt = await res.wait();

        // event ProposalCreated modified
        const proposalId = receipt.logs[0].topics[1];
        const state = await owner.TestGovernor.state(proposalId);
        // console.log("state:", state);
        expect(state).to.eq(0);

        const proposalSnapshot = await owner.TestGovernor.proposalSnapshot(proposalId);
        // console.log("snapshot:", proposalSnapshot.toString());
        const proposalDeadline = await owner.TestGovernor.proposalDeadline(proposalId);
        // console.log("proposalDeadline:", proposalDeadline.toString());

        await network.provider.send("evm_mine");
        await owner.TestGovernor.castVote(proposalId, 1);
    });

});

