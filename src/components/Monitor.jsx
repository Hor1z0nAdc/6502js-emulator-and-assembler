import React from 'react'
import { useRef, useEffect } from 'react'

const PiXEL_NUM_PER_LINE = 32;

const Monitor = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const pixelWidthRef = useRef();

  useEffect(() => {
      ctxRef.current = canvasRef.current.getContext("2d");
      pixelWidthRef.current = canvasRef.current.width / PiXEL_NUM_PER_LINE;
  }, [])

  return (
    <canvas ref={canvasRef} />
  )
}

export default Monitor