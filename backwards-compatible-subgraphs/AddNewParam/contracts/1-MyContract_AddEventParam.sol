// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MyContractV1_AddEventParam {
    uint8 public constant VERSION_1 = 1;
    event CreateSuccess(string id, string name);

    function addFoo(string calldata id, string calldata name) external {
        emit CreateSuccess(id, name);
    }
}

// Ignoring storage slots ordering requirements needed for proper upgradeability...
contract MyContractV2_AddEventParam is MyContractV1_AddEventParam {
    uint8 public constant VERSION_2 = 2;
    event CreateSuccess(string id, string name, uint256 age);

    function addFoo(
        string calldata id,
        string calldata name,
        uint256 age
    ) external {
        emit CreateSuccess(id, name, age);
    }
}
