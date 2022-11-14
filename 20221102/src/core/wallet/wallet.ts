import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

// 암호화폐의 지갑은 왜 쓸까
// 본인의 자산을 암호화폐를 다른 누군가에게 상대방에게 양도하기 위해서 
// 사용하는 소프트웨어의 한 종류 라고 보면 된다.
// 개인키가 있어야 본인의 지갑에 접근이 가능하다.
// 지갑은 암호화폐 자산을 관리하고 Dapps(탈중앙화 애플리케이션)과 상호작용을 하기 위해서 
//사용한다.

// 공개키는 예를 들어 우리가 사용하는 은행 계좌 번호라고 생각하면 되고
// 개인키는 비밀 핀번호 or 계좌 관리를 위한 수표의 서명과 비슷하다

// 공개키로는 네트워크 참여자의 거래내역의 사람들의 거래가 정상인지 아닌지를 확인 할 수 있다.
// 개인키는 개인키를 이용해서 직접 거래하고 개인키는 절대 잃어버리면 안된다.
// 잃어버리면 본인이 소유하고 있는 암호 화폐가 묶여 있다고 보면된다.

// 단방향 암호화를 통해 키를 만든다.
// 개인키의 역할은 공개키를 만들어 주고 만든 공개키로 주소를 만들어 준다.
// 공개키로 개인키를 알아내는건 불가능하고 또한 주소로 공개키를 알아내는건 불가능 

// 공개키는 타원 곡선 알고리즘이라는 수학적인 알고리즘으로 연산과정을 거쳐 개인키로 만들 수 있다.
// 모든 사람들에게 공개되어도 상관이 없는 데이터 공개키는 계좌번호 같은 느낌
// 공개키의 역할은 암호화폐 전송 받을 때 사용(계좌 번호) 그리고 암호화폐의 거래 내역이 
// 유효한지를 검사해준다. 암호화폐를 전송하는 사람이 전송하기 전에 암호화폐를 가지고 있었는지
// 확인 가능
// 이중 지불 방지

// elliptic 인스턴스 생성
const ec = new elliptic.ec("secp256k1");

// 지갑에 전송할 수신 형태 
export interface ReceivedTx {
    sender: string;
    received : string;
    amount : number;
    signature : elliptic.ec.Signature;
}

export class Wallet {
    // 지갑의 주소
    public account : string;
    // 지갑의 공개키 
    public publicKey : string;
    // 암호화폐 
    public balance : number;
    // 서명
    public signature :elliptic.ec.Signature;

    constructor(sender:string, signature : elliptic.ec.Signature){
        // 공개키
        this.publicKey = sender;
        // 지갑의 주소 
        this.account = this.getAccount();
        // 서명
        this.signature = signature;
        // 화폐
        this.balance = 0;
    }

    static sendTransaction(receivedTx : ReceivedTx){
        // 서명 검증

        // 공개키, 보내는 사람: 공개키, 받는사람 : 계정, 보낼 금액
        const verify = Wallet.getVerify(receivedTx);
        if(verify.isError) throw new Error(verify.value);
        // 보내는 사람의 지갑 정보를 최신화
        // 현재 가지고 있는 정보 공개키, 실제 트랜젝션에 넣을 정보는 account 정보
        const myWallet = new this(receivedTx.sender, receivedTx.signature);
        console.log(myWallet);
    }

    static getVerify(receivedTx:ReceivedTx) : Failable<undefined, string> {
        const {sender ,received, amount, signature} = receivedTx;
        const data : [string, string , number] = [sender, received, amount];
        const hash : string = SHA256(data.join("")).toString();

        // 공개키로 서명 검증
        const keyPair = ec.keyFromPublic(sender, "hex");
        const isVerify = keyPair.verify(hash, signature);
        if(!isVerify) return {isError : true, value : "서명 검증이 안됨"};
        
        return {isError : false, value : undefined}
    }

    public getAccount() : string{
        return Buffer.from(this.publicKey).slice(26).toString();
    }
}