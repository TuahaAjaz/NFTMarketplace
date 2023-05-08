// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
contract FT is ERC20 {
    uint256 public unitsOneEthCanBuy = 10;
    address public tokenOwner;         

    constructor(uint initialSupply) 
    ERC20("TuahaImadAskari", "TIA") {
        tokenOwner = msg.sender;            
        uint256 n = initialSupply;
        // mint the tokens
        _mint(msg.sender, n * 10**uint(decimals()));        
    }

    function buyToken() external payable {        
        
        uint256 amount = msg.value * unitsOneEthCanBuy;
    
        require(balanceOf(tokenOwner) >= msg.value * unitsOneEthCanBuy, 
            "Not enough tokens");
    
        _transfer(tokenOwner, msg.sender, amount);
       
        emit Transfer(tokenOwner, msg.sender, amount);
        
        
        payable(tokenOwner).transfer(msg.value);
    }

    function transferToken(uint amt, address addr) public {        
        
        uint256 amount = amt * 10**(decimals());
    
        require(balanceOf(msg.sender) >= amount, 
            "Not enough tokens");
    
        _transfer(msg.sender, addr, amount);
       
        emit Transfer(addr, msg.sender, amount);
        
    }

    function totalBalance () view public returns (uint) {
        uint bal = balanceOf(tokenOwner);
        return bal;
    }
}