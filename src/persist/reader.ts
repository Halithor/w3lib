import { DecodeError } from "./error";

export class Reader {
  index: number = 0;
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  mustRead(count: number): string {
    const value = this.read(count);
    if (value.length !== count) {
      throw new DecodeError();
    }

    return value;
  }

  read(count: number): string {
    const start = this.index;

    this.index = Math.min(this.value.length, this.index + count);

    return this.value.slice(start, this.index);
  }

  remaining(): number {
    return this.value.length - this.index;
  }
}
