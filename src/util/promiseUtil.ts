export function promisifyCallback(callback: Function, ...params: any) {
  let resolve: Function, reject: Function;
  const promise = new Promise((res, rej) => ((resolve = res), (reject = rej)));

  params = params || [];
  params.push(function (err: object, done: Function) {
    if (err) return reject(err);
    resolve(done);
  });

  console.log("callback", callback);

  if (typeof callback === "function") callback(...params);

  return promise;
}
