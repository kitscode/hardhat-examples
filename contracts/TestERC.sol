// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface Interface01 {
    function hello() external pure;

    function world(int) external pure;
}

contract TestERC is ERC165 {

    bytes4 public constant SELECTOR165 = bytes4(keccak256(bytes('supportsInterface(bytes4)')));
    
    function selectors() public view returns (bytes4, bytes4) {
        Interface01 i;
        return (i.hello.selector, i.world.selector);
    }

    function calculateSelector() public pure returns (bytes4) {
        Interface01 i;
        return i.hello.selector ^ i.world.selector;
    }
    
    function selector() public view returns (bytes4) {
        ERC165 erc165;
        return erc165.supportsInterface.selector;
    }

    function interfaceId() public view returns (bytes4){
        return type(Interface01).interfaceId;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(Interface01).interfaceId || super.supportsInterface(interfaceId);
    }
}
