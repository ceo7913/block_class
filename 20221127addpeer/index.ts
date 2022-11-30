import { BlockChain } from '@core/index'
import { P2PServer, Message, MessageType } from './src/serve/p2p'
import peers from './peer.json'
import express from 'express'
import { ReceviedTx } from '@core/wallet/wallet'
import { Wallet } from '@core/wallet/wallet'

const app = express()
const ws = new P2PServer()

app.use(express.json())

// app.use((req, res, next) => {
//     const baseAuth: string = (req.headers.authorization || '').split(' ')[1]
//     if (baseAuth === '') return res.status(401).send()

//     const [userid, userpw] = Buffer.from(baseAuth, 'base64').toString().split(':')
//     if (userid !== 'web7722' || userpw !== '1234') return res.status(401).send()

//     next()
// })

app.get('/', (req, res) => {
    res.send('bit-chain')
})

app.get('/chains', (req, res) => {
    res.json(ws.getChain())
})

app.post('/mineBlock', (req, res) => {
    const { data } = req.body

    const newBlock = ws.miningBlock(data)

    if (newBlock.isError) return res.status(500).send(newBlock.error)
    const msg: Message = {
        type: MessageType.latest_block,
        payload: {},
    }
    ws.broadcast(msg)
    res.json(newBlock.value)
})

app.post('/addToPeer', (req, res) => {
    const { peer } = req.body

    ws.connectToPeer(peer)
})

app.get('/addPeers', (req, res) => {
    peers.forEach((peer) => {
        ws.connectToPeer(peer)
    })
})

app.get('/peers', (req, res) => {
    const sockets = ws.getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort)
    res.json(sockets)
})

app.post('/getBalance', (req, res) => {
    const { account } = req.body

    const balance = Wallet.getBalance(account, ws.getUnspentTxOuts())
    console.log(balance)

    res.json({
        balance,
    })
})

app.post('/sendTransaction', (req, res) => {
    try {
        const receivedTx: ReceviedTx = req.body
        console.log(receivedTx)

        const tx = Wallet.sendTransaction(receivedTx, ws.getUnspentTxOuts())
        ws.appendTransactionPool(tx)
        ws.updateUTXO(tx)
        const message: Message = {
            type: MessageType.receivedTx,
            payload: tx,
        }
        ws.broadcast(message)
    } catch (e) {
        if (e instanceof Error) console.error(e.message)
    }

    res.json([])
})

app.get('/transaction_pool', (req, res) => {
    res.send(ws.getTransactionPool())
})

app.get('/unspentTransaction', (req, res) => {
    res.send(ws.getUnspentTxOuts())
})

app.listen(3000, () => {
    console.log('서버시작 3000')
    ws.listen()
})