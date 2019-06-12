pragma solidity 0.5.0;

contract Logic {
    mapping (address => uint) scoreMap;
    string str;

    function hit() public {
        scoreMap[msg.sender] = scoreMap[msg.sender] + 10;
        str = "hit";
    }

    function score() public view returns (uint) {
        return scoreMap[msg.sender];
    }
    
    function setMessage(string memory _str) public {
        str = _str;
    }
    
    function getMessage() public view returns(string memory str_){
        str_ = str;
    }
}
