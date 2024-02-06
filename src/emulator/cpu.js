import * as INS from "./instructions.js"

const RandomByteAddress = 0xfe;
const CarryFlagBit            = 0b00000001;
const cPos = 0;
const ZeroFlagBit             = 0b00000010;
const zPos = 1;
const InterruptDisableFlagBit = 0b00000100;
const iPos = 2;
const DecimalFlagBit          = 0b00001000;
const dPos = 3;
const BreakFlagBit            = 0b00010000;
const bPos = 4;
const UnusedFlagBit           = 0b00100000;
const uPos = 5;
const OverflowFlagBit         = 0b01000000;
const vPos = 6;
const NegativeFlagBit         = 0b10000000;
const nPos = 7;

//C(0) - Carry flag
//Z(1): Zero Flag
//I(2): Interrupt disable
//D(3): Decimal mode
//B(4): Break
//(5): Unused
//V(6): Overflow
//N(7): Negative

class cpu {
    constructor(memory) {
        this.memory = memory;
        this.endAddress;
        //Stack is 256 bytes $0100 - $01FF) starting from $01FF
        this.byteRegisterNames = ['SP', 'A', 'X', 'Y'];
        this.wordRegisterNames = ['PC'];
        this.flagRegisterNames = ['C', 'Z', 'I', 'D', 'B', 'Unused', 'V', 'N',];
        this.statusFlags = 0b00100000;
        this.byteRegisters = createRegisters(this.byteRegisterNames.length);
        this.wordRegisters = createRegisters(2);
        this.byteRegisterMap = this.byteRegisterNames.reduce((map, name, i) => {
            map[name] = i;
            return map;
        }, {})
    }

    //Sets the registers to default value, initialisez the memory with zero 
    reset(PCValue = 0xFFFC) {
      this.setRegister('A', 0);
      this.setRegister('X', 0);
      this.setRegister('Y', 0);
      this.setRegister('PC', PCValue);
      this.setRegister('SP', 0x01FF);
      this.memory.initialise();

      const newRandomByte = this.randomByte();
      this.memory.setByte(RandomByteAddress, newRandomByte);
    }

    copyStateFromAnotherCpu(anotherCpu) {
        this.byteRegisters = anotherCpu.byteRegisters;
        this.wordRegisters = anotherCpu.wordRegisters;
        this.statusFlags = anotherCpu.statusFlags;
        this.endAddress = anotherCpu.endAddress;
    }

    modifyStatusFlags(position, newBit)
    {
        const mask = 1 << position;
        const modifiedFlags = (this.statusFlags & ~mask) | ((newBit << position) & mask);
        return modifiedFlags
    }

    //looks up the index of the given register(regName) in the correspondent register map and returns the value 
    //from the register Arraybuffer at the found index
    getRegister(regName) {
        if(regName == 'PC') {
            return this.wordRegisters.getUint16(0);
        }
        else if(this.byteRegisterNames.includes(regName)){
            const regIndex = this.byteRegisterMap[regName];
            return this.byteRegisters.getUint8(regIndex);
        }
        else if(this.flagRegisterNames.includes(regName)) {
            let isSet;

            switch(regName) {
                case 'C':
                    isSet = (CarryFlagBit & this.statusFlags) > 0;
                    break;
                case 'Z':
                    isSet = (ZeroFlagBit & this.statusFlags) > 0;
                    break;
                case 'I':
                    isSet = (InterruptDisableFlagBit & this.statusFlags) > 0;
                    break;
                case 'D':
                    isSet = (DecimalFlagBit & this.statusFlags) > 0;
                    break;
                case 'B':
                    isSet = (BreakFlagBit & this.statusFlags) > 0;
                    break;
                case 'Unused':
                    isSet = (UnusedFlagBit & this.statusFlags) > 0;
                    break;
                case 'V':
                    isSet = (OverflowFlagBit & this.statusFlags) > 0;
                    break;
                case 'N':
                    isSet = (NegativeFlagBit & this.statusFlags) > 0;
                    break;
                default:
                    isSet = false;
                    break;
            }
            return isSet;
        }
    }

    //looks up the index of the given register(regName) in the in the correspondent register map and 
   //sets the value of the register Arraybuffer at the found index
    setRegister(regName, newValue) {
        if(regName == 'PC') {
             this.wordRegisters.setUint16(0, newValue);
        }
        else if(this.byteRegisterNames.includes(regName)){
            const regIndex = this.byteRegisterMap[regName];
            this.byteRegisters.setUint8(regIndex, newValue);
        }
        else if(this.flagRegisterNames.includes(regName)) {
            switch(regName) {
                case 'C':
                    this.statusFlags = this.modifyStatusFlags(cPos, newValue);
                    break;
                case 'Z':
                    this.statusFlags = this.modifyStatusFlags(zPos, newValue);
                    break;
                case 'I':
                    this.statusFlags = this.modifyStatusFlags(iPos, newValue);
                    break;
                case 'D':
                    this.statusFlags = this.modifyStatusFlags(dPos, newValue);
                    break;
                case 'B':
                    this.statusFlags = this.modifyStatusFlags(bPos, newValue);
                    break;
                case 'Unused':
                    this.statusFlags = this.modifyStatusFlags(uPos, newValue);
                    break;
                case 'V':
                    this.statusFlags = this.modifyStatusFlags(vPos, newValue);
                    break;
                case 'N':
                    this.statusFlags = this.modifyStatusFlags(nPos, newValue);
                    break;
                default:
                    break;
            }
        }
    }

    //returns the instruction (byte) from memory based on the PC register and increments the PC register by 1
    fetchByte() {
        const instructionAddress = this.getRegister('PC');
        const instruction = this.memory.getByte(instructionAddress);
        this.setRegister('PC', instructionAddress + 1);
        return instruction;
    }

    //returns the instruction (word == 2 * byte) from memory based on the PC register and increments the PC register by 2
    fetchWord() {
        const instructionAddress = this.getRegister('PC');
        let data = this.memory.getByte(instructionAddress);
        data |= (this.memory.getByte(instructionAddress + 1) << 8);
        this.setRegister('PC', this.getRegister('PC') + 2);
        return data;
    }
    
    //returns a byte from memory at memoryAddress
    readByte(memoryAddress) {
        let data = this.memory.getByte(memoryAddress);
        return data;
    }

    //returns a word (2*byte) from memory at memoryAddress (and memoryAddress + 1)
    readWord(memoryAddress) {
        const LowByte = this.readByte(memoryAddress);
		const HighByte = this.readByte(memoryAddress + 1);

		return LowByte | (HighByte << 8);
    }

    //overwrites the memory at given address with a given byte value
    writeByte(memoryAddress, newValue) {
        this.memory.setByte(memoryAddress, newValue);
    }

    //overwrites the memory at given address with a given word(2 * byte) value
    writeWord() {
        this.memory.setWord(memoryAddress, newValue);
    }

    addrZeroPage() {
        let zeroPageAddr = this.fetchByte();
        return zeroPageAddr;
    }
    
    addrZeroPageX() {
        let zeroPageAddr = this.fetchByte();
        zeroPageAddr += this.getRegister('X');

        if(zeroPageAddr > 0xff) {
            zeroPageAddr -= 0xff;
            zeroPageAddr -= 1;
        }

        return zeroPageAddr;
    }

    addrZeroPageY() {
        let zeroPageAddr = this.fetchByte();
        zeroPageAddr += this.getRegister('Y');

        if(zeroPageAddr > 0xff) {
            zeroPageAddr -= 0xff;
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
        let absAddressX = absAddress + this.getRegister('X');

        const crossedPageBoundary = (absAddress ^ absAddressX) >> 8;
        if (crossedPageBoundary)
        {
            obj.cycles++;
        }
        return absAddressX;
    }

    addrAbsoluteY(obj) {
        let absAddress = this.fetchWord();
        let absAddressY = absAddress + this.getRegister('Y');

        const crossedPageBoundary = (absAddress ^ absAddressY) >> 8;
        if (crossedPageBoundary)
        {
            obj.cycles++;
        }
        return absAddressY;
    }

    addrIndirectX() {
        let zeroPageAddr = this.fetchByte();
        zeroPageAddr += this.getRegister('X');
        let effectiveAddr = this.readWord(zeroPageAddr);
        return effectiveAddr;
    }

    //Indirect indexed addressing by Y - CPU will first fetch the address stored at zero page location,
    //that address will be added to register Y to get the final target address 
    addrIndirectY(obj) {
        const zeroPageAddr = this.fetchByte();
        const effectiveAddr = this.readWord(zeroPageAddr);
        const effectiveAddrY = effectiveAddr + this.getRegister('Y');

        const  crossedPageBoundary = (effectiveAddr ^ effectiveAddrY) >> 8;
        if (crossedPageBoundary)
        {
            obj.cycles++;
        }

        return effectiveAddrY;
    }

    SPToAddress() {
        return 0x100 | this.getRegister('SP');
    }
    
    pushByteToStack(value) {
        this.writeByte(this.SPToAddress(), value);
        this.setRegister('SP', this.getRegister('SP') - 1);
    }

    pushWordToStack(value) {
        this.writeByte(this.SPToAddress(), value >> 8);
        this.setRegister('SP', this.getRegister('SP') - 1);
        this.writeByte(this.SPToAddress(), value & 0xFF);
        this.setRegister('SP', this.getRegister('SP') - 1);
    }

    pushPCToStack(offset = 0) {
        this.pushWordToStack(this.getRegister('PC') + offset);
    }

    pushPSToStack() {
        const PSStack = this.statusFlags | BreakFlagBit | UnusedFlagBit;
        this.pushByteToStack(PSStack);
    }

    popByteFromStack() {
        this.setRegister('SP', this.getRegister('SP') + 1);
        const address = this.SPToAddress();
        const value = this.memory.getByte(address);
        return value;
    }

    popWordFromStack() {
        //address might be needed to increment by 1
        const address = this.SPToAddress() + 1;
        const value = this.readWord(address);
        this.setRegister('SP', this.getRegister('SP') + 2);
        return value;
    }

    popPSFromStack() {
        this.statusFlags = this.popByteFromStack();
        this.setRegister("B", 0);
        this.setRegister("Unused", 0);
    }

    setZeroAndNegativeFlags(register) {
        let zero = register == 0? 1 : 0;
        this.setRegister('Z', zero);

        let negative = (register & NegativeFlagBit) > 0? 1 : 0;
        this.setRegister('N', negative);
    }

    branchIf(flag, expected, obj) {
        const isFlag = this.getRegister(flag);
        const byte = this.fetchByte();

        if(isFlag == expected) {
            const oldPC = this.getRegister('PC');        
            const offset = this.twosComplementToDecimal(byte);
            this.setRegister('PC', oldPC + offset);
            obj.cycles++;

            const PC = this.getRegister('PC');
            const isPageChanged = (PC >> 8) != (oldPC >> 8);

            if(isPageChanged) {
                obj.cycles++;
            }
        }
    }

    twosComplementToDecimal(number) {
        const numberBinaryVersion = number.toString(2).padStart(8,"0");
        const valuePart = numberBinaryVersion.substring(1);
        const signPart = numberBinaryVersion[0];
    
        let valueDecimal = parseInt(valuePart, 2);
    
        if(signPart == "1") {
            valueDecimal -= 128; 
        }
    
        return valueDecimal;
    }

    //Adds the operand with carry to the accumulator
    addition(operand) {
        const isDecimalMode = this.getRegister('D');
        const CarryValue = this.getRegister('C');
        const ARegValue = this.getRegister('A');
        let isOverflow = false;
        let result;
        
        //DECIMAL
        if(isDecimalMode) {
            result = ARegValue + operand + CarryValue
            let lowRes = (ARegValue & 0x0f) + (operand & 0x0f) + CarryValue 
            if(lowRes > 9) {
             lowRes += 6
            }
         
            result = (ARegValue & 0xf0) + (operand & 0xf0) + lowRes
            if (result > 0x9f) {
                 result += 0x60
            }

            if(result < -128 || result > 127) {
                isOverflow = true
            } 

            this.setRegister('C', result > 99);
            this.setRegister('V', isOverflow);
            
        }
        //BINARY
        else {
            result = this.getRegister('A');
            result += operand;
            if(CarryValue) {
                result += 1;
            }

            if(result > 127 || result < -128) {
                isOverflow = true;
            }
    
            this.setRegister('C', result > 0xFF);
            this.setRegister('V', isOverflow);
            result = result & 0xFF;
            
        }

        //True for both binary and decimal
        this.setZeroAndNegativeFlags(result & 0xFF);
        this.setRegister('A', result);
       
    }

    //substracts the operand with carry from the accumulator
    substraction(operand) {
        const isDecimalMode = this.getRegister('D');

        if(isDecimalMode) {
            const ARegValue = this.getRegister('A');
            //1. 9s'complement
            const newOperand = this.NinesComplement(operand);

            //2.addition
            const result =  ARegValue + newOperand;

            //3. add carry if needed
            
        }
        else {
            const newOperand = ~operand;
            this.addition(newOperand);
        }
    }

    NinesComplement(n) {
        let number = n.toString()
        number = number.split('')
        for (let i=0 ; i < number.length; i++ ){       
            if (number[i] != '.'){
                number[i] = String(9 - Number(number[i]) + 0);
             }
        }
        number = number.join("")
        return parseInt(number)
    }


    compareToRegister(operand, register) {
        const registerValue = this.getRegister(register); 
        const temp = registerValue - operand;
        this.setRegister('N', (temp & NegativeFlagBit) > 0? 1 : 0);
        this.setRegister('Z',registerValue == operand? 1 : 0);
        this.setRegister('C', registerValue >= operand? 1 : 0);
    }

    shiftLeft(operand) {
        const highestBitCheck = operand & NegativeFlagBit;
        this.setRegister('C', highestBitCheck > 0? 1 : 0);
        const result = operand << 1;
        this.setZeroAndNegativeFlags(result);
        return result;
    }

    shiftRight(operand) {
        const lowestBitCheck = operand & 0b00000001;
        this.setRegister('C', lowestBitCheck > 0? 1 : 0);
        const result = operand >> 1;
        this.setZeroAndNegativeFlags(result);
        return result;
    }

    rotateLeft(operand) {
        const newBit = this.getRegister('C') ? 1 : 0;
        this.setRegister('C', (operand & NegativeFlagBit) > 0 ? 1 : 0);
        operand = operand << 1;
        operand |= newBit;
        operand = operand & 0xFF;
        this.setZeroAndNegativeFlags(operand);
        return operand;
    }

    rotateRight(operand) {
        const oldBit = (operand & 1) > 0 ? 1 : 0;
        operand = operand >> 1;

        if (this.getRegister('C'))
        {
            operand |= NegativeFlagBit;
        }
        
        this.setRegister('C', oldBit);
        this.setZeroAndNegativeFlags(operand);
        return operand;
    }

    loadProgram(startAddress, programData, stringData) {
        this.setRegister("PC", startAddress);
        
        let currentAddress = startAddress;
        programData.forEach(byte => {
            this.memory.setByte(currentAddress, byte);
            currentAddress++;
        })
        this.endAddress = currentAddress;

        stringData.forEach(byte => {
            this.memory.setByte(currentAddress, byte);
            currentAddress++;
        })
    }

    runProgram() {
        let stepResult;
        let allCycles = 0;

        while(this.getRegister("PC") < this.endAddress) {
            stepResult = this.step();
            
            allCycles += stepResult.cycles;
        }

        return allCycles;
    }

    runLine() {
        let cycle = {cycle: -1, isBreak: false};
        
        if(this.getRegister("PC") < this.endAddress) {
            cycle = this.step();
        }

        return cycle;
    }

    isCodeDone() {
        return this.getRegister("PC") == this.endAddress;
    }

    randomByte() {
        return Math.floor(Math.random() * 255);
    }

    getAllRegisters() {
        const registers = {A: this.getRegister("A").toString(), X: this.getRegister("X").toString(), 
                           Y: this.getRegister("Y").toString(), SP: this.getRegister("SP").toString(),
                           PC: this.getRegister("PC").toString(), SR: this.statusFlags.toString()};
        return registers;
    }

    getStatusFlags() {
        const registers = {C: this.getRegister("C")? 1 : 0, Z: this.getRegister("Z")? 1 : 0, 
                           I: this.getRegister("I")? 1 : 0, D: this.getRegister("D")? 1 : 0,
                           B: this.getRegister("PC")? 1 : 0, V: this.getRegister("V")? 1 : 0,
                           N: this.getRegister("N")? 1 : 0, Unused: this.getRegister("Unused")? 1 : 0};
        return registers;
    }

    step() {
        const instruction = this.fetchByte();
        const result = this.execute(instruction);
        let isBreak = false;
        
        if(instruction == INS.BRK) {
            isBreak = true;
        }

        const newRandomByte = this.randomByte();
        this.memory.setByte(RandomByteAddress, newRandomByte);
        
        return {result, isBreak};
    }

    debug() {
        this.registerNames.forEach(registerName => {
            console.log(`${registerName}: 0x${this.getRegister(registerName).toString(8).padStart(2,0)} `)
        })
    }

    execute(instruction) {
        var tempObj = { cycles: 0, routine: undefined };
        switch(instruction) {

            //Load
            case INS.LDA_IM:
            {   
                const newByte = this.fetchByte();
                this.setRegister('A', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 2;
                break;
            }
            case INS.LDX_IM:
            {
                const newByte = this.fetchByte();
                this.setRegister('X', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 2;
                break;
            }
            case INS.LDY_IM:
            {
                const newByte = this.fetchByte();
                this.setRegister('Y', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 2;
                break;
            }
            case INS.LDA_ZP:
            {
                const zeroPageAddr = this.fetchByte();
                const newByte = this.readByte(zeroPageAddr);
                this.setRegister('A', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 3;
                break;
            };
            case INS.LDX_ZP:
            {
                const zeroPageAddr = this.fetchByte();
                const newByte = this.readByte(zeroPageAddr);
                this.setRegister('X', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 3;
                break;
            }
            case INS.LDY_ZP:
            {
                const zeroPageAddr = this.fetchByte();
                const newByte = this.readByte(zeroPageAddr);
                this.setRegister('Y', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 3;
                break;
            }
            case INS.LDA_ZPX:
            {
                const address = this.addrZeroPageX();
                const newByte = this.readByte(address);
                this.setRegister('A', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDY_ZPX:
            {
                const address = this.addrZeroPageX();
                const newByte = this.readByte(address);
                this.setRegister('Y', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDX_ZPY:
            {
                const address = this.addrZeroPageY();
                const newByte = this.readByte(address);
                this.setRegister('X', newByte);
                this.setZeroAndNegativeFlags(newByte);
                tempObj.cycles += 4;
                break;
            }     
            case INS.LDA_ABS:
            {
                const address = this.addrAbsolute(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('A', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDX_ABS:
            {
                const address = this.addrAbsolute();
                const newValue = this.readByte(address);
                this.setRegister('X', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDY_ABS:
            {
                const address = this.addrAbsolute();
                const newValue = this.readByte(address);
                this.setRegister('Y', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDA_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('A', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDY_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('Y', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDA_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('A', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDX_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('X', newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.LDA_INDX:
            {
                const address = this.addrIndirectX();
                const newValue = this.readByte(address);
                this.setRegister('A', newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.LDA_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const newValue = this.readByte(address);
                this.setRegister('A', newValue);
                tempObj.cycles += 5;
                break;
            }

            //Store
            case INS.STA_ZP:
            {   
                const address = this.addrZeroPage();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 3;
                break;
            }
            case INS.STX_ZP:
            {
                const address = this.addrZeroPage();
                const newValue = this.getRegister('X');
                this.writeByte(address, newValue);
                tempObj.cycles += 3;
                break;
            }
            case INS.STY_ZP:
            {
                const address = this.addrZeroPage();
                const newValue = this.getRegister('Y');
                this.writeByte(address, newValue);
                tempObj.cycles += 3;
                break;
            }
            case INS.STA_ZPX:
            {
                const address = this.addrZeroPageX();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.STY_ZPX:
                {
                    const address = this.addrZeroPageX();
                    const newValue = this.getRegister('Y');
                    this.writeByte(address, newValue);
                    tempObj.cycles += 4;
                    break;
                }
            case INS.STX_ZPY:
            {
                const address = this.addrZeroPageY();
                const newValue = this.getRegister('X');
                this.writeByte(address, newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.STA_ABS:
            {
                const address = this.addrAbsolute();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.STX_ABS:
            {
                const address = this.addrAbsolute();
                const newValue = this.getRegister('X');
                this.writeByte(address, newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.STY_ABS:
            {
                const address = this.addrAbsolute();
                const newValue = this.getRegister('Y');
                this.writeByte(address, newValue);
                tempObj.cycles += 4;
                break;
            }
            case INS.STA_ABSX:
            {
                const address = this.addrAbsoluteX();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 5;
                break;
            }
            case INS.STA_ABSY:
            {
                const address = this.addrAbsoluteY();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 5;
                break;
            }
            case INS.STA_INDX:
            {
                const address = this.addrIndirectX();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.STA_INDY:
            {
                const address = this.addrIndirectY();
                const newValue = this.getRegister('A');
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }

            //Subrutine
            case INS.JSR:
            {
                //pushes the address - 1 of the next operation on to the stack before transferring program control
                //by setting PC to the fetched address (word)
                const subAddr = this.fetchWord();
                tempObj.cycles += 6;
            
                if(subAddr == 0xffd2) {
                    tempObj.routine = "cout";
                    break;
                }
                
                if(subAddr == 0xff9f) {
                    tempObj.routine = "skey";
                    break;
                }

                if(subAddr == 0xffe4) {
                    tempObj.routine = "kin";
                    break;
                }

                if(subAddr == 0xffce) {
                    tempObj.routine = "clear";
                    break;
                }

                const decrementedPC = this.getRegister('PC') - 1;
                this.setRegister('PC', decrementedPC);
                this.pushPCToStack();
                this.setRegister('PC', subAddr);
                break;
            }
            case INS.RTS:
            {
                //pulls the top two bytes off the stack (low byte first) and transfers program control to that address+1
                const returnAddr = this.popWordFromStack();
                this.setRegister('PC', returnAddr + 1);
                tempObj.cycles += 6;
                break;
            }

            //Jump
            case INS.JMP_ABS:
            {
                const address = this.addrAbsolute();
                this.setRegister('PC', address);
                tempObj.cycles += 3;
                break;
            }
            case INS.JMP_IND:
            {
                const address = this.addrAbsolute();
                const value = this.readWord(address);
                this.setRegister('PC', value);
                tempObj.cycles += 5;
                break;
            }

            //push/pull
            case INS.TSX: 
            {
                this.setRegister('X', this.getRegister('SP'));
                this.setZeroAndNegativeFlags(this.getRegister('X'));
                tempObj.cycles += 2;
                break;
            }
            case INS.TXS: 
            {
                this.setRegister('SP', this.getRegister('X'));
                tempObj.cycles += 2;
                break;
            }
            case INS.PHA:
            {
                const AValue = this.getRegister('A');
                this.pushByteToStack(AValue);
                tempObj.cycles += 3;
                break;
            }
            case INS.PLA:
            {   
                const value = this.popByteFromStack();
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.PHP:
            {            
                this.pushPSToStack();
                tempObj.cycles += 3;
                break;
            }
            case INS.PLP:
            {
                let PSFromStack = this.popByteFromStack();
                PSFromStack &= ~(UnusedFlagBit | BreakFlagBit);
                this.statusFlags = 0;
                this.statusFlags |= PSFromStack;
                tempObj.cycles += 4;
                break;
            }

            //logical operations - and
            case INS.AND_IM:
            {
                const value = this.getRegister('A') & this.fetchByte();
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 2;
                break;
            }
            case INS.AND_ZP:
            {
                const address = this.addrZeroPage();
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 3;
                break;
            }
            case INS.AND_ZPX:
            {
                const address = this.addrZeroPageX();
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.AND_ABS:
            {
                const address = this.addrAbsolute();
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.AND_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.AND_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.AND_INDX:
            {
                const address = this.addrIndirectX();
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.AND_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const value = this.getRegister('A') & this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 5;
                break;
            }

             //logical operations - or
             case INS.ORA_IM:
            {
                const value = this.getRegister('A') | this.fetchByte();
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 2;
                break;
            }
            case INS.ORA_ZP:
            {
                const address = this.addrZeroPage();
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 3;
                break;
            }
            case INS.ORA_ZPX:
            {
                const address = this.addrZeroPageX();
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.ORA_ABS:
            {
                const address = this.addrAbsolute();
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.ORA_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.ORA_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.ORA_INDX:
            {
                const address = this.addrIndirectX();
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.ORA_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const value = this.getRegister('A') | this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 5;
                break;
            }

            //logical operations - xor
            case INS.EOR_IM:
            {
                const value = this.getRegister('A') ^ this.fetchByte();
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 2;
                break;
            }
            case INS.EOR_ZP:
            {
                const address = this.addrZeroPage();
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 3;
                break;
            }
            case INS.EOR_ZPX:
            {
                const address = this.addrZeroPageX();
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.EOR_ABS:
            {
                const address = this.addrAbsolute();
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.EOR_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.EOR_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 4;
                break;
            }
            case INS.EOR_INDX:
            {
                const address = this.addrIndirectX();
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.EOR_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const value = this.getRegister('A') ^ this.readByte(address);
                this.setRegister('A', value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 5;
                break;
            }

            //Bit operations
            case INS.BIT_ZP:
            {
                const address = this.addrZeroPage();
                const AReg = this.getRegister('A')
                const value = AReg & this.readByte(address);
                const zero = !(AReg & value);
                const negative = (value & NegativeFlagBit) != 0;
                const overflow = (value & OverflowFlagBit) != 0;

                this.setRegister('Z', zero);
                this.setRegister('N', negative);
                this.setRegister('V', overflow);
                tempObj.cycles += 3;
                break;
            }
            case INS.BIT_ABS:
            {
                const address = this.addrAbsolute();
                const AReg = this.getRegister('A')
                const value = AReg & this.readByte(address);
                const zero = !(AReg & value);
                const negative = (value & NegativeFlagBit) != 0;
                const overflow = (value & OverflowFlagBit) != 0;

                this.setRegister('Z', zero);
                this.setRegister('N', negative);
                this.setRegister('V', overflow);
                tempObj.cycles += 4;
                break;
            }

            //Transfer Registers
            case INS.TAX:
            {
                const AReg = this.getRegister('A');
                this.setRegister('X', AReg);
                this.setZeroAndNegativeFlags(AReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.TAY:
            {
                const AReg = this.getRegister('A');
                this.setRegister('Y', AReg);
                this.setZeroAndNegativeFlags(AReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.TXA:
            {
                const XReg = this.getRegister('X');
                this.setRegister('A', XReg);
                this.setZeroAndNegativeFlags(XReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.TYA:
            {
                const YReg = this.getRegister('Y');
                this.setRegister('A', YReg);
                this.setZeroAndNegativeFlags(YReg);
                tempObj.cycles += 2;
                break;
            }

            //increment-decrement
            case INS.INX: 
            {
                const XReg = this.getRegister('X');
                this.setRegister('X', XReg + 1);
                this.setZeroAndNegativeFlags(XReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.INY:
            {
                const YReg = this.getRegister('Y');
                this.setRegister('Y', YReg + 1);
                this.setZeroAndNegativeFlags(YReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.DEX:
            {
                const XReg = this.getRegister('X');
                this.setRegister('X', XReg - 1);
                this.setZeroAndNegativeFlags(XReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.DEY:
            {
                const YReg = this.getRegister('Y');
                this.setRegister('Y', YReg - 1);
                this.setZeroAndNegativeFlags(YReg);
                tempObj.cycles += 2;
                break;
            }
            case INS.DEC_ZP:
            {
                const address = this.addrZeroPage();
                let value = this.readByte(address);
                value--;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 5;
                break;
            }
            case INS.DEC_ZPX:
            {
                const address = this.addrZeroPageX();
                let value = this.readByte(address);
                value--;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.DEC_ABS:
            {
                const address = this.addrAbsolute();
                let value = this.readByte(address);
                value--;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.DEC_ABSX:
            {
                const address = this.addrAbsoluteX();
                let value = this.readByte(address);
                value--;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 7;
                break;
            }
            case INS.INC_ZP:
            {
                const address = this.addrZeroPage();
                let value = this.readByte(address);
                value++;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 5;
                break;
            }
            case INS.INC_ZPX:
            {
                const address = this.addrZeroPageX();
                let value = this.readByte(address);
                value++;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.INC_ABS:
            {
                const address = this.addrAbsolute();
                let value = this.readByte(address);
                value++;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 6;
                break;
            }
            case INS.INC_ABSX:
            {
                const address = this.addrAbsoluteX();
                let value = this.readByte(address);
                value++;
                this.writeByte(address, value);
                this.setZeroAndNegativeFlags(value);
                tempObj.cycles += 7;
                break;
            }

            //branches
            case INS.BEQ:
            {
                this.branchIf('Z', true, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BNE:
            {
                this.branchIf('Z', false, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BCS:
            {
                this.branchIf('C', true, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BCC:
            {
                this.branchIf('C', false, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BMI:
            {
                this.branchIf('N', true , tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BPL:
            {
                this.branchIf('N', false, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BVC:
            {
                this.branchIf('V', false, tempObj);  
                tempObj.cycles += 2;
                break;
            }
            case INS.BVS:
            {
                this.branchIf('V', true, tempObj);  
                tempObj.cycles += 2;
                break;
            }

            //status flag changes
            case INS.CLC:
            {
                this.setRegister('C', 0);
                tempObj.cycles += 2;
                break;
            }
            case INS.SEC:
            {
                this.setRegister('C', 1);
                tempObj.cycles += 2;
                break;
            }
            case INS.CLD:
            {
                this.setRegister('D', 0);
                tempObj.cycles += 2;
                break;
            } 
            case INS.SED:
            {
                this.setRegister('D', 1);
                tempObj.cycles += 2;
                break;
            } 
            case INS.CLI:
            {
                this.setRegister('I', 0);
                tempObj.cycles += 2;
                break;
            } 
            case INS.SEI:
            {
                this.setRegister('I', 1);
                tempObj.cycles += 2;
                break;
            } 
            case INS.CLV:
            {
                this.setRegister('V', 0);
                tempObj.cycles += 2;
                break;
            }      
            
             //Arithmetic
            case INS.ADC:
            {
                const operand = this.fetchByte();
                this.addition(operand);
                tempObj.cycles += 2;
                break;
            }
            case INS.ADC_ABS:
            {   
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 4;
                break;
            }
            case INS.ADC_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 4;
                break;
            }
            case INS.ADC_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 4;
                break;
            }
            case INS.ADC_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 3;
                break;
            }
            case INS.ADC_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 4;
                break;
            }
            case INS.ADC_INDX:
            {
                const address = this.addrIndirectX();
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 6;
                break;
            }
            case INS.ADC_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const operand = this.readByte(address);
                this.addition(operand);
                tempObj.cycles += 5;
                break;
            }
            case INS.SBC:
            {
                const operand = this.fetchByte();
                this.substraction(operand);
                tempObj.cycles += 2;
                break;
            } 
            case INS.SBC_ABS:
            {
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 4;
                break;
            } 
            case INS.SBC_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 3;
                break;
            } 
            case INS.SBC_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 4;
                break;
            } 
            case INS.SBC_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 4;
                break;
            } 
            case INS.SBC_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 4;
                break;
            } 
            case INS.SBC_INDX:
            {
                const address = this.addrIndirectX();
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 6;
                break;
            } 
            case INS.SBC_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const operand = this.readByte(address);
                this.substraction(operand);
                tempObj.cycles += 5;
                break;
            } 

            // Register Comparison
            case INS.CMP:
            {
                const operand = this.fetchByte();
                this.compareToRegister(operand,'A');
                tempObj.cycles += 2;
                break;
            }
            case INS.CMP_ZP:
            {
                const address = this.addrZeroPage();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 3;
                break;
            }
            case INS.CMP_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 4;
                break;
            }
            case INS.CMP_ABS:
            {
                const address = this.addrAbsolute();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 4;
                break;
            }
            case INS.CMP_ABSX:
            {
                const address = this.addrAbsoluteX(tempObj);
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 4;
                break;
            }
            case INS.CMP_ABSY:
            {
                const address = this.addrAbsoluteY(tempObj);
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 4;
                break;
            }
            case INS.CMP_INDX:
            {
                const address = this.addrIndirectX();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 6;
                break;
            }
            case INS.CMP_INDY:
            {
                const address = this.addrIndirectY(tempObj);
                const operand =this.readByte(address);
                this.compareToRegister(operand,'A');
                tempObj.cycles += 5;
                break;
            }
            case INS.CPX:
            {
                const operand = this.fetchByte();
                this.compareToRegister(operand,'X');
                tempObj.cycles += 2;
                break;
            }
            case INS.CPX_ABS:
            {
                const address = this.addrAbsolute();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'X');
                tempObj.cycles += 4;
                break;
            }
            case INS.CPX_ZP:
            {
                const address = this.addrZeroPage();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'X');
                tempObj.cycles += 3;
                break;
            }
            case INS.CPY:
            {
                const operand = this.fetchByte();
                this.compareToRegister(operand,'Y');
                tempObj.cycles += 2;
                break;
            }
            case INS.CPY_ABS:
            {
                const address = this.addrAbsolute();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'Y');
                tempObj.cycles += 4;
                break;
            }
            case INS.CPY_ZP:
            {
                const address = this.addrZeroPage();
                const operand =this.readByte(address);
                this.compareToRegister(operand,'Y');
                tempObj.cycles += 3;
                break;
            }

            //Bit shifts
            case INS.ASL:
            {         
                const newValue = this.shiftLeft(this.getRegister('A'));
                this.setRegister('A', newValue);
                tempObj.cycles += 2;
                break;
            }
            case INS.ASL_ABS:
            {
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                const newValue = this.shiftLeft(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.ASL_ABSX:
            {
                const address = this.addrAbsoluteX();
                const operand = this.readByte(address);
                const newValue = this.shiftLeft(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 7;
                break;
            }
            case INS.ASL_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                const newValue = this.shiftLeft(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 5;
                break;
            }
            case INS.ASL_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                const newValue = this.shiftLeft(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.LSR:
            {
                const newValue = this.shiftRight(this.getRegister('A'));
                this.setRegister('A', newValue);
                tempObj.cycles += 2;
                break;
            }
            case INS.LSR_ABS:
            {
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                const newValue = this.shiftRight(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.LSR_ABSX:
            {
                const address = this.addrAbsoluteX();
                const operand = this.readByte(address);
                const newValue = this.shiftRight(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 7;
                break;
            }
            case INS.LSR_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                const newValue = this.shiftRight(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 5;
                break;
            }
            case INS.LSR_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                const newValue = this.shiftRight(operand);
                this.writeByte(address, newValue);
                tempObj.cycles += 6;
                break;
            }
            case INS.ROL:
            {
                const newValue = this.rotateLeft(this.getRegister('A'));
                this.setRegister('A', newValue);
                tempObj.cycles += 2;
                break;
            }
            case INS.ROL_ABS:
            {
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                const result = this.rotateLeft(operand);
                this.writeByte(address, result);
                tempObj.cycles += 6;
                break;
            }
            case INS.ROL_ABSX:
            {
                const address = this.addrAbsoluteX();
                const operand = this.readByte(address);
                const result = this.rotateLeft(operand);
                this.writeByte(address, result);
                tempObj.cycles += 7;
                break;
            }
            case INS.ROL_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                const result = this.rotateLeft(operand);
                this.writeByte(address, result);
                tempObj.cycles += 5;
                break;
            }
            case INS.ROL_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                const result = this.rotateLeft(operand);
                this.writeByte(address, result);
                tempObj.cycles += 6;
                break;
            }
            case INS.ROR:
            {
                const newValue = this.rotateRight(this.getRegister('A'));
                this.setRegister('A', newValue);
                tempObj.cycles += 2;
                break;
            }
            case INS.ROR_ABS:
            {
                const address = this.addrAbsolute();
                const operand = this.readByte(address);
                const result = this.rotateRight(operand);
                this.writeByte(address, result);
                tempObj.cycles += 6;
                break;
            }
            case INS.ROR_ABSX:
            {
                const address = this.addrAbsoluteX();
                const operand = this.readByte(address);
                const result = this.rotateRight(operand);
                this.writeByte(address, result);
                tempObj.cycles += 7;
                break;
            }
            case INS.ROR_ZP:
            {
                const address = this.addrZeroPage();
                const operand = this.readByte(address);
                const result = this.rotateRight(operand);
                this.writeByte(address, result);
                tempObj.cycles += 5;
                break;
            }
            case INS.ROR_ZPX:
            {
                const address = this.addrZeroPageX();
                const operand = this.readByte(address);
                const result = this.rotateRight(operand);
                this.writeByte(address, result);
                tempObj.cycles += 6;
                break;
            }
            
            case INS.NOP:
            {
                tempObj.cycles += 2;
                break;
            }
            case INS.BRK:
            {
                //this.pushPCToStack(1);
                //this.pushPSToStack();
                const interruptVector = 0xFFFE;
                const newValue = this.readWord(interruptVector);
                //this.setRegister('PC', newValue);
                this.setRegister('B', 1);
                this.setRegister('I', 1);
                tempObj.cycles += 7;
                break;
            }
            case INS.RTI:
            {
                this.popPSFromStack();
                const newValue = this.popWordFromStack();
                this.setRegister('PC', newValue);
                tempObj.cycles += 6;
                break;
            }
        }

        return tempObj;
    }
}

function createRegisters(numOfRegisters) {
    let registerBuffer = new ArrayBuffer(numOfRegisters);
    const registerView = new DataView(registerBuffer);
    return registerView;
}

export default cpu;