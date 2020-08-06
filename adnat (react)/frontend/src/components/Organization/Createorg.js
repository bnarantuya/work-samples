import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Createorg() {

  const history = useHistory();
  const name = useFormInput('');
  const payrate = useFormInput('');

  function create() {
    const data = {
      name: name.value,
      hourlyRate: payrate.value
    }

    fetch("http://localhost:3000/organisations/create_join", {
      method: "post",
      headers: {
        'Authorization': localStorage.getItem('tandaSession'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
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
        console.log("ERROR: " + err);
      });
  }
  return (
    <div className="Create-org">
      <div className="orga-title"> Create Organizations </div>
      <div>
        <div>
          <input
            type="text"
            className="nameInput"
            {...name}
            id="name"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            className="payrateInput"
            {...payrate}
            placeholder="Pay Rate"
          />
        </div>
        <div className="create" onClick={create}>
          Create and Join
        </div>
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

export default Createorg;
