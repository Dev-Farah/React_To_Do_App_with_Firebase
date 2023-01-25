import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../config/firebasemethods";
import { Container, Box, Typography } from '@mui/material'
import { Input, Btn } from '../components/InputandButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinearProgress from '@mui/material/LinearProgress';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoader] = useState(false);
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
        setLoader(true)
        loginUser({
            email,
            password,
        })
        .then((success) => {
                setLoader(false)
                navigate(`/todos/${success.id}`, {
                    state: success
                }
                )
            })
            .catch((err) => {
                setLoader(false)
                alert(err);
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

                        {isLoading ? <LinearProgress sx={{
                        backgroundColor: "#B0D1C8",
                        '& .MuiLinearProgress-bar1Indeterminate': { backgroundColor: '#00B69A' },
                        '& .MuiLinearProgress-bar2Indeterminate': { backgroundColor: '#00B69A' }
                    }} /> : null}

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

                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: "#5e5e5e" }} variant='subtitle2'>Don't have an account?  <em><Link className='loginSignUpLink' to="/SignUp">Sign up</Link></em></Typography>
                        <Btn disabled={isLoading} btnVal="Login" onClick={login} />
                    </Box>
                </Box>
            </Container>
        </>
    )
}


export default Login;