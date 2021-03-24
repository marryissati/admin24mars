import React from "react";

import classes from "./input.module.css";

export default function InputAdmin({ label, placeholder, type, setValue }) {
    return (
        <div className={classes.formgroup}>
            <label>{label}</label>
            <input type={type} placeholder={placeholder} onChange={(evt) => setValue(evt.target.value)} />
        </div>
    );
}
