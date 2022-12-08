// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "./OdoyaNFT.sol";

contract OdoyaRecompensa is ERC20, ERC20Burnable, Pausable, Ownable, ERC20Permit {

    struct RegenAction {
        address leader;
        address nft;
        string title;
        string place;
        uint when;
        uint totalRewards;
        uint totalRewardsAvailable;
        bool stillValid;
    }
    
    mapping (address => bool) public allowedLeaders;
    uint public regenActionCounter;
    mapping (uint => RegenAction) public regenActionPlanned;    

    event NewRegenAction(string title, uint when, string where);

    constructor() ERC20("Odoya Recompensa", "ODOYA") ERC20Permit("OdoyaRecompensa") {
        regenActionCounter = 0;
        addLeader(msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address _to, uint _amount, uint _regenActionID) public onlyOwner {
        RegenAction storage ra = regenActionPlanned[_regenActionID];
        require(ra.stillValid, "The Regen Action needs to be valid");
        require(ra.totalRewardsAvailable>=_amount, "There is no sufficient funds");
        require(block.timestamp >= ra.when, "The event must have get started");
        if (block.timestamp > (ra.when + 1 days)) {
            ra.stillValid = false;
            return;
        }
        ra.totalRewardsAvailable = (ra.totalRewardsAvailable - _amount);
        _mint(_to, _amount);
        OdoyaNFT nft = OdoyaNFT(ra.nft);
        nft.safeMint(_to);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function addRegenAction(address _leader, string memory _title, string memory _place, uint _when, uint _totalRewards) public onlyOwner {
        require(allowedLeaders[_leader], "Leader must be previously approved");
        require(_when > block.timestamp, "Action must be planned to the future");
        require(_totalRewards > 0, "Total Rewards must be greater than zero");
        require(_totalRewards < (1000000*(1**decimals())), "Total Rewards must be less than 1000000 tokens");
        OdoyaNFT nft = new OdoyaNFT(_title, symbol());
        RegenAction memory ra = RegenAction(_leader, address(nft), _title, _place, _when, _totalRewards, _totalRewards, true);
        regenActionCounter++;
        regenActionPlanned[regenActionCounter] = ra;    
        emit NewRegenAction(_title, _when, _place);    
    }

    function addLeader(address _newLeader) public onlyOwner {
        allowedLeaders[_newLeader] = true;
    }

    function removeLeader(address _oldLeader) public onlyOwner {
        require(allowedLeaders[_oldLeader], "Or leader not exist or it was already removed");
        allowedLeaders[_oldLeader] = false;
    }

}
