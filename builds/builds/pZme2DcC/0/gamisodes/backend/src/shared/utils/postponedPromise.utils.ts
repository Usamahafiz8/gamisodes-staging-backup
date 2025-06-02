export const postponedPromise = <T>(
  callback: () => T | Promise<T>,
  milliseconds: number
) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(await callback());
      } catch (err) {
        reject(err);
      }
    }, milliseconds);
  });
