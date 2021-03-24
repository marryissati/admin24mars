import Head from "next/head";
import Link from "next/link";
import { Grid, Typography, Checkbox } from "@material-ui/core";

import { Input } from "../components";
import { loginData } from "../data";

import { auth } from "../firebase/firebase";

import classes from "../styles/login.module.css";

export default function Login() {
  const login = (event) => {
    event.preventDefault(); // for stoping refresh
    // do login logic ...
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // logged in, redirect to homepage....
        console.log(auth);
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div style={{ height: "100vh" }}>
        <div style={{ height: "35%" }}></div>
        <div className={classes.contentWarper}>
          <div className={classes.contentBox}>
            <Typography variant="h4" className={classes.title}>
              Log In
            </Typography>
            <Typography className={classes.txt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
            <form>
              {loginData.map(({ name, placehlder }, i) => (
                <Input label={name} placeholder={placehlder} key={i} />
              ))}
            </form>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              style={{ marginBottom: "1rem" }}
            >
              <Grid item xs={1}>
                <Checkbox />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" className={classes.terms}>
                  Remember Password?
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.createBtn}>
              <button onClick={login}>Login</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Typography variant="body2" className={classes.terms}>
                Don't have an account?
                <Link href="/">
                  <span style={{ cursor: "pointer" }}> Sign up</span>
                </Link>
              </Typography>
              <Typography variant="body2" className={classes.terms}>
                <span>Forgot Password?</span>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
