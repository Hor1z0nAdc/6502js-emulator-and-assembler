import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Popup from '../components/Popup'
import { options, preCodes } from "../data/codes.js";

const INITIAL_FLAG_VALUES = {N: 0, V:0, Unused:1, B: 0, D: 0, I: 0, Z:0, C: 0};
const INITIAL_REGISTER_VALUES = {A: "$0000", X:"$0000", Y:"$0000", PC: "$0000", SP:"$0000", SR: "$0000"};

const Buttons = ({code, showMonitorRef, memory, messages, messageDivRef, needKey, setNeedKey, keyEnabledRef, consoleRef, setConsoleText, setDisableConsole, showMonitor, setShowConsole, draw, setCode, setMessages, setRegisters, setStatusFlags, setCycles, Assembler, Cpu, transformRegValues, prevNumSystemRef, currentNumSystemRef}) => {
 
  const [currentCodeName, setCurrentCodeName] = useState(options[0]);
  const [localStorageKeys, setlocalStorageKeys] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFail, setSaveFail] = useState(false);
  const [disableDump, setDisableDump] = useState(true);
  const [disableRun, setDisableRun] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [disableStop, setDisableStop] = useState(true);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableRunLine, setDisableRunLine] = useState(false);
  const [showHexdump, setShowHexdump] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showSaveWindow, setShowSaveWindow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [hexdumpValue, setHexdumpValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const cyclesRef = useRef(0);
  const needResetRef = useRef(false);
  const workerRef = useRef(new Worker("out.js"));
  const keyBufferRef = useRef(null);
  const selectElementRef = useRef();

  useEffect(() => {
    workerRef.current.onmessage = event => {
      workerMessageHandler(event);
    }

    const localStorageKeys = Object.keys(localStorage);
    setlocalStorageKeys(localStorageKeys);
    loadSelectedCode(options[0]);
  }, [])

  useEffect(() => {
    messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
  }, [messages])

  useEffect(() => {
     if(consoleRef.current) {
      consoleRef.current.focus();
     }

     if(keyEnabledRef.current == true && needKey == false) {
        keyBufferRef.current = memory.getByte(0xff);
        keyEnabledRef.current = false;
        setConsoleText(previous => previous + String.fromCharCode(keyBufferRef.current));
        setDisableConsole(true);

        workerRef.current = new Worker("out.js");
        workerRef.current.onmessage = event => {
          workerMessageHandler(event);
        }
        workerRef.current.postMessage({Cpu, memory});
     }
  }, [needKey])

  function workerMessageHandler(event) {
    const isDone = event.data.isDone;

    //get all the data from the message
    let allCycles = event.data.allCycles;
    const workerCpuData = event.data.cpuData;
    const workerMemoryData = event.data.memoryData;
    const routine = event.data.routine;
    
    //set the cpu and memory values to the new data from message
    Cpu.byteRegisters = workerCpuData.byteRegisters;
    Cpu.wordRegisters = workerCpuData.wordRegisters;
    Cpu.statusFlags = workerCpuData.statusFlags;
    new Uint8Array(memory.memoryCells).set(new Uint8Array(workerMemoryData));
    
    if(!showMonitorRef.current) {
      draw(memory);
    }

    //preprocess register values and show it on the front-end
    const newRegisterValues = Cpu.getAllRegisters();
    const newStatusFlags = Cpu.getStatusFlags();
    cyclesRef.current = allCycles;

    prevNumSystemRef.current = "decimal";
    let newTransformedRegValues = newRegisterValues;
    if(currentNumSystemRef.current != "decimal") {
      newTransformedRegValues = transformRegValues(newRegisterValues);
    }

    if(allCycles > 99999) {
      allCycles = "99999+";
    }
    setCycles(allCycles);
    setRegisters(newTransformedRegValues);
    setStatusFlags(newStatusFlags);
  
    if(!isDone) {    

      if(routine) {
          if(routine == "cout") {
            const asciiCode = Cpu.getRegister("A");
            const char = String.fromCharCode(asciiCode);
            setConsoleText((previous) => previous + char);
            setShowConsole(true);
          }
          else if(routine == "skey") {
            setNeedKey(true);
            keyEnabledRef.current = true;
            setShowConsole(true);
            setDisableConsole(false);
          }
          else if(routine == "kin") {
            Cpu.setRegister("A", keyBufferRef.current);
          }
          else if(routine == "clear") {
            setShowConsole(true);
            setConsoleText("");
          }
      }
      
      return;
    }
    
    //The program run has finished
    setDisableRun(false);
    setDisableRunLine(false);
    setDisableStop(true);
    setMessages((message) => message + "\nA kód végrehajtódott\nCpu ciklusok száma: " + cyclesRef.current + "\n");
  }

  function loadSelectedCode(selectedKey) {
    const selectedKeyIndex = options.indexOf(selectedKey);
    let code = "";

    if(selectedKeyIndex != -1) {
      const selectedCode = preCodes[selectedKeyIndex];
  
      selectedCode.forEach(codeLine => {
        code += codeLine + "\n";
      })

      code = code.slice(0, -1);
    }
    else {
      code = localStorage.getItem(selectedKey)
    }

    setCode(code);
    setDisableDump(true);
    setDisableRun(true);
    setDisableRunLine(true);
    setMessages("");
  }

  function stopHandler() {
      workerRef.current.terminate();

      workerRef.current = new Worker("out.js");
      workerRef.current.onmessage = event => {
        workerMessageHandler(event);
      }

      setDisableRun(false);
      setDisableRunLine(false);
      setDisableStop(true);
      setMessages((message) => message + "\nProgram futás leállítva!\n");
  }

  function closeDeleteHandler() {
    setShowDelete(false);
  }

  function onCodeChangeHandler(event) {
      setRegisters(INITIAL_REGISTER_VALUES);
      setStatusFlags(INITIAL_FLAG_VALUES);
      setCycles(0);
      
      let value = event.target.value;
      setCurrentCodeName(value);
      setSaveName(value);
      memory.initialise();

      if(value == "") {
        setCode("");
      }
      else {
        loadSelectedCode(value);
      }

      if(showMonitor) {
        draw(memory);
      }

      const keyIndex = options.indexOf(value);
      let isDisableSave;
      let isDisableDelete;

      if(keyIndex == -1) {
        isDisableSave = false;

        if(value == "") {
          isDisableDelete = true;
        }
        
      }
      else {
        isDisableSave = true;
        isDisableDelete = true;
      }

      setDisableSave(isDisableSave);
      setDisableDelete(isDisableDelete);
  }

  function assemblingHandler() {
      setStatusFlags(INITIAL_FLAG_VALUES);
      setCycles(0);
      setConsoleText("")
      cyclesRef.current = 0;
      
      let lines = code.split("\n");
      Assembler.initAssembling();
      Assembler.lines = lines;
      const assemblerResult = Assembler.assemble();
      
      let message;
      let isError = assemblerResult.isError;
      let newPC = "0";

      if(!isError) {
        newPC = Assembler.startingAddress.toString();
        const bytes = assemblerResult.bytes;
        const stringBytes = assemblerResult.stringBytes;

        Cpu.reset();
        Cpu.loadProgram(Assembler.startingAddress, Assembler.assembledCode, Assembler.assembledStringData);
        message = "Az assembler sikeresen lefutott.";
        message += "\nCímkék száma: " + assemblerResult.labelNum;
        message +=`\nKód mérete: ${assemblerResult.bytes} byte\n`;

        if(assemblerResult.stringBytes > 0) {
          message +=`Kód mérete string adatokkal együtt: ${stringBytes + bytes} byte\n`;
        }

        if(showMonitor) {
          draw(memory);
        }
    }
    else {
      message = "Az assembler hibát talált, nincs futtatandó kód.";
      if(assemblerResult.errorLine) {
        message += "\nSzintaktikai hiba a következő sorban: " + assemblerResult.errorLine + ".";
      }
      message += "\n" + assemblerResult.message;
    }
    
    let newRegisterValues = {A: "0", X:"0", Y:"0", PC: newPC, SP:"0", SR: "0"}
    prevNumSystemRef.current = "decimal";
    newRegisterValues = transformRegValues(newRegisterValues);
    setRegisters(newRegisterValues);
    setDisableDump(isError);
    setDisableRun(isError);
    setDisableRunLine(isError);
    setDisableStop(true);
    setMessages(message);
  }

  function newCodeHandler() {
    setCode("");
    setCurrentCodeName("");
    setSaveName("");
    setMessages("")
    setDisableRun(true);
    setDisableSave(false);
    setDisableDelete(true);
  }

  function saveWindowHandler() {
    const element = selectElementRef.current;

    setSaveName(element.options[element.selectedIndex].text);
    setSaveSuccess(false);
    setSaveFail(false);
    setShowSaveWindow(true);

  }

  function deleteCodeHandler() {
    setShowDelete(true);
  }

  function deleteCode() {
    setShowDelete(false);
    localStorage.removeItem(currentCodeName);
    const localStorageKeys = Object.keys(localStorage);
    setlocalStorageKeys(localStorageKeys);

    setCurrentCodeName(options[0]);
    loadSelectedCode(options[0]);
    setDisableDelete(true);
  }

  function saveHandler() {
    let errorText = "";
    let success = true;
    let disable = false;
    let fail = false;

    if(saveName.length == 0) {
      success = false;
      disable = true;
      fail = true;
      errorText = "Nem adott nevet a programnak!";
    }
    else if(saveName.length > 20) {
      success = false;
      disable = true;
      fail = true;
      errorText = "Program neve nem lehet 20 karakternél hosszabb!";
    }

    setSaveSuccess(success);
    setDisableDelete(disable);
    setSaveFail(fail);
    setErrorText(errorText);

    if(fail) {
      return;
    }
    
    setSaveName("");
    setCurrentCodeName(saveName);
    localStorage.setItem(saveName, code);
    const localStorageKeys = Object.keys(localStorage);
    setlocalStorageKeys(localStorageKeys);

  }

  function hexDumpHandler() {
    const hexDumpResult = Assembler.getHexDump();
    setHexdumpValue(hexDumpResult);
    setShowHexdump(true);
  }

  function runHandler() {
      Cpu.reset();
      Cpu.loadProgram(Assembler.startingAddress, Assembler.assembledCode, Assembler.assembledStringData);
      needResetRef.current = true;
      cyclesRef.current = 0;
      setCycles(0)
      setDisableStop(false);
      setDisableRun(true);
      setDisableRunLine(true);
      setMessages((message) => message + "\nA kód fut");
      setConsoleText("");

      workerRef.current.postMessage({Cpu, memory});
  }

  function runByLineHandler() {
    if(needResetRef.current) {
      Cpu.reset();
      Cpu.loadProgram(Assembler.startingAddress, Assembler.assembledCode, Assembler.assembledStringData);
      cyclesRef.current = 0;
      setCycles(0);
      setConsoleText("");
      needResetRef.current = false;
    }

    const pcRegister = Cpu.getRegister("PC")
    const executedLineNum = Assembler.mapAddressToLine(pcRegister);
    const runResult = Cpu.runLine();
    const routine = runResult.result.routine;
    cyclesRef.current += runResult.result.cycles;

    if(showMonitor) {
      draw(memory);
    }

    if(routine == "cout") {
      const asciiCode = Cpu.getRegister("A");
      const char = String.fromCharCode(asciiCode);
      setConsoleText((previous) => previous + char);
      setShowConsole(true);
    }
    else if(routine == "skey") {
      setNeedKey(true);
      keyEnabledRef.current = true;
      setShowConsole(true);
      setDisableConsole(false);
    }
    else if(routine == "kin") {
      Cpu.setRegister("A", keyBufferRef.current);
    }
    
    else if(routine == "clear") {
      setShowConsole(true);
      setConsoleText("");
    }

    const newRegisterValues = Cpu.getAllRegisters();
    const newStatusFlags = Cpu.getStatusFlags();

    prevNumSystemRef.current = "decimal";
    const newTransformedRegValues = transformRegValues(newRegisterValues);

    setRegisters(newTransformedRegValues);
    setStatusFlags(newStatusFlags);
    setCycles(cyclesRef.current);
    setMessages((message) => message + "\nLefutott sor: " + executedLineNum);
    
    const done = Cpu.isCodeDone();
    if(done || runResult.isBreak) {
      setDisableRunLine(true);
      setMessages((message) => message + "\nA kód végrehajtódott\nCpu ciklusok száma: " + cyclesRef.current + "\n");
    }
  }
 
  return (
    <div> 
        <div className='editor-buttons1'>
          <button className='button' onClick={newCodeHandler}>Új kód</button>
          <button className='button' onClick={saveWindowHandler} disabled={disableSave}>Kód mentése</button>
          <button className='button' onClick={deleteCodeHandler}  disabled={disableDelete}>Kód törlése</button>
          <select value={currentCodeName} ref={selectElementRef} onChange={onCodeChangeHandler}>
            <optgroup label='alapértelmezett kód'>
                  {options.map((option, index) => { 
                    return <option key={index}>{option}</option>
                  })}
            </optgroup>
            <optgroup label='saját kód'>
              {localStorageKeys.map((option, index) => { 
                 return <option key={index}>{option}</option>
              })}
              <option key="empty"></option>
            </optgroup>
          </select>
      </div>
      <div className='editor-buttons2'>
          <button className='button' onClick={assemblingHandler} >Assemble</button>
          <button className='button' disabled={disableRun} onClick={runHandler}>Futtatás</button>
          <button className='button' disabled={disableRun || disableRunLine} onClick={runByLineHandler}>Futtatás soronként</button>
          <button className='button' disabled={disableStop} onClick={stopHandler}>Stop</button>
          <button className='button' disabled={disableDump} onClick={hexDumpHandler}>Hexdump</button>
      </div>

      <Popup trigger={showHexdump} title="Hexdump" setShow={setShowHexdump}>
          <div className='hexdump-div'>
              <pre className='pre'>{hexdumpValue}</pre>
          </div>
      </Popup>

      <Popup trigger={showSaveWindow} title="Kód mentése" setShow={setShowSaveWindow}>
          <div >  
                  <div style={{paddingBottom: "10px"}}>
                    <label style={{paddingRight: "10px"}}>Kód neve</label>
                    <input className='padding' value={saveName} maxLength={27} onChange={(e) => setSaveName(e.target.value)}></input>
                  </div>
                  <button className='popup-button padding' onClick={saveHandler}>Mentés</button>
                  <div className='image-container'>
                    {saveSuccess && (<img className='okay-img' src='../../images/okay.svg' alt='okay'></img>)}
                    {saveFail && (<div>
                                    <h3>{errorText}</h3>
                                    <img className='okay-img' src='../../images/cross.png' alt='okay'></img>
                                  </div>)}
                  </div>
          </div>
      </Popup>

      <Popup trigger={showDelete} title="Törlés" setShow={setShowDelete}>
            <h3 className='center-text'>Biztosan törölni akarj a betöltött programot?</h3>
          <div className='buttons-container-div'>
            <div className='buttons-div'>
              <button className='decide-button' onClick={deleteCode}>Igen</button>
              <button className='decide-button' onClick={closeDeleteHandler}>Nem</button>
            </div>
          </div>
      </Popup>
    </div>
  )
}

export default Buttons