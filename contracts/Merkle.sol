//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Merkle is Ownable {
    bytes32 public whitelistMerkleRoot;
    mapping(address => bool) public claimed;

    function setSaleMerkleRoot(bytes32 _newMerkleRoot) external onlyOwner {
        whitelistMerkleRoot = _newMerkleRoot;
    }

    function isValidMerkleProof(bytes32[] calldata merkleProof, address user) public view returns (bool){
        return MerkleProof.verify(
            merkleProof,
            whitelistMerkleRoot,
            keccak256(abi.encodePacked(user))
        );
    }

    function mint(bytes32[] calldata merkleProof) external {
        require(isValidMerkleProof(merkleProof, msg.sender), "Address is not in whitelist.");
        require(!claimed[msg.sender], "Address already claimed.");
        claimed[msg.sender] = true;
    }
}
