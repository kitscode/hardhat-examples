import {setup} from './utils';
import {expect} from "chai";
import {WHITELIST} from "../helpers/constants";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";

describe('Merkle', () => {

    it("check whitelist", async function () {
        const {owner, user1, user2, user10, Merkle} = await setup();

        let leafNodes = WHITELIST.map(address => keccak256(address));
        let tree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
        const root = tree.getRoot();
        
        const r = await Merkle.whitelistMerkleRoot();
        expect(r).to.eq('0x' + root.toString('hex'));

        let leaf = keccak256(owner.address);
        let proof = tree.getHexProof(leaf);
        console.log('Proof:', proof);
        expect(await Merkle.isValidMerkleProof(proof, owner.address)).to.eq(true);
        
        let leaf1 = keccak256(user1.address);
        let proof1 = tree.getHexProof(leaf1);
        expect(await Merkle.isValidMerkleProof(proof1, user1.address)).to.eq(true);

        let leaf2 = keccak256(user2.address);
        let proof2 = tree.getHexProof(leaf2);
        expect(await Merkle.isValidMerkleProof(proof2, user2.address)).to.eq(true);

        let leaf10 = keccak256(user10.address);
        let proof10 = tree.getHexProof(leaf10);
        expect(await Merkle.isValidMerkleProof(proof10, user10.address)).to.eq(false);

        expect(await Merkle.claimed(owner.address)).to.eq(false);
        expect(await Merkle.claimed(user1.address)).to.eq(false);
        expect(await Merkle.claimed(user1.address)).to.eq(false);
        
        await owner.Merkle.mint(proof);
        await user1.Merkle.mint(proof1);
        await user2.Merkle.mint(proof2);

        expect(await Merkle.claimed(owner.address)).to.eq(true);
        expect(await Merkle.claimed(user1.address)).to.eq(true);
        expect(await Merkle.claimed(user2.address)).to.eq(true);
        
        await expect(user10.Merkle.mint(proof10)).to.be.revertedWith("Address is not in whitelist.");
    });

});

