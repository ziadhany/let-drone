const PrescriptionManager = artifacts.require("PrescriptionManager");

module.exports = function (deployer) {
    deployer.deploy(PrescriptionManager);
};
