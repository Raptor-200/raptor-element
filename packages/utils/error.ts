import { isString } from "lodash-es";

class RaUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "RaUIError";
  }
}
function createRaUIError(scope: string, msg: string) {
  return new RaUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createRaUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createRaUIError(scope, msg!) : scope;
    console.warn(err);
  }
}