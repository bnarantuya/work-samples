import React from 'react'

function Perorg({ org }) {

  function edit() {

  }

  function join() {

  }
  return (
    <div className="Per-org">
      <div className="info">
        <div className="title">{org.name}</div>
        <div className="payRate">{org.hourlyRate}</div>
      </div>
      <div className="buttons">
        <div className="org-button" onClick={edit}>Edit</div>
        <div className="org-button" onClick={join}>Join</div>
      </div>
    </div>
  )
}

export default Perorg
