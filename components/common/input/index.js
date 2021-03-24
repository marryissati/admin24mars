import React from "react";

import classes from "./input.module.css";

export function Input({ label, placeholder }) {
  return (
    <div className={classes.formgroup}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
}
