// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract TokenWithPermit is ERC20Permit {

    constructor() ERC20("TWP", "TWP") ERC20Permit("TWP") {
        _mint(msg.sender, 10000e18);
    }
}
