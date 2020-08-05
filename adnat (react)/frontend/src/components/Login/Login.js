import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Styles.css';
function Login() {

  const email = useFormInput('');
  const password = useFormInput('');
  const history = useHistory();

  const handleLogin = () => {
    if (password.value.length > 2 && email.value.length > 0) {
      fetch('http://localhost:3000/auth/login', {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          password: password.value,
          email: email.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.error) {
            alert(res.error);
          }
          localStorage.setItem('tandaSession', res.sessionId);
          history.push('/');
        })
        .catch((err) => {
          alert("Invalid email and password. Please try again");
        });
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="signin">
          <div className="title">Sign-In</div>
          <div>
            <input
              type="text"
              className="emailInput"
              name="email"
              {...email}
              id="email"
              placeholder="E-mail"
            />
          </div>
          <div>
            <input
              type="password"
              className="passwordInput"
              {...password}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="signButton">
            <div className="loginButton" onClick={handleLogin}>
              Login
            </div>
            <Link to="/register" className="goregister">
              Create account
            </Link>
          </div>
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

export default Login
