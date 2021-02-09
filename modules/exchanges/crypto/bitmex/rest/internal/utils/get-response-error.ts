/**
 * 获取bitmex的rest请求错误消息
 * @param err
 */
export function getResponseError(err: { [attr: string]: any }): Error | undefined {
  if (err) {
    if (err.response) {
      if (err.response.data && err.response.data.error) {
        const resError = err.response.data.error as Error;

        // @ts-ignore
        return new Error(resError ? resError.message : resError);
      } else {
        return new Error(err.message);
      }
    }

    return err as Error;
  }
}
