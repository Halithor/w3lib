import { NumberSerializer, Serializer } from "./serializer";

export interface BitfieldSerializer<
  Names extends readonly string[],
> extends Serializer<Bitfield<Names>> {
  create(value?: number): Bitfield<Names>;
}

export function isBitfieldSerializer(
  serializer: Serializer<unknown>,
): serializer is BitfieldSerializer<readonly string[]> {
  return typeof (serializer as { create?: unknown }).create === "function";
}

export function bitfield<const Names extends readonly string[]>(
  ...names: Names
): BitfieldSerializer<Names> {
  return {
    create(value: number = 0): Bitfield<Names> {
      const state = { value };

      const bitfield: { [key: string]: unknown } = {
		__isBitfield: true,
        valueOf: () => state.value,
      };

      names.forEach((name, index) => {
        const bit = 1 << index;
        const title = name.charAt(0).toUpperCase() + name.slice(1);

        bitfield[`get${title}`] = () => (state.value & bit) !== 0;
        bitfield[`set${title}`] = () => (state.value |= bit);
        bitfield[`clear${title}`] = () => (state.value &= ~bit);
        bitfield[`toggle${title}`] = () => (state.value ^= bit);
      });

      return bitfield as Bitfield<Names>;
    },

    accepts(value: unknown): value is Bitfield<Names> {
      return typeof value === "object" && value !== null && (value as Bitfield<Names>).__isBitfield;
    },

    encode(value: Bitfield<Names>): string {
      return NumberSerializer.encode(value.valueOf());
    },

    decode(value: string): Bitfield<Names> {
      return this.create(NumberSerializer.decode(value));
    },
  };
}

export type Bitfield<Names extends readonly string[] = readonly string[]> = {
  __isBitfield: boolean;
  valueOf(): number;
} & {
  [N in Names[number] as `get${Capitalize<N>}`]: () => boolean;
} & {
  [N in Names[number] as `set${Capitalize<N>}`]: () => void;
} & {
  [N in Names[number] as `clear${Capitalize<N>}`]: () => void;
} & {
  [N in Names[number] as `toggle${Capitalize<N>}`]: () => void;
};
