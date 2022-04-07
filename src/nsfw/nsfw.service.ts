import * as tf from '@tensorflow/tfjs-node'
import { Tensor3D } from '@tensorflow/tfjs-node'
import * as nsfwjs from 'nsfwjs'

tf.enableProdMode()

export interface ClassifyRes {
  drawing: number,
  hentai: number,
  neutral: number,
  porn: number,
  sexy: number,
}

export const detectiveUrl = async (imgBuffer: Tensor3D): Promise<ClassifyRes> => {
  let res: ClassifyRes = {
    drawing: 0,
    hentai: 0,
    neutral: 0,
    porn: 0,
    sexy: 0,
  }
  try {
    const model = await nsfwjs.load('file://src/model/', { size: 299 })
    const predictions = await model.classify(imgBuffer)

    predictions.map((item) => {
      switch (item.className) {
        case 'Drawing':
          res.drawing = item.probability
          break
        case 'Hentai':
          res.hentai = item.probability
          break
        case 'Neutral':
          res.neutral = item.probability
          break
        case 'Porn':
          res.porn = item.probability
          break
        case 'Sexy':
          res.sexy = item.probability
          break
      }
    })
    return res
  } catch (e: any) {
    console.log(e)
    return res
  }
}
