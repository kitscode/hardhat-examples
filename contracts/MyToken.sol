// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, AccessControl {

    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address minter) ERC20("MyToken", "MTK") {
        // Grant the minter role to a specified account
        _setupRole(MINTER_ROLE, minter);
        _setupRole(DEFAULT_ADMIN_ROLE, minter);
        _mint(msg.sender, 100000e18);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

}
