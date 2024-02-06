import cpu from "../../program/cpu"
import memory from "../../program/memory"

const workerMemory = new memory() ;
const workerCpu = new cpu(workerMemory)

onmessage = message => {
  const mainCpu = message.data.Cpu;
  const mainMemory = message.data.memory;

  workerCpu.copyStateFromAnotherCpu(mainCpu);
  new Uint8Array(workerMemory.memoryCells).set(new Uint8Array(mainMemory.memoryCells));


  runSlowProcess(workerCpu)
}
  
  const runSlowProcess = async (workerCpu) => {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 0));
  let allCycles = 0;
  let stepResult;

  while(workerCpu.getRegister("PC") < workerCpu.endAddress) {
    stepResult = workerCpu.step();
    allCycles += stepResult.result.cycles;
    const routine = stepResult.result.routine;

    postMessage({allCycles, isDone: false, workerCpu, workerMemory, routine})
    if(routine == "skey") {
      close();
    }

    await delay();
    
    if(stepResult.isBreak) {
      break;
    }
  }
  postMessage({isDone: true})

};