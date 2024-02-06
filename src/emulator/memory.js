class memory {
    #MemorySize;

    constructor() {
        this.#MemorySize = 1024 * 64;
        this.memoryCells = new ArrayBuffer(this.#MemorySize);
        this.dataView = new DataView(this.memoryCells);
    }

    //fills every memory cell (the whole memory) with 0 values
    initialise() {
       for(let i = 0; i < this.#MemorySize; i++)  {
        this.dataView.setUint8(i, 0);
       }
    }

    //using the dataView overwrites the memory cell given by the address with new byte value
    setByte(address, newValue) {
        this.dataView.setUint8(address, newValue);
    }

    //using the dataView overwrites the given memory cell and the next one with the a word
    setWord(address, newValue) {
        this.dataView.setUint8(address, newValue & 0xFF);
        this.dataView.setUint8(address + 1, newValue >> 8);
    }
    
    //using the dataView return the byte from memory given at the address
    getByte(address) {
        return this.dataView.getUint8(address);
    }
}

export default memory;