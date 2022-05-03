import {forwardTime, mineBlocks, setup} from './utils';
import {expect, use} from "chai";
import {ethers, network} from "hardhat";
import {parseEther} from "ethers/lib/utils";
import {ERC20, GovernorComp} from "../typechain";


describe('TestGovernor', () => {

    const transferAmount = parseEther("1000");

    it("check deploy", async () => {
        const {owner} = await setup();

        expect(await owner.TestGovernor.token()).to.eq(owner.TokenVote.address);
        expect(await owner.TestGovernor.timelock()).to.eq(owner.TimelockController.address);
    });


    it("check proposal", async () => {
        const {owner, user1, user2} = await setup();

        const myToken = await ethers.getContractAt<ERC20>("ERC20", owner.MyToken.address);
        const calldata = myToken.interface.encodeFunctionData("transfer", [user1.address, transferAmount]);

        const blockBeforePropose = await ethers.provider.getBlock("latest");
        console.log("blockBeforePropose:", blockBeforePropose.number);

        const desc = "Proposal: transfer to other";
        const tx = await owner.TestGovernor.propose([myToken.address], [0], [calldata], desc);
        const receipt = await tx.wait();

        // 0xa948272a69487d97fe13b1351f9dd943bb27b718a5052c9cd28814af2d5e9707
        const proposalId = receipt.logs[0].data.substring(0, 66);

        const blockAfterPropose = await ethers.provider.getBlock("latest");
        console.log("blockAfterPropose:", blockAfterPropose.number);

        const snapshot = await owner.TestGovernor.proposalSnapshot(proposalId);
        console.log("snapshot:", snapshot.toNumber());

        const state = await owner.TestGovernor.state(proposalId);
        expect(state).to.eq(0);

        // delegate
        await owner.TokenVote.delegate(owner.address);
        expect(await owner.TokenVote.getVotes(owner.address)).to.eq(parseEther("100000"));

        await owner.TokenVote.delegate(user1.address);
        expect(await owner.TokenVote.getVotes(user1.address)).to.eq(parseEther("100000"));
        const blockDelegate1 = await ethers.provider.getBlock("latest");
        console.log("blockDelegate1:", blockDelegate1.number);

        await owner.TokenVote.delegate(user2.address);
        expect(await owner.TokenVote.getVotes(user2.address)).to.eq(parseEther("100000"));

        // become active after voting delay
        expect(await owner.TestGovernor.state(proposalId)).to.eq(1);

        const voteForUser2 = await owner.TestGovernor.getVotes(user2.address, snapshot);
        const blockDelegate2 = await ethers.provider.getBlock("latest");
        console.log("blockDelegate2:", blockDelegate2.number);
        console.log("voteForUser2:", voteForUser2.toString());

        // cast vote
        await owner.TestGovernor.castVote(proposalId, 0);
        await user1.TestGovernor.castVote(proposalId, 1);
        const proposalVotes = await owner.TestGovernor.proposalVotes(proposalId);
        console.log("against:", proposalVotes[0].toString());
        console.log("for:", proposalVotes[1].toString());
        console.log("abstain:", proposalVotes[2].toString());

        await mineBlocks(10); // Succeeded
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
        
        const balanceTimelock = await owner.MyToken.balanceOf(owner.TimelockController.address);
        console.log("balance timelock:", ethers.utils.formatEther(balanceTimelock));

    });
    

});

