// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MyContractV1_EncodedData {
    uint8 public constant VERSION_1 = 1;
    event CreateSuccess(string id, bytes data, uint24 version);

    function addFoo(string calldata id, string calldata name) external {
        // DATA SPEC: (string name)
        bytes memory data = abi.encode(name);
        emit CreateSuccess(id, data, VERSION_1);
    }
}

// Ignoring storage slots ordering requirements needed for proper upgradeability...
contract MyContractV2_EncodedData is MyContractV1_EncodedData {
    uint8 public constant VERSION_2 = 2;

    function addFoo(
        string calldata id,
        string calldata name,
        uint256 age
    ) external {
        /**
				abi.encode is aware of the types of name + age.
				Elsewhere, you'll need to know: 
				A) the type
				B) the order of these parameters
				C) the contract version
				
				in order to properly encode/decode them.
				 */

        // DATA SPEC: (string name, uint8 age)
        bytes memory data = abi.encode(name, age);
        emit CreateSuccess(id, data, VERSION_2);
    }
}
