import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

export class SocketIORxjs<T = any> {
  readonly socket: SocketIOClient.Socket;
  private readonly data$ = new Subject<T>();

  /**
   * message stream
   */
  get message$(): Observable<T> {
    return this.data$.asObservable();
  }

  constructor(url: string, opts?: SocketIOClient.ConnectOpts) {
    this.socket = io(url, opts);
    this.socket.on('message', (data: any) => this.data$.next(data));
  }

  next(data: any): void {
    this.data$.next(data);
  }

  /**
   * @param args
   */
  send(...args: any[]): void {
    this.socket.send(...args);
  }

  /**
   * @param event
   * @param args
   */
  emit(event: string, ...args: any[]): void {
    this.socket.emit(event, ...args);
  }

  close(): void {
    this.socket.close();
    this.data$.complete();
  }
}
