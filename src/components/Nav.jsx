import React from 'react'
import { NavLink } from 'react-router-dom'
import DarkMode from "./DarkMode/DarkMode"

const Nav = ({setIsDarkMode, isDarkMode}) => {
  return (
    <div className='nav'>
        <div className='nav-div'>
            <div className='nav-element'>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <div className='nav-link'>Emulátor</div>
                </NavLink>
            </div>
            <div className='nav-element'>
                <NavLink to="/instrukciok" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <div className='nav-link'>Utasításkészlet</div>
                </NavLink>
            </div>
            <div className='nav-element'>
                <NavLink to="/utmutato" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <div className='nav-link'>Leírás,használati útmutató</div>
                </NavLink>
            </div>
        </div>
        <div className='nav-div'>
            <DarkMode setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
        </div>
    </div>
  )
}

export default Nav