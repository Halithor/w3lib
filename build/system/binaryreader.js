"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryReader = void 0;
/**
 * Reads primitive types from a packed binary string.
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
class BinaryReader {
    constructor(binaryString) {
        this.pos = 1;
        this.data = binaryString;
    }
    read(fmt, size) {
        const unpacked = string.unpack(fmt, this.data, this.pos);
        this.pos += size;
        if (unpacked.length <= 0) {
            return 0;
        }
        return unpacked[0];
    }
    readDouble() {
        return this.read('>d', 4);
    }
    readFloat() {
        return this.read('>f', 4);
    }
    readInt16() {
        return this.read('>h', 2);
    }
    readInt32() {
        return this.read('>i4', 4);
    }
    readInt8() {
        return this.read('>b', 1);
    }
    readString() {
        const value = this.read('>z', 0);
        this.pos += value.length + 1;
        return value;
    }
    readUInt16() {
        return this.read('>H', 2);
    }
    readUInt32() {
        return this.read('>I4', 4);
    }
    readUInt8() {
        return this.read('>B', 1);
    }
}
exports.BinaryReader = BinaryReader;
//# sourceMappingURL=binaryreader.js.map