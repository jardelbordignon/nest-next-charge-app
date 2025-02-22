/* eslint-disable */
export declare global {
  import { Api } from 'test/api'
  declare module globalThis {
    var api: Api
    var apiHost: string;
  }
}