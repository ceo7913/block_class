const Test = artifacts.require('Token')
// npx truffle complie

module.exports = function(deployer){
    // Test 의 배포가 되기전에
    // constructor 의 매개변수가 전달 되어야 한다.
    // constructor 의 매개변수를 전달하기 위해서
    // deploy 함수의 두번째 인자로 추가 해주면 된다.
    // npx truffle migration
    deployer.deploy(Test);
}