import Cpu from "../src/emulator/cpu"
import Memory from "../src/emulator/memory"

const workerMemory = new Memory() ;
const workerCpu = new Cpu(workerMemory)

onmessage = message => {
  const mainCpu = message.data.Cpu;
  const mainMemory = message.data.memory;

  workerCpu.copyStateFromAnotherCpu(mainCpu);
  new Uint8Array(workerMemory.memoryCells).set(new Uint8Array(mainMemory.memoryCells));

  runSlowProcess()
}
  
const runSlowProcess = async () => {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 0));
  let allCycles = 0;
  let numOfRun = 0;
  let stepResult, cpuData;

  while(workerCpu.getRegister("PC") < workerCpu.endAddress) {
      stepResult = workerCpu.step();
      allCycles += stepResult.result.cycles;

      const routine = stepResult.result.routine;
      cpuData = {byteRegisters: workerCpu.byteRegisters, 
                 wordRegisters: workerCpu.wordRegisters,
                 statusFlags: workerCpu.statusFlags};

      if(routine) {
        postMessage({allCycles, isDone: false, cpuData, memoryData: workerMemory.memoryCells, routine})
      }
      else {
        numOfRun++;
      }
      
      if(routine == "skey") {
          close();
      }

      if(numOfRun == 15) {
        numOfRun = 0;
        postMessage({allCycles, isDone: false, cpuData, memoryData: workerMemory.memoryCells})
      }

      await delay();
      
      if(stepResult.isBreak) {
          break;
      }
  }
  
  postMessage({allCycles, isDone: true, cpuData, memoryData: workerMemory.memoryCells})
};