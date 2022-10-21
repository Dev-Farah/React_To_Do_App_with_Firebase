import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/firebasemethods";
import { Container, Box, Typography } from '@mui/material'
import { Input, Btn } from '../components/InputandButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    let navigate = useNavigate();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let login = () => {
        loginUser({
            email,
            password,
        })
            .then((success) => {
                console.log(success);
                navigate(`/`, {
                    state: success
                }
                )
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Container>
                <Box className="outerBox">
                    <Box className="signupLoginHeading">
                        <Typography variant='h3' >
                            Login
                        </Typography>
                    </Box>

                    <Box my={3}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            variant="standard"
                        />
                    </Box>

                    <Box my={3}>
                        <Input
                            label="Password"
                            value={password}
                            id={"password"}
                            onChange={(e) => setPassword(e.target.value)}
                            type={values.showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end"
                                    sx={{ px: 3 }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>

                    <Box style={{ display: 'flex', justifyContent: 'right' }}>
                        <Btn
                            btnVal="Login" onClick={login} />
                    </Box>
                </Box>
            </Container>
        </>
    )
}