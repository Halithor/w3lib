import { DecodeError } from "./error";

export function asNumber(value: string): number {
  let result = 0;
  for (let i = 0; i < value.length; i++) {
    result <<= 8;
    result |= value.charCodeAt(i);
  }

  return result;
}

export function asString(value: number, width: number): string {
  if (value >= Math.pow(2, width * 8)) {
    throw new DecodeError();
  }

  let result = "";
  for (let i = width - 1; i >= 0; i--) {
    result += String.fromCharCode((value >> (i * 8)) & 0xff);
  }

  return result;
}

export function minWidth(value: number): number {
  return Math.ceil(value / 0xff);
}
