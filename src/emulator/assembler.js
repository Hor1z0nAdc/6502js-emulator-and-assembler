import { opcodes } from "../data/instructions.js";
const branchStatements = ["BEQ", "BNE", "BCS", "BCC", "BMI", "BPL", "BVC", "BVS"];
const commandTypes = {
    NoOperand: "nooperand",
    LabelOperand: "labeloperand",
    NumOperand: "numoperand",
    JumpWithLabel: "jumpwithlabel",
    JumpWithIndirect: "jumpwithidirect",
    JSRwithLabel: "JSRwithLabel",
    JSRwithAbsolute: "JSRwithAbsolute",
    StringLoadX: "StringLoadX",
    StringLoadY: "StringLoadY",
    AccumulatorStatement: "AccumulatorStatement",
    BadCommand: "badcommand"
}
const addressingModes = {
    immediate: "IM",
    absolute: "ABS",
    absoluteX: "ABSX",
    absoluteY: "ABSY",
    indirect: "IND",
    indirectX: "INDX",
    indirectY: "INDY",
    zero: "ZP",
    zeroX: "ZPX",
    zeroY: "ZPY",
}
const accumulatorAddressingInst = ["ASL", "LSR", "ROL", "ROR"];


const labelOperandPattern = /^[a-zA-Z_]+$/;
const labelPattern = /^[a-zA-Z_]+:$/;
const constantPattern = /^[a-zA-Z_0-9]+$/;
const hexNumPattern = /^\$[0-9a-fA-F]{1,4}$/;
const absolutePattern = /^\$[0-9a-fA-F]{3,4}$/;
const absoluteXPattern = /^\$[0-9a-fA-F]{3,4},(x|X)$/;
const absoluteYPattern = /^\$[0-9a-fA-F]{3,4},(y|Y)$/;
const indirectPattern = /^\(\$[0-9a-fA-F]{1,4}\)$/;
const indirectXPattern = /^\(\$[0-9a-fA-F]{1,2},(x|X)\)$/;
const indirectYPattern = /^\(\$[0-9a-fA-F]{1,2}\),(y|Y)$/;
const zeroPagePattern = /^\$[0-9a-fA-F]{1,2}$/;
const zeroPageXPattern = /^\$[0-9a-fA-F]{2},(x|X)$/;
const zeroPageYPattern = /^\$[0-9a-fA-F]{2},(y|Y)$/;

class Assembler {
    constructor() {
        this.lines = [];
        this.symbolTable = {};
        this.literalTable = {};
        this.stringTable = {};
        this.address = [];
        this.assembledCode = [];
        this.assembledStringData = [];
        this.addressLineMap = {};
        this.addressByteIndexMap = {};
        this.codeLineNum = 1;
        this.currentByteIndex = 1;
        this.errorMessage = undefined;
        this.startingAddress = undefined;
        this.currentAddress = undefined;
        this.currentLineAddress = 0;
        this.codeEndAddress;
    }

    assemble() {
        //check for empty code
        if(this.lines.length == 0) {
            this.errorMessage = "Üres fájl";
            return { isError: true, message: this.errorMessage };
        }

        this.initAssembling();
    
        //get starting address
        const firstLine = this.lines[0].trim().split(/\s+/);
        this.startingAddress = this.determineStartingAddress(firstLine);

        if(!this.startingAddress) {
            return { isError: true, message: this.errorMessage, errorLine: 1 };
        }
        this.currentAddress = this.startingAddress;
        
        //Actual assemblying starts here
        this.zeroPass();

        const firstPassResult = this.firstPass();
        if(firstPassResult.isError) {
            return firstPassResult;
        }

        const secondPassResult = this.secondPass();
        if(secondPassResult.isError) {
            return secondPassResult;
        }
        
        return  { isError: false, labelNum: firstPassResult.labelNum, bytes: this.assembledCode.length, stringBytes: this.assembledStringData.length };
    }

    zeroPass() {
        for(let i = 0; i < this.lines.length; i++) {
            this.lines[i] = this.removeComment(this.lines[i]);
            if(this.lines[i] == "") {
                continue;
            }

            let seperatedLine = this.lines[i].trim().split(/\s+/);

            if(this.isVariable(seperatedLine)) {
                const variableNamePart = seperatedLine[1];
                let numberPart = seperatedLine[2];
                let number;

                if(numberPart[0] == "$") {
                    numberPart = numberPart.slice(1);
                    number = parseInt("0x" + numberPart);
                }   
                else {
                    number = parseInt(numberPart);
                }

                this.literalTable[variableNamePart] = number;
                this.lines[i] = "";
                continue;
            }

            if(this.isString(seperatedLine)) {
                const line = this.lines[i];

                let value = line.substring(line.indexOf('"'), line.length);
                value = value.slice(1);
                value = value.slice(0, value.length-1);

                this.stringTable[seperatedLine[1]] = value;
                this.lines[i] = "";
                continue;
            } 

            //replace constant references in current line with constant value
            Object.keys(this.literalTable).forEach(key => {
                this.lines[i] = this.lines[i].replace(key, "$" + this.literalTable[key].toString(16));
            })
        }
    }
    
    firstPass() {
        for(let i = 0; i < this.lines.length; i++) {
            this.currentLineAddress++;

            if(this.lines[i].trim() == "") {
                continue;
            }
            let seperatedLine = this.lines[i].trim().split(/\s+/);

            if(this.isLineLabel(seperatedLine)) {
                let label = seperatedLine[0];
                label = label.slice(0, -1);

                this.symbolTable[label] = this.codeLineNum - 1;
                continue;
            }
            
            const command = opcodes[seperatedLine[0].toUpperCase()];
            if(this.isMnemonic(command, seperatedLine)) {
                if(seperatedLine.length == 1 && isNaN(command) && !accumulatorAddressingInst.includes(seperatedLine[0])) {
                    return { isError: true, message: "Ehhez a parancshoz nem létezik implikált címzés", errorLine: i + 1 };
                }

                const commandType = this.determineCommandType(command, seperatedLine);
                const processingResult = this.processCommand(commandType, command, seperatedLine);
                
                if(processingResult.isError) {
                    return { isError: true, message: processingResult.message, errorLine: i + 1 };
                }

                this.codeLineNum++;
                continue;
            }
            
            return { isError: true, message: "Ismeretlen kifejezés!", errorLine: i + 1 };
        }   

        if(this.assembledCode.length == 0) {
            return { isError: true, message: "A kód nem tartalmaz parancsot!" };
        }
        
        this.codeEndAddress = this.currentAddress - 1;
        this.saveStrings();
    
        return { isError: false, labelNum: Object.keys(this.symbolTable).length };
    }
    
    secondPass() {
        let memoryCellValue;
     
        for(let i = 0; i < this.assembledCode.length; i++) {
            memoryCellValue = this.assembledCode[i];

            //when the current assembled code element is a label or string
            if(labelOperandPattern.test(memoryCellValue)) {

                //check for valid label - one, that is assigned to a code piece, not just referenced
                const symbolTableValue = this.symbolTable[memoryCellValue];
                if(symbolTableValue != undefined) {
                    this.processSymbol(symbolTableValue, i);
                }
                else if(this.stringTable[memoryCellValue] != undefined) {
                    const stringAddress  = this.stringTable[memoryCellValue];
                    const bytes = this.toHexLowHighByte(stringAddress);

                    this.assembledCode[i] = bytes.lowByte;
                    this.assembledCode[i+1] = bytes.highByte;
                }
                //$ffd2 - pring character subrutin
                else if(memoryCellValue == "$ffd2") {
                    this.assembledCode[i] = 0xd2;
                    this.assembledCode[i+1] = 0xff;
                }
                //when the label is referenced, but doesn't point to code
                else {
                    const indexOfErrorLine = this.lines.findIndex(element => element.includes(memoryCellValue));
                    this.errorMessage = "Az ugrás nem létező sorra mutat!";
                    return { isError: true, message: this.errorMessage, errorLine: indexOfErrorLine + 1 };
                }
            }
        }
        
        return { isError: false }; 
    }

    saveStrings() {
        let currentStringIndex = 0;

        Object.entries(this.stringTable).forEach(([key, value]) => {
             const stringAddress = this.currentAddress;
            
             //change character to utf-16 number
             for(let i = 0; i < value.length; i++) {
                 let data = value.charCodeAt(i);
                
                 //check for symbols
                 if(i+1 < value.length) {
                     if(value[i] + value[i+1] == "\\n") {
                         data = 10;
                         i++;
                     }
                     else if(value[i] + value[i+1] == "\\t") {
                         data = 9;
                         i++;
                     }
                 }
                
                 this.assembledStringData[currentStringIndex++] = data;
                 this.currentAddress++;
             }
 
             this.stringTable[key] = stringAddress;
         });
    }

    processSymbol(symbolTableValue, index) {
        const statementStartIndex = symbolTableValue;
        const statementAddress = this.addresses[statementStartIndex];

        //when the current code is a jump instruction
        if(this.assembledCode[index+1] == "") {
            const bytes = this.toHexLowHighByte(statementAddress);
            
            this.assembledCode[index] = bytes.lowByte;
            this.assembledCode[index+1] = bytes.highByte;
        }
        //when the current code is a branching instruction
        else {
            const branchStatementAddress = this.addressByteIndexMap[index];
            const afterBranchStatementAddress = branchStatementAddress + 2
            const difference = statementAddress - afterBranchStatementAddress;
            const twosComplementDifference = this.convertToTwosComplement(difference);
            
            this.assembledCode[index] = twosComplementDifference;
        }
    }

    toHexLowHighByte(value) {
        let hexString = value.toString(16);
        hexString = hexString.padStart(4, "0");
        const bytes = this.getLowHighByte(hexString);

        return bytes;
    }

    convertToTwosComplement(number) {
        if(number < -128 || number > 127) {
            return undefined;
        }
    
        if(number > 0){
            return number;
        }
    
        const positiveNumber = -number;
        let binaryString = positiveNumber.toString(2).padStart(8, "0");

        for(let i = 0; i < binaryString.length; i++) {
            if(binaryString[i] == "0") {
                binaryString = this.replaceCharacter(binaryString, i, "1")
            }
            else {
                binaryString = this.replaceCharacter(binaryString, i, "0")
            } 
    
        }

        let convertedNumber = parseInt(binaryString, 2);
        convertedNumber++;
    
        return convertedNumber;
    }
    
    replaceCharacter(stringToChange, index, newCharacter) {
        return stringToChange.substring(0, index) + newCharacter + stringToChange.substring(index + newCharacter.length);
    }

    mapAddressToLine(address) {
        return this.addressLineMap[address];
    }
    
    determineStartingAddress(wordsOfLine) {
        let address = 0x0600;
    
        if(!this.isValidORGLine(wordsOfLine)) return address;
       
        let operandText = wordsOfLine[1];
        let operandNum = Number(operandText);
    
        if(this.isInHexForm(operandText)) {
           operandNum = this.transformToHexNumber(operandText); 
        }
       
        if(isNaN(operandNum)) {
            this.errorMessage = "A megadott kezdő memóriacím nem egy érvényes szám!";
            return undefined;
        }
        if(!this.isInAddressSpace(operandNum)) {
            this.errorMessage = "Kicímzett a memóriacím-tartományból!";
            return undefined;
        }
    
        //remove the org, so the assembler won't have a problem processing it
        this.lines[0] = "";
        this.currentLineAddress++;
        address = operandNum;
        return address;
    }
    
    isInAddressSpace(address) {
        return address >= 0 && address <= 0xffff; 
    }
    
    isLineLabel(text) {
        return text.length == 1 && labelPattern.test(text[0])
    }
    
    isString(line) {
        const processedWord= line.slice(2,line.length).join();
        const isProperStart = line[0].toUpperCase() == "STRING";
        const isProperName = labelOperandPattern.test(line[1]);
        const isProperEnd = processedWord[0] == '"' && processedWord[processedWord.length - 1] == '"';

        return  isProperStart && isProperName && isProperEnd;
    }   
    
    isMnemonic(command, seperatedLine) {
        return command != undefined && (seperatedLine.length == 1 || seperatedLine.length == 2);
    }
    
    isVariable(text) {
        if(text.length != 3 || text[0].toUpperCase() != "DEFINE") {
            return false;
        }

        if(!constantPattern.test(text[1])) {
            return false;
        }

        const isDecimal = parseInt(text[2]);
        const isNumber = hexNumPattern.test(text[2]) || !isNaN(isDecimal);

        return isNumber;
    }

    isImmediateVariable(word) {
       return word[0] == "#" && this.literalTable[word.slice(1)] != undefined
    }
    
    isValidORGLine(wordsOfLine) {
        return wordsOfLine.length == 2 && wordsOfLine[0].toUpperCase() == "ORG";
    }
    
    isBranchWithLabel(seperatedLine) {
        if(seperatedLine.length == 2 &&
           branchStatements.includes(seperatedLine[0].toUpperCase()) && 
           labelOperandPattern.test(seperatedLine[1])) 
        {
            return true;
        } 
    
        return false;
    }

    isJump(seperatedLine) {
        if(seperatedLine[0].toUpperCase() == "JMP" && seperatedLine.length == 2) {
            return true;
        }

        return false;
    }
    
    isLabelOperand(seperatedLine) {
        if(labelOperandPattern.test(seperatedLine[1])) {
            return true;
        }
    
        return false;
    }

    isJumpWithIndirect(seperatedLine) {
        if(indirectPattern.test(seperatedLine[1])) {
            return true;
        }
    
        return false;
    }
    
    isImmediate(word) {
        if(word[0] != "#") return false;
    
        let processedWord = word.slice(1);
        if(processedWord == "") return false;
    
        let number = Number(processedWord);
        if(processedWord[0] == "$") {
            number = this.transformToHexNumber(processedWord);
        }
    
        if(isNaN(number)) return false;
        if(number < 0 || number > 255) return false;
    
        return true;
    }
    
    isInHexForm(text) {
        return text[0] == "$";
    }

    isStringLoad(line) {
        const processedWord = line[1].slice(0, -2);

        const isLda = line[0].toUpperCase() == "LDA";
        const isLength = line.length == 2;
        const isString = this.stringTable[processedWord] != undefined;

        return isLda && isLength && isString;
    }
    
    isNoOperandStatement(command, line) {
        return !isNaN(command) && line.length == 1;
    }

    isAccumulatorStatement(command, line) {
        const isWithA = line.length == 2 && line[1].toUpperCase() == "A";
        const isWithoutA =  line.length == 1;
        
        return command != undefined && (isWithA || isWithoutA);
    }
    
    removeComment(line) {
        let words = line.split(/\s+/);

        if(words[0] == "string") {
            return line;
        }
        
        if(words[0][0] == ";") return "";
        let commentStartIndex;

        for(let i = 1; i < words.length; i++) {
            //when the word is a comment remove it from the line
            if(words[i].indexOf(';') > -1) {
                commentStartIndex = i;
                break;
            }
        }
        
        if(commentStartIndex) {
            words = words.slice(0, commentStartIndex);
        } 
        return words.join(" ");
    }
    
    determineAddressMode(word) {
        let mode;
    
        if (absolutePattern.test(word)) {
            mode = addressingModes.absolute;
        }
        else if (absoluteXPattern.test(word)) {
            mode = addressingModes.absoluteX;
        }
        else if (absoluteYPattern.test(word)) {
            mode = addressingModes.absoluteY;
        }
        else if (indirectPattern.test(word)) {
            mode = addressingModes.indirect;
        }
        else if (indirectXPattern.test(word)) {
            mode = addressingModes.indirectX;
        }
        else if (indirectYPattern.test(word)) {
            mode = addressingModes.indirectY;
        }
        else if (zeroPagePattern.test(word) || word == "$0") {
            mode = addressingModes.zero;
        }
        else if (zeroPageXPattern.test(word)) {
            mode = addressingModes.zeroX;
        }
        else if (zeroPageYPattern.test(word)) {
            mode = addressingModes.zeroY;
        }
        else if(this.isImmediate(word)) {
            mode = addressingModes.immediate;
        }
        else {
            mode = undefined;
        }
        
        return mode;
    }
    
    initAssembling() {
        this.addresses = []
        this.assembledCode = [];
        this.assembledStringData = [];
        this.codeLineNum = 1;
        this.currentByteIndex = 0;
        this.currentLineAddress = 0;
        this.symbolTable = {};
        this.literalTable = {};
        this.stringTable = {};
        this.addressLineMap = {};
        this.errorMessage = undefined;
    }
    
    transformToHexNumber(text, charNumToSlice = 1) {
        let numberText = text.slice(charNumToSlice);
        numberText = "0x" + numberText;
        return Number(numberText);
    }
    
    processCommand(commandType, command, seperatedLine) {
        if(commandType == commandTypes.BadCommand) {
            this.errorMessage = "Helytelen operandus!";
            return { isError: true, message: this.errorMessage };
        }
        
        this.addresses.push(this.currentAddress);
        this.addressLineMap[this.currentAddress] = this.currentLineAddress;

        if(commandType == commandTypes.NoOperand) {
            this.assembledCode[this.currentByteIndex++] = command;
            this.currentAddress += 1;
        }
        else if(commandType == commandTypes.LabelOperand) {
            this.assembledCode[this.currentByteIndex++] = command;
            this.addressByteIndexMap[this.currentByteIndex - 1] = this.currentAddress - 1;
            this.currentAddress += 1;

            this.assembledCode[this.currentByteIndex++] = seperatedLine[1];
            this.addressByteIndexMap[this.currentByteIndex - 1] = this.currentAddress - 1;
            this.currentAddress += 1;
        }
        else if(commandType == commandTypes.JumpWithLabel) {
            this.assembledCode[this.currentByteIndex++] = command.ABS;
            this.assembledCode[this.currentByteIndex++] = seperatedLine[1];
            this.assembledCode[this.currentByteIndex++] = "";
            this.currentAddress += 3;
        }
        else if(commandType == commandTypes.JumpWithIndirect) {
            let processedWord = seperatedLine[1].slice(2);
            processedWord = processedWord.slice(0, -1);
            const bytes = this.getLowHighByte(processedWord);

            this.assembledCode[this.currentByteIndex++] = command.IND;
            this.assembledCode[this.currentByteIndex++] = bytes.lowByte;
            this.assembledCode[this.currentByteIndex++] = bytes.highByte;
            this.currentAddress += 3;
        }
        else if(commandType == commandTypes.JSRwithLabel) {
            this.assembledCode[this.currentByteIndex++] = command;
            this.assembledCode[this.currentByteIndex++] = seperatedLine[1];
            this.assembledCode[this.currentByteIndex++] = "";
            this.currentAddress += 3;
        }
        else if(commandType == commandTypes.StringLoadX) {
            const word = seperatedLine[1];
            this.assembledCode[this.currentByteIndex++] = command.ABSX;
            this.assembledCode[this.currentByteIndex++] = word.substring(0, word.length - 2);
            this.assembledCode[this.currentByteIndex++] = "";
            this.currentAddress += 3;
        }
        else if(commandType == commandTypes.StringLoadY) {
            const word = seperatedLine[1];
            this.assembledCode[this.currentByteIndex++] = command.ABSY;
            this.assembledCode[this.currentByteIndex++] = word.substring(0, word.length - 2);
            this.assembledCode[this.currentByteIndex++] = "";
            this.currentAddress += 3;
        }
        else if(commandType == commandTypes.AccumulatorStatement) {
            this.assembledCode[this.currentByteIndex++] = command.IM;
            this.currentAddress += 1;
        }
        else {

            const addressingMode = this.determineAddressMode(seperatedLine[1]);

            if(!addressingMode) {
                this.errorMessage = "Helytelen operandus!";
                return { isError: true, message: this.errorMessage };
            }

            let opcode = command;
            if(isNaN(opcode)) {
               opcode = command[addressingMode];

               if(!opcode) {
                    const hungarianAddressingMode = this.addressingModeToHungarian(addressingMode);
                    this.errorMessage = `Ehhez a parancshoz nem létezik ${hungarianAddressingMode} címzés`;
                    return { isError: true, message: this.errorMessage };
               }

            }

            this.processOperandStatement(opcode, addressingMode, seperatedLine[1]);
        }

        return { isError:false };
    }
    
    processOperandStatement(opcode, addrMode, operand) {
        if(addrMode == addressingModes.absolute) {
            operand = operand.slice(1);

            if(operand.length == 3) {
                operand = "0" + operand;
            } 
            this.handleTwoOperandStatement(opcode, operand);
        }
        else if(addrMode == addressingModes.absoluteX || 
                addrMode == addressingModes.absoluteY) {
            operand = operand.slice(0,-2);
            operand = operand.slice(1);

            if(operand.length == 3) {
                operand = "0" + operand;
            }
            this.handleTwoOperandStatement(opcode, operand);
        }
        else if(addrMode == addressingModes.zero) {
            this.handleOneOperandStatement(opcode, operand);
        }
        else if(addrMode == addressingModes.zeroX || 
                addrMode == addressingModes.zeroY) {
            operand = operand.slice(0,-2);
            this.handleOneOperandStatement(opcode, operand);
        }
        else if(addrMode == addressingModes.indirect) {
            operand = operand.slice(1);
            operand = operand.slice(0,-1);
            this.handleTwoOperandStatement(opcode,operand);
        }
        else if(addrMode == addressingModes.indirectX || 
                addrMode == addressingModes.indirectY) {
            operand = operand.slice(0,-3);
            operand = operand.slice(1);
            this.handleOneOperandStatement(opcode,operand);
        }
        else if(addrMode == addressingModes.immediate) {
            let operandNum;
            
            if(operand[1] == "$") {
                operandNum = this.transformToHexNumber(operand, 2);
            }
            else {
                operandNum = operand.slice(1);
                operandNum = Number(operandNum);
            }
    
            this.assembledCode[this.currentByteIndex++] = opcode;
            this.assembledCode[this.currentByteIndex++] = operandNum;
            this.currentAddress += 2
        }
    }
    
    determineCommandType(command, seperatedLine) {
        let commandType;
      
        if(this.isNoOperandStatement(command, seperatedLine)) {
            commandType = commandTypes.NoOperand;
        }
        else if(this.isAccumulatorStatement(command, seperatedLine)) {
            commandType = commandTypes.AccumulatorStatement;
        }
        else if(this.isBranchWithLabel(seperatedLine)) {
            commandType = commandTypes.LabelOperand;
        }
        else if(this.isJump(seperatedLine)) {
            if(this.isLabelOperand(seperatedLine)) {
                commandType = commandTypes.JumpWithLabel;
            }
            else if(this.isJumpWithIndirect(seperatedLine)) {
                commandType = commandTypes.JumpWithIndirect;
            }
        }
        else if(seperatedLine[0] == "JSR" && seperatedLine.length == 2) {
            if(this.isLabelOperand(seperatedLine)) {
                commandType = commandTypes.JSRwithLabel;
            }
            else if(absolutePattern.test(seperatedLine[1])) {
                commandType = commandTypes.JSRwithAbsolute;
            }
        }
        else if(this.isStringLoad(seperatedLine)) {
            commandType = this.getStringLoadType(seperatedLine[1])
        }
        else if(seperatedLine.length == 2) {
            commandType = commandTypes.NumOperand;
        }
        else {
            commandType = commandTypes.BadCommand;
        }
        
        return commandType; 
    }

    getStringLoadType(word) {
        const processedWord = word.substring(word.length - 1, word.length);

        if(processedWord.toUpperCase() == "X") {
             return commandTypes.StringLoadX;
        }
        if(processedWord.toUpperCase() == "Y") {
            return commandTypes.StringLoadY;
        }

        return commandTypes.BadCommand;
    }

    getLowHighByte(operand) {
        const highSub = operand.substring(0,2);
        const lowSub = operand.substring(2);

        const highByte = this.transformToHexNumber(highSub, 0);
        const lowByte = this.transformToHexNumber(lowSub, 0);

        return {lowByte, highByte};
    }
    
    handleTwoOperandStatement(opcode, operand) {
       const operandBytes = this.getLowHighByte(operand); 
        this.assembledCode[this.currentByteIndex++] = opcode;
        this.assembledCode[this.currentByteIndex++] = operandBytes.lowByte;
        this.assembledCode[this.currentByteIndex++] = operandBytes.highByte;
        this.currentAddress += 3;
    }
    
    handleOneOperandStatement(opcode, operand) {
        const operandHex = this.transformToHexNumber(operand);
    
        this.assembledCode[this.currentByteIndex++] = opcode;
        this.assembledCode[this.currentByteIndex++] = operandHex
        this.currentAddress += 2;
    }
    
    getHexDump() {
        let hexDump = "";
        let currentMemoryCellIndex = 0;
        let currentByte, currentHexByte;
    
        for(let i = 0; i < this.addresses.length - 1; i++) {
            const currentAddress = this.addresses[i];
            const nextAddress = this.addresses[i+1];
            const addressDiff = nextAddress - currentAddress;
            
            currentHexByte = currentAddress.toString(16).toUpperCase();
            currentHexByte = currentHexByte.padStart(4, '0');
            hexDump += "$" + currentHexByte + ": ";

            for(let j = 0; j < addressDiff; j++) {
                currentByte = this.assembledCode[currentMemoryCellIndex++];
                currentHexByte = currentByte.toString(16).toUpperCase()
                currentHexByte = currentHexByte.padStart(2, '0');

                hexDump += currentHexByte + " ";
            }
            hexDump += "\n";
        }
    
        const addressDiff = this.assembledCode.length - currentMemoryCellIndex;
        currentByte = this.addresses[this.addresses.length - 1];
        currentHexByte = currentByte.toString(16).toUpperCase();
        currentHexByte = currentHexByte.padStart(4, '0');
        hexDump += "$" + currentHexByte + ": ";
        
        for(let i = 0; i < addressDiff; i++) {
            currentByte = this.assembledCode[currentMemoryCellIndex++];
            currentHexByte = currentByte.toString(16).toUpperCase()
            currentHexByte = currentHexByte.padStart(2, '0');

            hexDump += currentHexByte + " ";
        }
    
        return hexDump;
    }

    addressingModeToHungarian(mode) {
        switch(mode) {
            case addressingModes.immediate:
                return "azonnali";
            case addressingModes.indirect:
                return "indirekt";
            case addressingModes.indirectX:
                return "indexelt indirekt";
            case addressingModes.indirectY:
                return "indirekt indexelt";
            case addressingModes.absolute:
                return "abszolút";
            case addressingModes.absoluteY:
            case addressingModes.absoluteX:
                return "abszolút indexelt";
            case addressingModes.zero:
                return "zéró lap";    
            case addressingModes.zeroY:       
            case addressingModes.zeroX:
                return "zéró lap indexelt";
        }
    }
}

export default Assembler;

