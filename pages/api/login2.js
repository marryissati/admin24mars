import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase";

export default Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = (event) => {
    event.preventDefault(); // for stoping refresh
    // do login logic ...
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // logged in, redirect to homepage....
        history.push("/");
        // dispatch({
        //   type: "EMPTY_CARD",
        //   card: [],
        // });
      })
      .catch((err) => alert(err.message));
  };
  const register = (event) => {
    event.preventDefault(); // for stoping refresh
    // do register logic ...

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // create and logged in, redirect to homepage....
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={login} type="submit" className="login__signInBtn">
            Sign in
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className="login__registerBtn">
          create your Amazon Account
        </button>
      </div>
    </div>
  );
};
