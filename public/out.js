(() => {
  // src/data/instructions.js
  var LDA_IM = 169;
  var LDA_ZP = 165;
  var LDA_ZPX = 181;
  var LDA_ABS = 173;
  var LDA_ABSX = 189;
  var LDA_ABSY = 185;
  var LDA_INDX = 161;
  var LDA_INDY = 177;
  var LDX_IM = 162;
  var LDX_ZP = 166;
  var LDX_ZPY = 182;
  var LDX_ABS = 174;
  var LDX_ABSY = 190;
  var LDY_IM = 160;
  var LDY_ZP = 164;
  var LDY_ZPX = 180;
  var LDY_ABS = 172;
  var LDY_ABSX = 188;
  var STA_ZP = 133;
  var STA_ZPX = 149;
  var STA_ABS = 141;
  var STA_ABSX = 157;
  var STA_ABSY = 153;
  var STA_INDX = 129;
  var STA_INDY = 145;
  var STX_ZP = 134;
  var STX_ZPY = 150;
  var STX_ABS = 142;
  var STY_ZP = 132;
  var STY_ZPX = 148;
  var STY_ABS = 140;
  var TSX = 186;
  var TXS = 154;
  var PHA = 72;
  var PLA = 104;
  var PHP = 8;
  var PLP = 40;
  var JMP_ABS = 76;
  var JMP_IND = 108;
  var JSR = 32;
  var RTS = 96;
  var AND_IM = 41;
  var AND_ZP = 37;
  var AND_ZPX = 53;
  var AND_ABS = 45;
  var AND_ABSX = 61;
  var AND_ABSY = 57;
  var AND_INDX = 33;
  var AND_INDY = 49;
  var ORA_IM = 9;
  var ORA_ZP = 5;
  var ORA_ZPX = 21;
  var ORA_ABS = 13;
  var ORA_ABSX = 29;
  var ORA_ABSY = 25;
  var ORA_INDX = 1;
  var ORA_INDY = 17;
  var EOR_IM = 73;
  var EOR_ZP = 69;
  var EOR_ZPX = 85;
  var EOR_ABS = 77;
  var EOR_ABSX = 93;
  var EOR_ABSY = 89;
  var EOR_INDX = 65;
  var EOR_INDY = 81;
  var BIT_ZP = 36;
  var BIT_ABS = 44;
  var TAX = 170;
  var TAY = 168;
  var TXA = 138;
  var TYA = 152;
  var INX = 232;
  var INY = 200;
  var DEY = 136;
  var DEX = 202;
  var DEC_ZP = 198;
  var DEC_ZPX = 214;
  var DEC_ABS = 206;
  var DEC_ABSX = 222;
  var INC_ZP = 230;
  var INC_ZPX = 246;
  var INC_ABS = 238;
  var INC_ABSX = 254;
  var BEQ = 240;
  var BNE = 208;
  var BCS = 176;
  var BCC = 144;
  var BMI = 48;
  var BPL = 16;
  var BVC = 80;
  var BVS = 112;
  var CLC = 24;
  var SEC = 56;
  var CLD = 216;
  var SED = 248;
  var CLI = 88;
  var SEI = 120;
  var CLV = 184;
  var ADC = 105;
  var ADC_ZP = 101;
  var ADC_ZPX = 117;
  var ADC_ABS = 109;
  var ADC_ABSX = 125;
  var ADC_ABSY = 121;
  var ADC_INDX = 97;
  var ADC_INDY = 113;
  var SBC = 233;
  var SBC_ABS = 237;
  var SBC_ZP = 229;
  var SBC_ZPX = 245;
  var SBC_ABSX = 253;
  var SBC_ABSY = 249;
  var SBC_INDX = 225;
  var SBC_INDY = 241;
  var CMP = 201;
  var CMP_ZP = 197;
  var CMP_ZPX = 213;
  var CMP_ABS = 205;
  var CMP_ABSX = 221;
  var CMP_ABSY = 217;
  var CMP_INDX = 193;
  var CMP_INDY = 209;
  var CPX = 224;
  var CPY = 192;
  var CPX_ZP = 228;
  var CPY_ZP = 196;
  var CPX_ABS = 236;
  var CPY_ABS = 204;
  var ASL = 10;
  var ASL_ZP = 6;
  var ASL_ZPX = 22;
  var ASL_ABS = 14;
  var ASL_ABSX = 30;
  var LSR = 74;
  var LSR_ZP = 70;
  var LSR_ZPX = 86;
  var LSR_ABS = 78;
  var LSR_ABSX = 94;
  var ROL = 42;
  var ROL_ZP = 38;
  var ROL_ZPX = 54;
  var ROL_ABS = 46;
  var ROL_ABSX = 62;
  var ROR = 106;
  var ROR_ZP = 102;
  var ROR_ZPX = 118;
  var ROR_ABS = 110;
  var ROR_ABSX = 126;
  var NOP = 234;
  var BRK = 0;
  var RTI = 64;

  // src/emulator/cpu.js
  var CARRY_FLAG_BIT = 1;
  var ZERO_FLAG_BIT = 2;
  var INTERRUPT_DISABLE_FLAG_BIT = 4;
  var DECIMAL_FLAG_BIT = 8;
  var BREAK_FLAG_BIT = 16;
  var UNUSED_FLAG_BIT = 32;
  var OVERFLOW_FLAG_BIT = 64;
  var NEGATIVE_FLAG_BIT = 128;
  var INITIAL_STATUS_REGISTER_VALUE = 32;
  var RANDOM_BYTE_ADDRESS = 254;
  var BYTE_REGISTER_NAMES = ["SP", "A", "X", "Y"];
  var FLAG_REGISTER_NAMES = ["C", "Z", "I", "D", "B", "Unused", "V", "N"];
  var Cpu = class {
    constructor(memory) {
      this.memory = memory;
      this.endAddress;
      this.statusFlags = 32;
      this.byteRegisters = createRegisters(BYTE_REGISTER_NAMES.length);
      this.wordRegisters = createRegisters(2);
    }
    //Sets the registers to default value, initialisez the memory with zero 
    reset(PCValue = 65532) {
      this.setRegister("A", 0);
      this.setRegister("X", 0);
      this.setRegister("Y", 0);
      this.setRegister("PC", PCValue);
      this.setRegister("SP", 511);
      this.statusFlags = INITIAL_STATUS_REGISTER_VALUE;
      this.memory.initialise();
      const newRandomByte = this.randomByte();
      this.memory.setByte(RANDOM_BYTE_ADDRESS, newRandomByte);
    }
    copyStateFromAnotherCpu(anotherCpu) {
      this.byteRegisters = anotherCpu.byteRegisters;
      this.wordRegisters = anotherCpu.wordRegisters;
      this.statusFlags = anotherCpu.statusFlags;
      this.endAddress = anotherCpu.endAddress;
    }
    modifyStatusFlags(position, newBit) {
      const mask = 1 << position;
      const modifiedFlags = this.statusFlags & ~mask | newBit << position & mask;
      return modifiedFlags;
    }
    //looks up the index of the given register(regName) in the correspondent register map and returns the value 
    //from the register Arraybuffer at the found index
    getRegister(regName) {
      const regIndex = BYTE_REGISTER_NAMES.indexOf(regName);
      if (regName == "PC") {
        return this.wordRegisters.getUint16(0);
      } else if (regIndex != -1) {
        return this.byteRegisters.getUint8(regIndex);
      }
      let isSet;
      switch (regName) {
        case "C":
          isSet = (CARRY_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "Z":
          isSet = (ZERO_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "I":
          isSet = (INTERRUPT_DISABLE_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "D":
          isSet = (DECIMAL_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "B":
          isSet = (BREAK_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "Unused":
          isSet = (UNUSED_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "V":
          isSet = (OVERFLOW_FLAG_BIT & this.statusFlags) > 0;
          break;
        case "N":
          isSet = (NEGATIVE_FLAG_BIT & this.statusFlags) > 0;
          break;
        default:
          isSet = void 0;
          break;
      }
      return isSet;
    }
    //looks up the index of the given register(regName) in the in the correspondent register map and 
    //sets the value of the register Arraybuffer at the found index
    setRegister(regName, newValue2) {
      const regIndex = BYTE_REGISTER_NAMES.indexOf(regName);
      if (regName == "PC") {
        this.wordRegisters.setUint16(0, newValue2);
      } else if (regIndex != -1) {
        this.byteRegisters.setUint8(regIndex, newValue2);
      } else if (FLAG_REGISTER_NAMES.includes(regName)) {
        const flagNameIndex = FLAG_REGISTER_NAMES.indexOf(regName);
        this.statusFlags = this.modifyStatusFlags(flagNameIndex, newValue2);
      }
    }
    //returns the instruction (byte) from memory based on the PC register and increments the PC register by 1
    fetchByte() {
      const instructionAddress = this.getRegister("PC");
      const instruction = this.memory.getByte(instructionAddress);
      this.setRegister("PC", instructionAddress + 1);
      return instruction;
    }
    //returns the instruction (word == 2 * byte) from memory based on the PC register and increments the PC register by 2
    fetchWord() {
      const instructionAddress = this.getRegister("PC");
      let data = this.memory.getByte(instructionAddress);
      const nextByte = this.memory.getByte(instructionAddress + 1) << 8;
      data |= nextByte;
      this.setRegister("PC", this.getRegister("PC") + 2);
      return data;
    }
    //returns a byte from memory at memoryAddress
    readByte(memoryAddress2) {
      let data = this.memory.getByte(memoryAddress2);
      return data;
    }
    //returns a word (2*byte) from memory at memoryAddress (and memoryAddress + 1)
    readWord(memoryAddress2) {
      const LowByte = this.readByte(memoryAddress2);
      const HighByte = this.readByte(memoryAddress2 + 1);
      return LowByte | HighByte << 8;
    }
    //overwrites the memory at given address with a given byte value
    writeByte(memoryAddress2, newValue2) {
      this.memory.setByte(memoryAddress2, newValue2);
    }
    //overwrites the memory at given address with a given word(2 * byte) value
    writeWord() {
      this.memory.setWord(memoryAddress, newValue);
    }
    addrZeroPageX() {
      let zeroPageAddr = this.fetchByte();
      zeroPageAddr += this.getRegister("X");
      if (zeroPageAddr > 255) {
        zeroPageAddr -= 255;
        zeroPageAddr -= 1;
      }
      return zeroPageAddr;
    }
    addrZeroPageY() {
      let zeroPageAddr = this.fetchByte();
      zeroPageAddr += this.getRegister("Y");
      if (zeroPageAddr > 255) {
        zeroPageAddr -= 255;
        zeroPageAddr -= 1;
      }
      return zeroPageAddr;
    }
    addrAbsolute() {
      let absAddress = this.fetchWord();
      return absAddress;
    }
    addrAbsoluteX(obj) {
      let absAddress = this.fetchWord();
      let absAddressX = absAddress + this.getRegister("X");
      const crossedPageBoundary = (absAddress ^ absAddressX) >> 8;
      if (crossedPageBoundary) {
        obj.cycles++;
      }
      return absAddressX;
    }
    addrAbsoluteY(obj) {
      let absAddress = this.fetchWord();
      let absAddressY = absAddress + this.getRegister("Y");
      const crossedPageBoundary = (absAddress ^ absAddressY) >> 8;
      if (crossedPageBoundary) {
        obj.cycles++;
      }
      return absAddressY;
    }
    addrIndirectX() {
      let zeroPageAddr = this.fetchByte();
      zeroPageAddr += this.getRegister("X");
      let effectiveAddr = this.readWord(zeroPageAddr);
      return effectiveAddr;
    }
    //Indirect indexed addressing by Y - CPU will first fetch the address stored at zero page location,
    //that address will be added to register Y to get the final target address 
    addrIndirectY(obj) {
      const zeroPageAddr = this.fetchByte();
      const effectiveAddr = this.readWord(zeroPageAddr);
      const effectiveAddrY = effectiveAddr + this.getRegister("Y");
      const crossedPageBoundary = (effectiveAddr ^ effectiveAddrY) >> 8;
      if (crossedPageBoundary) {
        obj.cycles++;
      }
      return effectiveAddrY;
    }
    SPToAddress() {
      return 256 | this.getRegister("SP");
    }
    pushByteToStack(value) {
      this.writeByte(this.SPToAddress(), value);
      this.setRegister("SP", this.getRegister("SP") - 1);
    }
    pushWordToStack(value) {
      this.writeByte(this.SPToAddress(), value >> 8);
      this.setRegister("SP", this.getRegister("SP") - 1);
      this.writeByte(this.SPToAddress(), value & 255);
      this.setRegister("SP", this.getRegister("SP") - 1);
    }
    pushPCToStack(offset = 0) {
      this.pushWordToStack(this.getRegister("PC") + offset);
    }
    pushPSToStack() {
      const PSStack = this.statusFlags | BREAK_FLAG_BIT | UNUSED_FLAG_BIT;
      this.pushByteToStack(PSStack);
    }
    popByteFromStack() {
      this.setRegister("SP", this.getRegister("SP") + 1);
      const address = this.SPToAddress();
      const value = this.memory.getByte(address);
      return value;
    }
    popWordFromStack() {
      const address = this.SPToAddress() + 1;
      const value = this.readWord(address);
      this.setRegister("SP", this.getRegister("SP") + 2);
      return value;
    }
    popPSFromStack() {
      this.statusFlags = this.popByteFromStack();
      this.setRegister("B", 0);
      this.setRegister("Unused", 0);
    }
    setZeroAndNegativeFlags(register) {
      let zero = register == 0 ? 1 : 0;
      this.setRegister("Z", zero);
      let negative = (register & NEGATIVE_FLAG_BIT) > 0 ? 1 : 0;
      this.setRegister("N", negative);
    }
    branchIf(flag, expected, obj) {
      const isFlag = this.getRegister(flag);
      const byte = this.fetchByte();
      if (isFlag == expected) {
        const oldPC = this.getRegister("PC");
        const offset = this.twosComplementToDecimal(byte);
        this.setRegister("PC", oldPC + offset);
        obj.cycles++;
        const PC = this.getRegister("PC");
        const isPageChanged = PC >> 8 != oldPC >> 8;
        if (isPageChanged) {
          obj.cycles++;
        }
      }
    }
    twosComplementToDecimal(number) {
      const numberBinaryVersion = number.toString(2).padStart(8, "0");
      const valuePart = numberBinaryVersion.substring(1);
      const signPart = numberBinaryVersion[0];
      let valueDecimal = parseInt(valuePart, 2);
      if (signPart == "1") {
        valueDecimal -= 128;
      }
      return valueDecimal;
    }
    //Adds the operand with carry to the accumulator
    addition(operand) {
      const isDecimalMode = this.getRegister("D");
      const CarryValue = this.getRegister("C");
      const ARegValue = this.getRegister("A");
      let isOverflow = false;
      let result;
      if (isDecimalMode) {
        let lowRes = (ARegValue & 15) + (operand & 15) + CarryValue;
        if (lowRes > 9) {
          lowRes += 6;
        }
        result = (ARegValue & 240) + (operand & 240) + lowRes;
        if (result > 159) {
          result += 96;
        }
        if (result < -128 || result > 127) {
          isOverflow = true;
        }
        this.setRegister("C", result > 99);
        this.setRegister("V", isOverflow);
      } else {
        result = this.getRegister("A");
        result += operand;
        if (CarryValue) {
          result += 1;
        }
        if (result > 127 || result < -128) {
          isOverflow = true;
        }
        this.setRegister("C", result > 255);
        this.setRegister("V", isOverflow);
        result = result & 255;
      }
      this.setZeroAndNegativeFlags(result & 255);
      this.setRegister("A", result);
    }
    //substracts the operand with carry from the accumulator
    substraction(operand) {
      const isDecimalMode = this.getRegister("D");
      if (isDecimalMode) {
        let aRegValue = this.getRegister("A");
        let result = this.bcdSubstraction(operand, aRegValue);
        this.setRegister("A", result);
        this.setZeroAndNegativeFlags(result & 255);
        let isOverflow = false;
        if (result < -128 || result > 127) {
          isOverflow = true;
        }
        this.setRegister("C", result <= 99);
        this.setRegister("V", isOverflow);
      } else {
        const newOperand = ~operand;
        this.addition(newOperand);
      }
    }
    ninesComplement(operand, reg) {
      let numberStringForm = operand.toString();
      let regStringForm = reg.toString();
      let ninesComplement;
      if (numberStringForm.length == 1 && regStringForm.length == 1) {
        ninesComplement = 9 - operand;
      } else {
        ninesComplement = 99 - operand;
      }
      return ninesComplement;
    }
    bcdSubstraction(operand, aRegValue) {
      const operandHexForm = operand.toString(16);
      const operandHexNumberForm = parseInt(operandHexForm);
      const aRegHexForm = aRegValue.toString(16);
      const aRegHexNumberForm = parseInt(aRegHexForm);
      const operandComplement = this.ninesComplement(operandHexNumberForm, aRegHexNumberForm);
      let substractionResult = aRegHexNumberForm + operandComplement + this.getRegister("C");
      let differenceStringForm = substractionResult.toString();
      if (differenceStringForm.length == 3) {
        substractionResult -= 100;
      } else if (operandHexForm.length == 1 && aRegHexForm.length == 1) {
        substractionResult -= 10;
      }
      differenceStringForm = "0x" + substractionResult.toString();
      substractionResult = parseInt(differenceStringForm);
      return substractionResult;
    }
    compareToRegister(operand, register) {
      const registerValue = this.getRegister(register);
      const temp = registerValue - operand;
      this.setRegister("N", (temp & NEGATIVE_FLAG_BIT) > 0 ? 1 : 0);
      this.setRegister("Z", registerValue == operand ? 1 : 0);
      this.setRegister("C", registerValue >= operand ? 1 : 0);
    }
    shiftLeft(operand) {
      const highestBitCheck = operand & NEGATIVE_FLAG_BIT;
      this.setRegister("C", highestBitCheck > 0 ? 1 : 0);
      const result = operand << 1;
      this.setZeroAndNegativeFlags(result);
      return result;
    }
    shiftRight(operand) {
      const lowestBitCheck = operand & 1;
      this.setRegister("C", lowestBitCheck > 0 ? 1 : 0);
      const result = operand >> 1;
      this.setZeroAndNegativeFlags(result);
      return result;
    }
    rotateLeft(operand) {
      const newBit = this.getRegister("C") ? 1 : 0;
      this.setRegister("C", (operand & NEGATIVE_FLAG_BIT) > 0 ? 1 : 0);
      operand = operand << 1;
      operand |= newBit;
      operand = operand & 255;
      this.setZeroAndNegativeFlags(operand);
      return operand;
    }
    rotateRight(operand) {
      const oldBit = (operand & 1) > 0 ? 1 : 0;
      operand = operand >> 1;
      if (this.getRegister("C")) {
        operand |= NEGATIVE_FLAG_BIT;
      }
      this.setRegister("C", oldBit);
      this.setZeroAndNegativeFlags(operand);
      return operand;
    }
    loadProgram(startAddress, programData, stringData) {
      this.setRegister("PC", startAddress);
      let currentAddress = startAddress;
      programData.forEach((byte) => {
        this.memory.setByte(currentAddress, byte);
        currentAddress++;
      });
      this.endAddress = currentAddress;
      stringData.forEach((byte) => {
        this.memory.setByte(currentAddress, byte);
        currentAddress++;
      });
    }
    runProgram() {
      let stepResult;
      let allCycles = 0;
      while (this.getRegister("PC") < this.endAddress) {
        stepResult = this.step();
        allCycles += stepResult.cycles;
      }
      return allCycles;
    }
    runLine() {
      let cycle = { cycle: -1, isBreak: false };
      if (this.getRegister("PC") < this.endAddress) {
        cycle = this.step();
      }
      return cycle;
    }
    isCodeDone() {
      return this.getRegister("PC") == this.endAddress;
    }
    randomByte() {
      return Math.floor(Math.random() * 256);
    }
    getAllRegisters() {
      const registers = {
        A: this.getRegister("A").toString(),
        X: this.getRegister("X").toString(),
        Y: this.getRegister("Y").toString(),
        SP: this.getRegister("SP").toString(),
        PC: this.getRegister("PC").toString(),
        SR: this.statusFlags.toString()
      };
      return registers;
    }
    getStatusFlags() {
      const registers = {
        C: this.getRegister("C") ? 1 : 0,
        Z: this.getRegister("Z") ? 1 : 0,
        I: this.getRegister("I") ? 1 : 0,
        D: this.getRegister("D") ? 1 : 0,
        B: this.getRegister("PC") ? 1 : 0,
        V: this.getRegister("V") ? 1 : 0,
        N: this.getRegister("N") ? 1 : 0,
        Unused: this.getRegister("Unused") ? 1 : 0
      };
      return registers;
    }
    step() {
      const instruction = this.fetchByte();
      const result = this.execute(instruction);
      let isBreak;
      if (instruction == BRK) {
        isBreak = true;
      } else {
        isBreak = false;
      }
      const newRandomByte = this.randomByte();
      this.memory.setByte(RANDOM_BYTE_ADDRESS, newRandomByte);
      return { result, isBreak };
    }
    execute(instruction) {
      var tempObj = { cycles: 0, routine: void 0 };
      switch (instruction) {
        case LDA_IM: {
          const newByte = this.fetchByte();
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 2;
          break;
        }
        case LDX_IM: {
          const newByte = this.fetchByte();
          this.setRegister("X", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 2;
          break;
        }
        case LDY_IM: {
          const newByte = this.fetchByte();
          this.setRegister("Y", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 2;
          break;
        }
        case LDA_ZP:
          {
            const zeroPageAddr = this.fetchByte();
            const newByte = this.readByte(zeroPageAddr);
            this.setRegister("A", newByte);
            this.setZeroAndNegativeFlags(newByte);
            tempObj.cycles += 3;
            break;
          }
          ;
        case LDX_ZP: {
          const zeroPageAddr = this.fetchByte();
          const newByte = this.readByte(zeroPageAddr);
          this.setRegister("X", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 3;
          break;
        }
        case LDY_ZP: {
          const zeroPageAddr = this.fetchByte();
          const newByte = this.readByte(zeroPageAddr);
          this.setRegister("Y", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 3;
          break;
        }
        case LDA_ZPX: {
          const address = this.addrZeroPageX();
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDY_ZPX: {
          const address = this.addrZeroPageX();
          const newByte = this.readByte(address);
          this.setRegister("Y", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDX_ZPY: {
          const address = this.addrZeroPageY();
          const newByte = this.readByte(address);
          this.setRegister("X", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDA_ABS: {
          const address = this.addrAbsolute(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDX_ABS: {
          const address = this.addrAbsolute();
          const newByte = this.readByte(address);
          this.setRegister("X", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDY_ABS: {
          const address = this.addrAbsolute();
          const newByte = this.readByte(address);
          this.setRegister("Y", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDA_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDY_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("Y", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDA_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDX_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("X", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 4;
          break;
        }
        case LDA_INDX: {
          const address = this.addrIndirectX();
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 6;
          break;
        }
        case LDA_INDY: {
          const address = this.addrIndirectY(tempObj);
          const newByte = this.readByte(address);
          this.setRegister("A", newByte);
          this.setZeroAndNegativeFlags(newByte);
          tempObj.cycles += 5;
          break;
        }
        case STA_ZP: {
          const address = this.fetchByte();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 3;
          break;
        }
        case STX_ZP: {
          const address = this.fetchByte();
          const newValue2 = this.getRegister("X");
          this.writeByte(address, newValue2);
          tempObj.cycles += 3;
          break;
        }
        case STY_ZP: {
          const address = this.fetchByte();
          const newValue2 = this.getRegister("Y");
          this.writeByte(address, newValue2);
          tempObj.cycles += 3;
          break;
        }
        case STA_ZPX: {
          const address = this.addrZeroPageX();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STY_ZPX: {
          const address = this.addrZeroPageX();
          const newValue2 = this.getRegister("Y");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STX_ZPY: {
          const address = this.addrZeroPageY();
          const newValue2 = this.getRegister("X");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STA_ABS: {
          const address = this.addrAbsolute();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STX_ABS: {
          const address = this.addrAbsolute();
          const newValue2 = this.getRegister("X");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STY_ABS: {
          const address = this.addrAbsolute();
          const newValue2 = this.getRegister("Y");
          this.writeByte(address, newValue2);
          tempObj.cycles += 4;
          break;
        }
        case STA_ABSX: {
          const address = this.addrAbsoluteX();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 5;
          break;
        }
        case STA_ABSY: {
          const address = this.addrAbsoluteY();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 5;
          break;
        }
        case STA_INDX: {
          const address = this.addrIndirectX();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case STA_INDY: {
          const address = this.addrIndirectY();
          const newValue2 = this.getRegister("A");
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case JSR: {
          const subAddr = this.fetchWord();
          tempObj.cycles += 6;
          if (subAddr == 65490) {
            tempObj.routine = "cout";
            break;
          }
          if (subAddr == 65439) {
            tempObj.routine = "skey";
            break;
          }
          if (subAddr == 65508) {
            tempObj.routine = "kin";
            break;
          }
          if (subAddr == 65486) {
            tempObj.routine = "clear";
            break;
          }
          const decrementedPC = this.getRegister("PC") - 1;
          this.setRegister("PC", decrementedPC);
          this.pushPCToStack();
          this.setRegister("PC", subAddr);
          break;
        }
        case RTS: {
          const returnAddr = this.popWordFromStack();
          this.setRegister("PC", returnAddr + 1);
          tempObj.cycles += 6;
          break;
        }
        case JMP_ABS: {
          const address = this.addrAbsolute();
          this.setRegister("PC", address);
          tempObj.cycles += 3;
          break;
        }
        case JMP_IND: {
          const address = this.addrAbsolute();
          const value = this.readWord(address);
          this.setRegister("PC", value);
          tempObj.cycles += 5;
          break;
        }
        case TSX: {
          this.setRegister("X", this.getRegister("SP"));
          this.setZeroAndNegativeFlags(this.getRegister("X"));
          tempObj.cycles += 2;
          break;
        }
        case TXS: {
          this.setRegister("SP", this.getRegister("X"));
          tempObj.cycles += 2;
          break;
        }
        case PHA: {
          const AValue = this.getRegister("A");
          this.pushByteToStack(AValue);
          tempObj.cycles += 3;
          break;
        }
        case PLA: {
          const value = this.popByteFromStack();
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case PHP: {
          this.pushPSToStack();
          tempObj.cycles += 3;
          break;
        }
        case PLP: {
          let PSFromStack = this.popByteFromStack();
          PSFromStack &= ~(UNUSED_FLAG_BIT | BREAK_FLAG_BIT);
          this.statusFlags = 0;
          this.statusFlags |= PSFromStack;
          tempObj.cycles += 4;
          break;
        }
        case AND_IM: {
          const value = this.getRegister("A") & this.fetchByte();
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 2;
          break;
        }
        case AND_ZP: {
          const address = this.fetchByte();
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 3;
          break;
        }
        case AND_ZPX: {
          const address = this.addrZeroPageX();
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case AND_ABS: {
          const address = this.addrAbsolute();
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case AND_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case AND_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case AND_INDX: {
          const address = this.addrIndirectX();
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case AND_INDY: {
          const address = this.addrIndirectY(tempObj);
          const value = this.getRegister("A") & this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 5;
          break;
        }
        case ORA_IM: {
          const value = this.getRegister("A") | this.fetchByte();
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 2;
          break;
        }
        case ORA_ZP: {
          const address = this.fetchByte();
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 3;
          break;
        }
        case ORA_ZPX: {
          const address = this.addrZeroPageX();
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case ORA_ABS: {
          const address = this.addrAbsolute();
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case ORA_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case ORA_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case ORA_INDX: {
          const address = this.addrIndirectX();
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case ORA_INDY: {
          const address = this.addrIndirectY(tempObj);
          const value = this.getRegister("A") | this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 5;
          break;
        }
        case EOR_IM: {
          const value = this.getRegister("A") ^ this.fetchByte();
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 2;
          break;
        }
        case EOR_ZP: {
          const address = this.fetchByte();
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 3;
          break;
        }
        case EOR_ZPX: {
          const address = this.addrZeroPageX();
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case EOR_ABS: {
          const address = this.addrAbsolute();
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case EOR_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case EOR_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 4;
          break;
        }
        case EOR_INDX: {
          const address = this.addrIndirectX();
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case EOR_INDY: {
          const address = this.addrIndirectY(tempObj);
          const value = this.getRegister("A") ^ this.readByte(address);
          this.setRegister("A", value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 5;
          break;
        }
        case BIT_ZP: {
          const address = this.fetchByte();
          const AReg = this.getRegister("A");
          const value = AReg & this.readByte(address);
          const zero = !(AReg & value);
          const negative = (value & NEGATIVE_FLAG_BIT) != 0;
          const overflow = (value & OVERFLOW_FLAG_BIT) != 0;
          this.setRegister("Z", zero);
          this.setRegister("N", negative);
          this.setRegister("V", overflow);
          tempObj.cycles += 3;
          break;
        }
        case BIT_ABS: {
          const address = this.addrAbsolute();
          const AReg = this.getRegister("A");
          const value = AReg & this.readByte(address);
          const zero = !(AReg & value);
          const negative = (value & NEGATIVE_FLAG_BIT) != 0;
          const overflow = (value & OVERFLOW_FLAG_BIT) != 0;
          this.setRegister("Z", zero);
          this.setRegister("N", negative);
          this.setRegister("V", overflow);
          tempObj.cycles += 4;
          break;
        }
        case TAX: {
          const AReg = this.getRegister("A");
          this.setRegister("X", AReg);
          this.setZeroAndNegativeFlags(AReg);
          tempObj.cycles += 2;
          break;
        }
        case TAY: {
          const AReg = this.getRegister("A");
          this.setRegister("Y", AReg);
          this.setZeroAndNegativeFlags(AReg);
          tempObj.cycles += 2;
          break;
        }
        case TXA: {
          const XReg = this.getRegister("X");
          this.setRegister("A", XReg);
          this.setZeroAndNegativeFlags(XReg);
          tempObj.cycles += 2;
          break;
        }
        case TYA: {
          const YReg = this.getRegister("Y");
          this.setRegister("A", YReg);
          this.setZeroAndNegativeFlags(YReg);
          tempObj.cycles += 2;
          break;
        }
        case INX: {
          const XReg = this.getRegister("X");
          this.setRegister("X", XReg + 1);
          this.setZeroAndNegativeFlags(XReg);
          tempObj.cycles += 2;
          break;
        }
        case INY: {
          const YReg = this.getRegister("Y");
          this.setRegister("Y", YReg + 1);
          this.setZeroAndNegativeFlags(YReg);
          tempObj.cycles += 2;
          break;
        }
        case DEX: {
          const XReg = this.getRegister("X");
          this.setRegister("X", XReg - 1);
          this.setZeroAndNegativeFlags(XReg);
          tempObj.cycles += 2;
          break;
        }
        case DEY: {
          const YReg = this.getRegister("Y");
          this.setRegister("Y", YReg - 1);
          this.setZeroAndNegativeFlags(YReg);
          tempObj.cycles += 2;
          break;
        }
        case DEC_ZP: {
          const address = this.fetchByte();
          let value = this.readByte(address);
          value--;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 5;
          break;
        }
        case DEC_ZPX: {
          const address = this.addrZeroPageX();
          let value = this.readByte(address);
          value--;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case DEC_ABS: {
          const address = this.addrAbsolute();
          let value = this.readByte(address);
          value--;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case DEC_ABSX: {
          const address = this.addrAbsoluteX();
          let value = this.readByte(address);
          value--;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 7;
          break;
        }
        case INC_ZP: {
          const address = this.fetchByte();
          let value = this.readByte(address);
          value++;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 5;
          break;
        }
        case INC_ZPX: {
          const address = this.addrZeroPageX();
          let value = this.readByte(address);
          value++;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case INC_ABS: {
          const address = this.addrAbsolute();
          let value = this.readByte(address);
          value++;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 6;
          break;
        }
        case INC_ABSX: {
          const address = this.addrAbsoluteX();
          let value = this.readByte(address);
          value++;
          this.writeByte(address, value);
          this.setZeroAndNegativeFlags(value);
          tempObj.cycles += 7;
          break;
        }
        case BEQ: {
          this.branchIf("Z", true, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BNE: {
          this.branchIf("Z", false, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BCS: {
          this.branchIf("C", true, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BCC: {
          this.branchIf("C", false, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BMI: {
          this.branchIf("N", true, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BPL: {
          this.branchIf("N", false, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BVC: {
          this.branchIf("V", false, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case BVS: {
          this.branchIf("V", true, tempObj);
          tempObj.cycles += 2;
          break;
        }
        case CLC: {
          this.setRegister("C", 0);
          tempObj.cycles += 2;
          break;
        }
        case SEC: {
          this.setRegister("C", 1);
          tempObj.cycles += 2;
          break;
        }
        case CLD: {
          this.setRegister("D", 0);
          tempObj.cycles += 2;
          break;
        }
        case SED: {
          this.setRegister("D", 1);
          tempObj.cycles += 2;
          break;
        }
        case CLI: {
          this.setRegister("I", 0);
          tempObj.cycles += 2;
          break;
        }
        case SEI: {
          this.setRegister("I", 1);
          tempObj.cycles += 2;
          break;
        }
        case CLV: {
          this.setRegister("V", 0);
          tempObj.cycles += 2;
          break;
        }
        case ADC: {
          const operand = this.fetchByte();
          this.addition(operand);
          tempObj.cycles += 2;
          break;
        }
        case ADC_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 4;
          break;
        }
        case ADC_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 4;
          break;
        }
        case ADC_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 4;
          break;
        }
        case ADC_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 3;
          break;
        }
        case ADC_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 4;
          break;
        }
        case ADC_INDX: {
          const address = this.addrIndirectX();
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 6;
          break;
        }
        case ADC_INDY: {
          const address = this.addrIndirectY(tempObj);
          const operand = this.readByte(address);
          this.addition(operand);
          tempObj.cycles += 5;
          break;
        }
        case SBC: {
          const operand = this.fetchByte();
          this.substraction(operand);
          tempObj.cycles += 2;
          break;
        }
        case SBC_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 4;
          break;
        }
        case SBC_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 3;
          break;
        }
        case SBC_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 4;
          break;
        }
        case SBC_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 4;
          break;
        }
        case SBC_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 4;
          break;
        }
        case SBC_INDX: {
          const address = this.addrIndirectX();
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 6;
          break;
        }
        case SBC_INDY: {
          const address = this.addrIndirectY(tempObj);
          const operand = this.readByte(address);
          this.substraction(operand);
          tempObj.cycles += 5;
          break;
        }
        case CMP: {
          const operand = this.fetchByte();
          this.compareToRegister(operand, "A");
          tempObj.cycles += 2;
          break;
        }
        case CMP_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 3;
          break;
        }
        case CMP_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 4;
          break;
        }
        case CMP_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 4;
          break;
        }
        case CMP_ABSX: {
          const address = this.addrAbsoluteX(tempObj);
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 4;
          break;
        }
        case CMP_ABSY: {
          const address = this.addrAbsoluteY(tempObj);
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 4;
          break;
        }
        case CMP_INDX: {
          const address = this.addrIndirectX();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 6;
          break;
        }
        case CMP_INDY: {
          const address = this.addrIndirectY(tempObj);
          const operand = this.readByte(address);
          this.compareToRegister(operand, "A");
          tempObj.cycles += 5;
          break;
        }
        case CPX: {
          const operand = this.fetchByte();
          this.compareToRegister(operand, "X");
          tempObj.cycles += 2;
          break;
        }
        case CPX_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "X");
          tempObj.cycles += 4;
          break;
        }
        case CPX_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "X");
          tempObj.cycles += 3;
          break;
        }
        case CPY: {
          const operand = this.fetchByte();
          this.compareToRegister(operand, "Y");
          tempObj.cycles += 2;
          break;
        }
        case CPY_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "Y");
          tempObj.cycles += 4;
          break;
        }
        case CPY_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          this.compareToRegister(operand, "Y");
          tempObj.cycles += 3;
          break;
        }
        case ASL: {
          const newValue2 = this.shiftLeft(this.getRegister("A"));
          this.setRegister("A", newValue2);
          tempObj.cycles += 2;
          break;
        }
        case ASL_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          const newValue2 = this.shiftLeft(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case ASL_ABSX: {
          const address = this.addrAbsoluteX();
          const operand = this.readByte(address);
          const newValue2 = this.shiftLeft(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 7;
          break;
        }
        case ASL_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          const newValue2 = this.shiftLeft(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 5;
          break;
        }
        case ASL_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          const newValue2 = this.shiftLeft(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case LSR: {
          const newValue2 = this.shiftRight(this.getRegister("A"));
          this.setRegister("A", newValue2);
          tempObj.cycles += 2;
          break;
        }
        case LSR_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          const newValue2 = this.shiftRight(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case LSR_ABSX: {
          const address = this.addrAbsoluteX();
          const operand = this.readByte(address);
          const newValue2 = this.shiftRight(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 7;
          break;
        }
        case LSR_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          const newValue2 = this.shiftRight(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 5;
          break;
        }
        case LSR_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          const newValue2 = this.shiftRight(operand);
          this.writeByte(address, newValue2);
          tempObj.cycles += 6;
          break;
        }
        case ROL: {
          const newValue2 = this.rotateLeft(this.getRegister("A"));
          this.setRegister("A", newValue2);
          tempObj.cycles += 2;
          break;
        }
        case ROL_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          const result = this.rotateLeft(operand);
          this.writeByte(address, result);
          tempObj.cycles += 6;
          break;
        }
        case ROL_ABSX: {
          const address = this.addrAbsoluteX();
          const operand = this.readByte(address);
          const result = this.rotateLeft(operand);
          this.writeByte(address, result);
          tempObj.cycles += 7;
          break;
        }
        case ROL_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          const result = this.rotateLeft(operand);
          this.writeByte(address, result);
          tempObj.cycles += 5;
          break;
        }
        case ROL_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          const result = this.rotateLeft(operand);
          this.writeByte(address, result);
          tempObj.cycles += 6;
          break;
        }
        case ROR: {
          const newValue2 = this.rotateRight(this.getRegister("A"));
          this.setRegister("A", newValue2);
          tempObj.cycles += 2;
          break;
        }
        case ROR_ABS: {
          const address = this.addrAbsolute();
          const operand = this.readByte(address);
          const result = this.rotateRight(operand);
          this.writeByte(address, result);
          tempObj.cycles += 6;
          break;
        }
        case ROR_ABSX: {
          const address = this.addrAbsoluteX();
          const operand = this.readByte(address);
          const result = this.rotateRight(operand);
          this.writeByte(address, result);
          tempObj.cycles += 7;
          break;
        }
        case ROR_ZP: {
          const address = this.fetchByte();
          const operand = this.readByte(address);
          const result = this.rotateRight(operand);
          this.writeByte(address, result);
          tempObj.cycles += 5;
          break;
        }
        case ROR_ZPX: {
          const address = this.addrZeroPageX();
          const operand = this.readByte(address);
          const result = this.rotateRight(operand);
          this.writeByte(address, result);
          tempObj.cycles += 6;
          break;
        }
        case NOP: {
          tempObj.cycles += 2;
          break;
        }
        case BRK: {
          const interruptVector = 65534;
          const newValue2 = this.readWord(interruptVector);
          this.setRegister("B", 1);
          this.setRegister("I", 1);
          tempObj.cycles += 7;
          break;
        }
        case RTI: {
          this.popPSFromStack();
          const newValue2 = this.popWordFromStack();
          this.setRegister("PC", newValue2);
          tempObj.cycles += 6;
          break;
        }
      }
      return tempObj;
    }
  };
  function createRegisters(numOfRegisters) {
    let registerBuffer = new ArrayBuffer(numOfRegisters);
    const registerView = new DataView(registerBuffer);
    return registerView;
  }
  var cpu_default = Cpu;

  // src/emulator/memory.js
  var Memory = class {
    #MemorySize;
    constructor() {
      this.#MemorySize = 1024 * 64;
      this.memoryCells = new ArrayBuffer(this.#MemorySize);
      this.dataView = new DataView(this.memoryCells);
    }
    //fills every memory cell (the whole memory) with 0 values
    initialise() {
      for (let i = 0; i < this.#MemorySize; i++) {
        this.dataView.setUint8(i, 0);
      }
    }
    //using the dataView overwrites the memory cell given by the address with new byte value
    setByte(address, newValue2) {
      this.dataView.setUint8(address, newValue2);
    }
    //using the dataView overwrites the given memory cell and the next one with the a word
    setWord(address, newValue2) {
      this.dataView.setUint8(address, newValue2 & 255);
      this.dataView.setUint8(address + 1, newValue2 >> 8);
    }
    //using the dataView return the byte from memory given at the address
    getByte(address) {
      return this.dataView.getUint8(address);
    }
  };
  var memory_default = Memory;

  // public/Worker.mjs
  var workerMemory = new memory_default();
  var workerCpu = new cpu_default(workerMemory);
  onmessage = (message) => {
    const mainCpu = message.data.Cpu;
    const mainMemory = message.data.memory;
    workerCpu.copyStateFromAnotherCpu(mainCpu);
    new Uint8Array(workerMemory.memoryCells).set(new Uint8Array(mainMemory.memoryCells));
    runSlowProcess();
  };
  var runSlowProcess = async () => {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 0));
    let allCycles = 0;
    let numOfRun = 0;
    let stepResult, cpuData;
    while (workerCpu.getRegister("PC") < workerCpu.endAddress) {
      stepResult = workerCpu.step();
      allCycles += stepResult.result.cycles;
      const routine = stepResult.result.routine;
      cpuData = {
        byteRegisters: workerCpu.byteRegisters,
        wordRegisters: workerCpu.wordRegisters,
        statusFlags: workerCpu.statusFlags
      };
      if (routine) {
        postMessage({ allCycles, isDone: false, cpuData, memoryData: workerMemory.memoryCells, routine });
      } else {
        numOfRun++;
      }
      if (routine == "skey") {
        close();
      }
      if (numOfRun == 15) {
        numOfRun = 0;
        postMessage({ allCycles, isDone: false, cpuData, memoryData: workerMemory.memoryCells });
      }
      await delay();
      if (stepResult.isBreak) {
        break;
      }
    }
    postMessage({ allCycles, isDone: true, cpuData, memoryData: workerMemory.memoryCells });
  };
})();
