import {
  Server,
  ServerCredentials,
  ServerUnaryCall,
  handleUnaryCall,
  sendUnaryData,
} from "@grpc/grpc-js";

/**
 * Uncomment the Template Server and add the node module definitions for the Server.
 * Uncomment the server addition in the `getServer` function to start using said templated server.
 * Update the `appName` in the globals
 */
// const templateServer: TemplateServer = {
//   // Empty and ServiceVersion should be defined in the TemplateServer Module Contract.
//   getVersion: unaryErrorHandler(function getVersion(
//     _call: ServerUnaryCall<Empty, ServiceVersion>,
//     callback: sendUnaryData<ServiceVersion>,
//   ) {
//     const result: ServiceVersion = { version };
//     callback(null, result);
//   }),
// };

/**
 * TODO: add config and `get` from local env -- best practice for pulling for AWS param store if need be.
 */
const grpcPort = "4002";

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new Server();
  // TODO: add proto schema
  // server.addService(TemplateServer, templateServer);
  // addReflection(server, `./node_modules/@template/${globals.appName}/dist/descriptor_set.bin`);
  return server;
}

export function startServer(port: string): Promise<Server> {
  return new Promise((resolve, reject) => {
    const myServer = getServer();
    myServer.bindAsync(port, ServerCredentials.createInsecure(), (error) => {
      if (error) {
        return reject(error);
      }
      myServer.start();
      console.info("gRPC Server started on", port); // eslint-disable-line  no-console
      resolve(myServer);
    });
  });
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  // console.info("Starting gRPC server on", configSchema.get("server.grpcPort")); // eslint-disable-line  no-console
  // void startServer(`0.0.0.0:${configSchema.get("server.grpcPort")}`).catch(
  //   (error) => console.error(`gRPC server error: ${error?.stack}`) // eslint-disable-line  no-console
  // );
  console.info("Starting gRPC server on", grpcPort); // eslint-disable-line  no-console
  void startServer(`0.0.0.0:${grpcPort}`).catch(
    (error) => console.error(`gRPC server error: ${error?.stack}`) // eslint-disable-line  no-console
  );
}
