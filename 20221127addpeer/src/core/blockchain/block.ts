import { SHA256 } from 'crypto-js'
import merkle from 'merkle'
import { BlockHeader } from './blockHeader'
import hexToBinary from 'hex-to-binary'
import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL, GENESIS, UNIT } from '@core/config'

export class Block extends BlockHeader implements IBlock {
    public hash: string
    public merkleRoot: string
    public nonce: number
    public difficulty: number
    public data: ITransaction[]

    constructor(_previousBlock: Block, _data: ITransaction[], _adjustmentBlock: Block = _previousBlock) {
        super(_previousBlock)

        const merkleRoot = Block.getMerkleRoot(_data)

        this.merkleRoot = merkleRoot
        this.hash = Block.createBlockHash(this)
        this.nonce = 0
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock)
        this.data = _data
    }

    public static getGENESIS(): Block {
        return GENESIS
    }

    public static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = merkle('sha256').sync(_data)
        return merkleTree.root() || '0'.repeat(64)
    }

    public static createBlockHash(_block: Block): string {
        const { version, timestamp, merkleRoot, previousHash, height, difficulty, nonce } = _block
        const values: string = `${version}${timestamp}${merkleRoot}${previousHash}${height}${difficulty}${nonce}`
        return SHA256(values).toString()
    }

    public static generateBlock(_previousBlock: Block, _data: ITransaction[], _adjustmentBlock: Block): Block {
        const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock)
        const newBlock = Block.findBlock(generateBlock)
        return newBlock
    }

    public static findBlock(_generateBlock: Block): Block {
        let hash: string
        let nonce: number = 0
        while (true) {
            nonce++
            _generateBlock.nonce = nonce
            hash = Block.createBlockHash(_generateBlock)
            const binary: string = hexToBinary(hash)
            const result: boolean = binary.startsWith('0'.repeat(_generateBlock.difficulty))
            if (result) {
                _generateBlock.hash = hash
                return _generateBlock
            }
        }
    }

    public static getDifficulty(_newBlock: Block, _adjustmentBlock: Block, _previousBlock: Block): number {
        if (_newBlock.height < 9) return 0
        if (_newBlock.height < 19) return 1
        if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return _previousBlock.difficulty

        const timeTaken: number = _newBlock.timestamp - _adjustmentBlock.timestamp
        const timeExpected: number = UNIT * BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL

        if (timeTaken < timeExpected / 2) return _adjustmentBlock.difficulty + 1
        else if (timeTaken > timeExpected * 2) return _adjustmentBlock.difficulty - 1

        return _adjustmentBlock.difficulty
    }

    static isValidNewBlock(_newBlock: Block, _previousBlock: Block): Failable<Block, string> {
        if (_previousBlock.height + 1 !== _newBlock.height) return { isError: true, error: '??????????????? ??????????????????.' }
        if (_previousBlock.hash !== _newBlock.previousHash)
            return { isError: true, error: '?????????????????? ?????? ????????????.' }
        if (Block.createBlockHash(_newBlock) !== _newBlock.hash)
            return { isError: true, error: '??????????????? ???????????? ????????????.' }

        return { isError: false, value: _newBlock }
    }
}
