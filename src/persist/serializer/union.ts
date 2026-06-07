import { DecodeError } from "../error";
import { Serializer } from "./index";

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
