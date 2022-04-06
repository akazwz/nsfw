import express, { Request, Response } from 'express'
import multer from 'multer'
import axios from 'axios'
import * as tf from '@tensorflow/tfjs-node'
import * as nsfwService from './nsfw.service'

const upload = multer()
export const nsfwRouter = express.Router()

// file
nsfwRouter.get('/file', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(200).send('no file')
    }
    const image: any = await tf.node.decodeImage(req.file.buffer, 3)
    const result = await nsfwService.detectiveUrl(image)
    res.status(200).send(result)
  } catch (e: any) {
    console.log(e)
    res.status(500).send(e.message)
  }
})

// url
nsfwRouter.get('/url', async (req: Request, res: Response) => {
  try {
    const { url } = req.query

    if (typeof url !== 'string') {
      return res.status(400).send('params error')
    }

    const pic = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const image: any = await tf.node.decodeImage(pic.data, 3)
    const result = await nsfwService.detectiveUrl(image)
    res.status(200).send(result)
  } catch (e: any) {
    console.log(e)
    res.status(500).send(e.message)
  }
})


