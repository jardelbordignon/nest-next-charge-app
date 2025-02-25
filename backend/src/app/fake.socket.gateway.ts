import { Payload, SocketGateway } from './socket.gateway'
import type {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets'

export class FakeSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SocketGateway
{
  public server: any
  private logger: any
  private events: { [event: string]: (data: any) => void } = {}

  emit(event: string, data: any) {
    if (this.events[event]) {
      this.events[event](data)
    }
  }

  on(event: string, callback: (data: any) => void) {
    this.events[event] = callback
  }

  afterInit(server: any) {
    console.log('initialized', server)
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('connected', client, args)
  }

  handleDisconnect(client: any) {
    console.log('disconnected', client)
  }

  sendMessageToAll(payload: Payload): void {
    console.log(payload)
  }

  sendMessageToUser(userId: string, payload: Payload): void {
    console.log(userId, payload)
  }
}
