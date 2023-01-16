"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryWriter = void 0;
/**
 * Packs primitive types into a binary string.
 *
 * @example
 * ```ts
 * // Write the values
 * const writer = new BinaryWriter();
 * writer.writeUInt8(5);
 * writer.writeUInt8(32);
 * writer.writeUInt8(78);
 * writer.writeUInt8(200);
 * writer.writeUInt32(12345678);
 * writer.writeString("hello");
 * writer.writeUInt16(45000);
 *
 * // Read the values
 * const binaryString = writer.toString();
 * const reader = new BinaryReader(binaryString);
 * const values: any[] = [];
 *
 * values[0] = reader.readUInt8(); // 5
 * values[1] = reader.readUInt8(); // 32
 * values[2] = reader.readUInt8(); // 78
 * values[3] = reader.readUInt8(); // 200
 * values[4] = reader.readUInt32(); // 12345678
 * values[5] = reader.readString(); // hello
 * values[6] = reader.readUInt16(); // 45000
 * ```
 */
class BinaryWriter {
    constructor() {
        this.values = [];
        this.fmj = ">";
    }
    toString() {
        return string.pack(this.fmj, ...this.values);
    }
    writeDouble(value) {
        this.fmj += "d";
        this.values.push(value);
    }
    writeFloat(value) {
        this.fmj += "f";
        this.values.push(value);
    }
    writeInt16(value) {
        this.fmj += "h";
        this.values.push(value);
    }
    writeInt32(value) {
        this.fmj += "i4";
        this.values.push(value);
    }
    writeInt8(value) {
        this.fmj += "b";
        this.values.push(value);
    }
    writeString(value) {
        this.fmj += "z";
        this.values.push(value);
    }
    writeUInt16(value) {
        this.fmj += "H";
        this.values.push(value);
    }
    writeUInt32(value) {
        this.fmj += "I4";
        this.values.push(value);
    }
    writeUInt8(value) {
        this.fmj += "B";
        this.values.push(value);
    }
}
exports.BinaryWriter = BinaryWriter;
//# sourceMappingURL=binarywriter.js.map