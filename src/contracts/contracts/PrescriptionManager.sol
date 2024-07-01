// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionManager {
    enum Status { Wait, Done }

    struct Prescription {
        string uuid;
        uint256 price;
        Status status;
    }

    mapping(address => Prescription[]) private prescriptions;

    // Event to notify when a new prescription is added
    event PrescriptionAdded(address indexed user, string uuid, uint256 price);

    // Event to notify when a prescription status is updated
    event PrescriptionStatusUpdated(address indexed user, string uuid, Status status);

    // Function to add a new prescription with a price and default status as "Wait"
    function addPrescription(string memory _uuid, uint256 _price) public payable {
        require(msg.value == _price, "Incorrect payment amount");

        prescriptions[msg.sender].push(Prescription({
            uuid: _uuid,
            price: _price,
            status: Status.Wait
        }));

        emit PrescriptionAdded(msg.sender, _uuid, _price);
    }

    // Function to get the list of prescriptions with status "Wait"
    function getWaitingPrescriptions() public view returns (Prescription[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < prescriptions[msg.sender].length; i++) {
            if (prescriptions[msg.sender][i].status == Status.Wait) {
                count++;
            }
        }

        Prescription[] memory waitingPrescriptions = new Prescription[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < prescriptions[msg.sender].length; i++) {
            if (prescriptions[msg.sender][i].status == Status.Wait) {
                waitingPrescriptions[index] = prescriptions[msg.sender][i];
                index++;
            }
        }

        return waitingPrescriptions;
    }

    // Function to update the status of a prescription to "Done"
    function updatePrescriptionStatus(string memory _uuid) public {
        bool updated = false;
        for (uint256 i = 0; i < prescriptions[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(prescriptions[msg.sender][i].uuid)) == keccak256(abi.encodePacked(_uuid))) {
                prescriptions[msg.sender][i].status = Status.Done;
                updated = true;
                emit PrescriptionStatusUpdated(msg.sender, _uuid, Status.Done);
                break;
            }
        }

        require(updated, "Prescription not found");
    }
}
