import React from 'react'
import { Routes, Route } from "react-router-dom"
import Emulator from "../pages/Emulator"
import Instructions from "../pages/Instructions"
import Guide from "../pages/Guide"

const Approutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Emulator />} />
        <Route path="/instrukciok" element={<Instructions />} />
        <Route path="/utmutato" element={<Guide />} />
      </Routes>
    </div>
  )
}

export default Approutes