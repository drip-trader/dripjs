import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as io from 'socket.io-client';

export class SocketIORxjs<T = any> {
  readonly socket: SocketIOClient.Socket;
  private readonly data$ = new ReplaySubject<T>(1);
  private readonly opened$ = new ReplaySubject<boolean>(1);

  /**
   * message stream
   */
  get message$(): Observable<T> {
    return this.data$.asObservable();
  }

  constructor(url: string) {
    this.socket = io(url);
    this.socket.on('connect', () => {
      this.opened$.next(true);
    });
    this.socket.on('connect_timeout', () => {
      this.opened$.next(false);
    });
    this.socket.on('connect_error', () => {
      this.opened$.next(false);
    });
    this.socket.on('disconnect', () => {
      this.opened$.next(false);
    });
    this.socket.on('error', () => {
      this.opened$.next(false);
    });
    this.socket.on('message', (data: any) => this.data$.next(data));
  }

  /**
   * @param args
   */
  send(args: any | any[]): void {
    // wait until socket open and send the text only once per call
    this.opened$
      .pipe(
        take(1),
        filter((opened) => opened),
      )
      .subscribe(() => {
        if (args instanceof Array) {
          this.socket.send(...args);
        } else {
          this.socket.send(args);
        }
      });
  }

  /**
   * @param args
   */
  emit(event: string, args: any | any[]): void {
    // wait until socket open and send the text only once per call
    this.opened$
      .pipe(
        take(1),
        filter((opened) => opened),
      )
      .subscribe(() => {
        if (args instanceof Array) {
          this.socket.emit(event, ...args);
        } else {
          this.socket.emit(event, args);
        }
      });
  }

  close(): void {
    this.socket.close();
    this.data$.complete();
  }
}
