import { Observable, concat } from 'rxjs';
import { filter, map, scan, take } from 'rxjs/operators';

import { WebsocketData } from '../websocket-insider';

export function transformSourceData<T, U>(params: {
  source$: Observable<WebsocketData<T>>;
  update?: (originSource: WebsocketData<T>, updateSource: WebsocketData<T>) => WebsocketData<T>;
  transform: (source: WebsocketData<T>) => U;
}): Observable<U> {
  const { source$, update, transform } = params;
  /*?
   * Make sure 'partial' come first and then 'insert' 'update' 'delete'
   */
  const snapshot$ = source$.pipe(
    filter((orderbookData) => orderbookData.action === 'partial'),
    take(1),
  );
  const update$ = source$.pipe(
    filter((orderbookData) => orderbookData.action === 'update' || orderbookData.action === 'insert' || orderbookData.action === 'delete'),
  );

  return update
    ? concat(snapshot$, update$).pipe(
        scan(update),
        map(transform),
      )
    : snapshot$.pipe(map(transform));
}
