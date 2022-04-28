// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Seller {

    address public token;

    constructor (address _token) {
        token = _token;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        IERC20(token).transfer(msg.sender, msg.value * 100);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
