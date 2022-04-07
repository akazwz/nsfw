const grpc = require('@grpc/grpc-js')
const hello_proto = require('./proto')

let cnt = 1

function sayHello(call: any, callback: any) {
  callback(null, { message: `[${cnt++}] echo: ` + call.request.message })
}

export function StartGrpc() {
  const server = new grpc.Server()
  server.addService(hello_proto.Greeter.service, { sayHello: sayHello })
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
      console.log('grpc server started')
    }
  )
}

