import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
function Perorg({ org, mode }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function edit(e) {
    e.preventDefault();
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

  function view(e) {
    e.preventDefault();
    history.push('/shifts');
  }

  function leave(e) {
    e.preventDefault();
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
      {/* {mode === 'personal' && <div className="edit-btn" onClick={view}>View</div>} */}
      <div className="org-header">
        <div></div>
        <div className="org-title">{org.name}</div>
        <div className="edit-btn">
          <div onClick={e => edit(e)}><svg width="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67"><path d="M416.8 269.44l-45.01-35.3c.85-6.83 1.49-13.77 1.49-20.8s-.64-13.98-1.5-20.8l45.13-35.31a10.64 10.64 0 002.56-13.66L376.8 69.65a10.55 10.55 0 00-13.01-4.58L310.67 86.5a161.87 161.87 0 00-36.06-21.02l-8-56.53A10.97 10.97 0 00255.95 0H170.6c-5.33 0-9.7 3.95-10.56 8.96l-8 56.53A157.87 157.87 0 00116 86.51L62.88 65.07c-4.8-1.82-10.35 0-13.01 4.58L7.2 143.57a10.68 10.68 0 002.56 13.66l45.01 35.3c-.85 6.83-1.49 13.76-1.49 20.8s.64 13.98 1.5 20.8L9.75 269.44a10.64 10.64 0 00-2.56 13.65l42.67 73.92a10.55 10.55 0 0013.01 4.59L116 340.16a161.87 161.87 0 0036.05 21.01l8 56.54a10.77 10.77 0 0010.56 8.96h85.34c5.33 0 9.7-3.95 10.56-8.96l8-56.54a157.87 157.87 0 0036.05-21.01l53.12 21.44c4.8 1.81 10.35 0 13.01-4.59l42.67-73.92a10.68 10.68 0 00-2.56-13.65zM213.28 288c-41.28 0-74.67-33.39-74.67-74.67s33.39-74.66 74.67-74.66 74.67 33.38 74.67 74.66S254.56 288 213.28 288z" /></svg></div>
        </div>
      </div>
      <div className="org-content">
        <div className="payRate content">
          <div></div>
          <div className="title">Hourly Rate</div>
          <div className="field">{org.hourlyRate}</div>
        </div>
        <div className="employees content">
          <div></div>
          <div className="title">Employees</div>
          <div className="field">11</div>
        </div>
      </div>

      {mode === 'personal' ?
        <div className="org-footer">
          <div className="org-button view" onClick={e => view(e)}>View</div>
          <div className="org-button leave" onClick={e => leave(e)}>Leave</div>
        </div> :
        <div className="org-footer"><div className="org-button" onClick={e => join(e)}>Join</div>
        </div>
      }

    </div >
  )
}

export default Perorg