import React, { useState, useRef, useEffect } from 'react'
import Editor from "../components/Editor"
import Buttons from "../components/Buttons"
import Messages from "../components/Messages"
import Registers from "../components/Registers"
import Popup from '../components/Popup'
import MemoryVisualizer from '../components/MemoryVisualizer'
import assembler from '../emulator/assembler'
import cpu from "../emulator/cpu"
import memory from "../emulator/memory"

const keyAddress = 0xff;
const PiXEL_NUM_PER_LINE = 32;
const colors = {0: "black", 1: "white", 2: "red", 3: "cyan", 4: "purple", 5: "green",
                6: "blue", 7: "yellow", 8: "orange", 9: "brown", 10: "#ffcccb", 11: "DarkGray",
                12: "gray", 13: "PaleGreen", 14: "LightSkyBlue", 15: "LightGray"}

const Emulator = () => {
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState("");
  const [numSystem, setNumSystem] = useState("hexa");
  const [registers, setRegisters] = useState({A: "0", X:"0", Y:"0", PC: "0", SP:"0", SR: "0"});
  const [statusFlags, setStatusFlags] = useState({N: 0, V:0, Unused:0, B: 0, D: 0, I: 0, Z:0, C: 0});
  const [showMemory, setShowMemory] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleText, setConsoleText] = useState("");
  const [disableConsole, setDisableConsole] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [needKey, setNeedKey] = useState(false);
  const prevNumSystemRef = useRef("decimal");
  const currentNumSystemRef = useRef("hexa");
  const AssemblerRef = useRef(new assembler());
  const MemoryRef = useRef(new memory());
  const CpuRef = useRef(new cpu(MemoryRef.current));
  const canvasRef = useRef();
  const ctxRef = useRef();
  const pixelWidthRef = useRef();
  const messageDivRef = useRef();
  const keyEnabledRef = useRef(false);
  const consoleRef = useRef();
  const showMonitorRef = useRef(false);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    if(canvasRef.current) {
      canvasRef.current.width = Math.floor(window.innerWidth * 0.34);
      canvasRef.current.height = Math.floor(window.innerWidth * 0.34);
      ctxRef.current = canvasRef.current.getContext("2d");
      pixelWidthRef.current = Math.ceil(canvasRef.current.width / PiXEL_NUM_PER_LINE);
      draw(MemoryRef.current);
    }
    showMonitorRef.current = canvasRef.current == undefined;
  }, [showMonitor])

  function draw(memory) {
    const ctx = ctxRef.current;
    const width = pixelWidthRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let address = 0x200;

    for(let i = 0; i < 32; i++) {
        for(let j = 0; j < 32; j++) {
            const byte = memory.getByte(address++) % 16;
            const color = colors[byte];
            ctx.fillStyle = color;
            ctx.fillRect(width*j, width*i, width, width);
        }
    }
  }

  function transformRegValues(values) {
    let newRegisterValues;

    if(currentNumSystemRef.current == "hexa") {
      newRegisterValues = transformRegToHexa(values);
    }
    else if(currentNumSystemRef.current == "binary") {
        newRegisterValues = transformRegToBinary(values);
    }
    else {
        newRegisterValues = transformRegToDecimal(values);
    }

    prevNumSystemRef.current = currentNumSystemRef.current;
    return newRegisterValues;
  }

  function transformRegToHexa(values) {
    let pairs = Object.entries(values);
    let registersObject = JSON.parse(JSON.stringify(values));


    let newValue;
    pairs.forEach(([key, value]) => {
        newValue = preprocessForTransform(value);
        registersObject[key] = toHexa(newValue);
    });
    
    return registersObject;
  }

  function transformRegToBinary(values) {
    let pairs = Object.entries(values);
    let registersObject = JSON.parse(JSON.stringify(values));

    let newValue;
    pairs.forEach(([key, value]) => {
        newValue = preprocessForTransform(value);
        registersObject[key] = toBinary(newValue);
    });
    
    return registersObject;
  }

  function transformRegToDecimal(values) {
    let pairs = Object.entries(values);
    let registersObject = JSON.parse(JSON.stringify(values));

    let newValue;
    pairs.forEach(([key, value]) => {
        newValue = preprocessForTransform(value);
        
        registersObject[key] = toDecimal(newValue);
    });
    
    return registersObject;
  }

  function preprocessForTransform(value) {
    let newValue = parseInt(value);

    if(prevNumSystemRef.current == "hexa") {
        newValue = value.slice(1);
        newValue = "0x" + newValue;
        newValue = parseInt(newValue, 16)
    }
    else if(prevNumSystemRef.current == "binary") {
        newValue = parseInt(newValue, 2);
    }

    return newValue;
  }

  function toBinary(value) {
    let newValue = value.toString(2);
    newValue = newValue.padStart(8, "0");

    return newValue;
  }

  function toHexa(value) {
    let newValue = value.toString(16);
    newValue = newValue.padStart(4, "0");
    newValue = "$" + newValue;

    return newValue;
  }

  function toDecimal(value) {
    let newValue = value.toString();
    return newValue;
  }

  function keyDownHandler(event) {
    MemoryRef.current.setByte(keyAddress, event.key.charCodeAt(0));
    setNeedKey(false);
  }

  return (
    <div className='emulator-body' onKeyDown={keyDownHandler}>
        <div className='emulator-div'>
          <div className='center'>
            <Buttons code={code} setCode={setCode} memory={MemoryRef.current} messages={messages}
                     setMessages={setMessages} Assembler={AssemblerRef.current} messageDivRef={messageDivRef}
                     Cpu={CpuRef.current} setRegisters={setRegisters} setStatusFlags={setStatusFlags}
                     transformRegValues={transformRegValues} prevNumSystemRef={prevNumSystemRef}
                     cycles={cycles} setCycles={setCycles} draw={draw} showMonitor={showMonitor} 
                     setShowConsole={setShowConsole} setConsoleText={setConsoleText} 
                     setDisableConsole={setDisableConsole} needKey={needKey} setNeedKey={setNeedKey}
                     keyEnabledRef={keyEnabledRef} consoleRef={consoleRef} currentNumSystemRef={currentNumSystemRef}
                     showMonitorRef={showMonitorRef}
            />
          </div>
          <div className='center'>
            <Editor code={code} setCode={setCode} />
          </div>
          <div className='center'>
            <Messages messages={messages} messageDivRef={messageDivRef} />
          </div>
        </div>
        <div> 
            <Registers registers={registers} setRegisters={setRegisters}
                       setNumSystem={setNumSystem} numSystem={numSystem} setShowConsole={setShowConsole}
                       statusFlags={statusFlags} transformRegValues={transformRegValues}
                       setShowMemory={setShowMemory} cycles={cycles} setShowMonitor={setShowMonitor}
                       currentNumSystemRef={currentNumSystemRef}
                       
            />
        </div>
        <Popup trigger={showMonitor} title="Monitor" setShow={setShowMonitor} isMonitor={true}>
          <div className='canvas-container'>
            <canvas ref={canvasRef}/>
          </div>
        </Popup>

        <Popup trigger={showMemory} title="Memória" setShow={setShowMemory}>
            <MemoryVisualizer memory={MemoryRef.current} />
        </Popup>

        <Popup trigger={showConsole} title="Konzol" setShow={setShowConsole}>
            <textarea style={{fontSize: "1.17em"}} autoFocus ref={consoleRef} disabled={disableConsole} value={consoleText} onChange={e => setConsoleText(e.target.value)} cols="30" rows="10"></textarea>
        </Popup>
    </div>
  )
}

export default Emulator