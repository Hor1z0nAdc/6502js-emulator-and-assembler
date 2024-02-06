import React from "react";
import "./DarkMode.css";
import { useEffect, useRef } from "react";
import { ReactComponent as Sun } from "./Sun.svg"
import { ReactComponent as Moon } from "./Moon.svg"


const DarkMode = ({isDarkMode, setIsDarkMode}) => {
    const themeRef = useRef();
    
    useEffect(() => {
        themeRef.current = localStorage.getItem("isDark");
        
        if(themeRef.current == null) {
            localStorage.setItem("isDark", true);
            themeRef.current = true;
        }
        
        setIsDarkMode(localStorage.getItem("isDark"))
        
    }, [])

    function toggleTheme(event) {
        if(event.currentTarget.checked) {
            themeRef.current = true
            setIsDarkMode(true);
        }
        else {
            themeRef.current = false;
            setIsDarkMode(false);
        }

        localStorage.setItem("isDark", themeRef.current);
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={true}
                
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun/>
                <Moon/>
            </label>
        </div>
    );
};

export default DarkMode;
