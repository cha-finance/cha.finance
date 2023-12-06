// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract OnChainClash is ERC20 {
    using SafeERC20 for IERC20;
    IERC20 private LUA = IERC20(address(0xB1f66997A5760428D3a87D68b90BfE0aE64121cC));
    uint public cap = 500000000 * 10e18;

    constructor() ERC20("Cha Finance", "CHA") {

    }

    function mint(uint amount) external {
        LUA.safeTransferFrom(msg.sender, address(this), amount);
        LUA.safeTransfer(address(0x0), amount);

        require(totalSupply() + amount <= cap, "Cha Finance: cap exceeded");
        _mint(msg.sender, amount);
    }
}
