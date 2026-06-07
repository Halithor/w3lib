import { Serializer } from "./serializer";
import { newRecord, Table } from "./table";

export * from "./bitfield";
export * from "./serializer";

export function newStore<const Fields extends readonly Field[]>(
  blob: string,
  ...fields: Fields
): Store<Fields> {
  const table = new Table(blob);

  const store: { [key: string]: unknown } = {
    toString: () => table.toString(),
  };

  for (const [name, id, serializer] of fields) {
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    const accessor = bind(table, id, serializer);

    store[`get${title}`] = accessor.get;
    store[`set${title}`] = accessor.set;
  }

  return store as Store<Fields>;
}

function bind<T>(table: Table, id: number, serializer: Serializer<T>) {
  const record = newRecord(id, serializer);

  return {
    get: () => table.get(record),
    set: (value: T) => table.set(record, value),
  };
}

export type Store<Fields extends readonly Field[]> = {
  toString(): string;
} & {
  [F in Fields[number] as `get${Capitalize<F[0]>}`]: () => FieldType<F> | null;
} & {
  [F in Fields[number] as `set${Capitalize<F[0]>}`]: (
    value: FieldType<F>,
  ) => void;
};

type Field = readonly [name: string, id: number, serializer: Serializer<any>];

type FieldType<F> = F extends readonly [string, number, Serializer<infer T>]
  ? T
  : never;
