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

  constructor(url: string) {
    this.socket = io(url);
    this.socket.on('message', (data: any) => this.data$.next(data));
  }

  /**
   * @param args
   */
  send(args: any | any[]): void {
    if (args instanceof Array) {
      this.socket.send(...args);
    } else {
      this.socket.send(args);
    }
  }

  /**
   * @param args
   */
  emit(event: string, args: any | any[]): void {
    if (args instanceof Array) {
      this.socket.emit(event, ...args);
    } else {
      this.socket.emit(event, args);
    }
  }

  close(): void {
    this.socket.close();
    this.data$.complete();
  }
}
