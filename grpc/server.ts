import { loadProto } from './proto'
import * as tf from '@tensorflow/tfjs-node'
import * as nsfwService from '../src/nsfw/nsfw.service'

const grpc = require('@grpc/grpc-js')

let cnt = 1

function sayHello(call: any, callback: any) {
  callback(null, { message: `[${cnt++}] echo: ` + call.request.message })
}

async function classifyImage(call: any, callback: any) {
  const { image } = call.request
  try {
    const img: any = tf.node.decodeImage(image, 3)
    const result = await nsfwService.detectiveUrl(img)
    callback(null, { message: result })
  } catch (e) {
    callback(null, { message: 'classify error' })
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

