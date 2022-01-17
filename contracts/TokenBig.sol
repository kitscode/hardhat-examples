// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBig is ERC20 {

    constructor(uint256 _premint) ERC20("BigD", "BigD") {
        _mint(msg.sender, _premint);
    }

    function decimals() public view override returns (uint8) {
        return 20;
    }

}
