// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MyContractV1_AddNewEvent {
    uint8 public constant VERSION_1 = 1;
    event CreateSuccess(string id, string name);

    function addFoo(string calldata id, string calldata name) external {
        emit CreateSuccess(id, name);
    }
}

contract MyContractV2_AddNewEvent is MyContractV1_AddNewEvent {
    uint8 public constant VERSION_2 = 2;
    event AddAge(string id, uint256 age);

    function addFoo(
        string calldata id,
        string calldata name,
        uint256 age
    ) external {
        emit CreateSuccess(id, name);
        emit AddAge(id, age);
    }
}
