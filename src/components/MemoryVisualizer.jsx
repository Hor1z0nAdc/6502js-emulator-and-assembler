import React from 'react'
import { useState } from 'react'

const MemoryVisualizer = ({memory}) => {
  const [searchedMemory, setSearchedMemory] = useState("");
  const [searchResult1, setSearchResult1] = useState("");
  const [searchResult2, setSearchResult2] = useState("");
  const [searchedByte, setSearchedByte] = useState("");

  function hexToDecimal(hexString) {
    let decimal = 0;
    let base = 1; // Start from the least significant digit

    for (let i = hexString.length - 1; i >= 0; i--) {
        let currentDigit = hexString[i];

        if (currentDigit >= '0' && currentDigit <= '9') {
            decimal += (currentDigit - '0') * base;
        } 
        else if (currentDigit >= 'a' && currentDigit <= 'f') {
            decimal += (currentDigit.charCodeAt(0) - 87) * base; 
        } 
        else if (currentDigit >= 'A' && currentDigit <= 'F') {
            decimal += (currentDigit.charCodeAt(0) - 55) * base; 
        }
        else {
          return NaN;
        }

        base *= 16;
    }

    return decimal;
  }

  function determineResultedBytes(memoryAddress) {
    let result1 = "";
    let result2 = ""
    let currentAddress;

    //Determine starting address based on seached cell index
    if(memoryAddress <  65535 - 16) {
        currentAddress = memoryAddress;
    }
    else {
      const untilBound = 65535 - memoryAddress;
      const lowerWith = 16 - untilBound;
      currentAddress = memoryAddress - lowerWith;
    }
    
    //Printing to window two rows of bytes and memory addresses
    let isFound = false;
    for(let i = 0; i < 2; i++) {

        //Add address to printing
        let newAddress = currentAddress.toString(16).padStart(4, "0") + ": ";
        if(!isFound) {
          result1 +=  newAddress;
        }
        else  {
          result2 += newAddress;
        }

        //Add the eight bytes to printing
        for(let j = 0; j < 8; j++) {
            const byte = memory.getByte(currentAddress++);

            let searchedAddress = currentAddress - 1;
            if(memoryAddress > 65535 - 16) {
                searchedAddress = currentAddress;
            }

            if(searchedAddress == memoryAddress) {
                isFound = true;
                setSearchedByte(byte.toString(16).padStart(2, "0"));
            }
            else {
              if(!isFound) {
                result1 += byte.toString(16).padStart(2, "0") + "  ";
              }
              else {
                result2 += byte.toString(16).padStart(2, "0") + "  ";
              }
            }
        }

        if(!isFound) {
          result1 += "\n";
        }
        else {
          result2 += "\n";
        }
    }

    return {result1, result2};
  }

  function lookupHandler() {
    let memoryAddress;
    let isError = false;
    let errorMessage = "";
    
    //Error handling
    memoryAddress = hexToDecimal(searchedMemory);

    if(searchedMemory.length == 0) {
      isError = true;
      errorMessage = "Nem adott meg számot!";
     
    } 
    else if(isNaN(memoryAddress)) {
      isError = true;
      errorMessage = "Nem adott meg megfelelő számot!";
    }
    else if(memoryAddress > 0xffff) {
      isError = true;
      errorMessage = "Túl nagy számot adott meg!";
    }
    
    if(isError) {
      setSearchResult1(errorMessage);
      setSearchResult2("");
      setSearchedByte("");
      return;
    }
    //End of error handling

    const results = determineResultedBytes(memoryAddress);
    setSearchResult1(results.result1);
    setSearchResult2(results.result2);
  }

  return (
    <div>
        <span className='visualizer-span'>Adja meg a keresett memóricímet.</span>
        <span className='visualizer-span'>Kizárólag hexa formátumban (0000 - ffff)</span>
        <div style={{paddingTop: "10px"}}>
            <input className='popup-button' value={searchedMemory} onChange={(event) => setSearchedMemory(event.target.value)} />
            <button className='popup-button' onClick={lookupHandler}>keresés</button>
        </div>
        <div style={{paddingTop: "20px"}}>
            <pre>
              <span>{searchResult1}</span>
              <span className='searched-byte'>{searchedByte + "  "}</span>
              <span>{searchResult2}</span>
            </pre>
        </div>
    </div>
  )
}

export default MemoryVisualizer