import { HttpMethod } from '@dripjs/types';
import { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { Observable, Subject, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { getRestAuthHeaders } from '../../common';
import { Config } from '../../types';
import { MAX_REMAINING_NUM, PrivateEndPoints, PublicEndPoints, apiBasePath, endpoints } from '../constants';
import { RestResponse } from '../types';
import { getAxiosObservableRequest, getRestResponse, validateRemaining } from './utils';

export class RestInsider {
  /**可用请求数 */
  private remaining = MAX_REMAINING_NUM;
  private readonly remaining$: Subject<number>;

  constructor(private readonly config: Config, private readonly endpoint: PrivateEndPoints | PublicEndPoints, remaining$: Subject<number>) {
    if (!this.config.apiKey || this.config.apiKey === 'undefined') {
      this.config.apiKey = '';
    }
    if (!this.config.apiSecret || this.config.apiSecret === 'undefined') {
      this.config.apiSecret = '';
    }
    remaining$.subscribe((amount) => (this.remaining = amount));
    this.remaining$ = remaining$;
  }

  request<T>(method: HttpMethod, data: any): Observable<RestResponse<T>> {
    return this.requestWithEndpoint(this.endpoint, method, data);
  }

  protected requestWithEndpoint<T>(
    endpoint: PrivateEndPoints | PublicEndPoints,
    method: HttpMethod,
    data: any,
  ): Observable<RestResponse<T>> {
    try {
      validateRemaining(this.remaining);
      const authHeaders = getRestAuthHeaders(method, endpoint, this.config.apiKey, this.config.apiSecret, data);
      const request: AxiosRequestConfig = {
        method,
        headers: { ...authHeaders },
      };
      let query = '';
      if (method !== HttpMethod.GET) {
        request.data = data;
      } else {
        query = Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
      }
      const baseUrl = this.config.testnet ? endpoints.testnet : endpoints.production;
      const url = `${baseUrl}${apiBasePath}${endpoint}${query}`;

      return getAxiosObservableRequest<T>(url, this.remaining$, request).pipe(
        filter((o) => !!o),
        map(getRestResponse),
      );
    } catch (error) {
      return throwError(error);
    }
  }
}
