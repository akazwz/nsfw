const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

export const loadProto = (name: string) => {
	const PROTO_PATH = path.join('../protos/', `${name}.proto`)
	const options = {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	}

	const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
	const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
	return protoDescriptor[name]
}




