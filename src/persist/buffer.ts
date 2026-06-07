import { asNumber, asString } from "./helper";
import { Reader } from "./reader";

export interface Entry {
  key: number;
  value: string;
}

const keyLength = 2;
const payloadLength = 2;

export function encode(entries: Entry[]): string {
  let result = "";
  for (const entry of entries) {
    result += asString(entry.key, keyLength);
    result += asString(entry.value.length, payloadLength);
    result += entry.value;
  }

  return result;
}

export function decode(value: string): Entry[] | null {
  const reader = new Reader(value);

  const entries: Entry[] = [];
  while (true) {
    let entry: Entry | null;
    try {
      entry = decodeNextEntry(reader);
    } catch {
      return null;
    }

    if (entry === null) {
      break;
    }

    entries.push(entry);
  }

  return entries;
}

function decodeNextEntry(reader: Reader): Entry | null {
  const rawKey = reader.read(keyLength);
  if (rawKey.length === 0) {
    return null;
  }

  if (rawKey.length !== keyLength) {
    throw new Error("TODO");
  }

  const length = asNumber(reader.mustRead(payloadLength));

  return {
    key: asNumber(rawKey),
    value: reader.mustRead(length),
  };
}
