const ConsentStateContract = artifacts.require("ConsentStateContract");

module.exports = function(deployer) {
  deployer.deploy(ConsentStateContract);
};
