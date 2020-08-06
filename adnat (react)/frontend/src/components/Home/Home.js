import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';
import Organization from '../Organization/Organization';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const name = useFormInput('');
  const payrate = useFormInput('');
  const [organizations, setOrganizations] = useState([]);
  const [isLoaded, setLoad] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    fetch("http://localhost:3000/users", {
      headers: {
        'Authorization': localStorage.getItem('tandaSession')
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
          console.log(res.error);
        }
        else {
          dispatch({type: 'SET_USER', payload: res[0].name});
          dispatch({type: 'SET_USER_ID', payload: res[0].id});
          dispatch({type: 'SET_ORGANIZATION_ID', payload: res[0].organisationId});
        }
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

  function logout() {
    fetch("http://localhost:3000/auth/logout", {
      method: "delete",
      headers: {
        'Authorization': localStorage.getItem('tandaSession')
      },
      body: JSON.stringify({userId:state.userId})
    })
      .then((res) => {
        if (res.error) {
          alert(res.error);
        }
        localStorage.removeItem('tandaSession');
        dispatch({type: 'SET_USER', payload: 'Guest'});
        dispatch({type: 'SET_USER_ID', payload: 0});
        dispatch({type:'SET_ORGANIZATION_ID', payload: 0});
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          <span className="bolder">Hi, {state.username}</span>
        </div>
        {error.length !==0 ? (<div>{error}</div>) : (<div></div>)}
        <div onClick={logout}> logout</div>
      </div>
      <div className="orga-title"> Organisations </div>
      <Organization isLoaded={isLoaded} organizations={organizations} />
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
