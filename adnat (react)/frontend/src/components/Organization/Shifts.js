import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function Shifts() {
  const [shifts, setShifts] = useState([]);
  const startTime = useFormInput('');
  const finishTime = useFormInput('');
  const breakTime = useFormInput('');
  const state = useSelector(state => state);
  useEffect(() => {
    fetch("http://localhost:3000/shifts", {
      headers: {
        'Authorization': localStorage.getItem('tandaSession'),
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        else {
          console.log(res);
          setShifts(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function createShift() {
    fetch("http://localhost:3000/shifts/", {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('tandaSession'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: state.userId, start: startTime.value, finish: finishTime.value, breakLength: breakTime.value })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="Shifts">
      <div className="top-field">
        <div className="field-title">Employee Name</div>
        <div className="field-title">Start time</div>
        <div className="field-title">Finish time</div>
        <div className="field-title">Break length</div>
        <div className="field-title">Hours worked</div>
        <div className="field-title">Shift cost</div>
      </div>
      {shifts.length > 0 &&
        (
          shifts.map((shift, index) => (
            <div className="top-field" key={shift.id}>
              <div className="field">Batjargal</div>
              <div className="field">{shift.start}</div>
              <div className="field">{shift.finish}</div>
              <div className="field">{shift.breakLength}</div>
              <div className="field">hours worked</div>
              <div className="field">shift cost</div>
            </div>
          ))
        )
      }
      <div className="top-field">
        <div className="custom-field">{state.username}</div>
        <div className="custom-field"><input type="text" {...startTime}></input></div>
        <div className="custom-field"><input type="text" {...finishTime}></input></div>
        <div className="custom-field"><input type="text" {...breakTime}></input></div>
        <div className="custom-field" onClick={createShift}>Confirm</div>
      </div>
    </div>
  )
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Shifts;
