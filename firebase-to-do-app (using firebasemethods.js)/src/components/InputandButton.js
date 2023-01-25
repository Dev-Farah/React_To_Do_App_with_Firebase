import React from "react";
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function Input(props) {
    const { id, onChange, type, value, label, endAdornment } = props;

    return (

        <FormControl sx={{ padding: "0!important", margin: "0!important", width: "100%!important" }} variant="outlined">
            <InputLabel sx={{ padding: "0!important", margin: "0!important", backgroundColor: "#fff" }} htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
            className="input"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                endAdornment={endAdornment}
                label={label}
            />
        </FormControl>
    )
}

function Btn(props) {
    const { disabled, onClick, otherClasses, btnVal } = props;
    return (
        <Button disabled={disabled} onClick={onClick} variant="contained" className={`btn ${otherClasses}`}>{btnVal}</Button>

    );
};


export { Input, Btn };