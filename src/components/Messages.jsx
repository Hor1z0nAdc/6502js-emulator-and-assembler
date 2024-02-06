import React from 'react'

const Messages = ({messages, messageDivRef}) => {
  return (
    <div ref={messageDivRef} className='messages-div'>
      <pre>{messages}</pre>
    </div>
  )
}

export default Messages