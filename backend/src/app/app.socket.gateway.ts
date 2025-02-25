import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AllowUnauthenticated } from '@/infra/providers/authentication/authentication.guard'
import { type Payload, SocketGateway } from './socket.gateway'

@AllowUnauthenticated()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['content-type'],
  },
})
export class AppSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SocketGateway
{
  @WebSocketServer() server: Server | undefined

  private logger = new Logger(AppSocketGateway.name)

  @SubscribeMessage('msgToServer')
  // sendMessage(client: Socket, payload: Payload): void {
  //   this.server?.emit('msgToClient', payload, client.id)
  // }
  sendMessageToAll(payload: Payload) {
    this.server?.emit('msgToClient', payload)
  }

  sendMessageToUser(userId: string, payload: Payload) {
    this.server?.emit(`msgToClient-${userId}`, payload)
  }

  afterInit() {
    this.logger.log('Init')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
}
