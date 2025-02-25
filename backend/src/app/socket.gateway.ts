export type Payload = {
  type: 'error' | 'success'
  text: string
}

export abstract class SocketGateway {
  abstract sendMessageToAll(payload: Payload): void
  abstract sendMessageToUser(userId: string, payload: Payload): void
}
