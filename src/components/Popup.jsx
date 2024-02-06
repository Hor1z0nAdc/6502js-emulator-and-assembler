import React from 'react'

const Popup = ({trigger,title, children, setShow, isMonitor}) => {
    function closeHandler() {
        setShow(false);
    }

  return (trigger) ? (
    <div className={isMonitor? "popup monitor" : "popup regular"}>
      <div className='popup-head'>
        <span>{title}</span>
        <button className='popup-button padding' onClick={closeHandler}>bezárás</button>
      </div>
      <div style={{paddingTop: "18px"}}>
        {children}
      </div>
    </div>
  ) : ""
}

export default Popup