// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionPayment {
  address public admin;

  enum Status { WaitPayment, Paid }

  struct Prescription {
    string uuid;
    uint256 price;
    Status status;
    string patientUuid;
  }

  mapping(string => Prescription) public prescriptions;

  event PrescriptionAdded(string uuid, uint256 price, Status status);
  event PrescriptionPaid(string uuid, uint256 price, Status status, string patientUuid);

  modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin can call this function.");
    _;
  }

  modifier validPrescription(string memory uuid) {
    require(bytes(prescriptions[uuid].uuid).length != 0, "Prescription does not exist.");
    _;
  }

  constructor() {
    admin = msg.sender;
  }

  function addPrescription(string memory uuid, uint256 price) public onlyAdmin {
    prescriptions[uuid] = Prescription({
      uuid: uuid,
      price: price,
      status: Status.WaitPayment,
      patientUuid: ""
    });

    emit PrescriptionAdded(uuid, price, Status.WaitPayment);
  }

  function payPrescription(string memory uuid, string memory patientUuid) public payable validPrescription(uuid) {
    Prescription storage prescription = prescriptions[uuid];
    require(prescription.status == Status.WaitPayment, "Prescription is already paid.");
    require(msg.value == prescription.price, "Incorrect payment amount.");

    prescription.status = Status.Paid;
    prescription.patientUuid = patientUuid;

    emit PrescriptionPaid(uuid, prescription.price, prescription.status, patientUuid);
  }
}