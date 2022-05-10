// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LogicContract is OwnableUpgradeable {

    uint256 public index;

    function initialize(uint256 _index) public initializer {
        OwnableUpgradeable.__Ownable_init();
        index = _index;
    }

    function inc() public onlyOwner {
        index++;
    }
}
