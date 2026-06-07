import { decode, encode, Entry } from "./buffer";

export interface Key<T> {
  id: number;

  encode(value: T): string;
  decode(value: string): T;
}

export class Table {
  entries: Entry[];

  constructor(blob: string) {
    const entries = decode(blob);
    if (entries === null) {
      throw new Error("TODO");
    }

    this.entries = entries;
  }

  toString(): string {
    return encode(this.entries);
  }

  get<T>(key: Key<T>): T | null {
    const entry = this.find(key);
    if (entry === null) {
      return null;
    }

    return key.decode(entry.value);
  }

  set<T>(key: Key<T>, value: T) {
    const asString = key.encode(value);

    const entry = this.find(key);
    if (entry !== null) {
      entry.value = asString;
    } else {
      this.entries.push({
        key: key.id,
        value: asString,
      });
    }
  }

  private find(key: Key<unknown>): Entry | null {
    for (const entry of this.entries) {
      if (entry.key === key.id) {
        return entry;
      }
    }

    return null;
  }
}
