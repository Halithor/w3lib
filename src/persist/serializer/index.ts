export interface Serializer<T> {
  accepts(value: unknown): value is T;
  encode(value: T): string;
  decode(value: string): T;
}

export { StringSerializer } from "./string";
export { NumberSerializer } from "./number";
export { unionSerializer, type UnionSerializer } from "./union";
