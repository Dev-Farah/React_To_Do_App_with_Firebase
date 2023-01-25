import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from '../config/firebasemethods';
import { Container, Box, Typography } from '@mui/material'
import { Input, Btn } from '../components/InputandButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinearProgress from '@mui/material/LinearProgress';


function SignUp() {
    const [userName, setUserName] = useState("");
    const [contact, setContact] = useState("");
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

    let signUp = () => {
        setLoader(true);
        signUpUser({
            email,
            password,
            userName,
            contact,
        })
            .then((success) => {
                setLoader(false);
                navigate(`/todos/${success.id}`, {
                    state: success
                }
                )
            })
            .catch((error) => {
                setLoader(false);
                alert(error);
            });
    }

    return (
        <>
            <Container>
                <Box className="outerBox">
                    <Box className="signupLoginHeading">
                        <Typography variant='h3' >
                            Signup
                        </Typography>
                    </Box>

                    {isLoading ? <LinearProgress sx={{
                        backgroundColor: "#B0D1C8",
                        '& .MuiLinearProgress-bar1Indeterminate': { backgroundColor: '#00B69A' },
                        '& .MuiLinearProgress-bar2Indeterminate': { backgroundColor: '#00B69A' }
                    }} /> : null}

                    <Box my={3}>
                        <Input
                            label="Enter Name"
                            value={userName}
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => setUserName(e.target.value)}

                        />

                    </Box>

                    <Box my={3}>
                        <Input
                            label="Contact"
                            type="text"
                            value={contact}
                            placeholder="Contact"
                            onChange={(e) => setContact(e.target.value)}

                        />
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

                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: "#5e5e5e" }} variant='subtitle2'>Already have an account?  <em><Link className='loginSignUpLink' to="/Login">Login</Link></em></Typography>
                        <Btn btnVal="Sign Up" onClick={signUp} />
                    </Box>
                </Box>
            </Container>

        </>
    )
}


export default SignUp;