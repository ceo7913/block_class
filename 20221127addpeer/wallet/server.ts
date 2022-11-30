import express, { urlencoded } from 'express'
import nunjucks from 'nunjucks'
import { Wallet } from './wallet'
import axios from 'axios'

const app = express()

const userid = process.env.USERID || 'web7722'
const userpw = process.env.USERPW || '1234'
const baseURL = process.env.BASEURL || 'http://localhost:3000'

const baseAuth = Buffer.from(userid + ':' + userpw).toString('base64')

const request = axios.create({
    baseURL,
    headers: {
        Authorization: 'Basic ' + baseAuth,
        'Content-type': 'application/json',
    },
})

app.use(express.json())
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/newWallet', (req, res) => {
    res.json(new Wallet())
})

app.post('/walletList', (req, res) => {
    console.log('wallet lsit')
    const list = Wallet.getWalletList()
    res.json(list)
})

app.get('/wallet/:account', async (req, res) => {
    const { account } = req.params
    const privateKey = Wallet.getWalletPrivateKey(account)
    const myWallet = new Wallet(privateKey)

    const response = await request.post('/getBalance', { account })
    console.log(response.data.balance)
    myWallet.balance = response.data.balance
    res.json(myWallet)
})

app.post('/sendTransaction', async (req, res) => {
    console.log(req.body)
    const {
        sender: { account, publicKey },
        received,
        amount,
    } = req.body

    const signature = Wallet.createSign(req.body)
    const txObject = {
        sender: publicKey,
        received,
        amount,
        signature,
    }

    console.log(txObject)

    const response = await request.post('/sendTransaction', txObject)
    console.log(response.data)
    res.json({})
})

app.listen(3005, () => {
    console.log('서버시작 ', 3005)
})
