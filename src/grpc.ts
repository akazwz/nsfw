import * as grpc from '@grpc/grpc-js'
import axios from 'axios';
import {PredictorServiceService,PredictorServiceServer, ClassifyRequest, ClassifyResponse} from '../src/gen/nsfw/v1/nsfw'
import { classify } from './classify';

export const GRPC_PORT = 9090

export const server = new grpc.Server()

class ServiceImpl implements PredictorServiceServer {
    [key: string]: any;
    classify: grpc.handleUnaryCall<ClassifyRequest, ClassifyResponse> = async (call, callback) => {
        try {
            let data: Uint8Array
            switch (true) {
                case call.request.image !== undefined:
                    data = call.request.image
                    break
                case call.request.imageUrl !== undefined:
                    const response = await axios.get(call.request.imageUrl, { responseType: 'arraybuffer' })
                    data = response.data
                    break
                default:
                    throw new Error('No image provided')
            }
            const predictions = await classify(data)
            const results = predictions.map(p => ({
                label: p.className,
                probability: p.probability
            }))
            callback(null, ClassifyResponse.create({
                results: results
            }))
        } catch (error:any) {
            callback(error, null)
        }
    }
}

server.addService(PredictorServiceService,new ServiceImpl())


server.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`grpc server listening on port ${port}`)
})
