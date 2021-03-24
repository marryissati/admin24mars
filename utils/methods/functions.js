import React, { useState, useEffect } from "react";




import axios from "axios"

import { database, storageRef, admin } from "../../firebase/firebase";








// depending on the envirnement; we ruturn the right url
export const rightUrl = (extention) => {
    const url = {
        local: "http://localhost:3000/api/admin/",
        remote: `https://admin88-alpha.vercel.app/api/admin/`
    }

    return process.env.NEXT_PUBLIC_VERCEL_URL ? `${url.remote}${extention}` : `${url.local}${extention} `

}


// depending on the envirnement; we ruturn the right url for sftp
export const rightUrlSftp = (extention) => {
    const url = {
        local: "http://localhost:3000/api/admin-sftp/",
        remote: `https://admin88-alpha.vercel.app/api/admin-sftp/`
    }

    return process.env.NEXT_PUBLIC_VERCEL_URL ? `${url.remote}${extention}` : `${url.local}${extention} `

}







export const handleSend = (data, setMessage, setSelectedFile, setSelectedUser, setRefresh) => {
    if (!data.email || !data.filename) return;

    axios.post(rightUrl("WriteUserFile"), data)
        .then(res => {
            setMessage(res.data);
            setTimeout(() => { setMessage(null); setRefresh(new Date().getTime()) }, 1200)
            setSelectedFile(null)
            setSelectedUser(null)


        })
        .catch(e => console.error(e))
}




export const handleUpload = async (file, setMessage, setRefresh) => {
    if (process.browser) {
        // check if the user has selected a file
        if (!file.name) {
            setMessage("select a file and try again  !")
            setTimeout(() => setMessage(null), 3000)
            return;

        }


        // check if user has uploaded other file than .cvs
        var ext = await file.name.match(/\.([^\.]+)$/)[1];
        if (ext !== "csv") {
            setMessage("only .CSV file allowed !")
            setTimeout(() => setMessage(null), 3000)
            return;


        }
        setMessage("uploading ...")



        const formData = new FormData();



        formData.append('csv', file);

        axios.post(rightUrlSftp('upload'), formData)
            .then(res => {
                console.log(res.data)
                setMessage(res.data)
            })



        storageRef.child(file.name).put(file).then(snapshot => {

            axios.post(rightUrl("files/upload/upload"), {
                filename: file.name,
                size: file.size / 1000,
                uploadTime: new Date(),
                uploader: localStorage.getItem("username")

            })
                .then(res => {
                    setMessage("successfully uploaded!")
                    setTimeout(() => { setMessage(null); setRefresh(new Date().getTime()) }, 1200)

                })
                .catch(e => console.log(e))


        }

        )

    }

}



// get alll users who have a cerain file

export const handleLoadUsers_File = (filename, setLoadedUsers_File) => {

    axios.get(rightUrl(`userFiles/filenames/${filename} `))
        .then(res =>
            setLoadedUsers_File(res.data)


        ).catch(e => console.error(e))
}





// get all the file that a user has
export const handleLoadFiles = (email, setLoadedFiles) => {

    axios.get(rightUrl(`userFiles/${email} `))
        .then(res =>
            setLoadedFiles(res.data)


        ).catch(e => console.error(e))
}


export const handleDeleteFile = (filename, setMessage, setRefresh) => {

    if (process.browser) {
        setMessage("deleting ... ")

        axios.post(rightUrlSftp('delete'), { filename: filename })
            .then(res => {
                console.log(res.data)

            })

            .then(a => {

                axios.get(rightUrl(`files/delete/${filename}`))
                    .then(res => {

                        setMessage("successfully deleted!")
                        setTimeout(() => { setMessage(null); setRefresh(new Date().getTime()) }, 1200)


                    })
                    .catch(e => console.error(e))


            })
            .catch(e => console.log(e))

    }

}


export const handleDeleteUser = (email, setMessage, setRefresh) => {



    axios.get(rightUrl(`users/delete/${email}`))
        .then(res => {

            setMessage("successfully deleted!")
            setTimeout(() => { setMessage(null); setRefresh(new Date().getTime()) }, 1200)


        })
        .then(e => console.error(e))




}



// post  req to delete from UserFiles
export const deleteDocFromUserFiles = (data, setMessage, setRefresh) => {

    axios.post(rightUrl(`userFiles/delete/deleteRecord`), data)
        .then(res => {

            setMessage("successfully deleted!")
            setTimeout(() => { setMessage(null); setRefresh(new Date().getTime()) }, 1200)


        })
        .then(e => console.error(e))


}



