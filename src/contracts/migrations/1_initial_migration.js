const PrescriptionPayment = artifacts.require("PrescriptionPayment");

module.exports = function (deployer) {
  deployer.deploy(PrescriptionPayment);
};
