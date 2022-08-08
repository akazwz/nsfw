import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'

import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'
import { nsfwRouter } from './nsfw/nsfw.router'
import { StartGrpc } from '../grpc/server'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/nsfw', nsfwRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
	StartGrpc()
})