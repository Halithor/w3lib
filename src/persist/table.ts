import { decode, encode, Entry } from "./buffer";
import { DecodeError } from "./error";
import { Serializer } from "./serializer";

export interface Record<T> {
  id: number;
  serializer: Serializer<T>;
}

export function newRecord<T>(id: number, serializer: Serializer<T>): Record<T> {
  return {
    id,
    serializer,
  };
}

export class Table {
  entries: Entry[];

  constructor(blob: string) {
    const entries = decode(blob);
    if (entries === null) {
      throw new DecodeError();
    }

    this.entries = entries;
  }

  toString(): string {
    return encode(this.entries);
  }

  get<T>(record: Record<T>): T | null {
    const entry = this.find(record);
    if (entry === null) {
      return null;
    }

    return record.serializer.decode(entry.value);
  }

  set<T>(record: Record<T>, value: T) {
    const asString = record.serializer.encode(value);

    const entry = this.find(record);
    if (entry !== null) {
      entry.value = asString;
    } else {
      this.entries.push({
        key: record.id,
        value: asString,
      });
    }
  }

  private find(record: Record<unknown>): Entry | null {
    for (const entry of this.entries) {
      if (entry.key === record.id) {
        return entry;
      }
    }

    return null;
  }
}
