import { Block } from '@core/blockchain/block'
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config'
import { Transaction } from '@core/transaction/transaction'
import { TxIn } from '@core/transaction/txin'
import { TxOut } from '@core/transaction/txout'
import { unspentTxOut } from '@core/transaction/unspentTxOut'

export class Chain {
    private blockchain: Block[]
    private unspentTxOuts: unspentTxOut[]
    private transactionPool: ITransaction[]

    constructor() {
        this.blockchain = [Block.getGENESIS()]
        this.unspentTxOuts = []
        this.transactionPool = []
    }

    public getUnspentTxOuts(): unspentTxOut[] {
        return this.unspentTxOuts
    }

    public appendUTXO(utxo: unspentTxOut[]): void {
        this.unspentTxOuts.push(...utxo)
    }

    public getChain(): Block[] {
        return this.blockchain
    }

    public getLength(): number {
        return this.blockchain.length
    }

    public getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1]
    }

    public getTransactionPool(): ITransaction[] {
        return this.transactionPool
    }

    public appendTransactionPool(_Transaction: ITransaction): void {
        this.transactionPool.push(_Transaction)
    }

    public updateTransactionPool(_newBlock: IBlock): void {
        let txPool: ITransaction[] = this.getTransactionPool()
        _newBlock.data.forEach((tx: ITransaction) => {
            txPool = txPool.filter((txp) => {
                txp.hash !== tx.hash
            })
        })

        this.transactionPool = txPool
    }

    public miningBlock(_account: string): Failable<Block, string> {
        const txin: ITxIn = new TxIn('', this.getLatestBlock().height + 1)
        const txout: ITxOut = new TxOut(_account, 50)
        const transaction: Transaction = new Transaction([txin], [txout])

        return this.addBlock([transaction, ...this.getTransactionPool()])
    }

    public addBlock(data: ITransaction[]): Failable<Block, string> {
        const previousBlock = this.getLatestBlock()
        const adjustmentBlock: Block = this.getAdjustmentBlock()
        const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock)
        const isVaild = Block.isValidNewBlock(newBlock, previousBlock)

        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain.push(newBlock)
        newBlock.data.forEach((_tx: ITransaction) => {
            this.updateUTXO(_tx)
        })
        this.updateTransactionPool(newBlock)
        return { isError: false, value: newBlock }
    }

    public addToChain(_receviedBlock: Block): Failable<undefined, string> {
        const isVaild = Block.isValidNewBlock(_receviedBlock, this.getLatestBlock())
        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain.push(_receviedBlock)

        _receviedBlock.data.forEach((tx) => {
            this.updateUTXO(tx)
        })
        this.updateTransactionPool(_receviedBlock)

        return { isError: false, value: undefined }
    }

    public isValidChain(_chain: Block[]): Failable<undefined, string> {
        const genesis = _chain[0]

        for (let i = 1; i < _chain.length; i++) {
            const newBlock = _chain[i]
            const previousBlock = _chain[i - 1]
            const isVaild = Block.isValidNewBlock(newBlock, previousBlock)
            if (isVaild.isError) return { isError: true, error: isVaild.error }
        }

        return { isError: false, value: undefined }
    }

    updateUTXO(tx: ITransaction): void {
        const unspentTxOuts: unspentTxOut[] = this.getUnspentTxOuts()

        const newUnspentTxOuts = tx.txOuts.map((txout, index) => {
            return new unspentTxOut(tx.hash, index, txout.account, txout.amount)
        })

        const tmp = unspentTxOuts
            .filter((utxo: unspentTxOut) => {
                const bool = tx.txIns.find((txIn: TxIn) => {
                    return utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex
                })

                return !bool
            })
            .concat(newUnspentTxOuts)

        console.log('origin utxo :', this.unspentTxOuts)
        console.log(' newUnspentTxOuts : ', newUnspentTxOuts)
        console.log(' result utxo :  ', tmp)

        let unspentTmp: unspentTxOut[] = []
        const result = tmp.reduce((acc, utxo) => {
            const find = acc.find(({ txOutId, txOutIndex }) => {
                return txOutId === utxo.txOutId && txOutIndex === utxo.txOutIndex
            })
            if (!find) acc.push(utxo)
            return acc
        }, unspentTmp)

        this.unspentTxOuts = result
    }

    replaceChain(receivedChain: Block[]): Failable<undefined, string> {
        const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1]
        const latestBlock: Block = this.getLatestBlock()
        if (latestReceivedBlock.height === 0) {
            return { isError: true, error: '받은 최신블록이 제네시스 블록입니다.' }
        }
        if (latestReceivedBlock.height <= latestBlock.height) {
            return { isError: true, error: '자신의 블록이 길거나 같습니다.' }
        }
        if (latestReceivedBlock.previousHash === latestBlock.hash) {
            return { isError: true, error: '블록이 하나만큼 모자릅니다.' }
        }

        this.blockchain = receivedChain

        this.blockchain.forEach((_block: IBlock) => {
            this.updateTransactionPool(_block)
            _block.data.forEach((_tx) => {
                this.updateUTXO(_tx)
            })
        })

        return { isError: false, value: undefined }
    }

    public getAdjustmentBlock() {
        const currentLength = this.getLength()
        const adjustmentBlock: Block =
            currentLength < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? Block.getGENESIS()
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL]
        return adjustmentBlock
    }
}