import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './Styles.css';
function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usernameRef = useFormInput('');
  const emailRef = useFormInput('');
  const passwordRef = useFormInput('');
  const repasswordRef = useFormInput('');

  let backToLogin = () => {
    history.push("/login");
  };

  const submitReg = () => {
    let data = {
      email: emailRef.value,
      name: usernameRef.value,
      password: passwordRef.value,
      passwordConfirmation: repasswordRef.value
    };
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.error) {
          alert(res.error);
        }
        if (res.sessionId) {
          console.log("SUCCESS");
          localStorage.setItem('tandaSession', res.sessionId);
          dispatch({type:'SET_USER', payload:usernameRef.value});
          history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="registerContainer">
        <div className="regis">
          <div className="title">Create Account</div>
          <div>
            <input
              type="text"
              {...usernameRef}
              className="usernameInput"
              name="username"
              id="username"
              placeholder="User name"
            />
          </div>
          <div>
            <input
              type="text"
              {...emailRef}
              className="email"
              name="username"
              id="email"
              placeholder="e-mail"
            />
          </div>
          <div>
            <input
              type="password"
              {...passwordRef}
              className="passwordInput"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              {...repasswordRef}
              className="repasswordInput"
              placeholder="Re-enter"
            />
          </div>
          <div className="regButton">
            <div className="reg" onClick={submitReg}>
              Create
            </div>
            <div onClick={backToLogin}>Back to Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default Register
