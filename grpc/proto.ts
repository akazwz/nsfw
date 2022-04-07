const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, 'hello.proto')
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const hello_proto = protoDescriptor.hello

module.exports = hello_proto