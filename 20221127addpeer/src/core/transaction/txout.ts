import { Wallet } from '@core/wallet/wallet'

export class TxOut {
    public account: string
    public amount: number

    constructor(_account: string, _amount: number) {
        this.account = _account
        this.amount = _amount
    }

    static createTxOuts(sum: number, _receviedTx: any): TxOut[] {

        const { sender, received, amount } = _receviedTx
        const senderAccount: string = Wallet.getAccount(sender)

        const receivedTxOut = new TxOut(received, amount)
        const senderTxOut = new TxOut(senderAccount, sum - amount)

        if (senderTxOut.amount <= 0) return [receivedTxOut]

        return [receivedTxOut, senderTxOut]
    }
}
