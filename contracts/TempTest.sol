// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./library/SafeMath.sol";

contract TempTest {

    using SafeMath for uint256;

    function getYearSecond() public pure returns (uint256 a){
        a = 365 days;
    }

    function timeStamp32() public view returns (uint32 blockTimestamp){
        blockTimestamp = uint32(block.timestamp % 2 ** 32);
    }

    function randomNum(uint256 min, uint256 max) public view returns (uint256){
        require(min < max, "require min < max");
        uint256 distance = max - min;
        uint256 randomPercent = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender, distance))) % 100;
        return min + distance * randomPercent / 100;
    }

}
