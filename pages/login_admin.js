import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import { Grid, Typography, Checkbox, Avatar, Divider } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import { UserProvider, useFetchUser } from "../utils/user";
import { Input, Spinner } from "../components";
import InputAdmin from "../components/common/input/inputAdmin";

import axios from "axios"


import { loginData } from "../data";

import classes from "../styles/signup.module.css";
import { route } from "next/dist/next-server/server/router";






export default function Login() {


    const { user, loading } = useFetchUser();

    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Head>
                <title>login Admin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Grid container style={{ height: "100vh" }} justify="space-between">

                <Grid container direction="column" justify="center" item xs={12} md={4}>

                    <Typography className={classes.title} variant="h5">
                        Login Admin
                    </Typography>
                    <Typography className={classes.text}>
                        Dedicated panel for Admin

          </Typography>

                    <Typography className={classes.text} style={{ color: "red" }}>
                        {message}

                    </Typography>


                    <form className={classes.form}>

                        <InputAdmin label={loginData[0].name} placeholder={loginData[0].placehlder} type="text" setValue={setAdminEmail} />
                        <InputAdmin label={loginData[1].name} placeholder={loginData[1].placehlder} type="password" setValue={setAdminPassword} />




                        <Grid
                            container
                            justify="space-around"
                            alignItems="center"
                            style={{ marginBottom: "1rem" }}
                        >

                        </Grid>

                        <div className={classes.createBtn}>
                            <button
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsLoading(true)
                                    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
                                    const url = {
                                        local: "http://localhost:3000/api/admin/adminLogin",
                                        remote: `https://ftset3.vercel.app/api/admin/adminLogin`
                                    }

                                    axios.post(process.env.NEXT_PUBLIC_VERCEL_URL ? url.remote : url.local, {
                                        email: adminEmail,
                                        password: adminPassword

                                    }).then(res => {
                                        if (res.data) { localStorage.setItem("username", adminEmail); Router.push(res.data) }
                                        else setTimeout(() => setMessage("wrong Email / password"), 200);
                                        setTimeout(() => setIsLoading(false), 200);
                                    }).catch(e => console.error(e))



                                }}
                            >

                                Login
              </button>
                            <div style={{ padding: "20px" }}>
                                {isLoading && <CircularProgress disableShrink />}
                            </div>

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
