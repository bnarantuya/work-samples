import React, { useEffect, useState } from 'react';
import './Home.css';
import Organizations from '../Organizations/Organizations';

function Home() {
  const name = useFormInput('');
  const payrate = useFormInput('');
  const [organizations, setOrganizations] = useState([]);
  const [isLoaded, setLoad] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      headers: {
        'Authorization': localStorage.getItem('tandaSession')
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });

    fetch("http://localhost:3000/organisations", {
      headers: {
        'Authorization': localStorage.getItem('tandaSession')
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        console.log(res);
        setOrganizations(res);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

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
        if(res.error) {
          alert(res.error);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  }
  return (
    <div className="home">
      <div className="featured">
        <div className="featured-title">
          <span className="bolder">Hi, Batjargal</span>
        </div>
      </div>
      <div className="orga-title"> Organisations </div>
      <Organizations isLoaded={isLoaded} organizations={organizations} />
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
      <div className="product-list">

      </div>
    </div >
  );
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

export default Home;
