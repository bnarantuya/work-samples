import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Organization.css';
function Editorg() {
  const org = useSelector(state => state.org);
  const history = useHistory();
  const [name, setName] = useState(org.name);
  const [hourlyRate, setHourlyRate] = useState(org.hourlyRate);
  function save() {
    const url = 'http://localhost:3000/organisations/' + org.id;
    console.log(url);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('tandaSession'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, hourlyRate: hourlyRate })
    })
      .then(res => {
        if (res.error) {
          console.log(res.error);
        }
        else {
          history.push('/');
        }
      });
  }

  return (
    <div className="editOrg">
      <div className="title">Edit organisation</div>
      <div className="content">
        <div>
          <span>Name</span>
          <input name="name" type="text" value={name} onChange={e => setName(e.target.value)}></input>
        </div>
        <div>
          <span>Hourly rate</span>
          <input name="payrate" value={hourlyRate} type="number" onChange={e => setHourlyRate(e.target.value)}></input>
        </div>
      </div>
      <div className="buttons">
        <div onClick={save}>Save</div>
      </div>
    </div>
  )
}

export default Editorg;
