pragma solidity 0.5.0;

contract Proxy {
    address private targetAddress;
    
    function setTargetAddress(address _address) public {
        require(_address != address(0));
        targetAddress = _address;
    }

    function () external {
        address contractAddr = targetAddress;
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, contractAddr, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}
