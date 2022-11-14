declare interface ITxOut{
    account : string; // 해당 사람의 주소
    amount : number; // 잔액
}


// ITxIn 는 IUnspentTxOut[]을 참조해서 만들고
// ITxIn 을 만들때 IUnspentTxOut[]에서 삭제

// input
declare interface ITxIn {
    txOutId : string; // Itransaction 객체의 hash 값
    txOutIndex : number; // Itransaction 에 있는 txouts 배열의 인덱스
    // ? : signature 속성이 없어도 되고 있어도 된다.
    signature? : string;
}

// 트랜잭션
declare interface ITransaction {
    hash : string; // txIns, txOuts 를 사용해서 만든 hash 값
    txOuts : ITxOut[];
    txIns : ITxIn[];
}

// TxOut 을 만들때 IUnspentTxOut[]에 생성
// UTXO
declare interface IUnspenTxOut{
    txOutId : string; 
    txOutindex : number;
    account : string;
    amount : number;
}