const Voting = artifacts.require("Voting");

module.exports = function(deployed){
    deployed.deploy(Voting,['기호1','기호2','기호3','기호4'])
}