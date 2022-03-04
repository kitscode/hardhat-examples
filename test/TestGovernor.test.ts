import {forwardTime, mineBlocks, setup} from './utils';
import {expect} from "chai";
import {ethers} from "hardhat";
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
        const calldata = myToken.interface.encodeFunctionData("transfer", [user1.address, transferAmount]);

        const desc = "Proposal #1: Give grant to other";
        const tx = await owner.TestGovernor.propose([myToken.address], [0], [calldata], desc);
        const receipt = await tx.wait();

        // event ProposalCreated modified
        const proposalId = receipt.logs[0].topics[1];
        const state = await owner.TestGovernor.state(proposalId);
        expect(state).to.eq(0);

        // delegate
        await owner.TokenVote.delegate(owner.address);
        expect(await owner.TokenVote.getVotes(owner.address)).to.gt(0)

        await mineBlocks(1);
        await owner.TestGovernor.castVote(proposalId, 1);
        await mineBlocks(3); // Succeeded
        expect(await owner.TestGovernor.state(proposalId)).to.eq(4);

        const descHash = ethers.utils.id(desc);
        // queue
        await owner.TestGovernor.queue([myToken.address], [0], [calldata], descHash);
        
        // fund the timelock
        await owner.MyToken.transfer(owner.TimelockController.address, transferAmount);
        
        // execute
        await forwardTime(60);
        await owner.TestGovernor.execute([myToken.address], [0], [calldata], descHash);
        const stateFinal = await owner.TestGovernor.state(proposalId);
        expect(stateFinal).to.eq(7);
        expect(await owner.MyToken.balanceOf(user1.address)).to.eq(transferAmount);

    });

});

