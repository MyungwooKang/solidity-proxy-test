
pragma solidity 0.5.0;
 
contract ConsentStateContract {
    mapping (uint => string) consentState;
 
    function setConsentState(uint _txId, string memory _hash) public {
        consentState[_txId] = _hash;
    }
     
    function getConsentState(uint _txId) public view returns(string memory hash_) {
        hash_ = consentState[_txId];
    }
}