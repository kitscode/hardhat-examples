// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract D {
    uint public x;
    constructor(uint a) {
        x = a;
    }
}

contract Create {

    function createDSalted(address salt_seed, uint arg) public {

        bytes32 salt = keccak256(abi.encodePacked(salt_seed));
        
        // This complicated expression just tells you how the address
        // can be pre-computed. It is just there for illustration.
        // You actually only need ``new D{salt: salt}(arg)``.
        address predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(abi.encodePacked(
                    type(D).creationCode,
                    arg
                ))
            )))));

        D d = new D{salt : salt}(arg);

        require(address(d) == predictedAddress);
    }

    function createNew(uint arg) public {

        // This complicated expression just tells you how the address
        // can be pre-computed. It is just there for illustration.
        // You actually only need ``new D{salt: salt}(arg)``.
        address predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(
                bytes1(0xff),
                address(this),
                keccak256(abi.encodePacked(
                    type(D).creationCode,
                    arg
                ))
            )))));

        D d = new D(arg);

        require(address(d) != predictedAddress);
    }
}
