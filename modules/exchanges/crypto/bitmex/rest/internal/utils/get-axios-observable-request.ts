import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, Observer, Subject } from 'rxjs';

import { getRateLimit } from '../../../common';
import { getResponseError } from './get-response-error';

/**
 * axios转rx方法
 * 目的：检知超时请求，处理为5秒超时
 *
 * @param url 请求url
 * @param remaining$ 余额可观察对象
 * @param config 其他配置
 */
export function getAxiosObservableRequest<T>(
  url: string,
  remaining$: Subject<number>,
  config?: AxiosRequestConfig,
): Observable<AxiosResponse<T>> {
  return new Observable((observer: Observer<AxiosResponse<T>>) => {
    const cancelToken = Axios.CancelToken.source();
    const cancelTokenConfig = { cancelToken: cancelToken.token, timeout: 5000 };
    Axios(url, config ? { ...cancelTokenConfig, ...config } : cancelTokenConfig).then(
      (result) => {
        const amount = getRateLimit(result.headers).remaining;
        // 更新可用余额
        remaining$.next(amount);
        observer.next(result);
        observer.complete();
      },
      (error) => (Axios.isCancel(error) ? observer.complete() : observer.error(getResponseError(error))),
    );
  });
}
