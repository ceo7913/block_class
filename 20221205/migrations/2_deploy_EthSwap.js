const SoonToken = artifacts.require("SoonToken");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer){
    // SoonToken 배포 진행
    await deployer.deploy(SoonToken);
    // 배포된 인스턴스 가져오기
    const token = await SoonToken.deployed();
    // SoonToken.address => 배포된 컨트랙트의 CA 가져와짐
    
    // 배포한 SoonToken 컨트랙트의 CA 값을 매개변수로 전달해서
    // EthSwap 컨트랙트 배포 
    await deployer.deploy(EthSwap, token.address);
    await EthSwap.deployed();
}