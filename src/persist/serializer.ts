import { DecodeError } from "./error";
import { asNumber, asString, minWidth } from "./helper";

export interface Serializer<T> {
  accepts(value: unknown): value is T;
  encode(value: T): string;
  decode(value: string): T;
}

export const StringSerializer: Serializer<string> = {
  accepts(value: unknown) {
    return typeof value === "string";
  },

  encode(value: string): string {
    return value;
  },

  decode(value: string): string {
    return value;
  },
};

export const NumberSerializer: Serializer<number> = {
  accepts(value: unknown) {
    return typeof value === "number";
  },

  encode(value: number): string {
    return asString(value, minWidth(value));
  },

  decode(value: string): number {
    return asNumber(value);
  },
};

class UnionSerializer<T> implements Serializer<T> {
  private serializers: readonly Serializer<unknown>[];

  constructor(serializers: readonly Serializer<unknown>[]) {
    this.serializers = serializers;
  }

  accepts(value: unknown): value is T {
    return this.serializers.some((serializer) => serializer.accepts(value));
  }

  encode(value: T): string {
    for (const serializer of this.serializers) {
      if (serializer.accepts(value)) {
        return serializer.encode(value);
      }
    }

    throw new DecodeError();
  }

  decode(value: string): T {
    for (const serializer of this.serializers) {
      try {
        return serializer.decode(value) as T;
      } catch {
        // Do nothing. Try the next serializer.
      }
    }

    throw new DecodeError();
  }
}

export type { UnionSerializer };

type Serializers<A extends readonly Serializer<unknown>[]> =
  A[number] extends Serializer<infer U> ? U : never;

export function unionSerializer<const A extends readonly Serializer<unknown>[]>(
  serializers: A,
): UnionSerializer<Serializers<A>> {
  return new UnionSerializer(serializers);
}
