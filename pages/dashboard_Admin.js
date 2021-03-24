import React, { useState, useEffect } from "react";
import Styles from "../styles/dashboardAdmin.module.css"

import Router from "next/router";
import Link from "next/link"
import Head from "next/head";
import axios from "axios"
import { ResponsiveDrawer, Spinner, CustomizedTables } from "../components";

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachmentIcon from '@material-ui/icons/Attachment';
import GetAppIcon from '@material-ui/icons/GetApp';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SendIcon from '@material-ui/icons/Send';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { database, storageRef, admin } from "../firebase/firebase";
import Select from '@material-ui/core/Select';
import { BorderBottom } from "@material-ui/icons";

import { useStyles, getModalStyle } from "../utils/dashboardAdmin/utils"


import { handleDeleteUser, handleDeleteFile, handleLoadFiles, handleLoadUsers_File, handleUpload, handleSend, rightUrl, rightUrlSftp } from "../utils/methods/functions"
import { Tooltip } from "@material-ui/core";












export default function Dashboard_Admin() {

    const [data, setData] = useState([]);
    var user = { name: "Admin Hamid" };
    if (process.browser && localStorage.getItem("username")) user = { name: localStorage.getItem("username") }
    const [files, setFiles] = useState([]);

    const [dataset, setDataset] = useState([])
    const [subdataset, setsubDataset] = useState({})

    const [clients, setClients] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [file1, setFile1] = useState('');


    const [message, setMessage] = useState(null)
    const [message2, setMessage2] = useState(null)
    const [messageTop, setMessageTop] = useState(" ")

    const [refresh, setRefresh] = useState(1);
    const [refreshSftp, setRefreshSftp] = useState(1)
    const [openModal, setOpenModal] = useState(false);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalTitleUser, setModalTitleUser] = useState("");

    const [loadedFiles, setLoadedFiles] = useState([]);
    const [loadedUsers_File, setLoadedUsers_File] = useState([]);


    // material-ui hook
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);











    useEffect(() => {
        // get all clients
        fetch(rightUrl("users"))
            .then(res => res.json()).
            then(data => setClients(data)).
            catch(e => console.error(e))

        // get all dataset 

        fetch(rightUrl("getDataset"))
            .then(res => res.json()).
            then(data => {
                setDataset(data);



            }
            ).
            catch(e => console.error(e))



        // Now we get  all the files 


        setMessageTop("refreshing ...")
        axios.get(rightUrlSftp(`showAll`)).then(res => {

            setFiles(res.data.content);


            if (files.length !== dataset.length) {


                setRefreshSftp(refreshSftp + 1)



            }
            else { setMessageTop("Done"); setTimeout(setMessageTop(" "), 1000) }



        }
        )


        setRefreshSftp(refreshSftp + 1)




    }, [refresh])




    useEffect(() => {

        if (files.length > dataset.length) {
            // means we have more files in sftp than in database

            // lets find the file that is not included in the database
            let MissingFiles = [];
            files.forEach(f => {
                if (!dataset.find(dt => f.name == dt.filename)) MissingFiles.push(f)
            })

            console.log({ MissingFiles })

            MissingFiles.forEach(async mf => {
                await axios.post(rightUrl("files/upload/upload"), {
                    filename: mf.name,
                    size: mf.size / 1000,
                    uploadTime: new Date(),
                    uploader: "SFTP"

                })

            })




        }

        if (files.length < dataset.length) {
            // which means that admin delete file from the sftp
            fetch(rightUrl("getDataset"))
                .then(res => res.json()).
                then(data => {
                    setDataset(data);


                    let deletedFiles = [];
                    dataset.forEach(dt => {
                        if (!files.find(f => f.name == dt.filename)) deletedFiles.push(dt)
                    })

                    deletedFiles.forEach(delFile => {
                        axios.get(rightUrl(`files/delete/${delFile.filename}`))
                            .then(res => {

                                console.log(`delete file : ${delFile.filename}`)


                            })
                            .catch(e => console.error(e))


                    })





                }
                ).
                catch(e => console.error(e))









        }


        // lets call the database again 
        fetch(rightUrl("getDataset"))
            .then(res => res.json()).
            then(data => {
                setDataset(data);

                console.log({ dataset })
                setMessageTop("Done"); setTimeout(setMessageTop(" "), 100)
            }
            ).
            catch(e => console.error(e))




    }, [refreshSftp])






    // if the user is not authenticated , redirect 
    if (process.browser && !localStorage.getItem("username"))
        return (<div style={{ margin: "50px" }}>Not allowed ! <br /> <Link href="/login_admin" ><a style={{ color: "blue", cursor: "pointer" }}> click here to go to log in page</a></Link></div>)

    return (
        <p >
            <Head>
                <title> Admin Dashboard</title>
            </Head>
            <ResponsiveDrawer user={user}>
                <div>
                    {messageTop}
                </div>

                <div style={{ display: "flex", margin: "8px", alignItems: "center ", justifyContent: "center" }}>


                    <Button
                        variant="outlined"
                        color="default"
                        id="file1"
                        component="label"

                        startIcon={<AttachmentIcon />}

                    >
                        <input type="file" id="file1" accept=".csv" hidden onChange={evt => setFile1(evt.target.files[0])} />

                        {file1 ? file1.name : `select a file`}

                    </Button>
                    <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon />} style={{ marginLeft: "20px", marginRight: "100px" }} onClick={() => handleUpload(file1, setMessage2, setRefresh)} >upload
                    </Button>
                    <Button variant="outlined" color="default" startIcon={<SendIcon />} onClick={() => handleSend({ email: selectedUser, filename: selectedFile }, setMessage, setSelectedFile, setSelectedUser, setRefresh)}>send</Button>
                    <Button variant="contained" color="primary" startIcon={<RefreshIcon />} style={{ marginLeft: "70px" }} onClick={() => setRefresh(refresh + 1)}>Refresh</Button>
                    <p style={{ color: "gray", margin: "10px" }}> {message} {message2}</p>
                </div>



                <div style={{ padding: "20px" }}>
                    <p style={{ backgroundColor: "#7545FF", color: "white", padding: "7px", margin: "10px", display: "flex", alignItems: "center ", fontSize: "22px", borderRadius: "8px" }}><StorageIcon /> List of  Datasets </p>
                    <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", padding: "10px ", color: "gray", marginBottom: "16px", borderBottom: "0.8px #7F00FD solid" }}>
                        <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "80%" }}>
                            <p style={{ width: "20%", color: "black", fontSize: "19px", fontWeight: "bold" }}>Datasets</p>
                            <p style={{ color: "black", fontSize: "19px", fontWeight: "bold" }}>Owners</p>
                            <p style={{ width: "80px", wordBreak: "break-word", color: "black", fontSize: "19px", fontWeight: "bold" }}>Size KB</p>
                            <p style={{ color: "black", fontSize: "19px", fontWeight: "bold" }}>Upload Time</p>
                            <p style={{ marginRight: "-20px", color: "black", fontSize: "19px", fontWeight: "bold" }}>Uploader</p>
                        </div >
                        <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "10%" }}>
                            <p style={{ color: "black", fontSize: "19px", fontWeight: "bold" }}>Operations</p>
                            <p></p>

                            <p></p>
                        </div>
                    </div>
                    {files.map(file =>
                        <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", marginBottom: "8px", borderBottom: "0.5px #F3F4F6 solid" }}>
                            <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "80%" }}>

                                <Tooltip title={file.name} arrow  >
                                    <p style={{ padding: "10px", fontSize: "15px", color: "#374151", width: "20%", fontFamily: "Space Grotesk", fontWeight: "bold" }}>
                                        {file.name.length > 20 ? file.name.slice(0, 15) + '...' : file.name}
                                    </p>
                                </Tooltip>
                                <div style={{ width: "30px" }}>
                                    <Select

                                        value=""
                                        style={{ fontSize: "0px", width: "25px", color: "lightgray" }}
                                        onMouseDown={() => { setLoadedUsers_File(["..."]); handleLoadUsers_File(file.name, setLoadedUsers_File) }}
                                        component="label"

                                    >
                                        {loadedUsers_File.map(loadedFile =>
                                            <p style={{ padding: "5px", margin: "5px", }}>
                                                {loadedFile}
                                            </p>)}


                                    </Select>
                                </div>
                                <p>{file ? file.size / 1000 : "..."}</p>
                                <p style={{ width: "100px", wordBreak: "break-word" }}>{file ? new Date(file.modifyTime).toLocaleString("en-GB") : "..."}</p>
                                <p>{dataset.find(dt => dt.filename === file.name) ? dataset.find(dt => dt.filename === file.name).uploader : "..."}</p>



                            </div>

                            <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "11%" }}>

                                <a href={rightUrlSftp(`download/${file.name}`)} style={{ marginTop: "10px" }} ><GetAppIcon className={Styles.downloadIcon} /></a>

                                <DeleteOutlineIcon className={Styles.deleteIcon} onClick={() => { setModalTitle(file.name); setOpenModal(true); }} />

                                <Modal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <div style={modalStyle} className={classes.paper}>

                                        <h2 id="simple-modal-title">Are You sure to delete :</h2>
                                        <p id="simple-modal-description" style={{ padding: "20px" }}>
                                            {modalTitle}?
                                    </p>

                                        <div>
                                            <Button varient="outlined" style={{ color: "red" }} onClick={() => { setOpenModal(false); handleDeleteFile(modalTitle, setMessage, setRefresh) }} >Yes </Button>
                                            <Button varient="contained" color="secondary" onClick={() => setOpenModal(false)} >No </Button>
                                        </div>
                                    </div>

                                </Modal>



                                <input type="radio" value={file.name} checked={selectedFile === file.name} onChange={evt => { setSelectedFile(evt.target.value); }} />
                            </div>
                        </div>)
                    }

                </div>






                <div style={{ padding: "20px" }}>
                    <p style={{ backgroundColor: "#7545FF", color: "white", padding: "7px", margin: "10px", display: "flex", alignItems: "center ", fontSize: "22px", borderRadius: "8px" }}><PeopleAltIcon /> List of all Clients </p>

                    <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", padding: "10px ", color: "gray", marginBottom: "16px", borderBottom: "0.8px #7F00FD solid" }}>
                        <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "40%" }}>
                            <p style={{ marginRight: "30px", color: "black", fontSize: "19px", fontWeight: "bold" }}>Emails</p>
                            <p style={{ marginRight: "-60px", color: "black", fontSize: "19px", fontWeight: "bold" }}>List of Datasets</p>
                        </div >

                        <p id="hamid" style={{ marginRight: "-100px", color: "black", fontSize: "19px", fontWeight: "bold" }}> Delete</p>
                        <p style={{ color: "black", fontSize: "19px", fontWeight: "bold" }}>User choosen</p>
                    </div>



                    {clients.map(client =>
                        <div key={client.email} style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", marginBottom: "8px", borderBottom: "0.5px #F3F4F6 solid" }}>

                            <div style={{ display: "flex", alignItems: "center ", justifyContent: "space-between", width: "40%" }}>
                                <p style={{ padding: "10px ", marginRight: "30px", fontSize: "17px", color: "#374151", fontFamily: "Space Grotesk" }}> {client.email}</p>
                                <div onClick={() => console.log('hh')}>
                                    <Select
                                        value=""
                                        id={`slct${client.email} `}
                                        style={{ fontSize: "0px", width: "25px", color: "lightgray" }}
                                        onMouseDown={() => { setLoadedFiles(["...."]); handleLoadFiles(client.email, setLoadedFiles) }}


                                    >
                                        {loadedFiles.map(loadedFile =>
                                            <p style={{ padding: "5px", margin: "5px" }}>
                                                {loadedFile}
                                            </p>)}


                                    </Select>
                                </div>
                            </div>
                            <DeleteOutlineIcon className={Styles.deleteIcon} onClick={() => { setModalTitleUser(client.email); setOpenModalUser(true); }} />

                            <Modal
                                open={openModalUser}
                                onClose={() => setOpenModalUser(false)}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <div style={modalStyle} className={classes.paper}>

                                    <h2 id="simple-modal-title">Are You sure to delete :</h2>
                                    <p id="simple-modal-description" style={{ padding: "20px" }}>
                                        {modalTitleUser}?
                                </p>

                                    <div>
                                        <Button varient="outlined" style={{ color: "red" }} onClick={() => { setOpenModalUser(false); handleDeleteUser(modalTitleUser, setMessage, setRefresh) }} >Yes </Button>
                                        <Button varient="contained" color="secondary" onClick={() => setOpenModalUser(false)} >No </Button>
                                    </div>
                                </div>

                            </Modal>
                            <input type="radio" value={client.email} checked={selectedUser === client.email} onChange={evt => { setSelectedUser(evt.target.value); }} />
                        </div>)
                    }


                </div>

            </ResponsiveDrawer>
        </p >
    );
}
