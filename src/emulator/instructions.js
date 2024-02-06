const opcodes = {LDA: {IM: 0xA9, ZP: 0xA5, ZPX: 0xB5, ABS: 0xAD, ABSX: 0xBD, ABSY: 0xB9, INDX: 0xA1, INDY: 0xB1},
                 LDX: {IM: 0xA2, ZP: 0xA6, ZPY: 0xB6, ABS: 0xAE, ABSY: 0xBE},
                 LDY: {IM: 0xA0, ZP: 0xA4, ZPX: 0xB4 ,ABS: 0xAC, ABSX: 0xBC},
                 STA: {ZP: 0x85, ZPX: 0x95, ABS: 0x8D, ABSX: 0x9D, ABSY: 0x99, INDX: 0x81, INDY: 0x91},
                 STX: {ZP: 0x86, ZPY: 0x96, ABS: 0x8E},
                 STY: {ZP: 0x84, ZPX: 0x94, ABS: 0x8C},
                 JMP: {ABS: 0x4C, IND: 0x6C}, 
                 AND: {IM: 0x29, ZP: 0x25, ZPX: 0x35, ABS: 0x2D, ABSX: 0x3D, ABSY: 0x39, INDX: 0x21, INDY: 0x31},
                 ORA: {IM: 0x09, ZP: 0x05, ZPX: 0x15, ABS: 0x0D, ABSX: 0x1D, ABSY: 0x19, INDX: 0x01, INDY: 0x11},
                 EOR: {IM: 0x49, ZP: 0x45, ZPX: 0x55, ABS: 0x4D, ABSX: 0x5D, ABSY: 0x59, INDX: 0x41, INDY: 0x51},
                 BIT: {ZP: 0x24, ABS: 0x2C},
                 INC: {ZP: 0xE6, ZPX: 0xF6, ABS: 0xEE, ABSX: 0xFE},
                 DEC: {ZP: 0xC6, ZPX: 0xD6, ABS: 0xCE, ABSX: 0xDE},
                 ADC: {IM: 0x69, ZP: 0x65, ZPX: 0x75, ABS: 0x6D, ABSX: 0x7D, ABSY: 0x79, INDX: 0x61, INDY: 0x71},
                 SBC: {IM: 0xE9, ZP: 0xE5, ZPX: 0xF5, ABS: 0xED, ABSX: 0xFD, ABSY: 0xF9, INDX: 0xE1, INDY: 0xF1},
                 CMP: {IM: 0xC9, ZP: 0xC5, ZPX: 0xD5, ABS: 0xCD, ABSX: 0xDD, ABSY: 0xD9, INDX: 0xC1, INDY: 0xD1},
                 CPX: {IM: 0xE0, ZP: 0xE4, ABS: 0xEC},
                 CPY: {IM: 0xC0, ZP: 0xC4, ABS: 0xCC},
                 ASL: {IM: 0x0A, ZP: 0x06, ZPX: 0x16, ABS: 0x0E, ABSX: 0x1E},
                 LSR: {IM: 0x4A, ZP: 0x46, ZPX: 0x56, ABS: 0x4E, ABSX: 0x5E},
                 ROL: {IM: 0x2A, ZP: 0x26, ZPX: 0x36, ABS: 0x2E, ABSX: 0x3E},
                 ROR: {IM: 0x6A, ZP: 0x66, ZPX: 0x76, ABS: 0x6E, ABSX: 0x7E},
                 TSX: 0xBA, TXS: 0x9A, PHA: 0x48, PLA: 0x68, PHP: 0x08, PLP: 0x28,
                 JSR: 0x20, RTS: 0x60, TAX: 0xAA, TAY: 0xA8, TXA: 0x8A, TYA: 0x98,
                 INX: 0xE8, INY: 0xC8, DEY: 0x88, DEX: 0xCA, BEQ: 0xF0, BNE: 0xD0,
                 BCS: 0xB0, BCC: 0x90, BMI: 0x30, BPL: 0x10, BVC: 0x50, BVS: 0x70,
                 CLC: 0x18, SEC: 0x38, CLD: 0xD8, SED: 0xF8, CLI: 0x58, SEI: 0x78,
                 CLV: 0xB8, NOP: 0xEA, BRK: 0x00, RTI: 0x40}; 

//LDA
const LDA_IM = 0xA9;
const LDA_ZP = 0xA5;
const LDA_ZPX = 0xB5;
const LDA_ABS = 0xAD;
const LDA_ABSX = 0xBD;
const LDA_ABSY = 0xB9;
const LDA_INDX = 0xA1;
const LDA_INDY = 0xB1;

//LDX
const LDX_IM = 0xA2;
const LDX_ZP = 0xA6;
const LDX_ZPY = 0xB6;
const LDX_ABS = 0xAE;
const LDX_ABSY = 0xBE;

//LDY
const LDY_IM = 0xA0;
const LDY_ZP = 0xA4;
const LDY_ZPX = 0xB4;
const LDY_ABS = 0xAC;
const LDY_ABSX = 0xBC;

//STA
const STA_ZP = 0x85;
const STA_ZPX = 0x95;
const STA_ABS = 0x8D;
const STA_ABSX = 0x9D;
const STA_ABSY = 0x99;
const STA_INDX = 0x81;
const STA_INDY = 0x91;

//STX
const STX_ZP = 0x86;
const STX_ZPY = 0x96;
const STX_ABS = 0x8E;

//STY
const STY_ZP = 0x84;
const STY_ZPX = 0x94;
const STY_ABS = 0x8C;

const TSX = 0xBA; //Transfer Stack ptr to X
const TXS = 0x9A; //Transfer X to Stack ptr
const PHA = 0x48; //Push accumulator
const PLA = 0x68; //Pull accumulator
const PHP = 0x08; //Push processor status
const PLP = 0x28; //Pull processor status

const JMP_ABS = 0x4C;
const JMP_IND = 0x6C;

//Jump to subroutine
const JSR = 0x20;
//Return from subrutine
const RTS = 0x60;

//Logical Ops

//AND
const AND_IM = 0x29;
const AND_ZP = 0x25;
const AND_ZPX = 0x35;
const AND_ABS = 0x2D;
const AND_ABSX = 0x3D;
const AND_ABSY = 0x39;
const AND_INDX = 0x21;
const AND_INDY = 0x31;

//OR
const ORA_IM = 0x09;
const ORA_ZP = 0x05;
const ORA_ZPX = 0x15;
const ORA_ABS = 0x0D;
const ORA_ABSX = 0x1D;
const ORA_ABSY = 0x19;
const ORA_INDX = 0x01;
const ORA_INDY = 0x11;

//EOR
const EOR_IM = 0x49;
const EOR_ZP = 0x45;
const EOR_ZPX = 0x55;
const EOR_ABS = 0x4D;
const EOR_ABSX = 0x5D;
const EOR_ABSY = 0x59;
const EOR_INDX = 0x41;
const EOR_INDY = 0x51;

//BIT
const BIT_ZP = 0x24;
const BIT_ABS = 0x2C;

//Transfer Registers
const TAX = 0xAA;
const TAY = 0xA8;
const TXA = 0x8A;
const TYA = 0x98;

//Increments; Decrements
const INX = 0xE8;
const INY = 0xC8;
const DEY = 0x88;
const DEX = 0xCA;
const DEC_ZP = 0xC6;
const DEC_ZPX = 0xD6;
const DEC_ABS = 0xCE;
const DEC_ABSX = 0xDE;
const INC_ZP = 0xE6;
const INC_ZPX = 0xF6;
const INC_ABS = 0xEE;
const INC_ABSX = 0xFE;

//branches
const BEQ = 0xF0;
const BNE = 0xD0;
const BCS = 0xB0;
const BCC = 0x90;
const BMI = 0x30;
const BPL = 0x10;
const BVC = 0x50;
const BVS = 0x70;

//status flag changes
const CLC = 0x18;
const SEC = 0x38;
const CLD = 0xD8;
const SED = 0xF8;
const CLI = 0x58;
const SEI = 0x78;
const CLV = 0xB8;

//Arithmetic
const ADC = 0x69;
const ADC_ZP = 0x65;
const ADC_ZPX = 0x75;
const ADC_ABS = 0x6D;
const ADC_ABSX = 0x7D;
const ADC_ABSY = 0x79;
const ADC_INDX = 0x61;
const ADC_INDY = 0x71;

const SBC = 0xE9;
const SBC_ABS = 0xED;
const SBC_ZP = 0xE5;
const SBC_ZPX = 0xF5;
const SBC_ABSX = 0xFD;
const SBC_ABSY = 0xF9;
const SBC_INDX = 0xE1;
const SBC_INDY = 0xF1;

// Register Comparison
const CMP = 0xC9;
const CMP_ZP = 0xC5;
const CMP_ZPX = 0xD5;
const CMP_ABS = 0xCD;
const CMP_ABSX = 0xDD;
const CMP_ABSY = 0xD9;
const CMP_INDX = 0xC1;
const CMP_INDY = 0xD1;

const CPX = 0xE0;
const CPY = 0xC0;
const CPX_ZP = 0xE4;
const CPY_ZP = 0xC4;
const CPX_ABS = 0xEC;
const CPY_ABS = 0xCC;

// shifts
const ASL = 0x0A;
const ASL_ZP = 0x06;
const ASL_ZPX = 0x16;
const ASL_ABS = 0x0E;
const ASL_ABSX = 0x1E;

const LSR = 0x4A;
const LSR_ZP = 0x46;
const LSR_ZPX = 0x56;
const LSR_ABS = 0x4E;
const LSR_ABSX = 0x5E;

const ROL = 0x2A;
const ROL_ZP = 0x26;
const ROL_ZPX = 0x36;
const ROL_ABS = 0x2E;
const ROL_ABSX = 0x3E;

const ROR = 0x6A;
const ROR_ZP = 0x66;
const ROR_ZPX = 0x76;
const ROR_ABS = 0x6E;
const ROR_ABSX = 0x7E;

//misc
const NOP = 0xEA;
const BRK = 0x00;
const RTI = 0x40;

export {  
    opcodes,
    LDA_IM,
    LDA_ZP,
    LDA_ZPX,
    LDA_ABS,
    LDA_ABSX,
    LDA_ABSY,
    LDA_INDX,
    LDA_INDY,
    LDX_IM,
    LDX_ZP,
    LDX_ZPY,
    LDX_ABS,
    LDX_ABSY,
    LDY_IM,
    LDY_ZP,
    LDY_ZPX,
    LDY_ABS,
    LDY_ABSX,
    STA_ZP,
    STA_ZPX,
    STA_ABS,
    STA_ABSX,
    STA_ABSY,
    STA_INDX,
    STA_INDY,
    STX_ZP,
    STX_ZPY,
    STX_ABS,
    STY_ZP,
    STY_ZPX,
    STY_ABS,
    TSX,
    TXS,
    PHA,
    PLA,
    PHP,
    PLP,
    JMP_ABS,
    JMP_IND,
    JSR,
    RTS,
    AND_IM,
    AND_ZP,
    AND_ZPX,
    AND_ABS,
    AND_ABSX,
    AND_ABSY,
    AND_INDX,
    AND_INDY,
    ORA_IM,
    ORA_ZP,
    ORA_ZPX,
    ORA_ABS,
    ORA_ABSX,
    ORA_ABSY,
    ORA_INDX,
    ORA_INDY,
    EOR_IM,
    EOR_ZP,
    EOR_ZPX,
    EOR_ABS,
    EOR_ABSX,
    EOR_ABSY,
    EOR_INDX,
    EOR_INDY,
    BIT_ZP,
    BIT_ABS,
    TAX,
    TAY,
    TXA,
    TYA,
    INX,
    INY,
    DEY,
    DEX,
    DEC_ZP,
    DEC_ZPX,
    DEC_ABS,
    DEC_ABSX,
    INC_ZP,
    INC_ZPX,
    INC_ABS,
    INC_ABSX,
    BEQ,
    BNE,
    BCS,
    BCC,
    BMI,
    BPL,
    BVC,
    BVS,
    CLC,
    SEC,
    CLD,
    SED,
    CLI,
    SEI,
    CLV,
    ADC,
    ADC_ZP,
    ADC_ZPX,
    ADC_ABS,
    ADC_ABSX,
    ADC_ABSY,
    ADC_INDX,
    ADC_INDY,
    SBC,
    SBC_ABS,
    SBC_ZP,
    SBC_ZPX,
    SBC_ABSX,
    SBC_ABSY,
    SBC_INDX,
    SBC_INDY,
    CMP,
    CMP_ZP,
    CMP_ZPX,
    CMP_ABS,
    CMP_ABSX,
    CMP_ABSY,
    CMP_INDX,
    CMP_INDY,
    CPX,
    CPY,
    CPX_ZP,
    CPY_ZP,
    CPX_ABS,
    CPY_ABS,
    ASL,
    ASL_ZP,
    ASL_ZPX,
    ASL_ABS,
    ASL_ABSX,
    LSR,
    LSR_ZP,
    LSR_ZPX,
    LSR_ABS,
    LSR_ABSX,
    ROL,
    ROL_ZP,
    ROL_ZPX,
    ROL_ABS,
    ROL_ABSX,
    ROR,
    ROR_ZP,
    ROR_ZPX,
    ROR_ABS,
    ROR_ABSX,
    NOP,
    BRK,
    RTI
}