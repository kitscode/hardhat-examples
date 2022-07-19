// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ContractUUPS is OwnableUpgradeable, UUPSUpgradeable {

    uint256 public index;

    function initialize(uint256 _index) public initializer {
        OwnableUpgradeable.__Ownable_init();
        index = _index;
    }

    function inc() public onlyOwner {
        index++;
    }

    function sub() public onlyOwner {
        index--;
    }

    function version() public returns (uint256){
        return 2;
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {}
}
