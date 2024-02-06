import React from 'react'
import { useState, useRef, useEffect } from 'react'

const registers = ({registers, statusFlags, setRegisters, setShowConsole, setNumSystem, setShowMonitor, numSystem, transformRegValues, setShowMemory, currentNumSystemRef, cycles}) => {

    useEffect(() => {
       const newValues = transformRegValues(registers);
       setRegisters(newValues);
    }, [numSystem])

  function onOptionChange(event) {
    const newNumSystem = event.target.value;
    currentNumSystemRef.current = newNumSystem;
    setNumSystem(newNumSystem);
  }

  function monitorHandler() {
        setShowMonitor(true);
  }

  return (
    <div className='register-div'>
        <div className='register-body'>
            <div className='register-subdiv1'>
                <div className='register-element'>
                    <div>A</div>
                    <div>{ registers && registers.A}</div>
                </div>
                <div className='register-element'>
                    <div>X</div>
                    <div>{ registers && registers.X}</div>
                </div>
                <div className='register-element'> 
                    <div>Y</div>
                    <div>{ registers && registers.Y}</div>
                </div>
                <div className='register-element'>
                    <div>SP</div>
                    <div>{ registers && registers.SP}</div>
                </div>
                <div className='register-element'>
                    <div>SR</div>
                    <div>{ registers && registers.SR}</div>
                </div>
                <div className='register-element'>
                    <div>PC</div>
                    <div>{ registers && registers.PC}</div>
                </div>
                <div className='radio-div'>
                    <input type="radio" name="type" value="hexa" onChange={onOptionChange} checked={numSystem === "hexa"}/>
                    <label>Hexadecimális</label><br/>
                    <input type="radio" name="type" value="binary" onChange={onOptionChange} checked={numSystem === "binary"}/>
                    <label>Bináris</label><br/>
                    <input type="radio" name="type" value="decimal" onChange={onOptionChange} checked={numSystem === "decimal"}/>
                    <label>Decimális</label><br/>
                </div>
            </div>
            <div className='register-subdiv2'>
                <div className='register-element'>
                    <div>N</div>
                    <div>{statusFlags.N}</div>
                </div>
                <div className='register-element'>
                    <div>V</div>
                    <div>{statusFlags.V}</div>
                </div>
                <div className='register-element'>
                    <div>-</div>
                    <div>{statusFlags.Unused}</div>
                </div>
                <div className='register-element'>
                    <div>B</div>
                    <div>{statusFlags.B}</div>
                </div>
                <div className='register-element'>
                    <div>D</div>
                    <div>{statusFlags.D}</div>
                </div>
                <div className='register-element'>
                    <div>I</div>
                    <div>{statusFlags.I}</div>
                </div>
                <div className='register-element'>
                    <div>Z</div>
                    <div>{statusFlags.Z}</div>
                </div>
                <div className='register-element'>
                    <div>C</div>
                    <div>{statusFlags.C}</div>
                </div>
            </div>
        </div>
        <button className='button m' onClick={monitorHandler}>Monitor</button>
        <div>

        <button className='button m' onClick={setShowConsole}>Konzol</button>
        </div>
            <button className='button m' onClick={setShowMemory}>Memória tartalma</button>
        <div className='radio-div'>
            <span className="span-color">Ciklusok száma:</span>
            <span className="span-color">{cycles}</span>
        </div>
    </div>
  )
}

export default registers