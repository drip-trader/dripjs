import { HttpMethod } from '@dripjs/types';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Subject } from 'rxjs';

import { getAxiosObservableRequest } from './get-axios-observable-request';

const mock = new MockAdapter(Axios);

describe('getAxiosObservableRequest', () => {
  const remaining$ = new Subject<number>();
  it('should request timeout', async () => {
    mock.onPost().timeout();
    await expect(getAxiosObservableRequest('wwwsdfdsf', remaining$, { method: HttpMethod.POST }).toPromise()).rejects.toEqual(
      new Error('timeout of 5000ms exceeded'),
    );
  });
});
