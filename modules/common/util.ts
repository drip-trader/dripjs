export async function sleep(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve: Function) => {
    setTimeout(resolve, milliseconds);
  });
}
