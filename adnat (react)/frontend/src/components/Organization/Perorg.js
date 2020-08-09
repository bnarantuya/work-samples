import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
function Perorg({ org, mode }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function edit() {
    dispatch({ type: 'SET_ORGANIZATION', payload: org });
    history.push('/edit');
  }

  function join() {
    fetch("http://localhost:3000/organisations/join", {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('tandaSession'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ organisationId: org.id })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function view() {
    history.push('/shifts');
  }

  function leave() {
    fetch("http://localhost:3000/organisations/leave", {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('tandaSession')
      }
    })
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Per-org">
      <div className="info">
        <div className="title">{org.name}</div>
        <div className="payRate">{org.hourlyRate}</div>
      </div>
      <div className="buttons">
        {mode === 'personal' && <div className="org-button" onClick={view}>View</div>}
        <div className="org-button" onClick={edit}>Edit</div>
        {mode === 'personal' ?
          <div className="org-button" onClick={leave}>Leave</div> :
          <div className="org-button" onClick={join}>Join</div>}
      </div>
    </div>
  )
}

export default Perorg
