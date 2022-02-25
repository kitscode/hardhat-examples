// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "./MyToken.sol";

contract TempTest {

    using SafeMath for uint256;

    IERC20 public token;

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

    function multiBigNumber() public pure returns (uint256){
        uint256 a = 58823529411764705882352;
        uint256 b = 850000;
        return a * b;
    }

    function concatString(string memory a, string memory b) public pure returns (string memory r1, string memory r2) {
        r1 = string(bytes.concat(bytes(a), bytes(b)));
        r2 = string(abi.encodePacked(a, b));
    }

    function setToken(address _token) public {
        token = IERC20(_token);
    }

    function getToken() public view returns (IERC20, address){
        return (token, address(token));
    }

    function amountDivide() public view returns (uint256){
        uint256 amountV = 12212446911748192486079752325135052781399568695204286982036542063334587891712;
        uint256 amount = uint248(amountV);

        //console.log("amount:", amount);
        return amount;
    }

    function testType() public pure returns (bytes memory){
        bytes memory bytecode = type(MyToken).creationCode;
        return bytecode;
    }

    function testUintMax() public pure returns (uint256, uint256){
        return (~uint256(0), 2 ** 256 - 1);
    }

    function out(string calldata s) private pure returns (string calldata){
        return s;
    }
}
