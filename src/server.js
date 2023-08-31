import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
    console.log('logging')
    req.mydata = 'hello'
    next()
}

app.get('/data', log, (req, res) => {
    res.send({ data: req.mydata })
})

app.post('/data', (req, res) => {
    console.log(req.body)
    res.send({ message: 'ok' })
})

export const start = () => {
    app.listen(4500, () => {
        console.log('server is on 4500')
    })
}
