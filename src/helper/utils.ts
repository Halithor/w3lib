import { doAfter } from "../handles";

export function throttle<A extends any[]>(
  timeout: number,
  callback: (...args: A) => void,
): (...args: A) => void {
  let throttled = false;
  return (...args: A) => {
    if (throttled) {
      return;
    }
    throttled = true;
    doAfter(timeout, () => (throttled = false));
    callback(...args);
  };
}
