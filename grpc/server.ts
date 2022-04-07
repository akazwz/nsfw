import { loadProto } from './proto'
import * as tf from '@tensorflow/tfjs-node'
import * as nsfwService from '../src/nsfw/nsfw.service'

const grpc = require('@grpc/grpc-js')

let cnt = 1

function sayHello(call: any, callback: any) {
  callback(null, { message: `[${cnt++}] Hello: ` + call.request.message })
}

async function classifyImage(call: any, callback: any) {
  const { image } = call.request
  try {
    const img: any = tf.node.decodeImage(image, 3)
    const result = await nsfwService.detectiveUrl(img)
    const { drawing, hentai, neutral, porn, sexy } = result
    callback(null, {
      drawing: drawing,
      hentai: hentai,
      neutral: neutral,
      porn: porn,
      sexy: sexy,
    })
  } catch (e) {
    console.log(e)
    callback(null, {
      drawing: 0,
      hentai: 0,
      neutral: 0,
      porn: 0,
      sexy: 0,
    })
  }
}

export function StartGrpc() {
  const server = new grpc.Server()
  const helloProto = loadProto('hello')
  const nsfwProto = loadProto('nsfw')
  server.addService(helloProto.Greeter.service, { sayHello: sayHello })
  server.addService(nsfwProto.Classify.service, { ClassifyImage: classifyImage })
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
      console.log('grpc server started')
    }
  )
}

