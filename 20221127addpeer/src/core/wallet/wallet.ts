import { Transaction } from '@core/transaction/transaction'
import { unspentTxOut } from '@core/transaction/unspentTxOut'
import { SHA256 } from 'crypto-js'
import elliptic from 'elliptic'

const ec = new elliptic.ec('secp256k1')

export type Signature = elliptic.ec.Signature
export interface ReceviedTx {
    sender: string
    received: string
    amount: number
    signature: Signature
}

export class Wallet {
    public publickey: string
    public account: string
    public balance: number
    public signature: Signature

    constructor(_sender: string, _signature: Signature, unspentTxOuts: unspentTxOut[]) {
        this.publickey = _sender
        this.account = Wallet.getAccount(this.publickey)
        this.balance = Wallet.getBalance(this.account, unspentTxOuts)
        this.signature = _signature
    }

    static sendTransaction(_receviedTx: any, unspentTxOuts: unspentTxOut[]): Transaction {
        const verify = Wallet.getVerify(_receviedTx)
        if (verify.isError) throw new Error(verify.error)

        const myWallet = new this(_receviedTx.sender, _receviedTx.signature, unspentTxOuts)
        if (myWallet.balance < _receviedTx.amount) throw new Error('잔액이 모자릅니다.')

        const myUTXO: unspentTxOut[] = unspentTxOut.getMyUnspentTxOuts(myWallet.account, unspentTxOuts)
        const tx: Transaction = Transaction.createTransaction(_receviedTx, myUTXO)
        return tx
    }

    static getVerify(_receviedTx: ReceviedTx): Failable<undefined, string> {
        const { sender, received, amount, signature } = _receviedTx
        const data: any[] = [sender, received, amount]
        const hash: string = SHA256(data.join('')).toString()

        const keyPair = ec.keyFromPublic(sender, 'hex')
        const isVerify = keyPair.verify(hash, signature)
        if (!isVerify) return { isError: true, error: '서명이 옳바르지 않습니다.' }

        return { isError: false, value: undefined }
    }

    static getAccount(publicKey: string): string {
        return Buffer.from(publicKey).slice(26).toString()
    }

    static getBalance(_account: string, _UnspentTxOuts: IUnspentTxOut[]): number {
        return _UnspentTxOuts
            .filter((v) => {
                return v.account === _account
            })
            .reduce((acc, utxo) => {
                return (acc += utxo.amount)
            }, 0)
    }
}
