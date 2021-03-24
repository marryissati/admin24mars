import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Grid, Typography, Checkbox, Avatar, Divider } from "@material-ui/core";

import { UserProvider, useFetchUser } from "../utils/user";
import { Input, Spinner } from "../components";
import { signupData } from "../data";

import classes from "../styles/signup.module.css";

export default function Signup() {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    Router.push("/dashboard");
    return null;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container style={{ height: "100vh" }} justify="space-between">
        <Grid container direction="column" justify="center" item xs={12} md={4}>
          <Typography className={classes.title} variant="h5">
            Create Account or Sign In using Auth0
          </Typography>
          <Typography className={classes.text}>
            Create your Tech account today, it's free. Enter your credentials
            below and click 'Create Account'.
          </Typography>

          <form className={classes.form}>
            {/* {signupData.map(({ name, placehlder }, i) => (
              <Input key={i} label={name} placeholder={placehlder} />
            ))} */}
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
                  I had read and accept the Tech App ltd.
                  <span>Terms & Conditions</span> and
                  <span> Privacy Policy.</span>
                </Typography>
              </Grid>
            </Grid>

            <div className={classes.createBtn}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Router.push("/api/login");
                }}
              >
                Create Account
              </button>

              <button  onClick={(e) => {
                  e.preventDefault();
                  Router.push("/api/login");
                }}>
                Sign In
              </button>

              
            </div>
          </form>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          md={7}
          xs={12}
          className={classes.right}
        >
          <div className={classes.testimonialWarper}>
            <Avatar className={classes.avatar} src="/images/avatar.jpg" />
            <div className={classes.testimonial}>
              <div className={classes.content}>
                <Typography className={classes.cont_title}>
                  The best analytics software in the world
                </Typography>
                <Typography className={classes.cont_txt}>
                  "Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s."
                </Typography>
                <Divider style={{ margin: "1rem 0" }} />
                <Typography className={classes.cont_title}>
                  Sophie Moore
                </Typography>
                <Typography className={classes.cont_txt}>
                  Head of Marketing at Google
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
